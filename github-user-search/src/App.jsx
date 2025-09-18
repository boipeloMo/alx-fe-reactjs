import { useState } from 'react';
import Search from './components/Search';
import { fetchUserData } from './services/githubService';
import './App.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    // Step 1: Reset all states
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      // Step 2 & 3: API call and state update
      const userData = await fetchUserData(username);
      setUser(userData);
    } catch (err) {
      // Step 4: Handle API error
      setError('Looks like we can\'t find the user.');
    } finally {
      // Step 5: Stop loading
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <Search onSearch={handleSearch} />
      
      {/* Step 6: Conditional Rendering */}
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
