// ...existing code...
import React from 'react';
import { Github } from 'lucide-react';

export function Footer() {
  return <footer className="bg-[#0D47A1] text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold">SENAI Valinhos - Unidade Vinhedo</p>
            <p className="text-sm text-blue-200">
              4º Termo | Projeto Integrador
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-blue-200 transition-colors">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-blue-700 text-center text-sm text-blue-200">
          <p>© 2024 Professor Assistente - Desenvolvido com React e IA</p>
        </div>
      </div>
    </footer>;
}
// ...existing code...