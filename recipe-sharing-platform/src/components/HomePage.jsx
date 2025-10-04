<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {recipes.map((recipe) => (
    <div
      key={recipe.id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform p-4"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <p className="text-gray-600">{recipe.summary}</p>
      <a
        href={`/recipe/${recipe.id}`}
        className="text-blue-500 mt-3 inline-block hover:underline"
      >
        View Details →
      </a>
    </div>
  ))}
</div>
