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