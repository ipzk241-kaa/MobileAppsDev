import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import GuestStack from "./navigation/GuestStack";
import AppStack from "./navigation/AppStack";

const AppContent = () => {
  return (
    <NavigationContainer>
      <GuestStack />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}