import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, changeQuantity } from "../store/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";

import CartItem from "../components/CartItem";
import EmptyCartMessage from "../components/EmptyCartMessage";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const onQuantityUpdate = (id, qty) => {
    const quantity = parseInt(qty, 10);
    if (isNaN(quantity) || quantity < 1) {
      Alert.alert("Помилка", "Кількість повинна бути числом більше 0");
      return;
    }
    dispatch(changeQuantity({ id, quantity }));
  };

  const onProceedToCheckout = () => {
    navigation.navigate("Checkout");
  };

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onQuantityChange={onQuantityUpdate}
      onRemove={onRemoveItem}
    />
  );

  return (
    <View style={styles.wrapper}>
      {items.length === 0 ? (
        <EmptyCartMessage
          style={styles.emptyMessage}
          textStyle={styles.emptyText}
        />
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
            contentContainerStyle={styles.listContent}
          />

          <View style={styles.footer}>
            <Text style={styles.totalLabel}>Разом:</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} ₴</Text>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={onProceedToCheckout}
              activeOpacity={0.8}
            >
              <Text style={styles.checkoutText}>Оформити замовлення</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  listContent: {
    paddingBottom: 120,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1f1f1f",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontSize: 18,
    color: "#ccc",
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#BB86FC",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  checkoutText: {
    color: "#121212",
    fontWeight: "700",
    fontSize: 16,
  },
  emptyMessage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#777",
    fontSize: 18,
    fontStyle: "italic",
  },
});

export default CartScreen;
