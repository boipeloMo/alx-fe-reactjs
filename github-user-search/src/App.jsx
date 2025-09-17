import { useState } from 'react';
import { getGitHubUser } from './services/githubService';
import SearchForm from './components/SearchForm';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const userData = await getGitHubUser(username);
      setUser(userData);
    } catch (err) {
      setError('Could not find that user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <UserProfile user={user} />
    </div>
  );
}

export default App;
