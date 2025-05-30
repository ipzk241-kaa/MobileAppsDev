import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView} from 'react-native';
import { writeFile } from '../components/fileUtils';

export default function EditFileScreen({ route, navigation }) {
  const { path, content: initialContent } = route.params;
  const [content, setContent] = useState(initialContent);

  const saveFile = async () => {
    await writeFile(path, content);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
      <TextInput
        multiline
        value={content}
        onChangeText={setContent}
        style={{ flex: 1, textAlignVertical: 'top' }}
      />
      <Button title="Зберегти" onPress={saveFile} />
      </ScrollView>
    </View>
  );
}
