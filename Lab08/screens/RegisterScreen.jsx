import React, { useState } from "react";
import { View, TextInput, Alert, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/slices/userSlice";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const registerHandler = async () => {
    try {
      await dispatch(registerUser(email, password, name));
    } catch (err) {
      Alert.alert(
        "Помилка реєстрації",
        err.response?.data?.error?.message || err.message || "Щось пішло не так"
      );
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ім’я</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Введіть ім’я"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Введіть email"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <Text style={styles.label}>Пароль</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Введіть пароль"
        placeholderTextColor="#888"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={registerHandler}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 5,
    color: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
