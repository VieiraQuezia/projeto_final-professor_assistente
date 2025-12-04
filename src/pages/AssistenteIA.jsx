import React, { useState, useEffect } from "react";
import { SendIcon, X } from "lucide-react";

// Importa listas de expectativas para cada série
import {
  habilidades6a9,
  habilidades8e9,
  habilidades9,
  habilidades6,
  habilidades6e7,
  habilidades7,
  habilidades8
} from "../components/expectativasData";

/* -----------------------------------------------------
   MESMA FUNÇÃO DE PARSE USADA EM Expectativas.jsx
------------------------------------------------------ */
const parseGradesFromNumero = (numero) => {
  if (!numero) return [];

  const str = numero.toLowerCase();

  // detecta "6a9", "6-9", "6e9", etc.
  const rangeMatch = str.match(/(\d+)\s*[a\-e]\s*(\d+)/i);
  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);
    if (start <= end) {
      return Array.from({ length: end - start + 1 }, (_, i) =>
        String(start + i)
      );
    }
  }

  // detecta BNCC: EF06, EF8, EF09...
  const bnccMatch = str.match(/ef0?(\d+)/i);
  if (bnccMatch) {
    return [String(Number(bnccMatch[1]))];
  }

  // detecta número solto
  const numberMatch = str.match(/(\d+)/);
  if (numberMatch) {
    return [String(Number(numberMatch[1]))];
  }

  return [];
};

/* -----------------------------------------------------
   CONVERTE LISTAS DE HABILIDADES EM TEXTO PARA O PROMPT
------------------------------------------------------ */
const formatarLista = (arr) =>
  arr
    .map((h) => {
      const codigo = h.numeroHabilidade || "";
      const palavra = h.palavraChave || "";
      const descricao = h.descricao || "";

      return `• ${codigo} — ${palavra}: ${descricao}`;
    })
    .join("\n");


