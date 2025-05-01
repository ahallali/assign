'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/dispatch';
import { toggleTodo, deleteTodo, setFilter } from '@/store/slices/todoSlice';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';

export default function TodosPage() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    dispatch(setFilter(newFilter));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Todo App
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              Logout
            </button>
          </div>
        </div>

        <TodoForm />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {['all', 'active', 'completed'].map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f as 'all' | 'active' | 'completed')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    filter === f
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            {filteredTodos.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No tasks yet. Add your first task to get started
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}