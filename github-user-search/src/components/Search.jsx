// src/components/Search.jsx
import React, { useState } from "react";
import { fetchUsers, fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]); // full user detail objects
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 10;

  const fetchFullDetails = async (items) => {
    // items is array of { login, ... }
    const logins = items.map((it) => it.login);
    const promises = logins.map((login) => fetchUserData(login));
    const full = await Promise.all(promises);
    return full; // array of full user objects
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUsers([]);
    setPage(1);
    setTotalCount(0);

    try {
      
      const isSingleLookup = username.trim() && !location.trim() && !minRepos;
      if (isSingleLookup) {
        try {
          const user = await fetchUserData(username.trim());
          setUsers([user]);
          setTotalCount(1);
          return;
        } catch (err) {
          
          setError("Looks like we cant find the user");
          return;
        } finally {
          setLoading(false);
        }
      }

      // Advanced search using search API
      const searchRes = await fetchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? String(minRepos) : "",
        page: 1,
        per_page: perPage,
      });

      if (!searchRes.items || searchRes.items.length === 0) {
        setError("Looks like we cant find the user");
        setLoading(false);
        return;
      }

      const fullDetails = await fetchFullDetails(searchRes.items);
      setUsers(fullDetails);
      setTotalCount(searchRes.total_count || 0);
      setPage(1);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loading) return;
    const nextPage = page + 1;
    setLoading(true);
    setError("");

    try {
      const searchRes = await fetchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? String(minRepos) : "",
        page: nextPage,
        per_page: perPage,
      });

      if (!searchRes.items || searchRes.items.length === 0) {
        setError("Looks like we cant find the user");
        setLoading(false);
        return;
      }

      const fullDetails = await fetchFullDetails(searchRes.items);
      setUsers((prev) => [...prev, ...fullDetails]);
      setPage(nextPage);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GitHub Advanced User Search</h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 sm:grid-cols-4 items-end bg-white p-4 rounded shadow"
      >
        <div className="sm:col-span-2">
          <label className="block text-sm">Username</label>
          <input
            data-testid="search-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username (exact) or partial"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Location</label>
          <input
            data-testid="location-input"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. San Francisco"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Min repos</label>
          <input
            data-testid="minrepos-input"
            type="number"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="sm:col-span-4">
          <button
            data-testid="search-button"
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {users.length > 0 && (
          <div data-testid="search-result" className="space-y-4">
            {users.map((u, i) => (
              <div
                key={u.id || u.login || i}
                data-testid="user-item"
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded shadow"
              >
                <img
                  data-testid="result-avatar"
                  src={u.avatar_url}
                  alt={u.login}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <div>
                  <h2 data-testid="result-username" className="font-semibold">
                    {u.login}
                  </h2>
                  <p data-testid="result-location">
                    {u.location ? u.location : "Location not shown"}
                  </p>
                  <p data-testid="result-repos">Repos: {u.public_repos ?? "N/A"}</p>
                  <a
                    data-testid="result-profile-link"
                    href={u.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
           
            {users.length < totalCount && (
              <div className="text-center mt-4">
                <button
                  data-testid="load-more-button"
                  onClick={handleLoadMore}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