export default function AssistenteIA() {

  // 🔹 Lista de cards gravados (carregando do localStorage)
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("iaFlashcards");
    return saved ? JSON.parse(saved) : []; // Se existir, usa; senão, inicia vazio
  });

  // 🔹 Input do usuário
  const [input, setInput] = useState("");

  // 🔹 Sala selecionada (6º, 7º, 8º ou 9º)
  const [selectedSala, setSelectedSala] = useState("");

  // 🔹 Card atualmente aberto no modal
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoading, setIsLoading] = useState(false);


  // 🧠 Sempre que os cards mudam, salva no localStorage
  useEffect(() => {
    localStorage.setItem("iaFlashcards", JSON.stringify(cards));
  }, [cards]);

  /* -----------------------------------------------------
     MAPA CORRIGIDO — AGORA USA TODAS AS HABILIDADES
  ------------------------------------------------------ */
  const mapaExpectativas = {
    "6ano": [...habilidades6, ...habilidades6e7, ...habilidades6a9],
    "7ano": [...habilidades7, ...habilidades6e7, ...habilidades6a9],
    "8ano": [
      ...habilidades8,
      ...habilidades8e9,
      ...habilidades6a9
    ],
    "9ano": [
      ...habilidades9,
      ...habilidades8e9,
      ...habilidades6a9
    ],
  };

  const handleSend = async (e) => {
    e.preventDefault(); // Evita recarregar a página

    // Se não tiver tema ou sala, não envia
    if (!input.trim() || !selectedSala) return;

    setIsLoading(true);

    // Lista correta de expectativas para a sala escolhida
    const expectativasSala = mapaExpectativas[selectedSala];
    const expectativasFormatadas = formatarLista(expectativasSala);

    const API_KEY = import.meta.env.VITE_GEMINI_KEY;

    /* -----------------------------------------------------
          PROMPT AGORA COMPLETO E ORGANIZADO
    ------------------------------------------------------ */
    const prompt = `
Você é um assistente especialista em planejamento de aulas de Inglês para o Ensino Fundamental II.

GERAR O PLANEJAMENTO COM BASE NOS DADOS:

SALA: ${selectedSala.replace("ano", "")}º ano
TEMA DA AULA: "${input}"

USE APENAS AS EXPECTATIVAS DESTA TURMA:

${expectativasFormatadas}

DEVOLVA EXATAMENTE O SEGUINTE:

EXPECTATIVAS:
- Liste apenas as expectativas relevantes ao tema (código + frase curta)

ATIVIDADES CRIATIVAS:
- Crie entre 4 e 6 atividades adaptadas ao ano escolhido

SUGESTÕES DE AULA:
- Estratégias práticas e rápidas para o professor aplicar

NÃO USAR MARKDOWN.
NÃO ADICIONAR TÍTULOS EXTRAS.
NÃO INVENTAR EXPECTATIVAS QUE NÃO ESTÃO NA LISTA.
`;


    try {
      // 🌐 Requisição ao modelo Gemini
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );
      const data = await response.json();

      // Coleta o texto retornado pela IA de forma segura
      const fullText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Erro ao gerar conteúdo.";
      const newCard = {
        id: Date.now(),   // ID único baseado no tempo
        tema: input,      // Tema digitado
        sala: selectedSala, // Sala selecionada
        conteudo: fullText, // Texto gerado
      };

      // Atualiza lista de cards (card novo aparece primeiro)
      setCards((prev) => [newCard, ...prev]);

      // Limpa os campos do formulário
      setInput("");
      setSelectedSala("");
    } catch (error) {
      console.error("ERRO GEMINI:", error);

    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------------------------------
     COMPONENTE JSX (NÃO ALTERADO)
  ------------------------------------------------------ */
  return (
    <div className="max-w-5xl mx-auto p-8">

      {/* 🔹 Título */}
      <h2 className="text-2xl font-bold text-black mb-6">
        Assistente IA — Flashcards com Modal
      </h2>

      {/* Form */}
      <form onSubmit={handleSend} className="flex gap-3 mb-8">

        {/* Seleção da sala */}
        <select
          className="bg-white border px-3 py-2 rounded-md text-black"
          value={selectedSala}
          onChange={(e) => setSelectedSala(e.target.value)}
        >
          <option value="">Selecione a sala</option>
          <option value="6ano">6º ano</option>
          <option value="7ano">7º ano</option>
          <option value="8ano">8º ano</option>
          <option value="9ano">9º ano</option>
        </select>

        {/* Input do tema */}
        <input
          className="flex-1 bg-white border px-4 py-2 rounded-md text-black"
          placeholder="Digite o tema da aula..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Botão enviar */}
        <button
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-400"
        >
          {/* Se estiver carregando → mostra spinner */}
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <SendIcon size={18} />
              Gerar
            </>
          )}
        </button>
      </form>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center my-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-700 font-medium">Gerando conteúdo...</p>
          </div>
        </div>
      )}

      {/* Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)} // Abre modal
              className="bg-blue-500 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:bg-blue-600 transition"
            >
              <h3 className="text-xl font-bold">{card.tema}</h3>

              <p className="text-sm mt-1">
                Turma: {card.sala.replace("ano", "º ano")}
              </p>

              <p className="opacity-80 mt-2 text-sm">Clique para abrir</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedCard && (
        <>
          {/* Fundo escuro atrás do modal */}
          <div
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          />

          {/* Conteúdo do modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl relative">

              {/* Botão X para fechar */}
              <button
                className="absolute top-3 right-3 text-gray-700 hover:text-black"
                onClick={() => setSelectedCard(null)}
              >
                <X size={22} />
              </button>

              {/* Título do card */}
              <h2 className="text-xl font-bold text-black mb-2">
                {selectedCard.tema}
              </h2>

              {/* Sala */}
              <p className="text-sm mb-4 text-gray-600">
                Turma: {selectedCard.sala.replace("ano", "º ano")}
              </p>

              {/* Texto gerado pela IA */}
              <div className="text-black whitespace-pre-wrap max-h-96 overflow-y-auto">
                {selectedCard.conteudo}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
