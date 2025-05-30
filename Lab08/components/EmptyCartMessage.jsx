import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmptyCartMessage = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.text}>Кошик порожній</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
});

export default EmptyCartMessage;
