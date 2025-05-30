import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CartFooter = ({ total, onCheckout }) => (
  <View style={styles.footer}>
    <Text style={styles.total}>Всього: {total.toFixed(2)} грн</Text>
    <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
      <Text style={styles.checkoutButtonText}>Оформити замовлення</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default CartFooter;
