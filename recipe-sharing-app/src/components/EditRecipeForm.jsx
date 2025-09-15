import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => r.id === Number(id))
  );
  const updateRecipe = useRecipeStore(state => state.updateRecipe);

  const [title, setTitle] = useState(recipe ? recipe.title : '');
  const [description, setDescription] = useState(recipe ? recipe.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ id: Number(id), title, description });
    navigate(`/recipes/${id}`);
  };

  if (!recipe) return <p>Recipe not found</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;

