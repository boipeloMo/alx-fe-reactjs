import { create } from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [
    { id: 1, title: 'Classic Spaghetti', description: 'A timeless pasta dish with a rich tomato sauce.', ingredients: 'Pasta, Tomatoes, Onion, Garlic, Ground Meat' },
    { id: 2, title: 'Vegetable Stir-Fry', description: 'A quick and healthy stir-fry with your favorite vegetables.', ingredients: 'Broccoli, Carrots, Bell Peppers, Soy Sauce, Rice' },
  ],
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (id) => set(state => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  updateRecipe: (updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
}));

export default useRecipeStore;

