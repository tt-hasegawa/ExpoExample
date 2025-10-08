import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTodos } from '../hooks/useTodos';
import TodoForm from '../components/TodoForm';
import { CreateTodoInput, UpdateTodoInput } from '../models/todo';

type Props = NativeStackScreenProps<RootStackParamList, 'TodoEdit'>;

export default function TodoEditScreen({ navigation, route }: Props) {
  const { todoId } = route.params || {};
  const { createTodo, updateTodo, getTodoById } = useTodos();
  const [loading, setLoading] = useState(false);

  const todo = todoId ? getTodoById(todoId) : undefined;
  const isEditing = !!todo;

  const handleSave = async (input: CreateTodoInput | UpdateTodoInput) => {
    try {
      setLoading(true);
      
      if (isEditing && todoId) {
        await updateTodo(todoId, input as UpdateTodoInput);
      } else {
        await createTodo(input as CreateTodoInput);
      }
      
      navigation.goBack();
    } catch {
      Alert.alert(
        'Error',
        `Failed to ${isEditing ? 'update' : 'create'} todo`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  // If editing but todo not found, show error
  if (isEditing && !todo) {
    React.useEffect(() => {
      Alert.alert(
        'Error',
        'Todo not found',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }, [navigation]);

    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <TodoForm
        todo={todo}
        onSave={handleSave}
        onCancel={handleCancel}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});