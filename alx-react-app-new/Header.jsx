import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      textAlign: 'center',
      padding: '2rem 0',
      borderBottom: '5px solid #3498db'
    }}>
      <h1 style={{ margin: 0, fontSize: '2.5rem' }}>My Favorite Cities</h1>
    </header>
  );
};

export default Header;

