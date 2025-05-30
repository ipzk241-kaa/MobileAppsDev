import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, TextInput, Alert, StyleSheet } from 'react-native';
import { APP_FOLDER, listDirectory, deleteItem, createFolder, createFile } from '../components/fileUtils';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [currentPath, setCurrentPath] = useState(APP_FOLDER);
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [showFileInput, setShowFileInput] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    loadItems();
  }, [currentPath]);

  const loadItems = async () => {
    const data = await listDirectory(currentPath);
    setItems(data);
  };

  const handleCreateFolder = async () => {
    await createFolder(currentPath, newName);
    setNewName('');
    setShowFolderInput(false);
    loadItems();
  };

  const handleCreateFile = async () => {
    await createFile(currentPath, newName);
    setNewName('');
    setShowFileInput(false);
    loadItems();
  };

  const handleDelete = (item) => {
    Alert.alert('Підтвердження', `Видалити ${item.name}?`, [
      { text: 'Скасувати' },
      {
        text: 'OK',
        onPress: async () => {
          await deleteItem(item.uri);
          loadItems();
        },
      },
    ]);
  };

  const handleItemPress = (item) => {
    if (item.isDirectory) {
      setCurrentPath(item.uri.endsWith('/') ? item.uri : item.uri + '/');
    } else {
      navigation.navigate('ViewFile', { path: item.uri });
    }
  };

  const showInfo = (item) => {
    Alert.alert('Інформація', 
      `Назва: ${item.name}\nТип: ${item.isDirectory ? 'Папка' : 'Файл'}\nРозмір: ${item.size} B\nМодифіковано: ${new Date(item.modificationTime * 1000).toLocaleString()}`
    );
  };
  
const goBack = () => {
  if (currentPath === APP_FOLDER) return;
  const relativePath = currentPath.replace(APP_FOLDER, '');
  const parts = relativePath.split('/').filter(Boolean);
  parts.pop();
  const newPath = APP_FOLDER + (parts.length > 0 ? parts.join('/') + '/' : '');
  setCurrentPath(newPath);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Поточна директорія:</Text>
      <Text style={styles.path}>{currentPath}</Text>

      <View style={styles.buttons}>
        <Button title="📁 Створити папку" onPress={() => setShowFolderInput(true)} />
        <Button title="📄 Створити файл" onPress={() => setShowFileInput(true)} />
      </View>
        {currentPath !== APP_FOLDER && ( 
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Text style={styles.backText}>⬅️ Назад</Text>
            </TouchableOpacity>
)}
      {(showFolderInput || showFileInput) && (
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Введіть назву"
            value={newName}
            onChangeText={setNewName}
            style={styles.input}
          />
          <Button
            title="Створити"
            onPress={showFolderInput ? handleCreateFolder : handleCreateFile}
          />
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemText}>
              <Text>
                {item.isDirectory ? '📁' : '📄'} {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showInfo(item)}>
              <Ionicons name="information-circle" size={24} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 16, fontWeight: 'bold' },
  path: { fontSize: 12, color: 'gray', marginBottom: 10 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  inputBox: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 5, borderRadius: 5 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  itemText: { flex: 1 },
  backButton: {
  marginBottom: 10,
  padding: 10,
  backgroundColor: '#eee',
  borderRadius: 5,
  alignSelf: 'flex-start',
},
backText: {
  fontSize: 16,
},

});
