import type { badge } from './badges'
import { BADGE_SCHEMA, BADGE_SYSTEM_PROMPT } from './prompt'
const OLLAMA_URL = 'http://localhost:11434'

// Asks Ollama which models are installed and returns their names.
export async function listModels(): Promise<string[]> {
  const response = await fetch(`${OLLAMA_URL}/api/tags`)

  if (!response.ok) {
    throw new Error(`Ollama answered with status ${response.status}`)
  }

  const data = await response.json()

  if (!Array.isArray(data.models)) {
    throw new Error('Ollama sent back something unexpected')
  }

  return data.models.map((model: { name: string }) => model.name)
}


export function pickDefaultModel(models: string[]): string | null {
  const gemma = models.find((name) => name.toLowerCase().includes('gemma'))
  return gemma ?? models[0] ?? null
}


export async function askForBadges(model: string, writing: string): Promise<badge[]> {
  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      format: BADGE_SCHEMA,
      options: { temperature: 0.3 },
      messages: [
        { role: 'system', content: BADGE_SYSTEM_PROMPT },
        { role: 'user', content: writing },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`Ollama answered with status ${response.status}`)
  }

  const data = await response.json()
  const parsed = JSON.parse(data.message.content)

  if (!Array.isArray(parsed.badges)) {
    throw new Error('The model did not send a list of badges')
  }

  return parsed.badges
}