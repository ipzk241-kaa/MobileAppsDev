import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Store from "../screens/Store";
import Community from "../screens/Community";
import Chat from "../screens/Chat";
import Safety from "../screens/Safety";
import UserProfile from "../screens/UserProfile";
import StoreIcon from "../assets/images/store_icon.svg";
import CommunityIcon from "../assets/images/community_icon.svg";
import ChatIcon from "../assets/images/chat_icon.svg";
import SafetyIcon from "../assets/images/safety_icon.svg";

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const isUserScreen = route.name === "User";

            if (isUserScreen) {
              return (
                <Image
                  source={require("../assets/images/userProfilePhoto.jpg")}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: "contain",
                  }}
                />
              );
            }

            let IconComponent;
            switch (route.name) {
              case "Store":
                IconComponent = StoreIcon;
                break;
              case "Community":
                IconComponent = CommunityIcon;
                break;
              case "Chat":
                IconComponent = ChatIcon;
                break;
              case "Safety":
                IconComponent = SafetyIcon;
                break;
              default:
                return null;
            }

            return (
              <IconComponent
                width={24}
                height={24}
                fill={focused ? theme.iconActive : theme.iconNonActive}
              />
            );
          },
          tabBarActiveTintColor: theme.iconActive,
          tabBarInactiveTintColor: theme.iconNonActive,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBarBG,
            margin: 0,
            paddingTop: 10,
            height: 80,
            borderTopWidth: 0,
          },
        })}
      >
        <Tab.Screen name="Store" component={Store} />
        <Tab.Screen name="Community" component={Community} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Safety" component={Safety} />
        <Tab.Screen name="User" component={UserProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Navigation;
