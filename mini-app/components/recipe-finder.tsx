'use client';
import { useState } from "react";

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<string | null>(null);
  const [calories, setCalories] = useState<number | null>(null);

  const handleSearch = async (overrideIngredients?: string) => {
    // Placeholder: replace with real AI call
    setRecipe(`Recipe for ${overrideIngredients ?? ingredients}`);
    setCalories(250);
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
        onClick={handleSearch}
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
      {recipe && (
        <div className="mt-4">
          <h3 className="text-xl font-medium">Recipe</h3>
          <p>{recipe}</p>
          {calories !== null && <p>Calories per 100g: {calories}</p>}
        </div>
      )}
    </section>
  );
}
