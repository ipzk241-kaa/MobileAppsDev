import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

const CreatePostScreen = ({ navigation, route }) => {
  const { userId } = useContext(AuthContext);
  const editingPost = route.params?.post || null;

  const [title, setTitle] = useState(editingPost?.title || "");
  const [body, setBody] = useState(editingPost?.body || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
      return;
    }

    setLoading(true);
    try {
      if (editingPost) {
        await api.put(`/posts/${editingPost.id}.json`, {
          ...editingPost,
          title,
          body,
        });
        Alert.alert("Успіх", "Пост оновлено!");
      } else {
        await api.post("/posts.json", {
          title,
          body,
          userId,
          createdAt: new Date().toISOString(),
        });
        Alert.alert("Успіх", "Пост створено!");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert(
        "Помилка",
        editingPost ? "Не вдалося оновити пост" : "Не вдалося створити пост"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.inner}>
        <TextInput
          placeholder="Заголовок"
          placeholderTextColor="#888"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Текст поста"
          placeholderTextColor="#888"
          style={[styles.input, styles.textArea]}
          value={body}
          onChangeText={setBody}
          multiline
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {loading ? "Збереження..." : editingPost ? "Оновити" : "Зберегти"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  inner: {
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    backgroundColor: "#1e1e1e",
    color: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4a90e2",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
