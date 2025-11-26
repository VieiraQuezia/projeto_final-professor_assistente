// ...existing code...
import React, { useState, useContext } from "react";
import { ChatBox } from "../components/ChatBox";

export function AssistenteIA() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.API_KEY;
  const MODEL = "gemini-2.5-flash";

  // Função que envia para a IA
  const generateResponse = async (userText) => {
    const prompt = `
Você é um assistente especializado na criação de planos de aula de Inglês.
Gere uma resposta ORGANIZADA com exatamente estas chaves:


  "expectativas": ,
  "sugestoes": [],
  "exercicios": []


Regras:
- NÃO use markdown.
- Seja direto, claro e objetivo.
- Cada lista deve ter entre 3 e 6 itens.
- Baseie-se no tema descrito pelo professor.
- O público são alunos do ensino fundamental ou médio.
- O tom deve ser profissional, simples e didático.

Tema enviado pelo professor:
"${userText}"
`;

   try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

      // Tenta converter para JSON
      try {
        const parsed = JSON.parse(text);
        return {
          role: "assistant",
          content: "",
          sections: parsed,
        };
      } catch (error) {
        return {
          role: "assistant",
          content:
            "A IA respondeu em um formato inesperado. Tente reformular sua pergunta.",
          sections: null,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        role: "assistant",
        content:
          "Erro ao conectar com o servidor da IA. Tente novamente mais tarde.",
        sections: null,
      };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // IA
    const assistantMessage = await generateResponse(userMessage.content);

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Assistente IA
          </h1>
          <p className="text-gray-600">
            Descreva o tema da aula e receba sugestões personalizadas de
            planejamento
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
          <p>
            💡 Dica: Seja específico sobre o tema, nível dos alunos e objetivos
            da aula
          </p>
        </div>
      </div>
    </div>
  );
}
// ...existing code...
