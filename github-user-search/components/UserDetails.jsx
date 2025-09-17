import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../services/githubService'

export default function UserDetails() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username) return
    setLoading(true)
    getUser(username)
      .then(data => setUser(data))
      .catch(err => setError(err?.message || 'Failed to fetch'))
      .finally(() => setLoading(false))
  }, [username])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{color:'red'}}>{error}</p>
  if (!user) return <p>No user found</p>

  return (
    <div>
      <h2>{user.login}</h2>
      <img src={user.avatar_url} alt={user.login} style={{width:150, borderRadius:8}} />
      <p>{user.bio}</p>
      <p>Repos: {user.public_repos} • Followers: {user.followers}</p>
      <p><a href={user.html_url} target="_blank" rel="noreferrer">Open on GitHub</a></p>
    </div>
  )
}
