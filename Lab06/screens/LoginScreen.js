import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { auth } from "../services/config";
import { useAuth } from "../contexts/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoggedInUser(userCredential.user);
        navigation.navigate("Profile");
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button
        title={loading ? "Logging in..." : "Log In"}
        onPress={handleLogin}
        disabled={loading}
        color="#4CAF50" 
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Go to SignUp"
        onPress={() => navigation.navigate("SignUp")}
        color="#2196F3" 
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Go to Reset Password"
        onPress={() => navigation.navigate("ResetPass")}
        color="#FF5722" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorText: { color: "red", marginBottom: 10 },
  buttonSpacing: {
    marginVertical: 10,
  },
});

export default LoginScreen;