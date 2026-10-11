import { Link } from 'react-router-dom'
import { ritualsteps, rules } from '../data/ritual'

export default function Guide() {
  return (
    <div>
      <h1 className="text-3xl font-medium">Remembered, not recorded</h1>
      <p className="mt-3 text-stone-600">
        A small ritual for stepping away from screens. Live the moment first,
        remember it, describe it in your own words, and share it with someone.
      </p>

      <ol className="mt-10 list-decimal space-y-6 pl-5 marker:text-stone-400">
        {ritualsteps.map((step) => (
          <li key={step.title}>
            <h2 className="font-medium">
              {step.title}
              <span className="ml-2 text-sm font-normal text-stone-400">
                {step.when}
              </span>
            </h2>
            <p className="mt-1 text-stone-600">{step.description}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-12 text-lg font-medium">What this app promises</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-600">
        {rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>

      <Link
        to="/write"
        className="mt-10 inline-block rounded-md bg-stone-800 px-5 py-2.5 text-stone-50 hover:bg-stone-700"
      >
        Start writing
      </Link>
      <p className="mt-3 text-sm text-stone-400">
        Not yet? Go outside first, and come back once a little time has passed.
      </p>
    </div>
  )
}