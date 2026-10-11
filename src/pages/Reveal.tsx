import { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadDraft, sealDraft, type ritual } from '../lib/storage'
import { countWords, MIN_REFLECTION_WORDS } from '../lib/text'
import ModelStatus from '../components/ModelStatus'
export default function Reveal() {
  const [ritual, setRitual] = useState<ritual | null>(null)
   function handleSeal() {
    setRitual(sealDraft())
  }
// if already sealed then
if (ritual) {
    return (
      <div>
        <h1 className="text-2xl font-medium">Sealed</h1>
        <p className="mt-3 text-stone-600">
          Your words are locked. Nothing in this app can change them now. Next, a
          small model on this computer will read them and name your badges.
        </p>
        <Link to="/archive" className="mt-6 inline-block text-stone-800 underline">
          See the archive
        </Link>
      </div>
    )
  }

  // Not ready: send them back instead of sealing something half-finished.
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

  // if Ready: explain what sealing does and offer the button.

  return  (
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