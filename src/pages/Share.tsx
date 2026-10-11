import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { loadDraft, saveDraft } from '../lib/storage'
import { countWords } from '../lib/text'


const MIN_WORDS = 20

export default function Share() {
  
  const [writing] = useState(() => loadDraft().writing)
  const [reflection, setReflection] = useState(() => loadDraft().reflection)


  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value
    setReflection(text)
    saveDraft({ ...loadDraft(), reflection: text })
  }

  const words = countWords(reflection)
  const longEnough = words >= MIN_WORDS

 
  if (writing.trim() === '') {
    return (
      <div>
        <h1 className="text-2xl font-medium">Share it</h1>
        <p className="mt-3 text-stone-600">Nothing has been written yet.</p>
        <Link to="/write" className="mt-6 inline-block text-stone-800 underline">
          Go back and write first
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-medium">Share it</h1>
      <p className="mt-3 text-stone-600">
        Read this, or have it read to you. Then the listener writes a few lines
        of their own: what they found interesting, surprising, or new.
      </p>

      <div className="mt-6 whitespace-pre-wrap rounded-md bg-stone-100 p-4 leading-relaxed text-stone-700">
        {writing}
      </div>

      <h2 className="mt-10 text-lg font-medium">The listener writes here</h2>
      <textarea
        value={reflection}
        onChange={handleChange}
        onPaste={(e) => e.preventDefault()}
        spellCheck={false}
        placeholder="In your own words, with no pasting..."
        className="mt-3 h-48 w-full resize-none rounded-md border border-stone-300 bg-white p-4 leading-relaxed focus:border-stone-500 focus:outline-none"
      />
      <p className="mt-2 text-sm text-stone-400">
        {words} of {MIN_WORDS} words. Saved on this device as you type.
      </p>

      {longEnough ? (
        <Link
          to="/reveal"
          className="mt-8 inline-block rounded-md bg-stone-800 px-5 py-2.5 text-stone-50 hover:bg-stone-700"
        >
          We're both finished
        </Link>
      ) : (
        <span className="mt-8 inline-block cursor-not-allowed rounded-md bg-stone-800 px-5 py-2.5 text-stone-50 opacity-40">
          We're both finished
        </span>
      )}
    </div>
  )
}