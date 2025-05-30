import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/config";
import { useNavigation } from "@react-navigation/native";

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation();

  const onResetPress = async () => {
    if (!email.trim()) {
      Alert.alert("Помилка", "Введіть email.");
      return;
    }

    try {
      setIsProcessing(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Успіх", "Інструкції надіслані на вашу електронну адресу.");
      navigation.navigate("Login");
    } catch (err) {
      const { code, message } = err;
      let errorText = message;

      switch (code) {
        case "auth/invalid-email":
          errorText = "Невірний формат email.";
          break;
        case "auth/user-not-found":
          errorText = "Користувача з таким email не знайдено.";
          break;
      }

      Alert.alert("Помилка", errorText);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Відновлення пароля</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть ваш email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {isProcessing ? (
        <ActivityIndicator size="large" color="#1e90ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={onResetPress}>
            <Text style={styles.buttonText}>Надіслати лист</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Назад</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eef1f4",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ResetPasswordScreen;
