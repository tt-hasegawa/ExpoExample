import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../screens/TodoListScreen';
import TodoEditScreen from '../screens/TodoEditScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';

export type RootStackParamList = {
  TodoList: undefined;
  TodoEdit: { todoId?: string };
  TodoDetail: { todoId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TodoList">
        <Stack.Screen 
          name="TodoList" 
          component={TodoListScreen} 
          options={{ title: 'TODO List' }}
        />
        <Stack.Screen 
          name="TodoEdit" 
          component={TodoEditScreen} 
          options={({ route }) => ({ 
            title: route.params?.todoId ? 'Edit TODO' : 'New TODO' 
          })}
        />
        <Stack.Screen 
          name="TodoDetail" 
          component={TodoDetailScreen} 
          options={{ title: 'TODO Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}