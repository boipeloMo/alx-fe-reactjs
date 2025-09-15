// recipe-sharing-app/src/components/RecipeList.jsx
import React from 'react';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  if (!recipes || recipes.length === 0) {
    return <div data-testid="no-recipes">No recipes yet</div>;
  }

  return (
    <div data-testid="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} data-testid={`recipe-${recipe.id}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
