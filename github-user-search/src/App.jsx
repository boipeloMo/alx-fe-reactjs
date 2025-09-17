import { useState } from 'react';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';
import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    // 1. Reset states before starting the search
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      // 2. Await the API call
      const userData = await fetchUserData(username);
      // 3. Set the user data on success
      setUser(userData);
    } catch (err) {
      // 4. Set an error message on failure
      setError('Looks like we can\'t find the user.');
    } finally {
      // 5. Always stop the loading state
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <Search onSearch={handleSearch} />
      
      {/* 6. The conditional rendering logic is crucial */}
      {loading && <p>Loading...</p>}
      
      {error && <p className="error">{error}</p>}
      
      {user && (
        <div className="user-profile">
          <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="100" />
          <h2>{user.name || user.login}</h2>
          <p>{user.bio || 'No bio provided.'}</p>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
