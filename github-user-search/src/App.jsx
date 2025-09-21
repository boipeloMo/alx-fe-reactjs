import { useState } from 'react';

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="w-full max-w-lg mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200 animate-fade-in">
      <div className="flex items-center space-x-6 mb-6">
        <img
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md transform transition-transform duration-300 hover:scale-105"
          src={user.avatarUrl}
          alt={`${user.login}'s avatar`}
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name || user.login}</h2>
          <p className="text-xl text-gray-500 font-medium mt-1">@{user.login}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-6">{user.bio || 'No bio available.'}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 p-4 rounded-xl shadow-inner transform transition-transform duration-200 hover:scale-105">
          <p className="text-xl font-bold text-blue-600">{user.followers.totalCount}</p>
          <p className="text-sm text-gray-500">Followers</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl shadow-inner transform transition-transform duration-200 hover:scale-105">
          <p className="text-xl font-bold text-blue-600">{user.following.totalCount}</p>
          <p className="text-sm text-gray-500">Following</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl shadow-inner transform transition-transform duration-200 hover:scale-105">
          <p className="text-xl font-bold text-blue-600">{user.repositories.totalCount}</p>
          <p className="text-sm text-gray-500">Repositories</p>
        </div>
      </div>

      <a
        href={user.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-6 w-full text-center bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
      >
        View Profile on GitHub
      </a>
    </div>
  );
};

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  const onSearch = async (e) => {
    e.preventDefault();
    if (!username) {
      setError('Please enter a username.');
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    const query = `
      query {
        user(login: "${username}") {
          name
          login
          avatarUrl
          bio
          location
          url
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories(first: 100, isFork: false) {
            totalCount
          }
        }
      }
    `;

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_GITHUB_TOKEN`, // Replace with your GitHub token
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      
      if (result.data && result.data.user) {
        setUserData(result.data.user);
      } else {
        setError('User not found or an error occurred.');
      }
      
    } catch (err) {
      setError('Failed to fetch data. Please check your network connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          GitHub User Search
        </h1>
        
        {/* Search component logic */}
        <form onSubmit={onSearch} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="text"
            className="w-full sm:w-80 p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Enter a GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="w-full sm:w-auto p-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex justify-center">
          {loading && <p className="text-blue-600 font-semibold">Loading...</p>}
          {error && <p className="text-red-600 font-semibold">{error}</p>}
          {userData && !loading && !error && <Profile user={userData} />}
        </div>
      </div>
    </div>
  );
};

export default App;
