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
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const resetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Помилка", "Введіть email.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Успішно", "Лист для скидання пароля надіслано.");
      navigation.replace("Login");
    } catch (error) {
      const { code, message } = error;
      if (code === "auth/invalid-email") {
        Alert.alert("Помилка", "Невірний email.");
      } else if (code === "auth/user-not-found") {
        Alert.alert("Помилка", "Користувача не знайдено.");
      } else {
        Alert.alert("Помилка", message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Відновлення пароля</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ваш email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <TouchableOpacity style={styles.button} onPress={resetPassword}>
            <Text style={styles.buttonText}>Скинути пароль</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Назад до входу</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    backgroundColor: "#eef2f5",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ResetPasswordScreen;
