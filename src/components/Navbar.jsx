// Importa o React e o hook useState para gerenciar o estado de abertura do menu.
import React, { useState } from "react";
// Importa os componentes Link (para navegação) e useLocation (para obter a rota atual) do React Router DOM.
import { Link, useLocation } from "react-router-dom";
// Importa ícones do pacote lucide-react (BookOpen para o logo, Menu e X para o botão do menu móvel).
import { BookOpen, Menu, X } from "lucide-react";

// Define e exporta o componente funcional Navbar.
export default function Navbar() {
  // Estado para controlar se o menu móvel está aberto (true) ou fechado (false).
  const [isOpen, setIsOpen] = useState(false);
  // Obtém o objeto de localização atual para saber qual rota está ativa.
  const location = useLocation();
  // Array de objetos que define os links da navegação (caminho 'to' e texto de exibição 'label').
  const links = [
    { to: '/', label: 'Início' },
    { to: '/expectativas', label: 'Expectativas' },
    { to: '/exercicios', label: 'Exercícios' },
    { to: '/assistente', label: 'Assistente IA' },
    { to: '/sobre', label: 'Sobre' }
  ];

  // Função auxiliar para verificar se um determinado 'path' corresponde à rota atual.
  const isActive = (path) => location.pathname === path;

  // Renderiza o componente da barra de navegação.
  return (
    // <nav>: Contêiner principal da barra de navegação.
    // Classes: 'fixed' para fixar no topo, 'bg-white' e 'shadow-md' para estilo, 'z-50' para garantir que fique acima de outros elementos.
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      {/* Div interna para centralizar e limitar a largura do conteúdo (máx. 7xl). */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Div para organizar o conteúdo principal (logo e links/botão) com flexbox. */}
        <div className="flex justify-between items-center h-16">
          {/* Link do logo que leva para a página inicial. */}
          <Link to="/" className="flex items-center gap-2 text-[#1E88E5] font-bold text-lg">
            {/* Ícone BookOpen como parte do logo. */}
            <BookOpen className="w-6 h-6" />
            {/* Nome completo, visível em telas maiores que 'sm'. */}
            <span className="hidden sm:inline">Professor Assistente</span>
            {/* Nome abreviado, visível apenas em telas 'sm' ou menores. */}
            <span className="sm:hidden">Prof. Assistente</span>
          </Link>

          {/* Área de Navegação para Desktop */}
          {/* Visível apenas em telas maiores que 'md' ('hidden md:flex'). */}
          <div className="hidden md:flex items-center gap-6">
            {/* Mapeia o array 'links' para criar um Link para cada item. */}
            {links.map(link => (
              <Link
                key={link.to} // Chave única para o React.
                to={link.to}
                // Aplica classes de estilo. A cor e o sublinhado mudam se o link estiver ativo (isActive(link.to)).
                className={`text-sm font-medium transition-colors ${isActive(link.to) ? 'text-[#1E88E5] border-b-2 border-[#1E88E5] pb-1' : 'text-gray-700 hover:text-[#1E88E5]'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Botão para Abrir/Fechar o Menu Móvel */}
          {/* Visível apenas em telas 'md' ou menores ('md:hidden'). */}
          <button 
            onClick={() => setIsOpen(!isOpen)} // Alterna o estado 'isOpen' ao clicar.
            className="md:hidden p-2 text-gray-700 hover:text-[#1E88E5]" 
            aria-label="Toggle menu"
          >
            {/* Exibe o ícone 'X' se o menu estiver aberto, e 'Menu' se estiver fechado. */}
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navegação Móvel (Menu Dropdown) */}
        {/* Renderiza apenas se 'isOpen' for true ('isOpen && (...)'). */}
        <div className="md:hidden py-4 border-t">
          {/* Mapeia os links para a exibição no menu móvel. */}
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              // Fecha o menu ao clicar em um link.
              onClick={() => setIsOpen(false)}
              // Aplica classes: 'block' para ocupar toda a largura, padding vertical/horizontal.
              // O estilo de fundo muda se o link estiver ativo.
              className={`block py-2 px-4 text-sm font-medium transition-colors ${isActive(link.to) ? 'text-[#1E88E5] bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}