import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ExpectativaCard from '../components/ExpectativaCard';
import { ExternalLink } from 'lucide-react';

import {
  habilidades6a9,
  habilidades9,
  habilidades8e9,
  habilidades6,
  habilidades6e7,
  habilidades7,
  habilidades8
} from '../components/expectativasData';

/* -------------------------------
   PARSE — Detecta TODAS as séries
-------------------------------- */

const parseGradesFromNumero = (numero) => {
  if (!numero) return [];

  const str = numero.toLowerCase();

  // Detecta padrões tipo "6a9", "6-9", "6e9"
  const rangeMatch = str.match(/(\d+)\s*[a\-e]\s*(\d+)/i);
  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);
    if (!isNaN(start) && !isNaN(end) && start <= end) {
      return Array.from({ length: end - start + 1 }, (_, i) => String(start + i));
    }
  }

  // Detecta BNCC: EF06, EF8, EF09 etc.
  const bnccMatch = str.match(/ef0?(\d+)/i);
  if (bnccMatch) {
    return [String(Number(bnccMatch[1]))];
  }

  // Detecta número solto
  const numberMatch = str.match(/(\d+)/);
  if (numberMatch) {
    return [String(Number(numberMatch[1]))];
  }

  return [];
};

/* -------------------------------
   ARMAZENA TODAS AS FONTES
-------------------------------- */

const allSources = [
  { arr: habilidades6a9, name: '6a9' },
  { arr: habilidades8e9, name: '8e9' },
  { arr: habilidades9, name: '9' },
  { arr: habilidades6e7, name: '6e7' },
  { arr: habilidades7, name: '7' },
  { arr: habilidades8, name: '8' },
  { arr: habilidades6, name: '6' }
];

/* -------------------------------
   GERA TODAS AS EXPECTATIVAS
-------------------------------- */

let nextId = 1;

const mockExpectativas = allSources.flatMap((source) =>
  source.arr.flatMap((h) => {
    const grades = parseGradesFromNumero(h.numeroHabilidade);

    // Se não achou nada, usa fallback baseado no nome do array
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

    return finalGrades.map((g) => ({
      id: nextId++,
      keyword: `${h.palavraChave || ''} ${h.numeroHabilidade || ''}`.trim(),
      description: h.descricao,
      grade: g,
    }));
  })
);

/* -------------------------------
   LINKS EXTERNOS POR SÉRIE
-------------------------------- */

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

/* -------------------------------
   COMPONENTE PRINCIPAL
-------------------------------- */

export default function Expectativas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);

  const filteredExpectativas = mockExpectativas.filter((exp) => {
    const lower = searchTerm.toLowerCase();
    const matchesSearch =
      exp.keyword.toLowerCase().includes(lower) ||
      exp.description.toLowerCase().includes(lower);

    const matchesGrade = !selectedGrade || exp.grade === selectedGrade;

    return matchesSearch && matchesGrade;
  });

  const grades = ['6', '7', '8', '9'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Expectativas de Aprendizagem
        </h1>

        {/* Search + Filtros */}
        <div className="mb-8 space-y-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por palavra-chave..."
          />

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

        {/* Lista de resultados */}
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

        {/* LINKS EXTERNOS */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Links Externos por Turma
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {externalLinks.map((section) => (
              <div key={section.grade} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-[#1E88E5] mb-4">
                  {section.grade}
                </h3>

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
