import { promises as fs } from "fs"
import { useRouter } from "next/router"
import React, { useEffect } from "react"

import styles from "../styles/Home.module.css"

export default function Latest({ entriesCount }: { entriesCount: number }) {
  const router = useRouter()

  useEffect(() => {
    router.push(`/q/${entriesCount}`)
  })

  return (
    <main className={styles.container}>
      <div className={`${styles.entryRoulette}`}>Loading</div>
    </main>
  )
}

export async function getStaticProps() {
  const readme = await fs.readFile("README.md", "utf8")

  const entriesCount = readme
    .split("\n")
    .filter((line) => line.startsWith("- ")).length

  return {
    props: {
      entriesCount,
    },
  }
}
