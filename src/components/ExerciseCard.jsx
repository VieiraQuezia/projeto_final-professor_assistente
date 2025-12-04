// src/components/ExerciseCard.jsx
import React from "react";
import { Download } from "lucide-react";

// Componente que representa um cartão de exercício
export default function ExerciseCard({
  id,            // id do exercício (não está sendo usado diretamente, mas pode ser útil)
  title,         // título do exercício
  url,           // link para abrir o exercício (para exercícios normais)
  description,   // descrição do exercício (apenas para cards IA)
  addedDate,     // data em que o exercício foi adicionado
  isAI,          // booleano → se o exercício foi gerado por IA
  onClick,       // função executada quando o card é clicado
  onDelete,      // função para deletar (não está sendo usada neste trecho, mas já preparada)
  onDownload,    // função executada para baixar o PDF (nos cards IA)
}) {
  return (
    <div
      className={`border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer ${
        isAI ? "bg-blue-50" : "bg-white" // cor diferente para cards IA
      }`}
      onClick={onClick} // quando clicar no card todo
    >
      
      {/* Título */}
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
      </div>

      {/* Descrição – aparece somente nos cards de IA */}
      {description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-4">
          {description}
        </p>
      )}

      {/* Botões do card */}
      <div className="flex flex-col gap-2">

        {/* 🔵 Cards que NÃO são IA → mostram “Abrir exercício” */}
        {!isAI && url && (
          <a
            href={url}                      // abre o link do exercício
            onClick={(e) => e.stopPropagation()} // impede de clicar no link e acionar o onClick do card
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 text-[#80b3ff] rounded-md text-sm"
          >
            Abrir exercício
          </a>
        )}

        {/* 🟢 Cards IA → mostram botão para baixar PDF */}
        {isAI && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // impede o clique de acionar o card
              if (onDownload) onDownload(); // chama a função de download
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          >
            <Download size={16} />
            Baixar PDF
          </button>
        )}

        {/* Data de adição do exercício */}
        <span className="text-xs text-gray-500 mt-2">
          Adicionado em: {addedDate}
        </span>
      </div>
    </div>
  );
}
