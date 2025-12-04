// ...existing code...
// Importa o React.
import React from "react";
// Importa o ícone Github do pacote lucide-react.
import { Github } from "lucide-react";

// Define e exporta o componente funcional Footer (Rodapé).
export default function Footer() {
  // Retorna a estrutura HTML do rodapé.
  return (
    // <footer/>: Contêiner principal do rodapé.
    // Estilo: Fundo azul escuro ('bg-[#0D47A1]'), texto branco, padding vertical ('py-8'), e 'mt-auto' para posicionamento na parte inferior da tela.
    <footer className="bg-[#0D47A1] text-white py-8 mt-auto">
      {/* Div de conteúdo centralizado: Limita a largura a 'max-w-7xl' e centraliza ('mx-auto'). */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout principal: Organiza o conteúdo em linha ('flex-row') em telas médias e maiores, e em coluna ('flex-col') em mobile. */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Informações da Instituição/Projeto */}
          <div className="text-center md:text-left">
            {/* Nome da Instituição/Unidade em destaque. */}
            <p className="font-semibold">SENAI Valinhos - Unidade Vinhedo</p>
            {/* Detalhes do contexto do projeto (menor e cor mais clara). */}
            <p className="text-sm text-blue-200">
              4º Termo | Projeto Integrador
            </p>
          </div>

          {/* Link para o GitHub */}
          <div className="flex items-center gap-4">
            {/* Link <a> para o repositório externo. */}
            <a 
              href="https://github.com" 
              target="_blank" // Garante que o link abra em uma nova aba.
              rel="noopener noreferrer" // Recomendado para segurança em links externos.
              // Estilo do link: Ícone e texto alinhados, com efeito de hover.
              className="flex items-center gap-2 text-sm hover:text-blue-200 transition-colors"
            >
              {/* Ícone do GitHub. */}
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Seção de Direitos Autorais (Copyright) */}
        {/* Separada por uma linha ('border-t border-blue-700') para organização visual. */}
        <div className="mt-6 pt-6 border-t border-blue-700 text-center text-sm text-blue-200">
          <p>© 2025 Professor Assistente - Desenvolvido com React e IA</p>
        </div>
      </div>
    </footer>
  );
}
// ...existing code...