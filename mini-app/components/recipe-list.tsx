'use client';
import { useState } from "react";

type Recipe = {
  name: string;
  ingredients: string[];
  steps: string[];
  time: number;
  difficulty: "easy" | "medium";
};

const sampleRecipes: Recipe[] = [
  {
    name: "Spaghetti Aglio e Olio",
    ingredients: ["spaghetti", "olive oil", "garlic", "red pepper flakes", "parsley"],
    steps: [
      "Cook spaghetti until al dente.",
      "Sauté garlic and pepper flakes in olive oil.",
      "Toss spaghetti with garlic oil.",
      "Add parsley and serve."
    ],
    time: 15,
    difficulty: "easy"
  },
  {
    name: "Tomato Basil Soup",
    ingredients: ["tomatoes", "olive oil", "onion", "garlic", "basil"],
    steps: [
      "Sauté onion and garlic.",
      "Add tomatoes and cook.",
      "Blend until smooth.",
      "Add basil and serve."
    ],
    time: 25,
    difficulty: "easy"
  },
  {
    name: "Pancakes",
    ingredients: ["flour", "milk", "egg", "baking powder", "salt"],
    steps: [
      "Mix dry ingredients.",
      "Add milk and eggs.",
      "Stir until smooth.",
      "Cook on griddle."
    ],
    time: 20,
    difficulty: "easy"
  },
  {
    name: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheddar cheese", "butter"],
    steps: [
      "Butter bread.",
      "Place cheese between slices.",
      "Grill until golden."
    ],
    time: 10,
    difficulty: "easy"
  },
  {
    name: "Stir‑Fry Veggies",
    ingredients: ["broccoli", "carrot", "bell pepper", "soy sauce", "garlic"],
    steps: [
      "Chop veggies.",
      "Stir‑fry garlic.",
      "Add veggies and soy sauce.",
      "Cook until tender."
    ],
    time: 15,
    difficulty: "easy"
  },
  {
    name: "Omelette",
    ingredients: ["egg", "milk", "cheddar cheese", "salt", "pepper"],
    steps: [
      "Beat eggs with milk.",
      "Pour into pan.",
      "Add cheese.",
      "Fold and serve."
    ],
    time: 10,
    difficulty: "easy"
  },
  {
    name: "Fruit Salad",
    ingredients: ["apple", "banana", "orange", "honey"],
    steps: [
      "Chop fruits.",
      "Mix with honey.",
      "Serve chilled."
    ],
    time: 5,
    difficulty: "easy"
  },
  {
    name: "Caprese Salad",
    ingredients: ["tomato", "mozzarella", "basil", "olive oil", "salt"],
    steps: [
      "Slice tomato and mozzarella.",
      "Arrange on plate.",
      "Add basil and drizzle oil.",
      "Season with salt."
    ],
    time: 10,
    difficulty: "easy"
  },
  {
    name: "Peanut Butter Toast",
    ingredients: ["bread", "peanut butter", "banana"],
    steps: [
      "Toast bread.",
      "Spread peanut butter.",
      "Top with banana slices."
    ],
    time: 5,
    difficulty: "easy"
  }
];

export default function RecipeList() {
  const [recipes] = useState(sampleRecipes);
  return (
    <section className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">Recipe List</h2>
      <ul className="space-y-4">
        {recipes.map((r, idx) => (
          <li key={idx} className="border p-4 rounded">
            <h3 className="text-xl font-medium">{r.name}</h3>
            <p className="text-sm text-muted-foreground">
              Time: {r.time} min | Difficulty: {r.difficulty}
            </p>
            <p className="mt-2"><strong>Ingredients:</strong> {r.ingredients.join(", ")}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
