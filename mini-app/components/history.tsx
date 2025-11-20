'use client';
import { useState } from "react";

export default function History() {
  const [history, setHistory] = useState<string[]>([]);

  // Placeholder: load history from localStorage or API
  return (
    <section className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">Search History</h2>
      <ul className="list-disc list-inside">
        {history.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
