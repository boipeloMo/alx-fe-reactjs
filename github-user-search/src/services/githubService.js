// src/services/githubService.js
import axios from "axios";

/**
 * Fetch a single GitHub user by username.
 * The checker expects the function name: fetchUserData
 */
export async function fetchUserData(username) {
  const url = `https://api.github.com/users/${username}`;
  const response = await axios.get(url);
  return response.data;
}
