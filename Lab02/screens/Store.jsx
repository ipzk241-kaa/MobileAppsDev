import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { useTheme } from "../config/ThemeContext";

const Store = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={"Store"} isSearchEnabled={true} />
      <Text style={styles.title}>Welcome to the Store</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
  },
  title: {},
});

export default Store;