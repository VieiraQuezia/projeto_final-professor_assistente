// ...existing code...
import React, { useState } from "react";
import  ExerciseCard  from "../components/ExerciseCard";
import { Plus } from "lucide-react";

export default function Exercicios() {
  const [exercises, setExercises] = useState([{
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