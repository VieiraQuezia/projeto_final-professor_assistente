// ...existing code...
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const links = [
    { to: '/', label: 'Início' },
    { to: '/expectativas', label: 'Expectativas' },
    { to: '/exercicios', label: 'Exercícios' },
    { to: '/assistente', label: 'Assistente IA' },
    { to: '/sobre', label: 'Sobre' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-[#1E88E5] font-bold text-lg">
            <BookOpen className="w-6 h-6" />
            <span className="hidden sm:inline">Professor Assistente</span>
            <span className="sm:hidden">Prof. Assistente</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${isActive(link.to) ? 'text-[#1E88E5] border-b-2 border-[#1E88E5] pb-1' : 'text-gray-700 hover:text-[#1E88E5]'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700 hover:text-[#1E88E5]" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 text-sm font-medium transition-colors ${isActive(link.to) ? 'text-[#1E88E5] bg-blue-50' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
// ...existing code...