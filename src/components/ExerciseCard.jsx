// src/components/ExerciseCard.jsx
import React from "react";
import { Download } from "lucide-react";

export default function ExerciseCard({
  id,
  title,
  url,
  description,
  addedDate,
  isAI,
  onClick,
  onDelete,
  onDownload, // ← função recebida para baixar PDF
}) {
  return (
    <div
      className={`border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer ${
        isAI ? "bg-blue-50" : "bg-white"
      }`}
      onClick={onClick}
    >
      {/* Título */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

     
      </div>

      {/* Descrição (somente nos cards IA) */}
      {description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-4">
          {description}
        </p>
      )}

      {/* Botões */}
      <div className="flex flex-col gap-2">

        {/* 🔵 Cards padrão (sem IA): Botão Abrir exercício */}
        {!isAI && url && (
          <a
            href={url}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-[#80b3ff] rounded-md text-sm"
          >
            Abrir exercício
          </a>
        )}

        {/* 🟢 Cards IA: Botão Baixar PDF */}
        {isAI && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onDownload) onDownload();
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          >
            <Download size={16} />
            Baixar PDF
          </button>
        )}

        <span className="text-xs text-gray-500 mt-2">
          Adicionado em: {addedDate}
        </span>
      </div>
    </div>
  );
}
