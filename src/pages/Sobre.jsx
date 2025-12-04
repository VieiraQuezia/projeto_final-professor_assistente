// ...existing code...
import React from "react";
// Importa ícones que representam as seções da página.
import { BookOpen, Users, Target, Github } from "lucide-react";
import '../App.css' // Importa estilos CSS customizados (provavelmente para classes como 'titulo' e 'grupo').

// Define e exporta o componente da página Sobre.
export default function Sobre() {
  // Dados de planejamento do projeto, seguindo a metodologia SCRUM (fases e descrições).
  const scrumPhases = [
    {
      title: 'Sprint 1 - Planejamento',
      description: 'Definição de requisitos, arquitetura e design inicial do sistema'
    },
    {
      title: 'Sprint 2 - Desenvolvimento',
      description: 'Implementação das funcionalidades principais e componentes'
    },
    {
      title: 'Sprint 3 - Integração',
      description: 'Integração com API de IA e testes de usabilidade'
    },
    {
      title: 'Sprint 4 - Refinamento',
      description: 'Ajustes finais, documentação e preparação para entrega'
    }
  ];

  // Renderiza a estrutura da página.
  return (
    // Contêiner principal da página.
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Contêiner de conteúdo centralizado e largura máxima. */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sobre o Projeto</h1>

        {/* 1. Visão Geral do Projeto (Project Overview) */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[#1E88E5]" />
            <h2 className="text-2xl font-semibold text-gray-900">Professor Assistente</h2>
          </div>
          {/* Descrições do contexto do projeto. */}
          <p className="text-gray-700 mb-4">
            O Professor Assistente é uma plataforma web desenvolvida como projeto integrador
            do 4º termo do curso de Desenvolvimento de Sistemas do SENAI Valinhos - Unidade Vinhedo.
          </p>
          <p className="text-gray-700 mb-4">
            O sistema foi criado para apoiar a Profª Flávia Viana, professora de inglês do
            SESI Vinhedo, no planejamento de aulas através de recursos de inteligência
            artificial e organização de materiais pedagógicos.
          </p>
          <p className="text-gray-700">
            A plataforma integra funcionalidades de busca de expectativas de aprendizagem,
            gerenciamento de exercícios dinâmicos e assistente de IA para geração de planos de aula.
          </p>
        </div>

        {/* 2. Funcionalidades Principais (Key Features) */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-[#1E88E5]" />
            <h2 className="text-2xl font-semibold text-gray-900">Funcionalidades Principais</h2>
          </div>
          {/* Lista de funcionalidades. */}
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] font-bold">•</span>
              <span>
                <strong>Expectativas de Aprendizagem:</strong> Busca e organização por palavras-chave e turma
              </span>
            </li>
            {/* ...outras funcionalidades... */}
            <li className="flex items-start gap-2">
              <span className="text-[#1E88E5] font-bold">•</span>
              <span>
                <strong>Assistente IA:</strong> Geração de planos de aula personalizados
              </span>
            </li>
          </ul>
        </div>

        {/* 3. Metodologia SCRUM */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-[#1E88E5]" />
            <h2 className="text-2xl font-semibold text-gray-900">Metodologia SCRUM</h2>
          </div>
          <p className="text-gray-700 mb-6">
            O projeto foi desenvolvido seguindo a metodologia ágil SCRUM, dividido em 4 sprints:
          </p>
          {/* Mapeia e exibe as fases do SCRUM (Sprints). */}
          <div className="space-y-4">
            {scrumPhases.map((phase, index) => (
              <div key={index} className="border-l-4 border-[#1E88E5] pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">{phase.title}</h3>
                <p className="text-gray-600 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Tecnologias Utilizadas */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tecnologias Utilizadas</h2>
          {/* Lista as tecnologias em tags estilizadas. */}
          <div className="flex flex-wrap gap-2">
            {[
              'React',
              'JavaScript',
              'Tailwind CSS',
              'React Router',
              'Lucide Icons',
              'API Gemini'
            ].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-blue-50 text-[#1E88E5] rounded-lg text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* 5. Sobre o Grupo 6 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          {/* Imagens e Título do Grupo */}
          <img src="/grupo6_logo.png" alt="Grupo 6 Logo" className="w-8 h-8" />
          <h2 className="titulo">Sobre o Grupo 6</h2> 
          <img src="/grupolindo.png" alt="grupo" className="grupo" /> 
          
          {/* Descrição do Grupo */}
          <p className="text-gray-700 mb-4">
            O Grupo 6 do SENAI é formado por pessoas unidas por um propósito comum: aprender, crescer e entregar sempre o melhor. Somos um time dedicado, versátil e comprometido com cada desafio que enfrentamos. A união é a base do nosso trabalho — apoiamos uns aos outros, compartilhamos conhecimento e celebramos cada conquista juntos.
          </p>
          <p className="text-gray-700 mb-4">
            Nossa alegria está presente no dia a dia, tornando o ambiente mais leve e motivador. Trabalhamos com respeito, valorizando as diferenças e reconhecendo a importância de cada integrante para o sucesso coletivo. Essa combinação de união, dedicação e respeito faz do Grupo 6 um exemplo de trabalho em equipe e evolução constante.
          </p>
          <p className="text-gray-700">
            Mais do que colegas, somos um time forte, preparado e disposto a ir além. 
          </p>
          <br />
          {/* Membros do Grupo */}
          <p className="text-gray-700">
            Guilherme Gabriel Santana - Desenvolvedor 💻<br />
            Hayeska Loredane Alves Machado - Desenvolvedora 💻<br />
            Leonardo Mori Vicente - Vice-Líder 🧠<br />
            Quezia Amaral Vieira - Líder 👑
          </p>
        </div>

        {/* 6. Link para o GitHub (Call to Action) */}
        <div className="bg-gradient-to-r from-[#1E88E5] to-[#0D47A1] rounded-lg shadow-md p-8 text-white text-center">
          <Github className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Código Fonte</h2>
          <p className="mb-4">Acesse o repositório do projeto no GitHub</p>
          <a
            href="https://github.com"
            target="_blank" // Abre em nova aba.
            rel="noopener noreferrer"
            // Botão com estilo invertido (fundo branco, texto azul).
            className="inline-block px-6 py-3 bg-white text-[#1E88E5] rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Ver no GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
// ...existing code...