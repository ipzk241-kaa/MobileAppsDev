import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrderItem = ({ order }) => {
  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.orderItem}>
      <Text>Дата: {new Date(order.date).toLocaleDateString()}</Text>
      <Text>Кількість товарів: {order.items.length}</Text>
      <Text>Сума: {calculateTotal(order.items)} грн</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
});
