import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from '../recipeStore';
import { EditRecipeForm } from './EditRecipeForm';
import { DeleteRecipeButton } from './DeleteRecipeButton';

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
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton id={recipeId} />
    </div>
  );
}

