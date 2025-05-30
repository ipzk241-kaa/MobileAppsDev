import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const FIREBASE_API_KEY = "AIzaSyD72vFq-qFS0M1LToBv5nuGjQ1wq3vFgXA";
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const token = response.data.idToken;
      const localId = response.data.localId; 

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", localId);

      setUserToken(token);
      setUserId(localId);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const register = async (email, password, name) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const { idToken, localId } = res.data;

      await AsyncStorage.setItem("userToken", idToken);
      await AsyncStorage.setItem("userId", localId);

      await api.put(`/users/${localId}.json`, {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      setUserToken(idToken);
      setUserId(localId);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      Alert.alert("Registration failed", "Please check your details.");
    }
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const storedUserId = await AsyncStorage.getItem("userId");
      if (token && storedUserId) {
        setUserToken(token);
        setUserId(storedUserId);
      }
    } catch (e) {
      console.log("Token check error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    setUserToken(null);
    setUserId(null);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userToken, userId, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
