var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import * as Proof from '@web3-storage/w3up-client/proof'
import { Signer } from '@web3-storage/w3up-client/principal/ed25519'
import * as DID from '@ipld/dag-ucan/did'

// From https://web3.storage/docs/how-to/upload/
async function backend(did) {
  // Load client with specific private key
  const principal = Signer.parse(process.env.KEY)
  const store = new StoreMemory()
  const client = await Client.create({ principal, store })
 
  // Add proof that this agent has been delegated capabilities on the space
  const proof = await Proof.parse(process.env.PROOF)
  const space = await client.addSpace(proof)
  await client.setCurrentSpace(space.did())
 
  // Create a delegation for a specific DID
  const audience = DID.parse(did)
  const abilities = ['space/blob/add', 'space/index/add', 'filecoin/offer', 'upload/add']
  const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours from now
  const delegation = await client.createDelegation(audience, abilities, { expiration })
 
  // Serialize the delegation and send it to the client
  const archive = await delegation.archive()
  return archive.ok
}

/* GET home page. */
router.post('/ucan', function(req, res, next) {
});


module.exports = router;
