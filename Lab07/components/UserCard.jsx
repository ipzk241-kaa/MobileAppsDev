import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserCard = ({ user }) => {
  if (!user) {
    return <Text style={styles.noDataText}>Дані користувача не знайдені.</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Ім'я:</Text>
      <Text style={styles.value}>{user.name || "Невідомо"}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2c2c2e",
    borderRadius: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#aaa",
    marginTop: 10,
  },
  value: {
    fontSize: 20,
    fontWeight: "500",
    color: "#fff",
    marginTop: 4,
  },
  noDataText: {
    fontSize: 16,
    color: "#777",
    alignSelf: "center",
    marginBottom: 40,
  },
});
