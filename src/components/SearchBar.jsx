import React from 'react';
import { Search } from 'lucide-react';
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
export function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar...'
}: SearchBarProps) {
  return <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent" />
    </div>;
}
