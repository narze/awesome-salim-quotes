import { promises as fs } from "fs"
import { GetStaticPaths, GetStaticProps } from "next"

function Entry({ id, entry }: { id: Number; entry: string }) {
  // Render post...
  return (
    <p>
      {id} : {entry}
    </p>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // export async function getStaticPaths() {
  const readme = await fs.readFile("README.md", "utf8")

  const entries = readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))

  // Get the paths we want to pre-render based on posts
  const paths = entries.map((entry, idx) => ({
    params: { id: `${idx + 1}` },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params!.id)
  // export async function getStaticProps({ params }) {
  const readme = await fs.readFile("README.md", "utf8")

  const entries = readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))

  const entry = entries[id - 1]

  // Pass post data to the page via props
  return { props: { entry, id } }
}

export default Entry
