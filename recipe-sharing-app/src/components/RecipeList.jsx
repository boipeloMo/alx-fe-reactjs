// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);

  if (!recipes || recipes.length === 0) {
    return <div data-testid="no-recipes">No recipes yet</div>;
  }

  return (
    <div data-testid="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} data-testid={`recipe-${recipe.id}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <div>
            <Link to={`/recipes/${recipe.id}`} data-testid={`view-${recipe.id}`}>View</Link>
            {' | '}
            <Link to={`/recipes/${recipe.id}/edit`} data-testid={`edit-${recipe.id}`}>Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
