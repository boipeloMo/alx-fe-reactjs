import React from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css'; // Optional: for styling

function App() {
  return (
    <div className="App">
      <header>
        <h1>Recipe Sharing Application</h1>
      </header>
      <main>
        <div className="container">
          <AddRecipeForm />
          <RecipeList />
        </div>
      </main>
    </div>
  );
}

export default App;
