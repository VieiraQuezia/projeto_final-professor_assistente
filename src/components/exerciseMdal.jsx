// src/components/exerciseMdal.jsx
// Importa o React.
import React from "react";

// Define e exporta o componente funcional ExerciseModal.
// Recebe as props: 'open' (booleano para controlar a visibilidade), 'onClose' (função para fechar o modal) e 'exercise' (objeto com os dados do exercício).
export default function ExerciseModal({ open, onClose, exercise }) {
  // Condição de guarda: Se 'open' for falso ou 'exercise' não existir, o componente não renderiza nada ('null').
  if (!open || !exercise) return null;

  // Renderiza a estrutura do Modal.
  return (
    // Div de Fundo (Overlay)
    // Classes: 'fixed inset-0' para cobrir toda a tela, 'z-50' para ficar acima de tudo, centraliza o conteúdo, e 'bg-black/40' para criar um fundo semitransparente.
    // O 'onClick={onClose}' permite fechar o modal clicando fora da área de conteúdo.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      {/* Container do Conteúdo do Modal */}
      <div
        // Estilo: Fundo branco, cantos arredondados, padding, largura máxima limitada ('max-w-3xl'), e 'overflow-y-auto' para permitir rolagem se o conteúdo for grande.
        className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        // Impede que o clique dentro do modal propague para o overlay, o que fecharia o modal.
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex justify-between items-start mb-4">
          {/* Título do Exercício (exibido apenas se 'exercise' estiver definido). */}
          <h3 className="text-xl font-semibold">{exercise.title}</h3>
          
          {/* Botão Fechar */}
          <button
            onClick={onClose} // Chama a função para fechar o modal.
            className="text-gray-500 hover:text-gray-700"
          >
            Fechar
          </button>
        </div>

        {/* Descrição/Enunciado do Exercício */}
        {/* Renderiza condicionalmente se houver 'exercise.description'. */}
        {exercise.description && (
          // <pre>: Usado aqui para preservar quebras de linha e espaços do texto gerado, mas com 'whitespace-pre-wrap' para quebras automáticas de linha longas.
          <pre className="whitespace-pre-wrap text-gray-700 text-sm mb-4">
            {exercise.description}
          </pre>
        )}

        {/* Link Externo (se houver URL) */}
        {/* Renderiza condicionalmente se houver 'exercise.url'. */}
        {exercise.url && (
          <a
            href={exercise.url}
            target="_blank" // Abre o link em uma nova aba.
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Abrir no site
          </a>
        )}

        {/* Metadados do Exercício */}
        <div className="text-xs text-gray-500 mt-4">
          Adicionado em: {exercise.addedDate}
        </div>
      </div>
    </div>
  );
}