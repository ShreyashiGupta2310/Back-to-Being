export const MIN_REFLECTION_WORDS = 20
export function countWords(text: string): number {
  const trimmed = text.trim()
  if (trimmed === '') return 0
  return trimmed.split(/\s+/).length
}

export function wrapText(text: string, maxChars: number, maxLines: number): string[] {
  const lines: string[] = []
  let current = ''

  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = current === '' ? word : `${current} ${word}`
    if (next.length <= maxChars || current === '') {
      current = next
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current !== '') lines.push(current)

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = kept[maxLines - 1].replace(/[\s.,;:!?]*$/, '') + '…'
    return kept
  }
  return lines
}