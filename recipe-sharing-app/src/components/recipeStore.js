// src/components/recipeStore.js
import create from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  setRecipes: (recipes) => set({ recipes }),

  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        String(r.id) === String(updatedRecipe.id) ? { ...r, ...updatedRecipe } : r
      ),
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => String(r.id) !== String(id)),
    })),
}));

