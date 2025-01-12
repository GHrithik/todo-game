import React from 'react';
import { Input } from './ui/Input';
import { Search } from 'lucide-react';

interface TodoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function TodoSearch({ value, onChange }: TodoSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 
          focus:border-blue-500 focus:ring-blue-500 
          placeholder:text-gray-400"
      />
    </div>
  );
}