import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "@firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbarQeGAEKnzbNUShUTlVGTLdah0NbvgA",
  authDomain: "lab06-d8773.firebaseapp.com",
  projectId: "lab06-d8773",
  storageBucket: "lab06-d8773.firebasestorage.app",
  messagingSenderId: "731019759276",
  appId: "1:731019759276:web:5c7af77e443d1a3c71d909",
};
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const autho = getAuth(app);

export { autho };