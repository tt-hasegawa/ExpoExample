import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../models/todo';

const TODOS_STORAGE_KEY = '@todos';

export const storageUtils = {
  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(todos.map(todo => ({
        ...todo,
        createdAt: todo.createdAt.toISOString(),
        updatedAt: todo.updatedAt.toISOString(),
      })));
      await AsyncStorage.setItem(TODOS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving todos:', error);
      throw error;
    }
  },

  async loadTodos(): Promise<Todo[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(TODOS_STORAGE_KEY);
      if (jsonValue === null) {
        return [];
      }
      const parsedTodos = JSON.parse(jsonValue);
      return parsedTodos.map((todo: { id: string; title: string; description?: string; completed: boolean; createdAt: string; updatedAt: string }) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      }));
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  },

  async clearTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TODOS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing todos:', error);
      throw error;
    }
  },
};