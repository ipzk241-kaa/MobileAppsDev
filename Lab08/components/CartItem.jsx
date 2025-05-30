import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CartItem = ({ item, onQuantityChange, onRemove }) => (
  <View style={styles.itemContainer}>
    <View style={styles.info}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price} грн</Text>
    </View>
    <View style={styles.controls}>
      <TextInput
        style={styles.quantityInput}
        keyboardType="numeric"
        value={String(item.quantity)}
        onChangeText={(text) => onQuantityChange(item.id, text)}
      />
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>Видалити</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    color: "#666",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityInput: {
    width: 50,
    height: 46,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 12,
    textAlign: "center",
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default CartItem;
