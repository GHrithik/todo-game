import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 ${className}`}>
      {children}
    </div>
  );
}