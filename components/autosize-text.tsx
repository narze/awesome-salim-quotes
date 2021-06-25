export default function AutosizeText({ children }: { children: string }) {
  const size = Math.min(3, children.length / 20)
  const multiplier = 4 - size
  return <span style={{ fontSize: `${multiplier * 100}%` }}>{children}</span>
}
