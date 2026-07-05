import { Fragment } from "react"

/**
 * Lightweight renderer for the mock assistant replies.
 * Supports **bold** inline and lines beginning with "- " as list items.
 */
export function MessageContent({ text }: { text: string }) {
  const lines = text.split("\n")
  const blocks: React.ReactNode[] = []
  let listBuffer: string[] = []

  const flushList = (key: string) => {
    if (listBuffer.length === 0) return
    blocks.push(
      <ul key={key} className="my-1 ml-4 list-disc space-y-1">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    listBuffer = []
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim()
    if (trimmed.startsWith("- ")) {
      listBuffer.push(trimmed.slice(2))
      return
    }
    flushList(`list-${idx}`)
    if (trimmed.length > 0) {
      blocks.push(
        <p key={`p-${idx}`} className="leading-relaxed">
          {renderInline(trimmed)}
        </p>,
      )
    }
  })
  flushList("list-end")

  return <div className="space-y-1.5">{blocks}</div>
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-primary">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
