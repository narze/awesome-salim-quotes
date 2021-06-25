import { links } from "../config"

export default function Footer() {
  return (
    <footer>
      {links
        .map<React.ReactNode>(({ name, url }, idx) => {
          return (
            <a href={url} key={idx}>
              {name}
            </a>
          )
        })
        .reduce((prev, curr) => [prev, " | ", curr])}
    </footer>
  )
}
