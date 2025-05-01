import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Partial<Todo> & { id: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        Object.assign(todo, action.payload);
        todo.updatedAt = new Date().toISOString();
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    toggleAll: (state) => {
      const allCompleted = state.todos.every(todo => todo.completed);
      state.todos.forEach(todo => {
        todo.completed = !allCompleted;
        todo.updatedAt = new Date().toISOString();
      });
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, setFilter, clearCompleted, toggleAll } = todoSlice.actions;
export type { Todo };
export default todoSlice.reducer; 