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
    return <div>Recipe not found</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <Link to={`/recipes/${id}/edit`}>Edit</Link>
      <DeleteRecipeButton id={id} />
      <Link to="/">Back</Link>
    </div>
  );
};

export default RecipeDetails;

