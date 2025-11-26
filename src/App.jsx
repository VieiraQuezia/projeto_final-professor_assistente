import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Expectativas } from './pages/Expectativas';
import { Exercicios } from './pages/Exercicios';
import { AssistenteIA } from './pages/AssistenteIA';
import { Sobre } from './pages/Sobre';
export default function App() {
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expectativas" element={<Expectativas />} />
            <Route path="/exercicios" element={<Exercicios />} />
            <Route path="/assistente" element={<AssistenteIA />} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>;
}