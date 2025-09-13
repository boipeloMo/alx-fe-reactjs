import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

export function DeleteRecipeButton({ id }) {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  function handleDelete() {
    deleteRecipe(id);
    navigate('/'); // go back to list after deletion
  }

  return <button onClick={handleDelete}>Delete Recipe</button>;
}
