import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/config";
import { useAuth } from "../contexts/AuthContext";

const SignUpScreen = ({ navigation }) => {
  const { setLoggedInUser } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
  };

  const registerUser = async () => {
    const { email, password } = credentials;
    if (!email || !password) {
      setErrorMsg("Заповніть всі поля");
      return;
    }

    try {
      setIsLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setLoggedInUser(result.user);
      navigation.replace("Login");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Реєстрація</Text>

      <TextInput
        placeholder="Email"
        value={credentials.email}
        onChangeText={(val) => updateField("email", val)}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Пароль"
        secureTextEntry
        value={credentials.password}
        onChangeText={(val) => updateField("password", val)}
        style={styles.input}
      />

      {errorMsg !== "" && <Text style={styles.error}>{errorMsg}</Text>}

      {isLoading ? (
        <ActivityIndicator size="large" color="#27ae60" />
      ) : (
        <>
          <TouchableOpacity style={styles.primaryBtn} onPress={registerUser}>
            <Text style={styles.btnText}>Зареєструватися</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnText}>Повернутися до входу</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f0f3f7",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  primaryBtn: {
    backgroundColor: "#2ecc71",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryBtn: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignUpScreen;
