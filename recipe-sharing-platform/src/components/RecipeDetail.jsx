import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((r) => r.id === parseInt(id));
        setRecipe(selected);
      })
      .catch((err) => console.error("Error loading recipe:", err));
  }, [id]);

  if (!recipe) return <p className="p-6">Loading recipe...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
  <Link to="/" className="text-blue-500 mb-4 inline-block hover:underline">
    ← Back to Home
  </Link>

  <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

  <img
    src={recipe.image}
    alt={recipe.title}
    className="w-full h-64 object-cover rounded-lg mb-6"
  />

  <section className="mb-6">
    <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
    <ul className="list-disc list-inside text-gray-700">
      {recipe.ingredients.map((ing, idx) => (
        <li key={idx}>{ing}</li>
      ))}
    </ul>
  </section>

  <section>
    <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
    <ol className="list-decimal list-inside text-gray-700">
      {recipe.instructions.map((step, idx) => (
        <li key={idx}>{step}</li>
      ))}
    </ol>
  </section>
</div>


    </div>
  );
}

export default RecipeDetail;
