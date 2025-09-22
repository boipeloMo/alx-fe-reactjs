# overwrite App.jsx with a minimal file that renders the component
cat > src/App.jsx << 'EOF'
import React from 'react';
import UserProfile from "./components/UserProfile";

export default function App() {
  return <UserProfile />;
}

