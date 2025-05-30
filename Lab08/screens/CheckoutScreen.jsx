import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { addOrder } from "../store/slices/ordersSlice";
import { useNavigation } from "@react-navigation/native";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

const CheckoutScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Помилка", "Введіть ім’я");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Помилка", "Введіть коректний email");
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert("Помилка", "Кошик порожній");
      return;
    }

    const order = {
      id: Date.now().toString(),
      name,
      email,
      items: cartItems,
      date: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    Alert.alert("Успішно", "Замовлення оформлено!", [
      { text: "ОК", onPress: () => navigation.navigate("Товари") },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Оформлення замовлення</Text>

        <FormInput
          placeholder="Ім’я"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />
        <FormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />

        <PrimaryButton title="Підтвердити замовлення" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
});
