import { useState } from 'react'
import { Link } from 'react-router-dom'
import BadgeCard from '../components/BadgeCard'
import { downloadText } from '../lib/download'
import { deleteRitual, loadRituals } from '../lib/storage'
import { makeSocialBadge } from '../lib/socialBadge'

// Turns "2026-10-11T14:03:00.000Z" into something like "11 October 2026".
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Archive() {
  // Read the saved rituals once, when the page first appears.
  const [rituals, setRituals] = useState(() => loadRituals())

  function handleDelete(id: string) {
    const sure = window.confirm('Delete this ritual for good? This cannot be undone.')
    if (!sure) return
    deleteRitual(id)
    setRituals(loadRituals()) // ask storage what is left, and show that
  }

  function handleExport() {
    downloadText(
      'back-to-being-archive.json',
      JSON.stringify(rituals, null, 2),
      'application/json',
    )
  }

  if (rituals.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-medium">Your archive</h1>
        <p className="mt-3 text-leaf-600">
          Nothing here yet. Sealed rituals will appear on this shelf.
        </p>
        <Link to="/" className="mt-6 inline-block text-leaf-800 underline">
          Start from the guide
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Your archive</h1>
      <p className="mt-3 text-leaf-600">
        Everything here is stored only in this browser, on this device. Clearing
        your browser data erases it, so export a copy now and then.
      </p>
      <button
        type="button"
        onClick={handleExport}
        className="mt-5 rounded-md border border-leaf-300 px-4 py-2 text-leaf-700 hover:bg-leaf-100"
      >
        Export everything
      </button>

      <ul className="mt-8 space-y-10">
        {rituals.map((ritual) => (
          <li key={ritual.id} className="border-t border-leaf-200 pt-6">
            <p className="text-sm text-leaf-400">{formatDate(ritual.sealedAt)}</p>

                       {ritual.badges.length === 0 && (
              <p className="mt-3 text-leaf-500">
                The model named no badges for this one.
              </p>
            )}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {ritual.badges.map((badge) => (
                <BadgeCard key={badge.quote} badge={badge} />
              ))}
              <BadgeCard badge={makeSocialBadge(ritual.reflection)} />
            </div>

            <details className="mt-4 text-leaf-600">
              <summary className="cursor-pointer text-sm text-leaf-500">
                Read the words
              </summary>
              <h2 className="mt-3 text-sm font-medium text-leaf-500">What you wrote</h2>
              <p className="mt-1 whitespace-pre-wrap">{ritual.writing}</p>
              <h2 className="mt-4 text-sm font-medium text-leaf-500">
                What your listener wrote
              </h2>
              <p className="mt-1 whitespace-pre-wrap">{ritual.reflection}</p>
            </details>

            <button
              type="button"
              onClick={() => handleDelete(ritual.id)}
              className="mt-4 text-sm text-leaf-400 underline hover:text-leaf-700"
            >
              Delete this ritual
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}