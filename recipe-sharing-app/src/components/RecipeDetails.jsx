// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => String(r.id) === String(id))
  );

  if (!recipe) {
    return <div data-testid="recipe-not-found">Recipe not found</div>;
  }

  return (
    <div data-testid={`recipe-details-${id}`}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <div>
        <Link to={`/recipes/${id}/edit`} data-testid={`details-edit-${id}`}>Edit</Link>
        {' | '}
        <DeleteRecipeButton id={id} />
        {' | '}
        <Link to="/" data-testid="back-to-list">Back</Link>
      </div>
    </div>
  );
};

export default RecipeDetails;
