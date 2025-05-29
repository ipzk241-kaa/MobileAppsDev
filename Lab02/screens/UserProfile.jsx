import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";
import CustomHeader from "../components/Header";
import OptionsList from "../components/OptionsList";
import ThemeToggle from "../components/ThemeToggle";
import UserInfo from "../components/UserInfo";

const options = [
  {
    id: "1",
    label: "Settings",
    component: <ThemeToggle />,
    icon: "arrow-forward-ios",
  },
  {
    id: "2",
    label: "Logout",
    icon: "arrow-forward-ios",
  },
];

const UserProfile = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <UserInfo></UserInfo>
      <OptionsList options={options} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
  },
});

export default UserProfile;