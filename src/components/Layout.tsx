import { Link, Outlet } from 'react-router-dom'
import Leaf from './Leaf'
import LeafSprig from './LeafSprig'

export default function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-leaf-50 text-leaf-900">
      {/* Soft decoration in two corners. Not clickable, hidden from screen readers. */}
      <LeafSprig className="pointer-events-none absolute -right-10 -top-8 w-56 rotate-12 text-leaf-300 opacity-70" />
      <LeafSprig className="pointer-events-none absolute -bottom-10 -left-12 w-64 -rotate-[20deg] text-leaf-300 opacity-70" />

      <div className="relative z-10 mx-auto max-w-2xl px-4">
        <header className="flex items-center justify-between px-2 py-5">
          <Link to="/" className="flex items-center gap-2 font-display text-xl">
            <Leaf className="h-6 w-6 text-leaf-500" />
            Back to Being
          </Link>
          <Link to="/archive" className="text-sm text-leaf-600 hover:text-leaf-800">
            Archive
          </Link>
        </header>

        <main className="mb-16 rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-leaf-200 sm:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}