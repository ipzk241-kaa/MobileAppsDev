import * as FileSystem from 'expo-file-system';

export const APP_FOLDER = FileSystem.documentDirectory + 'AppData/';

export const ensureAppFolder = async () => {
  const dirInfo = await FileSystem.getInfoAsync(APP_FOLDER);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(APP_FOLDER, { intermediates: true });
  }
};

export const listDirectory = async (path) => {
  const files = await FileSystem.readDirectoryAsync(path);
  return Promise.all(files.map(async (name) => {
    const info = await FileSystem.getInfoAsync(path + name);
    return { name, ...info };
  }));
};

export const createFolder = async (path, name) => {
  await FileSystem.makeDirectoryAsync(`${path}${name}/`);
};

export const createFile = async (path, name, content = '') => {
  await FileSystem.writeAsStringAsync(`${path}${name}.txt`, content);
};

export const readFile = async (path) => {
  return await FileSystem.readAsStringAsync(path);
};

export const writeFile = async (path, content) => {
  await FileSystem.writeAsStringAsync(path, content);
};

export const deleteItem = async (path) => {
  await FileSystem.deleteAsync(path, { idempotent: true });
};
