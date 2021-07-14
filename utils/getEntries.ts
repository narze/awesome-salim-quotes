import * as fs from "fs"

const readme = fs.readFileSync("README.md", "utf8")

export default function getEntries() {
  return readme
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((l) => l.slice(2))
}
