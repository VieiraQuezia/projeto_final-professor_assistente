// ...existing code...
import React, { useState } from "react";
import { ExerciseCard } from "../components/ExerciseCard";
import { Plus } from "lucide-react";

export default function Exercicios() {
  const [exercises, setExercises] = useState([{
    id: '1',
    title: 'Present Simple Quiz',
    url: 'https://wordwall.net/resource/123456',
    addedDate: '15/01/2024'
  }, {
    id: '2',
    title: 'Vocabulary Match - Family',
    url: 'https://wordwall.net/resource/234567',
    addedDate: '10/01/2024'
  }]);

  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAddExercise = () => {
    if (!newTitle.trim() || !newUrl.trim()) return;
    const newExercise = {
      id: Date.now().toString(),
      title: newTitle,
      url: newUrl,
      addedDate: new Date().toLocaleDateString('pt-BR')
    };
    setExercises([newExercise, ...exercises]);
    setNewTitle('');
    setNewUrl('');
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  return <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Exercícios Dinâmicos
        </h1>

        {/* Add Exercise Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Adicionar Novo Exercício
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título do Exercício
              </label>
              <input id="title" type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Ex: Quiz de Verbos Irregulares" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Link do WordWall
              </label>
              <input id="url" type="url" value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="Cole o link do WordWall aqui..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent" />
            </div>
            <button onClick={handleAddExercise} disabled={!newTitle.trim() || !newUrl.trim()} className="w-full sm:w-auto px-6 py-3 bg-[#1E88E5] text-white rounded-lg hover:bg-[#0D47A1] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Adicionar Exercício
            </button>
          </div>
        </div>

        {/* Exercise List */}
        {exercises.length === 0 ? <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 mb-2">
              Nenhum exercício adicionado ainda
            </p>
            <p className="text-sm text-gray-400">
              Adicione exercícios do WordWall usando o formulário acima
            </p>
          </div> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map(exercise => <ExerciseCard key={exercise.id} {...exercise} onDelete={() => handleDeleteExercise(exercise.id)} />)}
          </div>}
      </div>
    </div>;
}
// ...existing code...