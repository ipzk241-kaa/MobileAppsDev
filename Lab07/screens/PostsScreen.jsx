import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import PostItem from "../components/PostItem";

const PostsScreen = () => {
  const { logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const res = await api.get("/posts.json");
          const data = res.data;
          if (data) {
            const loadedPosts = Object.entries(data)
              .map(([id, post]) => ({ id, ...post }))
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPosts(loadedPosts);
          } else {
            setPosts([]);
          }
        } catch (error) {
          console.error("Помилка при завантаженні постів:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }, [])
  );

  const renderPost = ({ item }) => (
    <PostItem
      id={item.id}
      title={item.title}
      body={item.body}
      userId={item.userId}
      createdAt={item.createdAt}
      onDeleted={(deletedId) =>
        setPosts((prev) => prev.filter((p) => p.id !== deletedId))
      }
    />
  );

  const FabButton = () => (
    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate("CreatePost")}
      activeOpacity={0.7}
    >
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {posts.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noPostsText}>Пости відсутні</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.listContent}
        />
      )}
      <FabButton />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPostsText: {
    fontSize: 18,
    color: "#bbb",
    textAlign: "center",
  },
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4a90e2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  fabIcon: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
});
