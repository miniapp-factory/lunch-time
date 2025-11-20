'use client';
import { useState } from "react";

export default function PdfExport() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleExport = async () => {
    // Placeholder: generate PDF and set URL
    setPdfUrl("#");
  };

  return (
    <section className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">Export Recipe</h2>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={handleExport}
      >
        Export as PDF
      </button>
      {pdfUrl && (
        <div className="mt-4">
          <a href={pdfUrl} download="recipe.pdf" className="text-blue-600 underline">
            Download PDF
          </a>
        </div>
      )}
    </section>
  );
}
