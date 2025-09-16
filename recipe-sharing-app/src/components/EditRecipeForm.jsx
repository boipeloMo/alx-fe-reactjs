import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const EditRecipeForm = ({ recipe, onSave }) => {
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const navigate = useNavigate();
  const [editedTitle, setEditedTitle] = useState(recipe.title);
  const [editedDescription, setEditedDescription] = useState(recipe.description);
  const [editedIngredients, setEditedIngredients] = useState(recipe.ingredients);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRecipe({
      id: recipe.id,
      title: editedTitle,
      description: editedDescription,
      ingredients: editedIngredients,
    });
    onSave(); // Close the form
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Description"
          required
          rows="3"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={editedIngredients}
          onChange={(e) => setEditedIngredients(e.target.value)}
          placeholder="Ingredients"
          required
          rows="2"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onSave} // Cancel button
            className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

