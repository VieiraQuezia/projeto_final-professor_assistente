// ...existing code...
// Importa o React.
import React from "react";
// Importa o ícone Github do pacote lucide-react.
import { Github } from "lucide-react";

// Define e exporta o componente funcional Footer.
export default function Footer() {
  // Retorna a estrutura do rodapé.
  return (
    // <footer/>: Contêiner principal do rodapé.
    // Classes: Cor de fundo azul escura ('bg-[#0D47A1]'), texto branco, padding vertical de 8, e 'mt-auto' para garantir que fique na parte inferior (útil em layouts flex/grid).
    <footer className="bg-[#0D47A1] text-white py-8 mt-auto">
      {/* Div interna para centralizar e limitar a largura do conteúdo (máx. 7xl). */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção principal do rodapé: informações do projeto e link do GitHub. */}
        {/* Flexbox para alinhar itens: coluna em mobile ('flex-col') e linha em desktop ('md:flex-row'). */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Informações do Projeto */}
          <div className="text-center md:text-left">
            {/* Nome da Instituição/Unidade */}
            <p className="font-semibold">SENAI Valinhos - Unidade Vinhedo</p>
            {/* Detalhes do Projeto */}
            <p className="text-sm text-blue-200">
              4º Termo | Projeto Integrador
            </p>
          </div>

          {/* Link para o GitHub */}
          <div className="flex items-center gap-4">
            {/* Tag <a>: Link externo para o GitHub. */}
            <a 
              href="https://github.com" 
              target="_blank" // Abre o link em uma nova aba.
              rel="noopener noreferrer" // Medidas de segurança para links externos.
              className="flex items-center gap-2 text-sm hover:text-blue-200 transition-colors"
            >
              {/* Ícone do GitHub */}
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Linha de Direitos Autorais */}
        {/* Adiciona uma margem superior, padding superior e uma linha divisória fina. */}
        <div className="mt-6 pt-6 border-t border-blue-700 text-center text-sm text-blue-200">
          <p>© 2025 Professor Assistente - Desenvolvido com React e IA</p>
        </div>
      </div>
    </footer>
  );
}
// ...existing code...