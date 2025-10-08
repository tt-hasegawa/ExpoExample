import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTodos } from '../hooks/useTodos';
import TodoItem from '../components/TodoItem';
import { Todo } from '../models/todo';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoList'>;

export default function TodoListScreen({ navigation }: Props) {
  const { todos, loading, error, deleteTodo, toggleTodo, refreshTodos } = useTodos();

  const handleTodoPress = (todo: Todo) => {
    navigation.navigate('TodoDetail', { todoId: todo.id });
  };

  const handleDeleteTodo = (todo: Todo) => {
    Alert.alert(
      'Delete TODO',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteTodo(todo.id)
        },
      ]
    );
  };

  const handleToggleTodo = (todo: Todo) => {
    toggleTodo(todo.id);
  };

  const handleAddTodo = () => {
    navigation.navigate('TodoEdit', {});
  };

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem
      todo={item}
      onPress={() => handleTodoPress(item)}
      onToggle={() => handleToggleTodo(item)}
      onDelete={() => handleDeleteTodo(item)}
    />
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No TODOs yet</Text>
      <Text style={styles.emptyDescription}>
        Tap the + button to create your first TODO
      </Text>
    </View>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={handleAddTodo}
          style={styles.addButton}
          accessibilityLabel="Add new todo"
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={refreshTodos}
          accessibilityLabel="Retry loading todos"
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyList}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refreshTodos}
          />
        }
        contentContainerStyle={todos.length === 0 ? styles.emptyListContainer : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3333',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});