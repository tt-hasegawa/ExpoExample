import { useState, useEffect, useCallback } from 'react';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../models/todo';
import { storageUtils } from '../utils/storage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from AsyncStorage on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const loadedTodos = await storageUtils.loadTodos();
      setTodos(loadedTodos);
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTodo = useCallback(async (input: CreateTodoInput): Promise<Todo> => {
    try {
      setError(null);
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: input.title,
        description: input.description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedTodos = [...todos, newTodo];
      await storageUtils.saveTodos(updatedTodos);
      setTodos(updatedTodos);
      return newTodo;
    } catch (err) {
      const errorMessage = 'Failed to create todo';
      setError(errorMessage);
      console.error('Error creating todo:', err);
      throw new Error(errorMessage);
    }
  }, [todos]);

  const updateTodo = useCallback(async (id: string, input: UpdateTodoInput): Promise<Todo> => {
    try {
      setError(null);
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex === -1) {
        throw new Error('Todo not found');
      }

      const updatedTodo: Todo = {
        ...todos[todoIndex],
        ...input,
        updatedAt: new Date(),
      };

      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = updatedTodo;
      
      await storageUtils.saveTodos(updatedTodos);
      setTodos(updatedTodos);
      return updatedTodo;
    } catch (err) {
      const errorMessage = 'Failed to update todo';
      setError(errorMessage);
      console.error('Error updating todo:', err);
      throw new Error(errorMessage);
    }
  }, [todos]);

  const deleteTodo = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      const updatedTodos = todos.filter(todo => todo.id !== id);
      await storageUtils.saveTodos(updatedTodos);
      setTodos(updatedTodos);
    } catch (err) {
      const errorMessage = 'Failed to delete todo';
      setError(errorMessage);
      console.error('Error deleting todo:', err);
      throw new Error(errorMessage);
    }
  }, [todos]);

  const toggleTodo = useCallback(async (id: string): Promise<void> => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  }, [todos, updateTodo]);

  const getTodoById = useCallback((id: string): Todo | undefined => {
    return todos.find(todo => todo.id === id);
  }, [todos]);

  return {
    todos,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    getTodoById,
    refreshTodos: loadTodos,
  };
};