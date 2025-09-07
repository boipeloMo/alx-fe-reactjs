const MainContent = () => {
  const cities = ['London', 'Paris', 'Tokyo', 'New York', 'Sydney'];
  return (
    <main style={{
      padding: '2rem',
      backgroundColor: '#ecf0f1',
      minHeight: '400px',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '1.5rem' }}>Some of My Favorite Cities</h2>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 auto',
        maxWidth: '600px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {cities.map((city, index) => (
          <li key={index} style={{
            backgroundColor: 'white',
            border: '1px solid #bdc3c7',
            borderRadius: '8px',
            padding: '15px',
            margin: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            width: 'calc(50% - 20px)',
            transition: 'transform 0.2s ease-in-out',
          }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
             onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            {city}
          </li>
        ))}
      </ul>
    </main>
  );
};

