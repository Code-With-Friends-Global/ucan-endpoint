import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import * as Proof from '@web3-storage/w3up-client/proof'
import { Signer } from '@web3-storage/w3up-client/principal/ed25519'
import * as DID from '@ipld/dag-ucan/did'

export async function POST(req: Request) {
  const { KEY, PROOF } = process.env
  if(!KEY) {
    return Response.json(
      { error: 'Missing `KEY` environment variable.' },
      { status: 500 }
    )
  }
  if(!PROOF) {
    return Response.json(
      { error: 'Missing `PROOF` environment variable.' },
      { status: 500 }
    )
  }

  const principal = Signer.parse(KEY)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })

  const proof = await Proof.parse(PROOF)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())

  const { did } = await req.json()
  const audience = DID.parse(did)
  const abilities = ['space/blob/add', 'space/index/add', 'filecoin/offer', 'upload/add']
  const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours from now
  const delegation = await client.createDelegation(audience, abilities, { expiration })

  const archive = await delegation.archive()
  return Response.json({ delegation: new TextDecoder().decode(archive.ok) })
}