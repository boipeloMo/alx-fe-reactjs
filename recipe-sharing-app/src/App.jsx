// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1><Link to="/">Recipe Sharing App</Link></h1>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <AddRecipeForm />
              <RecipeList />
            </main>
          }
        />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/recipes/:id/edit" element={<EditRecipeForm />} />
        {/* 404 fallback */}
        <Route path="*" element={<div data-testid="not-found-page">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

