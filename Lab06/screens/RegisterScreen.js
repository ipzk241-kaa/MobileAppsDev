import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { auth } from "../services/config";
import { useAuth } from "../contexts/AuthContext";

const SignUpScreen = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      setLoggedInUser(userCredential.user);
      navigation.navigate("Login");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => onChange("email", text)}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => onChange("password", text)}
      />

      {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

      <Pressable style={[styles.button, styles.signupBtn]} onPress={signUp}>
        <Text style={styles.btnText}>Sign Up</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.loginBtn]} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.btnText}>Back to Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fafafa",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#222",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#bbb",
    marginBottom: 15,
    fontSize: 16,
  },
  error: {
    color: "crimson",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  signupBtn: {
    backgroundColor: "#27ae60",
  },
  loginBtn: {
    backgroundColor: "#2980b9",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SignUpScreen;
