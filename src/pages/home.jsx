  // Importa React e dependências do React Router e dos ícones
  import React from "react";
  import { Link } from "react-router-dom";
  import { BookOpen, Dumbbell, Sparkles } from "lucide-react";

  export default function Home() {

    // Lista das seções principais exibidas na página inicial
    // Cada item contém:
    // - Ícone
    // - Título
    // - Descrição
    // - Rota para link
    // - Cor de fundo do ícone
    const features = [
      {
        icon: BookOpen,
        title: 'Expectativas',
        description: 'Organize e busque expectativas de aprendizagem por palavra-chave e turma',
        to: '/expectativas',
        color: 'bg-green-50 text-green-600'
      },
      {
        icon: Dumbbell,
        title: 'Exercícios',
        description: 'Gerencie exercícios dinâmicos do WordWall e outras plataformas',
        to: '/exercicios',
        color: 'bg-purple-50 text-purple-600'
      },
      {
        icon: Sparkles,
        title: 'Assistente IA',
        description: 'Planeje aulas completas com ajuda de inteligência artificial',
        to: '/assistente',
        color: 'bg-blue-50 text-blue-600'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {/* --------------------------- */}
          {/*         HERO SECTION        */}
          {/* --------------------------- */}
          {/* Área inicial de destaque da página */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Professor Assistente
            </h1>

            <p className="text-xl text-gray-600 mb-2">
              Planejamento de Aulas com IA
            </p>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Organize expectativas, encontre exercícios e planeje aulas com
              inteligência artificial
            </p>
          </div>

          {/* --------------------------- */}
          {/*       FEATURE CARDS         */}
          {/* --------------------------- */}
          {/* Cards principais navegáveis para as páginas da plataforma */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature) => {
              // Atribui dinamicamente o ícone de cada feature
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.to}
                  to={feature.to} // Rota correspondente
                  className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-shadow group"
                >
                  {/* Ícone com animação de escala no hover */}
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Título do card */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>

                  {/* Descrição do card */}
                  <p className="text-gray-600">{feature.description}</p>
                </Link>
              );
            })}
          </div>

          {/* --------------------------- */}
          {/*        SOBRE A PLATAFORMA    */}
          {/* --------------------------- */}
          <div className="bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sobre a Plataforma
            </h2>

            <p className="text-gray-700 mb-4">
              O Professor Assistente foi desenvolvido para apoiar a Profª Flávia Viana
              (SESI Vinhedo) no planejamento de aulas de inglês, utilizando inteligência
              artificial para otimizar o processo pedagógico.
            </p>

            <p className="text-gray-700">
              A plataforma organiza expectativas de aprendizagem, facilita o acesso a
              exercícios dinâmicos e oferece sugestões personalizadas através de IA,
              tornando o planejamento de aulas mais eficiente e criativo.
            </p>
          </div>
        </div>
      </div>
    );
  }
