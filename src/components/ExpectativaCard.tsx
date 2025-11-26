import React from 'react';
import { BookOpen } from 'lucide-react';
interface ExpectativaCardProps {
  keyword: string;
  description: string;
  grade: string;
}
export function ExpectativaCard({
  keyword,
  description,
  grade
}: ExpectativaCardProps) {
  const gradeColors: Record<string, string> = {
    '6': 'bg-green-100 text-green-800',
    '7': 'bg-blue-100 text-blue-800',
    '8': 'bg-purple-100 text-purple-800',
    '9': 'bg-orange-100 text-orange-800'
  };
  return <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 text-[#1E88E5]">
          <BookOpen className="w-5 h-5 flex-shrink-0" />
          <h3 className="font-semibold text-lg">{keyword}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${gradeColors[grade] || 'bg-gray-100 text-gray-800'}`}>
          {grade}º ano
        </span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>;
}