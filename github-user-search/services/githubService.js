import axios from 'axios'

const token = import.meta.env.VITE_APP_GITHUB_API_KEY

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: token ? { Authorization: `token ${token}` } : undefined
})

export async function searchUsers(q) {
  const res = await api.get('/search/users', { params: { q } })
  return res.data
}

export async function getUser(username) {
  const res = await api.get(`/users/${username}`)
  return res.data
}
