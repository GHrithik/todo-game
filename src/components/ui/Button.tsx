import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: LucideIcon;
}

export function Button({ 
  children, 
  variant = 'primary', 
  icon: Icon,
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}