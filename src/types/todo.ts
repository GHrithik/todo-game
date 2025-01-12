export type Priority = 'low' | 'medium' | 'high';
export type TaskView = 'list' | 'calendar' | 'kanban';
export type TaskFilter = 'all' | 'today' | 'upcoming' | 'overdue';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
  categoryId?: string;
  reminder?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
  };
}

export type TodoFormData = Omit<Todo, 'id' | 'completed' | 'createdAt'>;