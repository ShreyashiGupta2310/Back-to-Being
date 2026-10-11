import { useEffect, useState } from 'react'
import { listModels, pickDefaultModel } from '../lib/ollama'


type Status =
  | { state: 'checking' }
  | { state: 'ready'; model: string }
  | { state: 'no-models' }
  | { state: 'unreachable' }

export default function ModelStatus() {
  const [status, setStatus] = useState<Status>({ state: 'checking' })

  
  useEffect(() => {
    let cancelled = false

    async function check() {
      try {
        const models = await listModels()
        if (cancelled) return
        const model = pickDefaultModel(models)
        setStatus(model ? { state: 'ready', model } : { state: 'no-models' })
      } catch {
        if (!cancelled) setStatus({ state: 'unreachable' })
      }
    }

    check()

    
    return () => {
      cancelled = true
    }
  }, [])

  if (status.state === 'checking') {
    return <p className="mt-6 text-sm text-leaf-400">Looking for a local model...</p>
  }

  if (status.state === 'ready') {
    return (
      <p className="mt-6 text-sm text-leaf-500">
        Local model ready: {status.model}
      </p>
    )
  }

  if (status.state === 'no-models') {
    return (
      <p className="mt-6 text-sm text-leaf-500">
        Ollama is running, but no models are installed yet. Run{' '}
        <code>ollama pull gemma4:e2b</code> in a terminal.
      </p>
    )
  }

  return (
    <p className="mt-6 text-sm text-leaf-500">
      Can't reach Ollama. Make sure it is running and that OLLAMA_ORIGINS is set
      to http://localhost:5173, then restart Ollama.
    </p>
  )
}