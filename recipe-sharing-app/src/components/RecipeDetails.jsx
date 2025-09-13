import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import { DeleteRecipeButton } from './DeleteRecipeButton';
import { EditRecipeForm } from './EditRecipeForm';

export function RecipeDetails() {
  const { id } = useParams();
  const recipeId = Number(id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === recipeId)
  );

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <Link to="/">Back to list</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      <h3>Edit</h3>
      <EditRecipeForm recipe={recipe} />

      <DeleteRecipeButton id={recipeId} />

      <p>
        <Link to="/">Back to list</Link>
      </p>
    </div>
  );
}
