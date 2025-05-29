import React from 'react';
import { View, Image, StyleSheet, FlatList } from 'react-native';

const images = Array(8).fill(
  "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg");

export default function GalleryScreen() {
  return (
    <FlatList
      data={images}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.image} />
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  image: { width: '48%', height: 150, margin: '1%' },
});
