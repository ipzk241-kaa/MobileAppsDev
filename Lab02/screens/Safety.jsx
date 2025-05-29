import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";
import CustomHeader from "../components/CustomHeader";

const Safety = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title={"Store"} />
      <Text style={styles.description}>
        This is the Safety screen. Here you can find information about safety
        measures and guidelines.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Safety;