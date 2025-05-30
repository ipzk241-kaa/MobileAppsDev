import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://lab07-e8c53-default-rtdb.europe-west1.firebasedatabase.app/",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.params = {
        ...(config.params || {}),
        auth: token,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
