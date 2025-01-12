import React from 'react';
import { TaskFilter } from '../types/todo';
import { Button } from './ui/Button';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

interface TodoFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const filters: { value: TaskFilter; label: string; icon: any }[] = [
  { value: 'all', label: 'All', icon: Calendar },
  { value: 'today', label: 'Today', icon: Clock },
  { value: 'upcoming', label: 'Upcoming', icon: Calendar },
  { value: 'overdue', label: 'Overdue', icon: AlertCircle },
];

export function TodoFilters({ currentFilter, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={currentFilter === value ? 'primary' : 'secondary'}
          onClick={() => onFilterChange(value)}
          icon={Icon}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}