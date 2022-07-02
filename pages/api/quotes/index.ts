// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
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
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const entries = await getEntries()

  const quotes = entries.map((entry, index) => ({
    id: index + 1,
    body: entry,
    url: `https://watasalim.vercel.app/q/${index + 1}`,
  }))

  res.status(200).json({ quotes })
}
