import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Guide from './pages/Guide'
import Write from './pages/Write'
import Share from './pages/Share'
import Reveal from './pages/Reveal'
import Archive from './pages/Archive'
import Demo from './pages/Demo'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Guide />} />
        <Route path="/write" element={<Write />} />
        <Route path="/share" element={<Share />} />
        <Route path="/reveal" element={<Reveal />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/demo" element={<Demo />} />
      </Route>
    </Routes>
  )
}