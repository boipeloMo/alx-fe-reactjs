import React from 'react'
import { Link } from 'react-router-dom'

export default function UserCard({ user }) {
  return (
    <div style={{display:'flex', gap:'1rem', alignItems:'center', border:'1px solid #eee', padding:'0.5rem'}}>
      <img src={user.avatar_url} alt={user.login} style={{width:48, height:48, borderRadius:6}} />
      <div>
        <a href={user.html_url} target="_blank" rel="noreferrer">{user.login}</a>
        <div><Link to={`/user/${user.login}`}>View details</Link></div>
      </div>
    </div>
  )
}
