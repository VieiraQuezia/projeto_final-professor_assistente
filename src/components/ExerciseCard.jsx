import React from "react";
import { Trash2, ExternalLink, Download } from "lucide-react";

export default function ExerciseCard({
  title,
  url,
  description,
  summary,
  addedDate,
  isAI = false,
  onClick,      
  onDelete,
  onDownload,
}) {
  return (
    <div
      className="bg-white shadow-sm rounded-lg p-5 border border-gray-200 hover:shadow-md transition flex flex-col justify-between cursor-pointer"
      onClick={onClick} 
    >
      {/* Título */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      {/* Link */}
      {url && (
        <a
          href={url}
          target="_blank"
          onClick={(e) => e.stopPropagation()} // ← impede abrir modal
          className="text-blue-600 underline mb-3 flex items-center gap-2"
        >
          Abrir exercício
          <ExternalLink size={16} />
        </a>
      )}

      {/* Prévia SOMENTE para IA */}
      {isAI && summary && (
        <p className="text-sm text-gray-700 mb-3 whitespace-pre-line line-clamp-3">
          {summary}
        </p>
      )}

      {/* Data */}
      <p className="text-sm text-gray-500 mb-4">
        Adicionado em: <strong>{addedDate}</strong>
      </p>

      {/* Botões SOMENTE IA */}
      {isAI && (
        <div className="flex justify-center gap-4 pt-2">
          {/* PDF */}
          {description && (
            <button
              onClick={(e) => {
                e.stopPropagation();  // ← impede abrir modal
                onDownload();
              }}
              className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Download size={16} />
              PDF
            </button>
          )}

          {/* Excluir */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // ← impede abrir modal
              onDelete();
            }}
            className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 size={16} />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
