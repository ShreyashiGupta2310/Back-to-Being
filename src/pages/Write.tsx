import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { loadDraft, saveDraft } from '../lib/storage'



export default function Write() {
   const [writing, setWriting] = useState(() => loadDraft().writing)

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value
    setWriting(text)
    saveDraft({ ...loadDraft(), writing: text })
  
  }


  const hasText = writing.trim().length > 0

  return (
    <div>
      <h1 className="text-2xl font-medium">Write it down</h1>
      <p className="mt-3 text-stone-600">
        Describe what you experienced in your own words. Nobody is grading this.
        Plain and honest is the goal.
      </p>

      <textarea
        value={writing}
        onChange={handleChange}
        spellCheck={false}
        placeholder="What did you notice?"
        className="mt-6 h-72 w-full resize-none rounded-md border border-stone-300 bg-white p-4 leading-relaxed focus:border-stone-500 focus:outline-none"
      />
      <p className="mt-2 text-sm text-stone-400">
        Saved on this device as you type.
      </p>

      {hasText ? (
        <Link
          to="/share"
          className="mt-8 inline-block rounded-md bg-stone-800 px-5 py-2.5 text-stone-50 hover:bg-stone-700"
        >
          Done writing
        </Link>
      ) : (
        <span className="mt-8 inline-block cursor-not-allowed rounded-md bg-stone-800 px-5 py-2.5 text-stone-50 opacity-40">
          Done writing
        </span>
      )}
    </div>
  )
}