import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptionsStack = {
  headerStyle: { backgroundColor: "#1e1e1e" },
  headerTintColor: "#e0e0e0",
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={screenOptionsStack}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

const RegisterStack = () => (
  <Stack.Navigator screenOptions={screenOptionsStack}>
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const PostsStack = () => (
  <Stack.Navigator screenOptions={screenOptionsStack}>
    <Stack.Screen name="Posts" component={PostsScreen} />
    <Stack.Screen name="CreatePost" component={CreatePostScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={screenOptionsStack}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const AppTabs = ({ userToken }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#4a90e2",
      tabBarInactiveTintColor: "#888",
      tabBarStyle: {
        backgroundColor: "#1e1e1e",
        height: 70,
        paddingBottom: 10,
        paddingTop: 5,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.7,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -3 },
      },
      tabBarIcon: ({ color, size }) => {
        let iconName;
        switch (route.name) {
          case "PostsTab":
            iconName = "list";
            break;
          case "ProfileTab":
            iconName = "person-circle";
            break;
          case "LoginTab":
            iconName = "log-in";
            break;
          case "RegisterTab":
            iconName = "person-add";
            break;
          default:
            iconName = "ellipse";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    {userToken ? (
      <>
        <Tab.Screen name="PostsTab" component={PostsStack} options={{ title: "Пости" }} />
        <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: "Профіль" }} />
      </>
    ) : (
      <>
        <Tab.Screen name="LoginTab" component={AuthStack} options={{ title: "Вхід" }} />
        <Tab.Screen name="RegisterTab" component={RegisterStack} options={{ title: "Реєстрація" }} />
      </>
    )}
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppTabs userToken={userToken} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AppNavigator;
