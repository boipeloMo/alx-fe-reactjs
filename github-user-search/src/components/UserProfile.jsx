const UserProfile = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} width="100" />
      <h2>{user.name || user.login}</h2>
      <p>{user.bio}</p>
      <p>
        <strong>Followers:</strong> {user.followers} | 
        <strong>Following:</strong> {user.following}
      </p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        View Profile on GitHub
      </a>
    </div>
  );
};

export default UserProfile;
