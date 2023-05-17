import { NextResponse } from "next/server"

import getEntries from "../../../../utils/getEntries"

export async function GET(_request: Request) {
  const entries = await getEntries()

  const index = entries.length - 1

  const quote = {
    id: index + 1,
    body: entries[index],
    url: `https://watasalim.vercel.app/q/${index + 1}`,
  }

  const body = { quote }

  return NextResponse.json(body, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
