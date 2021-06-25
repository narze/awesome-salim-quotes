import { links } from "../config"

export default function Footer() {
  return (
    <footer>
      {links
        .map<React.ReactNode>(({ name, url }, idx) => {
          return (
            <a key={idx} href={url} target="_blank" rel="noreferrer">
              {name}
            </a>
          )
        })
        .reduce((prev, curr) => [prev, " | ", curr])}
    </footer>
  )
}
