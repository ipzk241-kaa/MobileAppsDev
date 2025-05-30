import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";
import UserCard from "../components/UserCard";
import LogoutButton from "../components/LogoutButton";

const ProfileScreen = () => {
  const { logout, userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await api.get(`/users/${userId}.json`);
        setUserData(res.data);
      } catch (err) {
        console.error("Не вдалося отримати дані користувача", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профіль</Text>
      <UserCard user={userData} />
      <LogoutButton onLogout={logout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: "#121212",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#e0e0e0",
    marginBottom: 20,
    textAlign: "center",
  },
});
