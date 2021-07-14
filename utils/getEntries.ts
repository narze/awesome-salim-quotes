let readme: string

export default async function getEntries() {
  if (!readme) {
    const response = await fetch(
      "https://raw.githubusercontent.com/narze/awesome-salim-quotes/main/README.md"
    )

    readme = await response.text()
  }

  return readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))
}
