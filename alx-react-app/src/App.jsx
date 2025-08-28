mport React from 'react';
import { useState } from 'react';

function Header() {
  return (
    <header>
      <h1>My Favorite Cities</h1>
    </header>
  );
}

function MainContent() {
  return (
    <main>
      <p>I love to visit New York, Paris, and Tokyo.</p>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <p>© 2023 City Lovers</p>
    </footer>
  );
}

function UserProfile(props) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      margin: '1rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{props.name}</h2>
      <p style={{ color: '#4b5563', marginBottom: '0.25rem' }}>Age: {props.age}</p>
      <p style={{ fontStyle: 'italic', color: '#6b7280' }}>Bio: {props.bio}</p>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f3f4f6',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '2rem',
        marginBottom: '1.5rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        <Header />
        <MainContent />
        <Footer />
        
        {/* Render the UserProfile component with props */}
        <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      </div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '2rem',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginBottom: '1rem'
          }}
        >
          count is {count}
        </button>
        <p style={{ color: '#6b7280' }}>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p style={{
        color: '#6b7280',
        marginTop: '1.5rem',
        fontSize: '0.875rem'
      }}>
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;





      
    
