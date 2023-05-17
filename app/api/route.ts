import { NextResponse } from "next/server"

export async function GET(_request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const body = {
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
  }

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
