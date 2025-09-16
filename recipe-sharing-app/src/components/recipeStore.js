import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  
  // Favorites state
  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Recommendations state
  recommendations: [],
  generateRecommendations: () =>
    set((state) => {
      // Mock logic: recommend recipes not yet favorited
      const recommended = state.recipes.filter(
        (recipe) => !state.favorites.includes(recipe.id)
      );
      return { recommendations: recommended };
    }),

  // Previous state/actions (search/filter, add/update/delete recipes)
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),
  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? updated : r)),
    })),
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  searchTerm: '',
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      ),
    })),
  filteredRecipes: [],
}));

export default useRecipeStore;
