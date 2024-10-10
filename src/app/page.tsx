import Image from "next/image"
import school from '../images/school building.svg'
import octocat from '../images/octocat.svg'
import styles from "./page.module.css"

export default function Home() {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1>dAcademy UCAN Delegator</h1>
      </header>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src={school}
          alt="dAcademy"
          width={180}
          height={180}
          priority
        />
        <p>This is a simple <a href="https://nextjs.org">Next.js</a> application to generate UCAN delegations permitting <a href="https://dacade.my">dAcademy</a> users to store data on <a href="https://web3.storage">Web3.Storage</a>.</p>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Code-With-Friends-Global/ucan-endpoint"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src={octocat}
            alt="GitHub"
            width={50}
            height={50}
          />
        </a>
      </footer>
    </article>
  )
}
