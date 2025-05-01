'use client';

import Link from 'next/link';
import { useAppSelector } from '@/lib/dispatch';
import { toggleTodo, deleteTodo } from '@/store/slices/todoSlice';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';

export default function TodosPage() {
  const todos = useAppSelector((state) => state.todos.todos);

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
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
            {todos.length === 0 && (
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