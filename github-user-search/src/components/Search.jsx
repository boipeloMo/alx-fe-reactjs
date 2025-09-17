import React, { useState } from 'react'

export default function Search({ onSearch }) {
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!q.trim()) return
    onSearch(q.trim())
  }

  return (
    <form onSubmit={submit} style={{marginBottom:'1rem'}}>
      <input
        data-testid="search-input"
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="Search GitHub users"
        aria-label="search-input"
      />
      <button type="submit" data-testid="search-button">Search</button>
    </form>
  )
}
