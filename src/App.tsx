import React, { useState } from 'react';
import { Todo, TodoFormData, TaskFilter, Category } from './types/todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodoSearch } from './components/TodoSearch';
import { TodoFilters } from './components/TodoFilters';
import { Button } from './components/ui/Button';
import { ListTodo, Plus, X } from 'lucide-react';
import { useTodoFilters } from './hooks/useTodoFilters';

// Demo categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Work', color: '#2563eb' },
  { id: '2', name: 'Personal', color: '#16a34a' },
  { id: '3', name: 'Shopping', color: '#9333ea' },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [categories] = useState<Category[]>(defaultCategories);

  const filteredTodos = useTodoFilters(todos, filter, search);

  const handleAddTodo = (data: TodoFormData) => {
    const newTodo: Todo = {
      ...data,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
    setShowForm(false);
  };

  const handleUpdateTodo = (data: TodoFormData) => {
    if (!editingTodo) return;
    const updatedTodos = todos.map((todo) =>
      todo.id === editingTodo.id
        ? { ...todo, ...data }
        : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Todo Dashboard</h1>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            icon={showForm ? X : Plus}
          >
            {showForm ? 'Close' : 'Add Task'}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[1fr,auto]">
            <TodoSearch value={search} onChange={setSearch} />
            <TodoFilters currentFilter={filter} onFilterChange={setFilter} />
          </div>

          {(showForm || editingTodo) && (
            <TodoForm
              onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
              initialData={editingTodo || undefined}
              onCancel={() => {
                setShowForm(false);
                setEditingTodo(null);
              }}
              categories={categories}
            />
          )}

          <TodoList
            todos={filteredTodos}
            onEdit={setEditingTodo}
            onDelete={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}

export default App;