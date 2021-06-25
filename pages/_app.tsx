import "../styles/globals.css"
import type { AppProps } from "next/app"
import useScript from "react-script-hook"

function MyApp({ Component, pageProps }: AppProps) {
  useScript({
    src: "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js",
    onload: () => {
      window.kofiWidgetOverlay.draw("narze", {
        type: "floating-chat",
        "floating-chat.donateButton.text": "สนับสนุน ฿",
        "floating-chat.donateButton.background-color": "#f45d22",
        "floating-chat.donateButton.text-color": "#fff",
      })
    },
  })

  return <Component {...pageProps} />
}
export default MyApp
