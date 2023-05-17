import getEntries from "../../../utils/getEntries"

import { NextResponse } from "next/server"

export async function GET(_request: Request) {
  const entries = await getEntries()

  const quotes = entries.map((entry, index) => ({
    id: index + 1,
    body: entry,
    url: `https://watasalim.vercel.app/q/${index + 1}`,
  }))

  const body = { quotes }

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
