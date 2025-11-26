import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ExpectativaCard } from '../components/ExpectativaCard';
import { ExternalLink } from 'lucide-react';
// ...existing code...

const mockExpectativas = [{
  id: '1',
  keyword: 'Present Simple',
  description: 'Compreender e utilizar o tempo verbal Present Simple para descrever rotinas, hábitos e fatos gerais.',
  grade: '6'
}, {
  id: '2',
  keyword: 'Vocabulary - Family',
  description: 'Identificar e usar vocabulário relacionado a membros da família e relações familiares.',
  grade: '6'
}, {
  id: '3',
  keyword: 'Past Simple',
  description: 'Aplicar o tempo verbal Past Simple para narrar eventos passados e contar histórias.',
  grade: '7'
}, {
  id: '4',
  keyword: 'Reading Comprehension',
  description: 'Desenvolver estratégias de leitura para compreender textos informativos e narrativos.',
  grade: '7'
}, {
  id: '5',
  keyword: 'Modal Verbs',
  description: 'Utilizar verbos modais (can, could, should, must) para expressar habilidade, possibilidade e obrigação.',
  grade: '8'
}, {
  id: '6',
  keyword: 'Conditional Sentences',
  description: 'Construir e compreender sentenças condicionais (first e second conditional) em diferentes contextos.',
  grade: '8'
}, {
  id: '7',
  keyword: 'Passive Voice',
  description: 'Reconhecer e aplicar a voz passiva em textos formais e acadêmicos.',
  grade: '9'
}, {
  id: '8',
  keyword: 'Academic Writing',
  description: 'Produzir textos argumentativos e dissertativos seguindo estruturas acadêmicas.',
  grade: '9'
}];

const externalLinks = [{
  grade: '6º ano',
  links: [{
    title: 'British Council - Kids',
    url: 'https://learnenglishkids.britishcouncil.org'
  }, {
    title: 'ESL Games Plus',
    url: 'https://www.eslgamesplus.com'
  }]
}, {
  grade: '7º ano',
  links: [{
    title: 'BBC Learning English',
    url: 'https://www.bbc.co.uk/learningenglish'
  }, {
    title: 'English Central',
    url: 'https://www.englishcentral.com'
  }]
}, {
  grade: '8º ano',
  links: [{
    title: 'Cambridge English',
    url: 'https://www.cambridgeenglish.org'
  }, {
    title: 'Perfect English Grammar',
    url: 'https://www.perfect-english-grammar.com'
  }]
}, {
  grade: '9º ano',
  links: [{
    title: 'TED-Ed',
    url: 'https://ed.ted.com'
  }, {
    title: 'Coursera English',
    url: 'https://www.coursera.org'
  }]
}];

export function Expectativas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(null);

  const filteredExpectativas = mockExpectativas.filter(exp => {
    const lower = searchTerm.toLowerCase();
    const matchesSearch = exp.keyword.toLowerCase().includes(lower) || exp.description.toLowerCase().includes(lower);
    const matchesGrade = !selectedGrade || exp.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const grades = ['6', '7', '8', '9'];

  return <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Expectativas de Aprendizagem
        </h1>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar por palavra-chave..." />

          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedGrade(null)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedGrade === null ? 'bg-[#1E88E5] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
              Todas
            </button>
            {grades.map(grade => <button key={grade} onClick={() => setSelectedGrade(grade)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedGrade === grade ? 'bg-[#1E88E5] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                {grade}º ano
              </button>)}
          </div>
        </div>

        {/* Results */}
        {filteredExpectativas.length === 0 ? <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">Nenhuma expectativa encontrada</p>
          </div> : <div className="grid md:grid-cols-2 gap-6 mb-12">
            {filteredExpectativas.map(exp => <ExpectativaCard key={exp.id} {...exp} />)}
          </div>}

        {/* External Links Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Links Externos por Turma
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {externalLinks.map(section => <div key={section.grade} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-[#1E88E5] mb-4">
                  {section.grade}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, index) => <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-[#1E88E5] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span>{link.title}</span>
                      </a>
                    </li>)}
                </ul>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}