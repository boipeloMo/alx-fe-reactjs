import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';

export function DeleteRecipeButton({ id }) {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  function handleClick() {
    deleteRecipe(id);
    navigate('/');
  }

  return <button onClick={handleClick}>Delete Recipe</button>;
}
