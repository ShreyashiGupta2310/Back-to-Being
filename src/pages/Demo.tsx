import { Link } from 'react-router-dom'
import BadgeCard from '../components/BadgeCard'
import {
  demoBadges,
  demoReflection,
  demoRejected,
  demoWriting,
} from '../data/demo'
import { makeSocialBadge } from '../lib/socialBadge'

export default function Demo() {
  return (
    <div>
      <h1 className="text-2xl font-medium">See an example</h1>
      <p className="mt-3 text-leaf-600">
        This is a saved example, not a live run, so you can see the result
        without installing anything. The badges came from a small open-weight
        model (Gemma, running locally through Ollama). Your own words never
        leave your device.
      </p>

      <h2 className="mt-10 text-lg font-medium">What someone wrote</h2>
      <p className="mt-3 whitespace-pre-wrap rounded-md bg-leaf-100 p-4 leading-relaxed text-leaf-700">
        {demoWriting}
      </p>

      <h2 className="mt-10 text-lg font-medium">What their listener wrote</h2>
      <p className="mt-3 whitespace-pre-wrap rounded-md bg-leaf-100 p-4 leading-relaxed text-leaf-700">
        {demoReflection}
      </p>

      <h2 className="mt-10 text-lg font-medium">The badges</h2>
      <p className="mt-2 text-sm text-leaf-500">
        Each one was named by the model and kept only because its quote appears
        in the writing, word for word.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {demoBadges.map((badge) => (
          <BadgeCard key={badge.quote} badge={badge} />
        ))}
        <BadgeCard badge={makeSocialBadge(demoReflection)} />
      </div>
      <p className="mt-2 text-sm text-leaf-400">
        The last badge comes from the act of sharing. Plain code gives it, not
        the model.
      </p>

      <h2 className="mt-10 text-lg font-medium">What the checker refused</h2>
      <p className="mt-2 text-sm text-leaf-500">
        From a different test run: the model tried to give two badges for the
        same sentence, and only the first was kept.
      </p>
      <div className="mt-3 rounded-md border border-leaf-200 p-4">
        <p className="text-leaf-700">{demoRejected.reason}</p>
        <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-md bg-leaf-100 p-3 text-xs text-leaf-600">
          {JSON.stringify(demoRejected.badge, null, 2)}
        </pre>
      </div>

      <Link
        to="/write"
        className="mt-10 inline-block rounded-md bg-leaf-800 px-5 py-2.5 text-leaf-50 hover:bg-leaf-700"
      >
        Try it yourself
      </Link>
      <p className="mt-3 text-sm text-leaf-400">
        Making your own badges needs Ollama and a Gemma model on your computer.
        Writing and sharing work without them.
      </p>
    </div>
  )
}