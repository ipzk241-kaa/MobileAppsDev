import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/CartScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Ionicons } from "@expo/vector-icons";
import AddProductScreen from "../screens/AddProductScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrdersHistoryScreen from "../screens/OrdersHistoryScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: "#121212" }, headerTintColor: "#fff" }}>
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Вхід" }} />
    <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Реєстрація" }} />
  </Stack.Navigator>
);

const ProductStack = createNativeStackNavigator();

const ProductStackScreen = () => (
  <ProductStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#e0f7fa",
    }}
  >
    <ProductStack.Screen name="Каталог" component={ProductListScreen} />
    <ProductStack.Screen name="AddProduct" component={AddProductScreen} options={{ title: "Новий товар" }} />
  </ProductStack.Navigator>
);

const ProfileStack = createNativeStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#e0f7fa",
    }}
  >
    <ProfileStack.Screen name="Обліковий запис" component={ProfileScreen} options={{ title: "Профіль" }} />
    <ProfileStack.Screen name="Історія замовлень" component={OrdersHistoryScreen} options={{ title: "Історія замовлень" }} />
  </ProfileStack.Navigator>
);

const CartStack = createNativeStackNavigator();

const CartStackScreen = () => (
  <CartStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#121212" },
      headerTintColor: "#e0f7fa",
    }}
  >
    <CartStack.Screen name="Товари кошику" component={CartScreen} />
    <CartStack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Оформлення замовлення" }} />
  </CartStack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => {
      let iconName = "";
      if (route.name === "Товари") {
        iconName = "list-circle";
      } else if (route.name === "Кошик") {
        iconName = "cart";
      } else if (route.name === "Профіль") {
        iconName = "person-circle";
      }

      return {
        headerShown: true,
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#e0f7fa",
        tabBarActiveTintColor: "#81d4fa",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#222",
          height: 100,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "800",
        },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={iconName}
            size={size + 6}
            color={focused ? "#81d4fa" : "#888"}
            style={route.name === "Профіль" ? { marginBottom: 4 } : {}}
          />
        ),
        tabBarItemStyle: {
          marginVertical: route.name === "Профіль" ? 6 : 2,
        },
      };
    }}
  >
    <Tab.Screen name="Товари" component={ProductStackScreen} />
    <Tab.Screen name="Кошик" component={CartStackScreen} />
    <Tab.Screen name="Профіль" component={ProfileStackScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const idToken = useSelector((state) => state.user.idToken);

  return <NavigationContainer>{idToken ? <AppTabs /> : <AuthStack />}</NavigationContainer>;
};

export default AppNavigator;
