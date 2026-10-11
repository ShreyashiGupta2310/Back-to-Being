import { useState } from 'react'
import { Link } from 'react-router-dom'
import BadgeCard from '../components/BadgeCard'
import ModelStatus from '../components/ModelStatus'
import { askForBadges, listModels, pickDefaultModel } from '../lib/ollama'
import { loadDraft, saveBadges, sealDraft, type ritual } from '../lib/storage'
import { countWords, MIN_REFLECTION_WORDS } from '../lib/text'
import { verifyBadges, type VerifyResult } from '../lib/verify'
import { makeSocialBadge } from '../lib/socialBadge'


type BadgeRun =
  | { state: 'working' }
  | { state: 'done'; result: VerifyResult }
  | { state: 'failed'; message: string }

export default function Reveal() {
  const [ritual, setRitual] = useState<ritual | null>(null)
  const [run, setRun] = useState<BadgeRun | null>(null)

 
  async function runModel(sealed: ritual) {
    setRun({ state: 'working' })
    try {
      const model = pickDefaultModel(await listModels())
      if (!model) throw new Error('No model is installed in Ollama')
      const candidates = await askForBadges(model, sealed.writing)
      const result = verifyBadges(sealed.writing, candidates)
      saveBadges(sealed.id, result.verified)
      setRun({ state: 'done', result })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setRun({ state: 'failed', message })
    }
  }

 
  function handleSeal() {
    const sealed = sealDraft()
    setRitual(sealed)
    runModel(sealed)
  }

  // Screen 1: already sealed.
  if (ritual) {
    const canRetry =
      run?.state === 'failed' ||
      (run?.state === 'done' && run.result.verified.length === 0)

    return (
      <div>
        <h1 className="text-2xl font-medium">Sealed</h1>
        <p className="mt-3 text-stone-600">
          Your words are locked. Nothing in this app can change them now.
        </p>

        {run?.state === 'working' && (
          <p className="mt-6 text-stone-500">
            Reading your words... the first time can take a minute while the
            model loads.
          </p>
        )}

        {run?.state === 'failed' && (
          <p className="mt-6 text-stone-500">
            Your words are safely sealed. The model had a problem: {run.message}
          </p>
        )}

        {run?.state === 'done' && (
          <div className="mt-6">
            {run.result.verified.length === 0 ? (
              <p className="text-stone-500">
                No badges this time. That can happen with short or summary-style
                writing, because the model only names things it can quote
                exactly. Your words are still sealed, and you can ask the model
                again.
              </p>
            ) : (
              <ul className="space-y-6">
                {run.result.verified.map((badge) => (
                  <li key={badge.quote}>
                    <BadgeCard badge={badge} />
                  </li>
                ))}
              </ul>
            )}

            {run.result.rejected.length > 0 && (
              <details className="mt-6 text-sm text-stone-500">
                <summary className="cursor-pointer">
                  {run.result.rejected.length} suggestion(s) left out
                </summary>
                <ul className="mt-2 space-y-3">
                  {run.result.rejected.map((item, index) => (
                    <li key={index}>
                      <span className="text-stone-700">{item.reason}</span>
                      <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded-md bg-stone-100 p-2 text-xs">
                        {JSON.stringify(item.badge, null, 2)}
                      </pre>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        )}
        <div className="mt-8">
          <p className="text-sm text-stone-400">For sharing it with someone</p>
          <div className="mt-3">
            <BadgeCard badge={makeSocialBadge(ritual.reflection)} />
          </div>
          <p className="mt-2 text-sm text-stone-400">
            This one comes from the act of sharing. It does not depend on the
            model or on how kind the words were.
          </p>
        </div>
        {canRetry && (
          
          <button
            type="button"
            onClick={() => runModel(ritual)}
            className="mt-6 rounded-md border border-stone-300 px-4 py-2 text-stone-700 hover:bg-stone-100"
          >
            Ask the model again
          </button>
        )}

        <div>
          <Link to="/archive" className="mt-6 inline-block text-stone-800 underline">
            See the archive
          </Link>
        </div>
      </div>
    )
  }

  // Screen 2: not ready.
  const draft = loadDraft()
  const ready =
    draft.writing.trim() !== '' &&
    countWords(draft.reflection) >= MIN_REFLECTION_WORDS

  if (!ready) {
    return (
      <div>
        <h1 className="text-2xl font-medium">Nothing to seal yet</h1>
        <p className="mt-3 text-stone-600">
          Write your account and get your listener's reflection first.
        </p>
        <div className="mt-6 space-x-4">
          <Link to="/write" className="text-stone-800 underline">
            Write
          </Link>
          <Link to="/share" className="text-stone-800 underline">
            Share
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Seal your words</h1>
      <p className="mt-3 text-stone-600">
        Once sealed, neither of you can edit what was written. Then a small model
        running on this computer reads it and names your badges. Nothing leaves
        your device.
      </p>
      <ModelStatus />
      <button
        type="button"
        onClick={handleSeal}
        className="mt-8 rounded-md bg-stone-800 px-5 py-2.5 text-stone-50 hover:bg-stone-700"
      >
        Seal our words
      </button>
    </div>
  )
}