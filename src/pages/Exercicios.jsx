// src/pages/Exercicios.jsx
import React, { useState } from "react";
import ExerciseCard from "../components/ExerciseCard";
import ExerciseModal from "../components/exerciseMdal"; // nome do seu modal
import { generateExercisesGemini } from "../components/generateExercise";
import { Loader2 } from "lucide-react";

const PROFESSORA = "Flavia Aparecida Cossão Viana";
const ESCOLA = "Escola SESI de Vinhedo";

export default function Exercicios() {
  const [exercises, setExercises] = useState([
    // CARDS PADRÕES (FIXOS)
    {
      id: "1",
      title: "Present Simple - Quiz",
      url: "https://wordwall.net/pt/resource/34128739/english/aef1-u3a-present-simple",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "2",
      title: "Vocabulary Match - Quiz",
      url: "https://wordwall.net/pt/resource/96610351/vocabulary-match",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "3",
      title: "Adjetives - Quiz",
      url: "https://wordwall.net/pt/resource/58079332/verb-to-be/ingl%C3%AAs-verbo-to-be-adjetives",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "4",
      title: "Verb To Be - Quiz",
      url: "https://wordwall.net/pt/resource/6786534/verb-to-be-quiz",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "5",
      title: "Present Perfect - Quiz",
      url: "https://wordwall.net/pt/resource/2929810/present-perfect",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "6",
      title: "Past Simple Verbs - Quiz",
      url: "https://wordwall.net/pt/resource/17530760/efl/past-simple-verbs",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "7",
      title: "Present Perfect Continuous - Quiz",
      url: "https://wordwall.net/pt/resource/57831388/unscramble-present-continuous-by-ap",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "8",
      title: "Past or Present Perfect - Quiz",
      url: "https://wordwall.net/pt/resource/20814909/past-or-present-perfect",
      addedDate: "27/11/2025",
      isAI: false,
    },
    {
      id: "9",
      title: "Future Tense - Quiz",
      url: "https://wordwall.net/pt/resource/5951512/future-tenses",
      addedDate: "27/11/2025",
      isAI: false,
    },
  ]);

  const [tema, setTema] = useState("");
  const [quantidade, setQuantidade] = useState("5");
  const [turma, setTurma] = useState("6º Ano");
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // Gera exercícios via Gemini e insere 1 card IA (com todo o texto)
  const handleGerar = async () => {
    if (!tema.trim()) return;
    setLoading(true);

    try {
      const output = await generateExercisesGemini({
        tema,
        quantidade: parseInt(quantidade, 10),
        turma,
      });

      const uniqueCard = {
        id: Date.now().toString(),
        title: `Exercícios: ${tema} — ${turma}`,
        description: output,
        answer: "",
        addedDate: new Date().toLocaleDateString("pt-BR"),
        isAI: true,
      };

      setExercises((prev) => [uniqueCard, ...prev]);
      setTema("");
    } catch (err) {
      console.error("Erro ao gerar exercícios:", err);
      alert("Erro ao gerar exercícios. Veja o console.");
    } finally {
      setLoading(false);
    }
  };

  // Função que gera PDF de 1 card (passada para ExerciseCard)
  const handleDownloadSinglePDF = (exercise) => {
    // import dynamic to avoid SSR issues? Here we assume client-side.
    const jsPDF = require("jspdf").jsPDF ?? require("jspdf");
    const doc = new jsPDF();
    let y = 12;

    doc.setFontSize(18);
    doc.text(exercise.title, 10, y);
    y += 10;

    doc.setFontSize(12);

    const content = exercise.description || "";
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, y);
    y += lines.length * 6;

    doc.setFontSize(10);
    doc.text(`Gerado em: ${exercise.addedDate}`, 10, y);

    // nome seguro para arquivo
    const safeName = exercise.title.replace(/[^a-z0-9_\-]/gi, "_").slice(0, 60);
    doc.save(`${safeName}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Exercícios Dinâmicos (IA) — {PROFESSORA}
        </h1>

        {/* FORM */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Gerar Exercícios</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium">Tema</label>
              <input
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
                placeholder="Ex: Simple Past, Vocabulary, etc..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Quantidade</label>
              <select
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Turma</label>
              <select
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>6º Ano</option>
                <option>7º Ano</option>
                <option>8º Ano</option>
                <option>9º Ano</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleGerar}
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Gerar exercícios"}
            </button>
          </div>
        </div>

        {/* LISTA DE CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((ex) => (
            <ExerciseCard
              key={ex.id}
              {...ex}
              onClick={() => {
                setSelectedExercise(ex);
                setModalOpen(true);
              }}
              onDelete={() =>
                setExercises((prev) => prev.filter((p) => p.id !== ex.id))
              }
              onDownload={() => handleDownloadSinglePDF(ex)}
            />
          ))}
        </div>

        <ExerciseModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          exercise={selectedExercise}
        />
      </div>
    </div>
  );
}
