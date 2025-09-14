import React, { useState, useMemo, useEffect } from 'react';

// Tailwind CSS CDN - All styling is handled via Tailwind classes
// This is necessary for the single-file setup
// No external CSS files are needed.

/**
 * A custom hook to simulate a Zustand store.
 * In a real-world app, this would be a separate Zustand file.
 * This approach keeps the code self-contained for the single-file app.
 */
const useStore = () => {
  const [recipes, setRecipes] = useState(JSON.parse(localStorage.getItem('recipes')) || [
    {
      id: '1',
      title: 'Classic Spaghetti Carbonara',
      description: 'A creamy, rich, and simple Italian pasta dish. Made with egg, hard cheese, cured pork, and black pepper.',
      ingredients: ['300g Spaghetti', '150g Guanciale (or Pancetta)', '2 large Eggs', '50g Pecorino Romano', '50g Parmesan', 'Black Pepper'],
      instructions: [
        'Cook the spaghetti in salted water.',
        'Meanwhile, finely slice the guanciale and fry in a pan until crisp.',
        'In a bowl, beat the eggs and whisk in the grated cheeses and plenty of black pepper.',
        'Drain the spaghetti, reserving some pasta water. Immediately add the hot pasta to the guanciale pan.',
        'Remove from heat, add the egg mixture, and toss quickly. Add a little reserved pasta water to create a creamy sauce. Serve immediately.'
      ]
    },
    {
      id: '2',
      title: 'Simple Tomato Soup',
      description: 'A comforting and easy-to-make tomato soup, perfect for a rainy day.',
      ingredients: ['1 tbsp Olive Oil', '1 Onion, chopped', '2 cloves Garlic, minced', '800g canned tomatoes', '500ml Vegetable Broth', 'Salt and Pepper', 'Fresh Basil'],
      instructions: [
        'Heat olive oil in a pot over medium heat. Sauté onion until soft.',
        'Add garlic and cook for 1 minute until fragrant.',
        'Stir in the canned tomatoes and vegetable broth. Season with salt and pepper.',
        'Bring to a boil, then reduce heat and simmer for 15 minutes.',
        'Use an immersion blender to blend the soup until smooth. Stir in fresh basil before serving.'
      ]
    }
  ]);

  // Sync state to local storage to persist data across reloads
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const actions = useMemo(() => ({
    addRecipe: (recipe) => {
      setRecipes((currentRecipes) => [...currentRecipes, { ...recipe, id: crypto.randomUUID() }]);
    },
    deleteRecipe: (id) => {
      setRecipes((currentRecipes) => currentRecipes.filter((recipe) => recipe.id !== id));
    },
    updateRecipe: (updatedRecipe) => {
      setRecipes((currentRecipes) =>
        currentRecipes.map((recipe) =>
          recipe.id === updatedRecipe.id ? { ...recipe, ...updatedRecipe } : recipe
        )
      );
    },
    getRecipeById: (id) => {
      return recipes.find(r => r.id === id);
    }
  }), [recipes]);

  return { recipes, ...actions };
};

/**
 * The main application component.
 * All other components are rendered conditionally within this one.
 */
const App = () => {
  const { recipes, addRecipe, deleteRecipe, updateRecipe, getRecipeById } = useStore();
  const [currentView, setCurrentView] = useState('list');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSelectRecipe = (id) => {
    setSelectedRecipeId(id);
    setCurrentView('details');
  };

  const handleEditRecipe = (id) => {
    setSelectedRecipeId(id);
    setCurrentView('edit');
  };

  const handleReturnToList = () => {
    setCurrentView('list');
    setSelectedRecipeId(null);
  };

  const selectedRecipe = getRecipeById(selectedRecipeId);

  // Home Screen: List of all recipes
  const RecipeList = () => (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleSelectRecipe(recipe.id)}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{recipe.title}</h2>
              <p className="text-gray-600 line-clamp-2">{recipe.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recipes added yet. Let's create one!</p>
        )}
      </div>
      <button
        onClick={() => setCurrentView('add')}
        className="mt-8 px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
      >
        Add New Recipe
      </button>
    </div>
  );

  // Component to display a single recipe's details
  const RecipeDetails = () => (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={handleReturnToList}
        className="mb-6 text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Recipes
      </button>
      {selectedRecipe ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{selectedRecipe.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{selectedRecipe.description}</p>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700">
              {selectedRecipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="mb-1">{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-700">
              {selectedRecipe.instructions?.map((instruction, index) => (
                <li key={index} className="mb-2">{instruction}</li>
              ))}
            </ol>
          </div>
          
          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => handleEditRecipe(selectedRecipe.id)}
              className="px-6 py-3 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600 transition-colors duration-300"
            >
              Edit Recipe
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this recipe?')) {
                  deleteRecipe(selectedRecipe.id);
                  handleReturnToList();
                }
              }}
              className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300"
            >
              Delete Recipe
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Recipe not found.</p>
      )}
    </div>
  );

  // Form to add a new recipe
  const AddRecipeForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const newRecipe = {
        title,
        description,
        ingredients: ingredients.split('\n').map(s => s.trim()).filter(s => s),
        instructions: instructions.split('\n').map(s => s.trim()).filter(s => s)
      };
      addRecipe(newRecipe);
      handleReturnToList();
    };

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <button
          onClick={handleReturnToList}
          className="mb-6 text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Recipes
        </button>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Recipe</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">Ingredients (one per line)</label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instructions" className="block text-gray-700 font-semibold mb-2">Instructions (one per line)</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
            >
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Form to edit an existing recipe
  const EditRecipeForm = () => {
    const [title, setTitle] = useState(selectedRecipe.title);
    const [description, setDescription] = useState(selectedRecipe.description);
    const [ingredients, setIngredients] = useState(selectedRecipe.ingredients.join('\n'));
    const [instructions, setInstructions] = useState(selectedRecipe.instructions.join('\n'));

    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedRecipe = {
        id: selectedRecipe.id,
        title,
        description,
        ingredients: ingredients.split('\n').map(s => s.trim()).filter(s => s),
        instructions: instructions.split('\n').map(s => s.trim()).filter(s => s)
      };
      updateRecipe(updatedRecipe);
      handleReturnToList();
    };

    return (
      <div className="p-8 max-w-2xl mx-auto">
        <button
          onClick={() => setCurrentView('details')}
          className="mb-6 text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Cancel
        </button>
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Recipe: {selectedRecipe.title}</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ingredients" className="block text-gray-700 font-semibold mb-2">Ingredients (one per line)</label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instructions" className="block text-gray-700 font-semibold mb-2">Instructions (one per line)</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Main render logic
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased text-gray-800">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="container mx-auto py-10">
        {currentView === 'list' && <RecipeList />}
        {currentView === 'details' && <RecipeDetails />}
        {currentView === 'add' && <AddRecipeForm />}
        {currentView === 'edit' && <EditRecipeForm />}
      </div>
    </div>
  );
};

export default App;
