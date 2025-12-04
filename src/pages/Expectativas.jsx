// Importa o React e o hook useState
import React, { useState } from 'react';

// Componentes da aplicação
import SearchBar from '../components/SearchBar';
import ExpectativaCard from '../components/ExpectativaCard';

// Ícone para os links externos
import { ExternalLink } from 'lucide-react';

// Importa TODOS os blocos de habilidades de diferentes séries
import {
  habilidades6a9,
  habilidades9,
  habilidades8e9,
  habilidades6,
  habilidades6e7,
  habilidades7,
  habilidades8
} from '../components/expectativasData';

/* -------------------------------------------------------------------
   Função parseGradesFromNumero()
   - Lê o número da habilidade (ex.: "6a9", "EF06", "8", etc.)
   - Descobre para quais séries essa habilidade vale
------------------------------------------------------------------------ */

const parseGradesFromNumero = (numero) => {
  if (!numero) return []; // Se não existe número, retorna vazio

  const str = numero.toLowerCase(); // Normaliza para string minúscula

  // 1) Detecta padrões tipo "6a9", "6-9", "6e9"
  const rangeMatch = str.match(/(\d+)\s*[a\-e]\s*(\d+)/i);
  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);

    // Gera todas as séries entre início e fim
    if (!isNaN(start) && !isNaN(end) && start <= end) {
      return Array.from({ length: end - start + 1 }, (_, i) => String(start + i));
    }
  }

  // 2) Detecta códigos BNCC: EF06, EF8, EF09
  const bnccMatch = str.match(/ef0?(\d+)/i);
  if (bnccMatch) {
    return [String(Number(bnccMatch[1]))];
  }

  // 3) Detecta números soltos tipo "8"
  const numberMatch = str.match(/(\d+)/);
  if (numberMatch) {
    return [String(Number(numberMatch[1]))];
  }

  return []; // Nenhum padrão reconhecido
};

/* -------------------------------------------------------------------
   Armazena todas as fontes de habilidades em um único array
   - Cada bloco tem uma lista e um nome usado para fallback
------------------------------------------------------------------------ */

const allSources = [
  { arr: habilidades6a9, name: '6a9' },
  { arr: habilidades8e9, name: '8e9' },
  { arr: habilidades9, name: '9' },
  { arr: habilidades6e7, name: '6e7' },
  { arr: habilidades7, name: '7' },
  { arr: habilidades8, name: '8' },
  { arr: habilidades6, name: '6' }
];

/* -------------------------------------------------------------------
   Gera TODAS as expectativas unificadas
   - Cada item terá: id, keyword, description, grade
   - Se um item pertence a várias séries, ele gera vários cartões
------------------------------------------------------------------------ */

let nextId = 1; // ID incremental para cada expectativa

const mockExpectativas = allSources.flatMap((source) =>
  source.arr.flatMap((h) => {
    // Tenta obter séries a partir do número da habilidade
    const grades = parseGradesFromNumero(h.numeroHabilidade);

    // Se não encontrou nada, usa fallback baseado no nome do bloco
    const finalGrades =
      grades.length > 0
        ? grades
        : source.name.includes('6a9') ? ['6', '7', '8', '9']
        : source.name.includes('6e7') ? ['6', '7']
        : source.name.includes('8e9') ? ['8', '9']
        : source.name === '6' ? ['6']
        : source.name === '7' ? ['7']
        : source.name === '8' ? ['8']
        : source.name === '9' ? ['9']
        : [];

    // Cria um item para CADA série encontrada
    return finalGrades.map((g) => ({
      id: nextId++, // ID único
      keyword: `${h.palavraChave || ''} ${h.numeroHabilidade || ''}`.trim(),
      description: h.descricao,
      grade: g, // Série (ex.: "6", "8")
    }));
  })
);

/* -------------------------------------------------------------------
   Lista de links externos organizados por série
------------------------------------------------------------------------ */

const externalLinks = [
  {
    grade: '6º ano',
    links: [
      { title: 'British Council - Kids', url: 'https://learnenglishkids.britishcouncil.org' },
      { title: 'ESL Games Plus', url: 'https://www.eslgamesplus.com' }
    ]
  },
  {
    grade: '7º ano',
    links: [
      { title: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish' },
      { title: 'English Central', url: 'https://www.englishcentral.com' }
    ]
  },
  {
    grade: '8º ano',
    links: [
      { title: 'Cambridge English', url: 'https://www.cambridgeenglish.org' },
      { title: 'Perfect English Grammar', url: 'https://www.perfect-english-grammar.com' }
    ]
  },
  {
    grade: '9º ano',
    links: [
      { title: 'TED-Ed', url: 'https://ed.ted.com' },
      { title: 'Coursera English', url: 'https://www.coursera.org' }
    ]
  }
];

/* -------------------------------------------------------------------
   COMPONENTE PRINCIPAL DA PÁGINA
   - Mostra busca, filtros, cards e links externos
------------------------------------------------------------------------ */

export default function Expectativas() {
  // Estado para texto de busca
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para série selecionada
  const [selectedGrade, setSelectedGrade] = useState(null);

  // Filtra expectativas de acordo com busca + série
  const filteredExpectativas = mockExpectativas.filter((exp) => {
    const lower = searchTerm.toLowerCase();

    // Verifica se texto aparece na keyword ou descrição
    const matchesSearch =
      exp.keyword.toLowerCase().includes(lower) ||
      exp.description.toLowerCase().includes(lower);

    // Verifica série (se selectedGrade = null, mostra todas)
    const matchesGrade = !selectedGrade || exp.grade === selectedGrade;

    return matchesSearch && matchesGrade;
  });

  // Lista fixa de séries
  const grades = ['6', '7', '8', '9'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Expectativas de Aprendizagem
        </h1>

        {/* BARRA DE BUSCA + FILTROS */}
        <div className="mb-8 space-y-4">
          
          {/* Campo de busca */}
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por palavra-chave..."
          />

          {/* Botões de série */}
          <div className="flex flex-wrap gap-2">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedGrade === grade
                    ? 'bg-[#1E88E5] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {grade}º ano
              </button>
            ))}
          </div>
        </div>

        {/* LISTA DE RESULTADOS */}
        {filteredExpectativas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">Nenhuma expectativa encontrada</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredExpectativas.map((exp) => (
              <ExpectativaCard key={exp.id} {...exp} />
            ))}
          </div>
        )}

        {/* SESSÃO DE LINKS EXTERNOS */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Links Externos por Turma
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {externalLinks.map((section) => (
              <div key={section.grade} className="bg-white rounded-lg shadow-md p-6">
                
                {/* Nome da série */}
                <h3 className="text-xl font-semibold text-[#1E88E5] mb-4">
                  {section.grade}
                </h3>

                {/* Lista de links */}
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-[#1E88E5] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{link.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
