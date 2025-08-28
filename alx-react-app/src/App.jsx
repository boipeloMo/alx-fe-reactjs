import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
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
        {/* The components are rendered here in the specified order */}
        <Header />
        <MainContent />
        <Footer />
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
