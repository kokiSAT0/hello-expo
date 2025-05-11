// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  high: 'highScore',
} as const;

export async function save<T>(key: string, value: T) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function load<T>(key: string, def: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  return raw !== null ? (JSON.parse(raw) as T) : def;
}
