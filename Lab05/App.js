import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FileViewerScreen from './screens/FileViewerScreen';
import EditFileScreen from './screens/EditFileScreen';
import { ensureAppFolder } from './components/fileUtils';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    ensureAppFolder();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ViewFile" component={FileViewerScreen} />
        <Stack.Screen name="EditFile" component={EditFileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
