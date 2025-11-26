import React from 'react';
import { BookOpen, Users, Target, Github } from 'lucide-react';
export function Sobre() {
  const scrumPhases = [{
    title: 'Sprint 1 - Planejamento',
    description: 'Definição de requisitos, arquitetura e design inicial do sistema'
  }, {
    title: 'Sprint 2 - Desenvolvimento',
    description: 'Implementação das funcionalidades principais e componentes'
  }, {
    title: 'Sprint 3 - Integração',
    description: 'Integração com API de IA e testes de usabilidade'
  }, {
    title: 'Sprint 4 - Refinamento',
    description: 'Ajustes finais, documentação e preparação para entrega'
  }];
  return <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Sobre o Projeto
        </h1>

        {/* Project Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[#1E88E5]" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Professor Assistente
            </h2>
          </div>
          <p className="text-gray-700 mb-4">
            O Professor Assistente é uma plataforma web desenvolvida como
            projeto integrador do 4º termo do curso de Desenvolvimento de
            Sistemas do SENAI Valinhos - Unidade Vinhedo.
          </p>
          <p className="text-gray-700 mb-4">
            O sistema foi criado para apoiar a Profª Flávia Viana, professora de
            inglês do SESI Vinhedo, no planejamento de aulas através de recursos
            de inteligência artificial e organização de materiais pedagógicos.
          </p>
          <p className="text-gray-700">
            A plataforma integra funcionalidades de busca de expectativas de
            aprendizagem, gerenciamento de exercícios dinâmicos e assistente de
            IA para geração de planos de aula.
          </p>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-[#1E88E5]" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Funcionalidades Principais
            </h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] font-bold">•</span>
              <span>
                <strong>Expectativas de Aprendizagem:</strong> Busca e
                organização por palavras-chave e turma
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] font-bold">•</span>
              <span>
                <strong>Links Externos:</strong> Recursos organizados por ano
                escolar (6º ao 9º ano)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] font-bold">•</span>
              <span>
                <strong>Exercícios Dinâmicos:</strong> Integração com
                plataformas como WordWall
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] font-bold">•</span>
              <span>
                <strong>Assistente IA:</strong> Geração de planos de aula
                personalizados
              </span>
            </li>
          </ul>
        </div>

        {/* SCRUM Methodology */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-[#1E88E5]" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Metodologia SCRUM
            </h2>
          </div>
          <p className="text-gray-700 mb-6">
            O projeto foi desenvolvido seguindo a metodologia ágil SCRUM,
            dividido em 4 sprints:
          </p>
          <div className="space-y-4">
            {scrumPhases.map((phase, index) => <div key={index} className="border-l-4 border-[#1E88E5] pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {phase.title}
                </h3>
                <p className="text-gray-600 text-sm">{phase.description}</p>
              </div>)}
          </div>
        </div>

        {/* Technologies */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Tecnologias Utilizadas
          </h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Lucide Icons', 'API Gemini'].map(tech => <span key={tech} className="px-4 py-2 bg-blue-50 text-[#1E88E5] rounded-lg text-sm font-medium">
                {tech}
              </span>)}
          </div>
        </div>

        {/* GitHub Link */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] rounded-lg shadow-md p-8 text-white text-center">
          <Github className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Código Fonte</h2>
          <p className="mb-4">Acesse o repositório do projeto no GitHub</p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-white text-[#1E88E5] rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Ver no GitHub
          </a>
        </div>
      </div>
    </div>;
}