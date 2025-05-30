import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../store/slices/productsSlice";

const AddProductScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Доступ відмовлено", "Дайте дозвіл на доступ до галереї");
      }
    })();
  }, []);

  const copyImageToAppDir = async (uri) => {
    try {
      const filename = uri.split("/").pop();
      const newPath = FileSystem.documentDirectory + filename;
      await FileSystem.copyAsync({ from: uri, to: newPath });
      return newPath;
    } catch (err) {
      console.error("Помилка копіювання файлу:", err);
      return uri;
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6,
      });

      if (!result.canceled) {
        const localPath = await copyImageToAppDir(result.assets[0].uri);
        setImageUri(localPath);
      }
    } catch (err) {
      console.error("Помилка вибору зображення:", err);
    }
  };

  const onSubmit = async () => {
    if (!title.trim() || !price.trim() || !imageUri.trim() || !desc.trim()) {
      Alert.alert("Увага", "Будь ласка, заповніть всі поля");
      return;
    }

    const product = {
      title,
      price: parseFloat(price),
      imageUrl: imageUri,
      description: desc,
    };

    try {
      await dispatch(addProductAsync(product)).unwrap();
      Alert.alert("Успіх", "Товар додано");
      navigation.goBack();
    } catch {
      Alert.alert("Помилка", "Не вдалось додати товар");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.heading}>Додати новий товар</Text>

      <Text style={styles.label}>Назва</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Введіть назву"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Ціна (грн)</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        placeholder="Введіть ціну"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Опис</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={desc}
        onChangeText={setDesc}
        multiline
        placeholder="Короткий опис товару"
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        <Text style={styles.imagePickerText}>Вибрати зображення</Text>
      </TouchableOpacity>

      {imageUri ? <Image source={{ uri: imageUri }} style={styles.imagePreview} /> : null}

      <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
        <Text style={styles.submitText}>Додати товар</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: "#121212",
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#BB86FC",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#222",
    color: "#eee",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  imagePicker: {
    backgroundColor: "#3700B3",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#03DAC6",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#121212",
  },
});

export default AddProductScreen;
