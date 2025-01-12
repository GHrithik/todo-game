import { useMemo } from 'react';
import { Todo, TaskFilter } from '../types/todo';

export function useTodoFilters(
  todos: Todo[],
  filter: TaskFilter,
  search: string,
  categoryId?: string
) {
  return useMemo(() => {
    let filteredTodos = [...todos];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTodos = filteredTodos.filter(
        todo =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (categoryId) {
      filteredTodos = filteredTodos.filter(todo => todo.categoryId === categoryId);
    }

    // Apply date filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'today':
        filteredTodos = filteredTodos.filter(todo => {
          const dueDate = new Date(todo.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() === today.getTime();
        });
        break;
      case 'upcoming':
        filteredTodos = filteredTodos.filter(todo => {
          const dueDate = new Date(todo.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() > today.getTime();
        });
        break;
      case 'overdue':
        filteredTodos = filteredTodos.filter(todo => {
          const dueDate = new Date(todo.dueDate);
          dueDate.setHours(0, 0, 0, 0);
          return dueDate.getTime() < today.getTime() && !todo.completed;
        });
        break;
    }

    return filteredTodos;
  }, [todos, filter, search, categoryId]);
}