// ...existing code...
import React from "react";
import { Search } from "lucide-react"; // Ícone de lupa (biblioteca lucide-react)

// Componente SearchBar recebe 3 props:
// - value        → texto que está dentro do input
// - onChange     → função que é chamada quando o usuário digita
// - placeholder  → texto cinza dentro do input (padrão: "Buscar...")
export default function SearchBar({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    // Container externo que limita a largura da barra de busca
    <div className="relative w-full max-w-2xl">

      {/* Ícone de lupa, fica posicionado dentro do input no lado esquerdo */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

      {/* Campo de texto */}
      <input
        type="text"
        value={value} // valor atual do input (controlado pelo React)
        onChange={e => onChange(e.target.value)} // envia o novo texto ao digitar
        placeholder={placeholder} // texto de fundo
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-[#1E88E5]
                   focus:border-transparent"
      />
    </div>
  );
}
// ...existing code...
