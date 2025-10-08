import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Todo } from '../models/todo';

interface TodoItemProps {
  todo: Todo;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TodoItem({ todo, onPress, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainContent}
        onPress={onPress}
        accessibilityLabel={`Todo: ${todo.title}`}
        accessibilityHint="Tap to view details"
      >
        <View style={styles.textContainer}>
          <Text 
            style={[
              styles.title,
              todo.completed && styles.completedTitle
            ]}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Text 
              style={[
                styles.description,
                todo.completed && styles.completedDescription
              ]}
              numberOfLines={2}
            >
              {todo.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      
      <View style={styles.actions}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            todo.completed && styles.completedToggleButton
          ]}
          onPress={onToggle}
          accessibilityLabel={todo.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          <Text style={styles.toggleButtonText}>
            {todo.completed ? '✓' : '○'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          accessibilityLabel="Delete todo"
        >
          <Text style={styles.deleteButtonText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  completedDescription: {
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  toggleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  completedToggleButton: {
    backgroundColor: '#007AFF',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
  },
});