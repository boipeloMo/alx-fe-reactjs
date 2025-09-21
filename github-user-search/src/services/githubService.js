// src/services/githubService.js
import axios from "axios";

const token = import.meta.env.VITE_APP_GITHUB_API_KEY;

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: token ? { Authorization: `token ${token}` } : undefined,
});

export async function fetchUserData(username) {
  if (!username) throw new Error("username required");
  const response = await api.get(`/users/${username}`);
  return response.data;
}

export async function fetchUsers({
  username = "",
  location = "",
  minRepos = "",
  page = 1,
  per_page = 30,
} = {}) {
  const parts = [];
  if (username) parts.push(username);
  if (location) parts.push(`location:${location}`);
  if (minRepos) parts.push(`repos:>=${minRepos}`);
  const q = parts.join(" ").trim() || "";

  // call search/users endpoint
  const response = await api.get("/search/users", {
    params: {
      q,
      page,
      per_page,
    },
  });

  return {
    items: response.data.items || [],
    total_count: response.data.total_count || 0,
  };
}
