'use client';
import { useState } from "react";

export default function History() {
  const [history, setHistory] = useState<{title:string; url:string}[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recipeHistory') || '[]');
    setHistory(stored);
  }, []);
  return (
    <section className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">Search History</h2>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
        onClick={() => { localStorage.removeItem('recipeHistory'); setHistory([]); }}
      >
        Clear History
      </button>
      <ul className="list-disc list-inside">
        {history.map((item, idx) => (
          <li key={idx}>
            <button
              className="text-blue-600 hover:underline"
              onClick={() => window.dispatchEvent(new CustomEvent('loadRecipe', {detail:{url:item.url}}))}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
