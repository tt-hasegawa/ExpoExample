// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

import { storageUtils } from '../utils/storage';
import { Todo } from '../models/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('storageUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveTodos', () => {
    it('should save todos to AsyncStorage', async () => {
      const todos: Todo[] = [
        {
          id: '1',
          title: 'Test Todo',
          description: 'Test Description',
          completed: false,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T10:00:00Z'),
        },
      ];

      mockAsyncStorage.setItem.mockResolvedValue(undefined);

      await storageUtils.saveTodos(todos);

      expect(mockAsyncStorage.setItem).toHaveBeenCalledWith(
        '@todos',
        JSON.stringify([
          {
            id: '1',
            title: 'Test Todo',
            description: 'Test Description',
            completed: false,
            createdAt: '2023-01-01T10:00:00.000Z',
            updatedAt: '2023-01-01T10:00:00.000Z',
          },
        ])
      );
    });

    it('should handle save errors', async () => {
      const todos: Todo[] = [];
      const error = new Error('Storage error');
      mockAsyncStorage.setItem.mockRejectedValue(error);

      await expect(storageUtils.saveTodos(todos)).rejects.toThrow('Storage error');
    });
  });

  describe('loadTodos', () => {
    it('should load todos from AsyncStorage', async () => {
      const storedData = JSON.stringify([
        {
          id: '1',
          title: 'Test Todo',
          description: 'Test Description',
          completed: false,
          createdAt: '2023-01-01T10:00:00.000Z',
          updatedAt: '2023-01-01T10:00:00.000Z',
        },
      ]);

      mockAsyncStorage.getItem.mockResolvedValue(storedData);

      const todos = await storageUtils.loadTodos();

      expect(todos).toHaveLength(1);
      expect(todos[0]).toMatchObject({
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
      });
      expect(todos[0].createdAt).toBeInstanceOf(Date);
      expect(todos[0].updatedAt).toBeInstanceOf(Date);
    });

    it('should return empty array when no data exists', async () => {
      mockAsyncStorage.getItem.mockResolvedValue(null);

      const todos = await storageUtils.loadTodos();

      expect(todos).toEqual([]);
    });

    it('should handle load errors', async () => {
      mockAsyncStorage.getItem.mockRejectedValue(new Error('Storage error'));

      const todos = await storageUtils.loadTodos();

      expect(todos).toEqual([]);
    });
  });

  describe('clearTodos', () => {
    it('should clear todos from AsyncStorage', async () => {
      mockAsyncStorage.removeItem.mockResolvedValue(undefined);

      await storageUtils.clearTodos();

      expect(mockAsyncStorage.removeItem).toHaveBeenCalledWith('@todos');
    });

    it('should handle clear errors', async () => {
      const error = new Error('Storage error');
      mockAsyncStorage.removeItem.mockRejectedValue(error);

      await expect(storageUtils.clearTodos()).rejects.toThrow('Storage error');
    });
  });
});