// src/components/EditRecipeForm.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = useRecipeStore((s) =>
    s.recipes.find((r) => String(r.id) === String(id))
  );

  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setDescription(recipe.description || '');
    }
  }, [recipe]);

  if (!recipe) {
    return <div data-testid="edit-not-found">Recipe not found</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe({ id: recipe.id, title: title.trim(), description: description.trim() });
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit} data-testid={`edit-form-${id}`}>
      <input
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        data-testid="edit-title"
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        data-testid="edit-description"
      />
      <button type="submit" data-testid="edit-submit">Save</button>
    </form>
  );
};

export default EditRecipeForm;
