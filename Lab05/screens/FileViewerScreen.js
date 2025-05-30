import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { readFile } from '../components/fileUtils';

export default function FileViewerScreen({ route, navigation }) {
  const { path } = route.params;
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      const data = await readFile(path);
      setContent(data);
    })();
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView>
        <Text>{content}</Text>
      <Button title="Редагувати" onPress={() => navigation.navigate('EditFile', { path, content })} />
        </ScrollView>
    </View>
  );
}
