import { ImageResponse, NextResponse } from "next/server"

export const runtime = "edge"
import getEntries from "../../../utils/getEntries"

const font = fetch(
  new URL("../../../public/NotoSansThai-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(
  _request: Request,
  context: { params: { id: string } }
) {
  const fontData = await font

  try {
    const index = Number(context.params.id) - 1

    const entries = await getEntries()

    if (!entries[index]) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const entry = entries[index]

    const size = Math.min(3, entry.length / 20)
    const multiplier = 3 + 3 * (4 - size)

    const fontSize = (16 * multiplier).toFixed(2)

    return new ImageResponse(
      (
        <div
          style={{
            backgroundSize: "100% 100%",
            backgroundImage:
              "linear-gradient(to bottom, #002b7f, #002b7f 13.33%, #ffffff 13.33%, #ffffff 30%, #ce1126 30%, #ce1126 70%, #ffffff 70%, #ffffff 86.67%, #002b7f 86.67%, #002b7f 100%)",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              justifyItems: "center",
              textAlign: "center",
              fontSize,
              fontFamily: "NotoSansThai",
              width: "100%",
              padding: "0 20px",
              textShadow: "2px 2px 4px white",
              wordBreak: "break-word",
              lineHeight: 1,
            }}
          >
            {entry}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "NotoSansThai",
            data: fontData,
            style: "normal",
          },
        ],
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
