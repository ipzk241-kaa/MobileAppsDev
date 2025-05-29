import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const newsItem = {
  id: '1',
  title: 'Заголовок новини',
  date: '29.05.2025',
  description: 'Це короткий текст новини для прикладу.',
  image: "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg",
};

const newsData = Array.from({ length: 8 }, (_, i) => ({
  ...newsItem,
  id: (i + 1).toString(),
}));

export default function HomeScreen() {
  return (
    <FlatList
      data={newsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <View style={styles.textContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: { width: 80, height: 80 },
  textContent: { flex: 1, padding: 10 },
  title: { fontWeight: 'bold', fontSize: 16 },
  date: { color: 'gray', fontSize: 12 },
  description: { fontSize: 14 },
});