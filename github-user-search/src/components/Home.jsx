import React, { useState } from 'react'
import Search from './Search'
import UserCard from './UserCard'
import { searchUsers } from '../services/githubService'

export default function Home() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (query) => {
    setLoading(true)
    setError('')
    try {
      const res = await searchUsers(query)
      setResults(res.items || [])
    } catch (err) {
      setError(err?.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Search onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <div style={{display:'grid', gap:'1rem', marginTop: '1rem'}}>
        {results.map(user => <UserCard key={user.login} user={user} />)}
      </div>
    </div>
  )
}
