import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const LogoutButton = ({ onLogout }) => (
  <TouchableOpacity style={styles.button} onPress={onLogout} activeOpacity={0.8}>
    <Text style={styles.text}>Вийти</Text>
  </TouchableOpacity>
);

export default LogoutButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#b00020",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
