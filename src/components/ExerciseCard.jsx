// ...existing code...
import React from "react";
import { ExternalLink, Trash2 } from "lucide-react";

export default function ExerciseCard({ title, url, addedDate, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Remover exercício"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4">Adicionado em {addedDate}</p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[#1E88E5] hover:text-[#0D47A1] font-medium text-sm transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        Abrir exercício
      </a>
    </div>
  );
}
// ...existing code...