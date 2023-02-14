import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TaskForm from './screens/TaskForm';
import TaskList from './screens/TaskList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="TaskForm" component={TaskForm} options={{title: 'Add Task'}} />
      <Stack.Screen name="TaskList" component={TaskList} options={{title: 'Task List'}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
