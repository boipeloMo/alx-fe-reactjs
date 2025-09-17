import axios from 'axios';

const GITHUB_SEARCH_API_URL = 'https://api.github.com/search/users';

export const fetchAdvancedUserData = async ({ username, location, repos }) => {
  try {
    // Construct the query string
    let query = username;
    if (location) {
      query += `+location:${location}`;
    }
    if (repos) {
      query += `+repos:>=${repos}`;
    }

    const response = await axios.get(`${GITHUB_SEARCH_API_URL}?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw new Error('Search failed. Please try again.');
  }
};
