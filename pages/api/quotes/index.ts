// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { promises as fs } from "fs"

type Data = {
  quotes: {
    id: number
    body: string
    url: string
  }[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const readme = await fs.readFile("README.md", "utf8")

  const entries = readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))

  const quotes = entries.map((entry, index) => ({
    id: index + 1,
    body: entry,
    url: `https://watasalim.vercel.app/${index + 1}`,
  }))

  res.status(200).json({ quotes })
}
