import React, { useEffect, useState, useRef } from "react";
import { SendIcon } from "lucide-react";
import {
  habilidades6a9,
  habilidades8e9,
  habilidades9,
} from "../components/expectativasData";

export default function AssistenteIA() {
  const [messages, setMessages] = useState([
    {
      text: "Olá, professor(a)! Sou seu assistente de Inglês do Fundamental II.\n\nMe conte: qual tema você quer trabalhar na próxima aula?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const MODEL = "gemini-2.5-flash"; // atualizado conforme seu exemplo

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

 
    const prompt = `
Você é um assistente especializado em planejamento de aulas de Inglês para o Ensino Fundamental II (6º ao 9º ano).

Com base no tema fornecido pelo professor, gere:

expectativas de acordo com:
6º ao 9º ano:
${habilidades6a9}
8º e 9º ano:
${habilidades8e9}
9º ano:
${habilidades9}

sugestões criativas de atividades em sala de aula relacionadas ao tema.
exercícios práticos para os alunos.

REGRAS:
- expectativas: máximo 4 (com código + ano + frase curta)
- sugestões: 4 a 6 ideias criativas
- exercícios: 3 a 5 exercícios práticos
- NUNCA usar markdown ou blocos de código
- Use APENAS expectativas reais da lista abaixo

LISTA DE EXPECTATIVAS:


Tema solicitado pelo professor: "${userMessage.text}"
Responda de forma clara e objetiva.

`;

    try {
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": 'AIzaSyC8tCqRnnmbtjujNfIh6FOpMV6MY658Cr4', // ✔ igual ao modelo que você enviou
          },
          body: JSON.stringify(payload),
        }
      );

const data = await response.json();
console.log("RETORNO DA API:", data); //  << ADICIONAR !!!

      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Desculpe, não consegui gerar uma resposta. Pode tentar novamente? 🙏";

      setMessages((prev) => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Erro na IA:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Houve um erro ao conectar com a IA. Verifique sua chave API.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-[#1a1a1a] rounded-lg shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0E1F2F] p-4">
          <h3 className="text-white font-bold">Assistente IA — Planejamento de Aulas</h3>
        </div>

        {/* Mensagens */}
        <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                message.sender === "user"
                  ? "bg-[#0E1F2F] text-white self-end"
                  : "bg-gray-800 text-white self-start"
              }`}
            >
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-800 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#0E1F2F] text-white px-4 py-2 rounded-r-md hover:bg-[#00a894] transition-colors"
          >
            <SendIcon size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
