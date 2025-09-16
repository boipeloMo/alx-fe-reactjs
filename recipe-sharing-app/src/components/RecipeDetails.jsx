import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useRecipeStore from '../recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id))
  );
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  if (!recipe) return <p>Recipe not found</p>;

  const isFavorited = favorites.includes(recipe.id);

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <button
        onClick={() =>
          isFavorited ? removeFavorite(recipe.id) : addFavorite(recipe.id)
        }
      >
        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <br />
      <Link to={`/recipes/${recipe.id}/edit`}>Edit</Link>
      <DeleteRecipeButton recipeId={recipe.id} />
    </div>
  );
};

export default RecipeDetails;

