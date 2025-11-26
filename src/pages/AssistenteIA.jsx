// ...existing code...
import React, { useState } from 'react';
import { ChatBox } from '../components/ChatBox';

export function AssistenteIA() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateMockResponse = (userPrompt) => {
    return {
      role: 'assistant',
      content: '',
      sections: {
        expectativas: [
          'Compreender e utilizar vocabulário relacionado ao tema',
          'Desenvolver habilidades de comunicação oral e escrita',
          'Aplicar estruturas gramaticais em contextos práticos'
        ],
        sugestoes: [
          'Iniciar com warm-up usando imagens relacionadas ao tema',
          'Apresentar vocabulário novo através de exemplos contextualizados',
          'Praticar com atividades em pares e grupos',
          'Finalizar com produção escrita ou oral individual',
          'Incluir feedback construtivo e revisão dos pontos principais'
        ],
        exercicios: [
          'WordWall: Quiz interativo sobre o vocabulário apresentado',
          'Kahoot: Jogo de perguntas sobre gramática',
          'Padlet: Mural colaborativo para compartilhar produções',
          'Quizlet: Flashcards para memorização de vocabulário'
        ]
      }
    };
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage = generateMockResponse(userMessage.content);
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assistente IA</h1>
          <p className="text-gray-600">
            Descreva o tema da aula e receba sugestões personalizadas de planejamento
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-[calc(100vh-250px)] min-h-[500px]">
          <ChatBox
            messages={messages}
            input={input}
            onInputChange={setInput}
            onSend={handleSend}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          <p>💡 Dica: Seja específico sobre o tema, nível dos alunos e objetivos da aula</p>
        </div>
      </div>
    </div>
  );
}
// ...existing code...