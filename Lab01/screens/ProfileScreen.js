import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');

  const register = () => {
    alert('Реєстрація пройшла успішно!');
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Пароль" secureTextEntry onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Повтор паролю" secureTextEntry onChangeText={setRepeat} />
      <TextInput style={styles.input} placeholder="Прізвище" onChangeText={setSurname} />
      <TextInput style={styles.input} placeholder="Ім'я" onChangeText={setName} />
      <Button title="Зареєструватися" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
});
