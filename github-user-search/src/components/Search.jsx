import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username.trim());
      setUser(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <input
          data-testid="search-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit" data-testid="search-button">
          Search
        </button>
      </form>

      {/* API request handling */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && (
        <div data-testid="search-result">
          <img
            src={user.avatar_url}
            alt={user.login}
            width={100}
            height={100}
          />
          <h2>{user.login}</h2>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

