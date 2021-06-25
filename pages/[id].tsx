import { promises as fs } from "fs"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
} from "react-share"

import styles from "../styles/Home.module.css"
import AutosizeText from "../components/autosize-text"

function Entry({ id, entry }: { id: Number; entry: string }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${id}`

  function getOgImageUrl() {
    const size = Math.min(3, entry.length / 20)
    const multiplier = 3 + 3 * (4 - size)
    return `https://og-image-asq.vercel.app/“${entry}”?md=1&fontSize=calc(${multiplier.toFixed(
      2
    )}vw)`
  }

  return (
    <div>
      <Head>
        <title>วาทกรรมสลิ่มสุดเจ๋ง</title>
        <meta name="description" content="ปลุกความสลิ่มในตัวคุณ!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="วาทกรรมสลิ่มสุดเจ๋ง" />
        <meta name="twitter:card" content="วาทกรรมสลิ่มสุดเจ๋ง" />
        <meta property="og:description" content="ปลุกความสลิ่มในตัวคุณ!" />
        <meta property="og:image" content={getOgImageUrl()} />
      </Head>

      <main className={styles.container}>
        <div>
          <h1 className={styles.title}>
            <span>
              <span className={styles.red}>วาท</span>
              <span className={styles.white}>กรรม</span>
              <span className={styles.blue}>สลิ่ม</span>
              <span className={styles.white}>สุด</span>
              <span className={styles.red}>เจ๋ง</span>
            </span>
          </h1>
          <div className={styles.entryRoulette}>
            <AutosizeText>{entry}</AutosizeText>
          </div>
          <div className={styles.action}>
            <div className={styles.share}>
              <span>🪑 แชร์โลด 👉</span>
              <FacebookShareButton url={url}>
                <FacebookIcon size={46} />
              </FacebookShareButton>
              <TwitterShareButton url={url}>
                <TwitterIcon size={46} />
              </TwitterShareButton>
              <LineShareButton url={url}>
                <LineIcon size={46} />
              </LineShareButton>
            </div>
            <Link href="/" passHref>
              <button className={styles.button}>🚴‍♀️ ปั่นใหม่ 🚴‍♂️</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // export async function getStaticPaths() {
  const readme = await fs.readFile("README.md", "utf8")

  const entries = readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))

  // Get the paths we want to pre-render based on posts
  const paths = entries.map((entry, idx) => ({
    params: { id: `${idx + 1}` },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params!.id)
  // export async function getStaticProps({ params }) {
  const readme = await fs.readFile("README.md", "utf8")

  const entries = readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))

  const entry = entries[id - 1]

  // Pass post data to the page via props
  return { props: { entry, id } }
}

export default Entry
