// src/pages/Exercicios.jsx
import React, { useState, useEffect } from "react";
// Importa o componente ExerciseCard (para exibir cada exercício na lista).
import ExerciseCard from "../components/ExerciseCard";
// Importa o componente ExerciseModal (para exibir os detalhes do exercício).
import ExerciseModal from "../components/exerciseMdal"; 
// Importa a função de chamada da API Gemini para geração de exercícios.
import { generateExercisesGemini } from "../components/generateExercise";
// Importa o ícone Loader2 do lucide-react, usado para a animação de loading.
import { Loader2 } from "lucide-react";

// Constantes de informações da escola/professor(a).
const PROFESSORA = "Flavia Aparecida Cossão Viana";
const ESCOLA = "Escola SESI de Vinhedo";

// Define e exporta o componente da página Exercicios.
export default function Exercicios() {
  // Estado para armazenar a lista de todos os exercícios (fixos + gerados pela IA).
  const [exercises, setExercises] = useState([{
    // CARDS PADRÕES (FIXOS)
    // Lista inicial de exercícios pré-definidos (links externos, isAI: false).
    id: '1',
    title: 'Present Simple - Quiz',
    url: 'https://wordwall.net/pt/resource/34128739/english/aef1-u3a-present-simple',
    addedDate: '27/11/2025'
  }, {
    id: '2',
    title: 'Vocabulary Match - Quiz',
    url: 'https://wordwall.net/pt/resource/96610351/vocabulary-match',
    addedDate: '27/11/2025'
  }, {
    id: '3',
    title: 'Adjetives - Quiz',
    url: 'https://wordwall.net/pt/resource/58079332/verb-to-be/ingl%C3%AAs-verbo-to-be-adjetives',
    addedDate: '27/11/2025'
  }, {
    id: '4',
    title: 'Verb To Be - Quiz',
    url: 'https://wordwall.net/pt/resource/6786534/verb-to-be-quiz',
    addedDate: '27/11/2025'
  }, {
    id: '5',
    title: 'Present Perfect - Quiz',
    url: 'https://wordwall.net/pt/resource/2929810/present-perfect',
    addedDate: '27/11/2025'
  }, {
    id: '6',
    title: 'Past Simple Verbs - Quiz',
    url: 'https://wordwall.net/pt/resource/17530760/efl/past-simple-verbs',
    addedDate: '27/11/2025'
  }, {
    id: '7',
    title: 'Present Perfect Continuous - Quiz',
    url: 'https://wordwall.net/pt/resource/57831388/unscramble-present-continuous-by-ap',
    addedDate: '27/11/2025'
  }, {
    id: '8',
    title: 'Past or Present Perfect - Quiz',
    url: 'https://wordwall.net/pt/resource/20814909/past-or-present-perfect',
    addedDate: '27/11/2025'
  }, {
    id: '9',
    title: 'Future Tense - Quiz',
    url: 'https://wordwall.net/pt/resource/5951512/future-tenses',
    addedDate: '27/11/2025'
  }]);

  // Estados do formulário de geração de exercícios (entrada do usuário).
  const [tema, setTema] = useState("");
  const [quantidade, setQuantidade] = useState(""); // Quantidade de exercícios a gerar.
  const [turma, setTurma] = useState(""); // Turma para a qual os exercícios são destinados.
  const [loading, setLoading] = useState(false); // Estado de carregamento da requisição Gemini.

  // Estados para o Modal de Visualização.
  const [modalOpen, setModalOpen] = useState(false); // Controla se o modal está aberto.
  const [selectedExercise, setSelectedExercise] = useState(null); // Armazena o exercício a ser exibido no modal.

  // Efeito colateral: Salva o estado dos exercícios no Local Storage.
  // Nota: A chave usa a `turma`, o que pode ser problemático, pois o save ocorrerá toda vez que a `turma` mudar, mesmo sem gerar exercício.
  useEffect(() => {
    localStorage.setItem(`Exercícios do ${turma}`, JSON.stringify(exercises));
  }, [exercises, turma]); // Dependências: 'exercises' e 'turma'.

  // Função assíncrona para iniciar a geração de exercícios via IA.
  const handleGerar = async () => {
    // Sai da função se o campo 'tema' estiver vazio.
    if (!tema.trim()) return;
    setLoading(true); // Ativa o estado de loading.

    try {
      // Chama a função externa para interagir com a API Gemini.
      const output = await generateExercisesGemini({
        tema,
        // Garante que a quantidade seja um número inteiro antes de passar para a API.
        quantidade: parseInt(quantidade, 10),
        turma,
      });

      // Cria um novo objeto para o card gerado pela IA.
      const uniqueCard = {
        id: Date.now().toString(),
        title: `Exercícios: ${tema} — ${turma}`,
        // O output da IA é salvo na descrição. O modal exibirá essa descrição.
        description: output, 
        answer: "", // Gabarito (não usado neste ponto, mas reservado).
        addedDate: new Date().toLocaleDateString("pt-BR"),
        isAI: true, // Flag para indicar que o card foi gerado por IA.
      };

      // Adiciona o novo card (gerado pela IA) ao início da lista de exercícios.
      setExercises((prev) => [uniqueCard, ...prev]);
      // Limpa o campo do tema após o sucesso.
      setTema("");
    } catch (err) {
      console.error("Erro ao gerar exercícios:", err);
      alert("Erro ao gerar exercícios. Veja o console.");
    } finally {
      setLoading(false); // Desativa o estado de loading.
    }
  };

  // Função que gera PDF de um único card usando jspdf (import dinâmico).
  const handleDownloadSinglePDF = async (exercise) => {
    // Importa o jspdf dinamicamente.
    const { jsPDF } = await import("jspdf");

    const doc = new jsPDF();
    let y = 12; // Posição inicial Y no documento.

    // Título
    doc.setFontSize(18);
    doc.text(exercise.title, 10, y);
    y += 10;

    // Conteúdo (Descrição/Exercícios)
    doc.setFontSize(12);
    const content = exercise.description || "";
    // Usa splitTextToSize para quebrar o texto longo em várias linhas que caibam na página.
    const lines = doc.splitTextToSize(content, 180);
    doc.text(lines, 10, y);
    // Ajusta a posição Y para o próximo elemento.
    y += lines.length * 6; 

    // Data de Geração
    doc.setFontSize(10);
    doc.text(`Gerado em: ${exercise.addedDate}`, 10, y);

    // Cria um nome de arquivo seguro a partir do título.
    const safeName = exercise.title.replace(/[^a-z0-9_\-]/gi, "_").slice(0, 60);

    doc.save(`${safeName}.pdf`); // Salva o arquivo.
  };


  // Renderiza a interface do componente.
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Exercícios Dinâmicos (IA) — {PROFESSORA}
        </h1>

        {/* FORMULÁRIO DE GERAÇÃO */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Gerar Exercícios</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Campo Tema */}
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

            {/* Dropdown Quantidade */}
            <div>
              <label className="block text-sm font-medium">Quantidade</label>
              <select
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option >selecione uma quantidade</option>
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </div>

            {/* Dropdown Turma */}
            <div>
              <label className="block text-sm font-medium">Turma</label>
              <select
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>selecione uma turma</option>
                <option>6º Ano</option>
                <option>7º Ano</option>
                <option>8º Ano</option>
                <option>9º Ano</option>
              </select>
            </div>
          </div>

          {/* Botão Gerar */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleGerar}
              disabled={loading} // Desabilita durante o loading
              className="px-5 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 disabled:opacity-60"
            >
              {/* Exibe o spinner de loading ou o texto do botão */}
              {loading ? <Loader2 className="animate-spin" /> : "Gerar exercícios"}
            </button>
          </div>
        </div>

        {/* LISTA DE CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.map((ex) => (
            // Renderiza um ExerciseCard para cada exercício na lista.
            <ExerciseCard
              key={ex.id}
              {...ex} // Passa todas as propriedades do exercício como props.
              // Define o comportamento ao clicar: abre o modal com o exercício selecionado.
              onClick={() => {
                setSelectedExercise(ex);
                setModalOpen(true);
              }}
              // Função para deletar: remove o exercício da lista através da filtragem.
              onDelete={() =>
                setExercises((prev) => prev.filter((p) => p.id !== ex.id))
              }
              // Função para download: chama a função de geração de PDF.
              onDownload={() => handleDownloadSinglePDF(ex)}
            />
          ))}
        </div>

        {/* MODAL DE VISUALIZAÇÃO */}
        <ExerciseModal
          open={modalOpen} // Visibilidade controlada pelo estado.
          onClose={() => setModalOpen(false)} // Função para fechar o modal.
          exercise={selectedExercise} // Passa o objeto de exercício selecionado.
        />
      </div>
    </div>
  );
}