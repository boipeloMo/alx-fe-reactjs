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

  if (!recipe) {
    return (
      <p className="p-6 text-center text-gray-500">
        Loading recipe details...
      </p>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        to="/"
        className="text-blue-500 mb-4 inline-block hover:underline"
      >
        ← Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <section className="mb-6">
          <h2
