import { ImageResponse } from 'next/server';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';
import getEntries from "../../../utils/getEntries"


export async function GET(request: Request, context: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url);

    const index = Number(context.params.id) - 1

    const entries = await getEntries()

    if (!entries[index]) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const quote = {
      id: index + 1,
      body: entries[index],
      url: `https://watasalim.vercel.app/q/${index + 1}`,
    }

    const entry = entries[index]

    const size = Math.min(3, entry.length / 20)
    const multiplier = 3 + 3 * (4 - size)

    return new ImageResponse(
      (
        <div
          style={{
            backgroundSize: '100% 100%',
            backgroundImage: "linear-gradient( to bottom, #002b7f, #002b7f 13.33%, #ffffff 13.33%, #ffffff 30%, #ce1126 30%, #ce1126 70%, #ffffff 70%, #ffffff 86.67%, #002b7f 86.67%, #002b7f 100% )",
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              textAlign: "center",
              fontSize: 80,
              width: "100%",
              padding: "0 20px",
              textShadow: "2px 2px 4px white",
              wordBreak: "break-word"
            }}
          >
            {entry}
          </div>
        </div>),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
