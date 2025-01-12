import React, { useEffect, useState } from 'react';
import { Priority, Todo, TodoFormData } from '../types/todo';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { X } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  initialData?: Todo;
  onCancel?: () => void;
}

export function TodoForm({ onSubmit, initialData, onCancel }: TodoFormProps) {
  const [formData, setFormData] = useState<TodoFormData>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium' as Priority,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        dueDate: initialData.dueDate.split('T')[0],
        priority: initialData.priority,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          id="title"
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter task title"
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500
              placeholder:text-gray-400"
            rows={3}
            placeholder="Enter task description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Due Date"
            id="dueDate"
            type="date"
            required
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {onCancel && (
            <Button type="button" variant="secondary" icon={X} onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {initialData ? 'Update Task' : 'Add Task'}
          </Button>
        </div>
      </form>
    </Card>
  );
}