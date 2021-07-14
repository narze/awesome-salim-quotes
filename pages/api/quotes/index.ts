// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import getEntries from "../../../utils/getEntries"

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
  const entries = getEntries()

  const quotes = entries.map((entry, index) => ({
    id: index + 1,
    body: entry,
    url: `https://watasalim.vercel.app/${index + 1}`,
  }))

  res.status(200).json({ quotes })
}
