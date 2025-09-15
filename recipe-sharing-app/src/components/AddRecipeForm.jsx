// src/components/AddRecipeForm.jsx
import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newRecipe = {
      id: Date.now().toString(), // string id for consistency with router params
      title: title.trim(),
      description: description.trim(),
    };
    addRecipe(newRecipe);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} data-testid="add-recipe-form">
      <input
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        data-testid="add-title"
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        data-testid="add-description"
      />
      <button type="submit" data-testid="add-submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;

