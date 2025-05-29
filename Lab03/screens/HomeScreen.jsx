import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GameContext } from '../App';
import ClickableObject from '../components/ClickableObject';

export default function HomeScreen({ navigation }) {
  const { score } = useContext(GameContext);

  return (
    <View style={styles.container}>
        <Button title="Перейти до завдань" onPress={() => navigation.navigate('Tasks')} />
        <Text style={styles.score}>Очки: {score}</Text>
        <ClickableObject />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  score: { fontSize: 32, marginBottom: 30 },
});
