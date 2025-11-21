'use client';
import { useState } from "react";

export default function RecipeFinder() {
  const [ingredients, setIngredients] = useState("");
  const [recipeDetails, setRecipeDetails] = useState<{title:string; ingredients:string[]; instructions:string} | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  const handleSearch = async (overrideIngredients?: string) => {
    const query = overrideIngredients ?? ingredients;
    if (!query.trim()) return;
    try {
      const searchUrl = `https://www.allrecipes.com/search/results/?wt=${encodeURIComponent(query)}&sort=re`;
      const pageRes = await fetch(searchUrl);
      const pageText = await pageRes.text();
      const recipeLinkMatch = pageText.match(/<a href="([^"]+)" class="card__titleLink"/);
      if (recipeLinkMatch) {
        const recipeUrl = recipeLinkMatch[1];
        const recipeRes = await fetch(recipeUrl);
        const recipeHtml = await recipeRes.text();
        const titleMatch = recipeHtml.match(/<h1[^>]*>([^<]+)<\/h1>/);
        const ingredientsMatch = [...recipeHtml.matchAll(/<span class="ingredients-item-name">([^<]+)<\/span>/g)];
        const instructionsMatch = [...recipeHtml.matchAll(/<li class="subcontainer instructions-section-item">[\s\S]*?<p>([^<]+)<\/p>/g)];
        setRecipeDetails({
          title: titleMatch ? titleMatch[1].trim() : "Unknown",
          ingredients: ingredientsMatch.map(m => m[1].trim()),
          instructions: instructionsMatch.map(m => m[1].trim()).join("\n")
        });
        setCalories(null);
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
      <button
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 ml-2"
        onClick={() => setShowReceipt(!showReceipt)}
      >
        {showReceipt ? "Hide Receipt" : "Show Receipt"}
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
      {showReceipt && recipeDetails && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">Receipt</h3>
          <p><strong>Ingredients:</strong></p>
          <ul className="list-disc list-inside mb-2">
            {recipeDetails.ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
          <p><strong>Instructions:</strong></p>
          <p>{recipeDetails.instructions}</p>
        </div>
      )}
    </section>
  );
}
