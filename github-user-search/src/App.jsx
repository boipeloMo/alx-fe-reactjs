// src/App.jsx

import { useState } from 'react';
import Search from './components/Search';
import { fetchAdvancedUserData } from './services/githubService';
import './App.css'; 

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdvancedSearch = async ({ username, location, repos }) => {
    setLoading(true);
    setError(null);
    setUsers([]);
    
    if (!username && !location && !repos) {
      setError('Please enter at least one search criterion.');
      setLoading(false);
      return;
    }

    try {
      const { items } = await fetchAdvancedUserData({ username, location, repos });
      setUsers(items);
      if (items.length === 0) {
        setError('No users found matching your criteria.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">GitHub User Search</h1>
      <Search onAdvancedSearch={handleAdvancedSearch} />
      
      {loading && <p className="text-center mt-4">Loading...</p>}
      
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      
      {users.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {users.map(user => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{user.login}</h3>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
