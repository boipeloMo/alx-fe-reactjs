import React from 'react';
import useRecipeStore from '../recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) => state.recipes.find((r) => r.id === id))
  );

  if (favorites.length === 0) return <p>No favorites yet.</p>;

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map((recipe) => (
        <div key={recipe.id} style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
          <Link to={`/recipes/${recipe.id}`}><h3>{recipe.title}</h3></Link>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
