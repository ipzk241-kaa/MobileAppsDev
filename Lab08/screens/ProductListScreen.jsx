import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../store/slices/productsSlice";

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isAdmin = useSelector((state) => state.user.isAdmin);
  const { list: productList, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const refreshProducts = navigation.addListener("focus", () => {
      dispatch(fetchProducts());
    });
    return refreshProducts;
  }, [navigation]);

  const navigateToAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator size="large" color="#00bcd4" style={styles.loader} />
        ) : (
          <FlatList
            data={productList}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                isAdmin={isAdmin}
                description={item.description}
              />
            )}
          />
        )}
      </View>

      {isAdmin && (
        <TouchableOpacity style={styles.fab} onPress={navigateToAddProduct}>
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#121212",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  list: {
    paddingTop: 8,
    paddingBottom: 80,
  },
  loader: {
    marginTop: 30,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1e88e5",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
  },
});
