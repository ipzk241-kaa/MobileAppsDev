import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";

const PostItem = ({ id, title, body, userId, createdAt, onDeleted }) => {
  const { userId: currentUserId } = useContext(AuthContext);
  const navigation = useNavigation();
  const isOwner = currentUserId === userId;

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}.json`);
      onDeleted?.(id);
    } catch (error) {
      console.error("Помилка видалення поста:", error);
    }
  };

  const handleEdit = () => {
    navigation.navigate("CreatePost", { post: { id, title, body, userId, createdAt } });
  };

  return (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{title}</Text>
      <Text style={styles.postBody}>{body}</Text>
      <Text style={styles.postDate}>
        Створено: {new Date(createdAt).toLocaleDateString()}
      </Text>

      {isOwner && (
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
            <Text style={styles.buttonText}>Редагувати</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Видалити</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#1e1e1e",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#f0f0f0",
  },
  postBody: {
    fontSize: 14,
    color: "#ccc",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  buttons: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#007bff",
  },
  deleteButton: {
    backgroundColor: "#b00020",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
