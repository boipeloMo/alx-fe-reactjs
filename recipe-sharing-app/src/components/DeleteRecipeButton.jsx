// src/components/DeleteRecipeButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ id }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    // delete and go back to list — keep it simple for automated tests
    deleteRecipe(id);
    navigate('/');
  };

  return (
    <button onClick={handleDelete} data-testid={`delete-${id}`}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
