import React from 'react';
import { Todo } from '../types/todo';
import { Calendar, CheckCircle2, Circle, Clock, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const priorityStyles = {
  low: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  medium: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  high: 'bg-red-50 text-red-700 ring-red-600/20',
};

export function TodoItem({ todo, onEdit, onDelete, onToggleComplete }: TodoItemProps) {
  return (
    <Card className={`p-4 transition-all duration-200 hover:shadow-md ${
      todo.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className="mt-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          {todo.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1">
          <h3 className={`text-lg font-medium ${
            todo.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {todo.title}
          </h3>
          
          <p className="text-gray-600 mt-1 text-sm">{todo.description}</p>
          
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset
              ${priorityStyles[todo.priority]}`}>
              {todo.priority}
            </span>
            
            <span className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(todo.dueDate).toLocaleDateString()}
            </span>
            
            <span className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(todo.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => onEdit(todo)}
            icon={Edit}
            className="!p-2"
            aria-label="Edit task"
          />
          <Button
            variant="danger"
            onClick={() => onDelete(todo.id)}
            icon={Trash2}
            className="!p-2"
            aria-label="Delete task"
          />
        </div>
      </div>
    </Card>
  );
}