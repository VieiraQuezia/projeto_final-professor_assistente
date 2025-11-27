// src/components/exerciseMdal.jsx
import React from "react";

export default function ExerciseModal({ open, onClose, exercise }) {
  if (!open || !exercise) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{exercise.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>

        {exercise.description && (
          <pre className="whitespace-pre-wrap text-gray-700 text-sm mb-4">
            {exercise.description}
          </pre>
        )}

        {exercise.url && (
          <a
            href={exercise.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Abrir no site
          </a>
        )}

        <div className="text-xs text-gray-500 mt-4">
          Adicionado em: {exercise.addedDate}
        </div>
      </div>
    </div>
  );
}
