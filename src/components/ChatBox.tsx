import React from 'react';
import { Send } from 'lucide-react';
interface Message {
  role: 'user' | 'assistant';
  content: string;
  sections?: {
    expectativas?: string[];
    sugestoes?: string[];
    exercicios?: string[];
  };
}
interface ChatBoxProps {
  messages: Message[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}
export function ChatBox({
  messages,
  input,
  onInputChange,
  onSend,
  isLoading
}: ChatBoxProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };
  return <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Digite um prompt para começar</p>
            <p className="text-sm">
              Descreva o tema da aula ou use palavras-chave
            </p>
          </div> : messages.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl rounded-lg p-4 ${message.role === 'user' ? 'bg-[#1E88E5] text-white' : 'bg-white shadow-md'}`}>
                {message.role === 'assistant' && message.sections ? <div className="space-y-4">
                    {message.sections.expectativas && <div>
                        <h4 className="font-semibold text-[#1E88E5] mb-2">
                          Expectativas Relacionadas:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {message.sections.expectativas.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>}

                    {message.sections.sugestoes && <div>
                        <h4 className="font-semibold text-[#1E88E5] mb-2">
                          Sugestões de Aula:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {message.sections.sugestoes.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>}

                    {message.sections.exercicios && <div>
                        <h4 className="font-semibold text-[#1E88E5] mb-2">
                          Exercícios Dinâmicos:
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {message.sections.exercicios.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>}
                  </div> : <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>}
              </div>
            </div>)}

        {isLoading && <div className="flex justify-start">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '0ms'
            }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '150ms'
            }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{
              animationDelay: '300ms'
            }} />
              </div>
            </div>
          </div>}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <textarea value={input} onChange={e => onInputChange(e.target.value)} onKeyPress={handleKeyPress} placeholder="Descreva o tema da aula ou digite uma palavra-chave..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent resize-none" rows={3} />
        <button onClick={onSend} disabled={!input.trim() || isLoading} className="px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#0D47A1] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
          <Send className="w-5 h-5" />
          <span className="hidden sm:inline">Gerar</span>
        </button>
      </div>
    </div>;
}