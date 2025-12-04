// ...existing code...
// Importa o React para a construção do componente.
import React from "react";
// Importa o ícone BookOpen do pacote lucide-react, usado para representar o tema/expectativa.
import { BookOpen } from "lucide-react";

// Define e exporta o componente funcional ExpectativaCard.
// Ele recebe três propriedades (props): keyword (palavra-chave/título), description (descrição detalhada), e grade (série/ano).
export default function ExpectativaCard({ keyword, description, grade }) {
  
  // Objeto para mapear a série (grade) a um conjunto específico de classes CSS para cores.
  // Isso permite diferenciar visualmente os cartões baseados na série.
  const gradeColors = {
    '6': 'bg-green-100 text-green-800', // Cores para o 6º ano.
    '7': 'bg-blue-100 text-blue-800',   // Cores para o 7º ano.
    '8': 'bg-purple-100 text-purple-800', // Cores para o 8º ano.
    '9': 'bg-orange-100 text-orange-800' // Cores para o 9º ano.
  };

  // Renderiza a estrutura do cartão.
  return (
    // Div principal do cartão.
    // Estilo: Fundo branco, cantos arredondados, sombra, padding, e um efeito de sombra ao passar o mouse ('hover:shadow-lg') para interatividade.
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      
      {/* Cabeçalho do cartão: Contém o ícone, título e a tag da série. */}
      <div className="flex items-start justify-between gap-4 mb-3">
        
        {/* Ícone e Título (Keyword) */}
        <div className="flex items-center gap-2 text-[#1E88E5]">
          {/* Ícone BookOpen. 'flex-shrink-0' garante que o ícone não encolha. */}
          <BookOpen className="w-5 h-5 flex-shrink-0" />
          {/* Título/Palavra-chave da expectativa. */}
          <h3 className="font-semibold text-lg">{keyword}</h3>
        </div>
        
        {/* Tag da Série (Grade) */}
        {/* Aplica as classes de cor dinamicamente usando o mapeamento 'gradeColors'. */}
        {/* Se a 'grade' não estiver mapeada, usa um padrão cinza ('bg-gray-100 text-gray-800'). */}
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${gradeColors[grade] || 'bg-gray-100 text-gray-800'}`}>
          {grade}º ano
        </span>
      </div>
      
      {/* Descrição da Expectativa */}
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
// ...existing code...