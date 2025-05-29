import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';
import tasksData from './data/tasks';

export const GameContext = React.createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState(tasksData);
  const [counts, setCounts] = useState({
    tap: 0,
    doubleTap: 0,
    longPress: 0,
    pan: 0,
    swipeRight: 0,
    swipeLeft: 0,
    pinch: 0,
  });

  const updateTasks = () => {
    const updated = tasks.map(task => {
      switch (task.id) {
        case 1: return { ...task, completed: counts.tap >= 10 };
        case 2: return { ...task, completed: counts.doubleTap >= 5 };
        case 3: return { ...task, completed: counts.longPress > 0 };
        case 4: return { ...task, completed: counts.pan > 0 };
        case 5: return { ...task, completed: counts.swipeRight > 0 };
        case 6: return { ...task, completed: counts.swipeLeft > 0 };
        case 7: return { ...task, completed: counts.pinch > 0 };
        case 8: return { ...task, completed: score >= 100 };
        default: return task;
      }
    });
    setTasks(updated);
  };

  return (
    <GameContext.Provider value={{ score, setScore, counts, setCounts, tasks, updateTasks }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameContext.Provider>
  );
}
