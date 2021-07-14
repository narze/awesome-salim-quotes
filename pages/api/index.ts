import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  res.status(200).json({
    description: "Watasalim JSON API",
    github: "https://github.com/narze/awesome-salim-quotes",
    tip_me: "https://ko-fi.com/narze",
    endpoints: [
      { path: `${baseUrl}/api/quotes`, description: "Get all quotes" },
      {
        path: `${baseUrl}/api/quotes/1`,
        description: "Get quote by numeric ID",
      },
      {
        path: `${baseUrl}/api/quotes/latest`,
        description: "Get latest quote (Last ID)",
      },
      {
        path: `${baseUrl}/api/quotes/random`,
        description: "Get randomized quote",
      },
    ],
  })
}
