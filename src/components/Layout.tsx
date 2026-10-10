import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <header className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-lg font-medium">
          Back to Being
        </Link>
        <Link to="/archive" className="text-sm text-stone-500 hover:text-stone-800">
          Archive
        </Link>
      </header>
      <main className="mx-auto max-w-2xl px-6 pb-16">
        <Outlet />
      </main>
    </div>
  )
}