'use client';
import { useState } from "react";

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState("");
  const [recipeDetails, setRecipeDetails] = useState<{title:string; ingredients:string[]; instructions:string} | null>(null);
  const [calories, setCalories] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!ingredients.trim()) return;
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(ingredients)}&number=1&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const recipeId = data.results[0].id;
        const detailRes = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`);
        const detail = await detailRes.json();
        setRecipeDetails({
          title: detail.title,
          ingredients: detail.extendedIngredients.map((ing: any) => ing.original),
          instructions: detail.instructions || "No instructions available."
        });
        setCalories(detail.nutrition?.calories?.amount ?? null);
      } else {
        setRecipeDetails(null);
        setCalories(null);
      }
    } catch (e) {
      console.error(e);
      setRecipeDetails(null);
      setCalories(null);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Find a Recipe</h2>
      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => handleSearch()}
      >
        Search
      </button>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
        onClick={() => handleSearch("tomato soup")}
      >
        Show Tomato Soup
      </button>
      <button
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 ml-2"
        onClick={() => handleSearch("pizza")}
      >
        Show Pizza
      </button>
      {recipeDetails && (
        <div className="mt-4">
          <h3 className="text-xl font-medium">{recipeDetails.title}</h3>
          <h4 className="text-lg font-semibold mt-2">Ingredients</h4>
          <ul className="list-disc list-inside">
            {recipeDetails.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
          <h4 className="text-lg font-semibold mt-2">Instructions</h4>
          <p>{recipeDetails.instructions}</p>
          {calories !== null && <p>Calories per 100g: {calories}</p>}
        </div>
      )}
    </section>
  );
}
