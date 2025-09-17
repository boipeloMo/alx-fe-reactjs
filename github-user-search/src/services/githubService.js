import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    // This is the key part to check.
    // Ensure you throw an error to be caught by the calling function.
    throw new Error('User not found or an API error occurred.');
  }
};
