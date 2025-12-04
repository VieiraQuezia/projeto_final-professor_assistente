// src/components/AssistenteIA.jsx
import React, { useState, useEffect } from "react";
import { SendIcon, X, Download } from "lucide-react";
import { Loader2 } from "lucide-react";

// Importa listas de expectativas de cada série
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
   FUNÇÃO PARA IDENTIFICAR O ANO ESCOLAR A PARTIR DO CÓDIGO
------------------------------------------------------ */
const parseGradesFromNumero = (numero) => {
  if (!numero) return [];

  const str = numero.toLowerCase();
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

  const bnccMatch = str.match(/ef0?(\d+)/i);
  if (bnccMatch) {
    return [String(Number(bnccMatch[1]))];
  }

  const numberMatch = str.match(/(\d+)/);
  if (numberMatch) {
    return [String(Number(numberMatch[1]))];
  }

  return [];
};

/* -----------------------------------------------------
   TRANSFORMA LISTA DE HABILIDADES EM TEXTO PARA O PROMPT
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

/* -----------------------------------------------------
   AssistenteIA Component
   - aceita prop opcional: onDownload(card)
------------------------------------------------------ */
export default function AssistenteIA({ onDownload }) {
  /* -----------------------------------------------------
     ESTADOS PRINCIPAIS
  ------------------------------------------------------ */
  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("iaFlashcards");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [selectedSala, setSelectedSala] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* -----------------------------------------------------
     SALVAR CARDS NO LOCAL STORAGE
  ------------------------------------------------------ */
  useEffect(() => {
    localStorage.setItem("iaFlashcards", JSON.stringify(cards));
  }, [cards]);

  /* -----------------------------------------------------
     MAPA DE EXPECTATIVAS POR SALA
  ------------------------------------------------------ */
  const mapaExpectativas = {
    "6ano": [...habilidades6, ...habilidades6e7, ...habilidades6a9],
    "7ano": [...habilidades7, ...habilidades6e7, ...habilidades6a9],
    "8ano": [...habilidades8, ...habilidades8e9, ...habilidades6a9],
    "9ano": [...habilidades9, ...habilidades8e9, ...habilidades6a9],
  };

  /* -----------------------------------------------------
     ENVIA O PROMPT PARA A IA (Gemini)
     Observação: Mantive a mesma chamada fetch que você usava.
  ------------------------------------------------------ */
  const handleSend = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!input.trim() || !selectedSala) return;

    setIsLoading(true);

    const expectativasSala = mapaExpectativas[selectedSala] || [];
    const expectativasFormatadas = formatarLista(expectativasSala);

    const API_KEY = import.meta.env.VITE_GEMINI_KEY;

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

      const fullText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Erro ao gerar conteúdo.";

      const newCard = {
        id: Date.now(),
        tema: input,
        sala: selectedSala,
        conteudo: fullText,
        // Mantive campos vazios que você pode popular depois:
        resposta: fullText, // útil se preferir usar 'resposta'
        texto: fullText, // útil se preferir usar 'texto'
        output: fullText, // útil se preferir usar 'output'
      };

      setCards((prev) => [newCard, ...prev]);
      setInput("");
      setSelectedSala("");
    } catch (error) {
      console.error("ERRO GEMINI:", error);
      alert("Erro ao gerar conteúdo. Veja o console para detalhes.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------------------------------
     UTIL: pega o texto do card olhando várias props (na ordem)
     card.resposta || card.texto || card.output || card.conteudo || ""
  ------------------------------------------------------ */
  const getCardText = (card) =>
    (card && (card.resposta || card.texto || card.output || card.conteudo)) || "";

  /* -----------------------------------------------------
     Gera PDF de UM card (usado no botão do card)
     Import dinâmico do jsPDF para reduzir bundle.
  ------------------------------------------------------ */
  const handleDownloadSinglePDF = async (card) => {
    try {
      // Se o dev passou onDownload prop, chamamos antes do save (opcional)
      if (onDownload) {
        try { onDownload(card); } catch (_) { /* ignore */ }
      }

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let y = 14;

      // Título
      doc.setFontSize(16);
      const title = card.tema || card.title || "Planejamento de Aula";
      doc.text(title, 10, y);
      y += 8;

      // Meta informações (série / data)
      doc.setFontSize(10);
      const salaLabel = card.sala ? `Turma: ${card.sala.replace("ano", "º ano")}` : "";
      const dateLabel = card.addedDate || new Date().toLocaleDateString("pt-BR");
      if (salaLabel) {
        doc.text(salaLabel, 10, y);
        y += 6;
      }
      doc.text(`Gerado em: ${dateLabel}`, 10, y);
      y += 8;

      // Conteúdo principal
      doc.setFontSize(12);
      const content = getCardText(card) || "(Sem conteúdo)";
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, 10, y);

      // Salva com nome seguro
      const safeName = (title || "planejamento").replace(/[^a-z0-9_\-]/gi, "_").slice(0, 60);
      doc.save(`${safeName}.pdf`);
    } catch (err) {
      console.error("Erro ao criar PDF:", err);
      alert("Erro ao criar o PDF. Veja o console.");
    }
  };

  /* -----------------------------------------------------
     Gera PDF a partir do conteúdo do modal (botão dentro do modal)
  ------------------------------------------------------ */
  const handleDownloadFromModal = async () => {
    if (!selectedCard) return;
    await handleDownloadSinglePDF(selectedCard);
  };

  /* -----------------------------------------------------
     INTERFACE JSX (RENDERIZAÇÃO)
  ------------------------------------------------------ */
  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Título */}
      <h2 className="text-2xl font-bold text-black mb-6">
        Assistente IA — Flashcards com Modal
      </h2>

      {/* Formulário */}
      <form onSubmit={handleSend} className="flex gap-3 mb-8">
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

        <input
          className="flex-1 bg-white border px-4 py-2 rounded-md text-black"
          placeholder="Digite o tema da aula..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-400"
          type="submit"
        >
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
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-700 font-medium">Gerando conteúdo...</p>
          </div>
        </div>
      )}

      {/* Lista de cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className="bg-blue-500 text-white p-6 rounded-xl shadow-lg cursor-pointer hover:bg-blue-600 transition"
            >
              <h3 className="text-xl font-bold">{card.tema || card.title}</h3>
              <p className="text-sm mt-1">
                Turma: {card.sala ? card.sala.replace("ano", "º ano") : "-"}
              </p>
              <p className="opacity-80 mt-2 text-sm">Clique para abrir</p>

              <div className="mt-3 flex gap-2">
                {/* Botão PDF (no card) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadSinglePDF(card);
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                >
                  <Download size={16} />
                  Baixar PDF
                </button>

                {/* Botão apagar rápido */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCards((prev) => prev.filter((c) => c.id !== card.id));
                    // Se o card aberto no modal for deletado, fecha o modal
                    if (selectedCard?.id === card.id) setSelectedCard(null);
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedCard && (
        <>
          <div
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl relative">

              <button
                className="absolute top-3 right-3 text-gray-700 hover:text-black"
                onClick={() => setSelectedCard(null)}
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-bold text-black mb-2">
                {selectedCard.tema || selectedCard.title}
              </h2>

              <p className="text-sm mb-4 text-gray-600">
                Turma: {selectedCard.sala ? selectedCard.sala.replace("ano", "º ano") : "-"}
              </p>

              <div className="text-black whitespace-pre-wrap max-h-96 overflow-y-auto mb-4">
                {getCardText(selectedCard) || "(Sem conteúdo disponível)"}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setSelectedCard(null);
                  }}
                  className="px-4 py-2 rounded-md border"
                >
                  Fechar
                </button>

                <button
                  onClick={handleDownloadFromModal}
                  className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2"
                >
                  <Download size={16} />
                  Baixar PDF
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
