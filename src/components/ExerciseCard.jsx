import React, { useState, useEffect } from "react";
import { SendIcon, X, Download } from "lucide-react";

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
import { div } from "framer-motion/client";

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

export default function AssistenteIA() {
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
     FUNÇÃO PRINCIPAL — ENVIA PARA GEMINI
  ------------------------------------------------------ */
  const handleSend = async (e) => {
    e.preventDefault();

    if (!input.trim() || !selectedSala) return;

    setIsLoading(true);

    const expectativasSala = mapaExpectativas[selectedSala];
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
      };

      setCards((prev) => [newCard, ...prev]);
      setInput("");
      setSelectedSala("");

    } catch (error) {
      console.error("ERRO GEMINI:", error);

    } finally {
      setIsLoading(false);
    }
  };

  /* -----------------------------------------------------
     INTERFACE JSX
  ------------------------------------------------------ */
  return (
   <div></div>
  );
}
