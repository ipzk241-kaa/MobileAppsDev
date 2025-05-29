import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>FirstMobileApp</Text>
          </View>
        </View>

        <Tab.Navigator>
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Кухар Артем ІПЗк-24-1</Text>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "white",
    height: "auto",
    paddingTop: 30,
  },
  logo: {width: 150, height: 50, objectFit: "cover",},
  title: { fontSize: 20, fontWeight: 'bold',},
  logoContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footer: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    padding: 5,
  },
  footerText: { fontSize: 12, color: 'gray' },
});
