import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import UserDetails from './components/UserDetails'

export default function App() {
  return (
    <div>
      <header style={{padding:'1rem', borderBottom:'1px solid #eee'}}>
        <h1>GitHub User Search</h1>
        <nav><Link to="/">Home</Link></nav>
      </header>

      <main style={{padding:'1rem'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
      </main>
    </div>
  )
}
