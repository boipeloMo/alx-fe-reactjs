import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updated.id ? updated : r
      ),
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),

  // Search and filtering state
  searchTerm: '',
  setSearchTerm: (term) =>
    set((state) => ({ searchTerm: term, filteredRecipes: state.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    ) })),
  filteredRecipes: [],
}));

export default useRecipeStore;

