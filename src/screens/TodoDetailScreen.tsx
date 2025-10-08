import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTodos } from '../hooks/useTodos';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoDetail'>;

export default function TodoDetailScreen({ navigation, route }: Props) {
  const { todoId } = route.params;
  const { getTodoById, deleteTodo, toggleTodo } = useTodos();
  
  const todo = getTodoById(todoId);

  React.useLayoutEffect(() => {
    if (todo) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity 
            onPress={handleEdit}
            style={styles.editButton}
            accessibilityLabel="Edit todo"
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, todo]);

  const handleEdit = () => {
    navigation.navigate('TodoEdit', { todoId });
  };

  const handleDelete = () => {
    if (!todo) return;
    
    Alert.alert(
      'Delete TODO',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deleteTodo(todoId);
            navigation.goBack();
          }
        },
      ]
    );
  };

  const handleToggle = () => {
    if (todo) {
      toggleTodo(todoId);
    }
  };

  // If todo not found, show error
  if (!todo) {
    React.useEffect(() => {
      Alert.alert(
        'Error',
        'Todo not found',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, [navigation]);

    return <View style={styles.container} />;
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, todo.completed && styles.completedTitle]}>
            {todo.title}
          </Text>
          <View style={styles.statusContainer}>
            <Text style={[styles.status, todo.completed && styles.completedStatus]}>
              {todo.completed ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        {todo.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={[styles.description, todo.completed && styles.completedText]}>
              {todo.description}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Created:</Text>
            <Text style={styles.detailValue}>{formatDate(todo.createdAt)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Updated:</Text>
            <Text style={styles.detailValue}>{formatDate(todo.updatedAt)}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.toggleButton]}
            onPress={handleToggle}
            accessibilityLabel={todo.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            <Text style={styles.toggleButtonText}>
              {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
            accessibilityLabel="Delete todo"
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  completedStatus: {
    color: '#4caf50',
    backgroundColor: '#e8f5e8',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  completedText: {
    color: '#999',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  actions: {
    marginTop: 16,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    minHeight: 48,
  },
  toggleButton: {
    backgroundColor: '#007AFF',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff3333',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});