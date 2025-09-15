// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => String(r.id) === String(id))
  );

  if (!recipe) {
    return <div data-testid="recipe-not-found">Recipe not found</div>;
  }

  return (
    <div data-testid={`recipe-details-${id}`}>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>

      <Link to={`/recipes/${id}/edit`} data-testid={`edit-link-${id}`}>
        Edit
      </Link>
      {' | '}
      <DeleteRecipeButton id={id} />
      {' | '}
      <Link to="/" data-testid="back-link">Back</Link>
    </div>
  );
};

export default RecipeDetails;

