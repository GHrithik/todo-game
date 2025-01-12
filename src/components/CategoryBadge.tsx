import React from 'react';
import { Category } from '../types/todo';

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
      }}
    >
      {category.name}
    </span>
  );
}