import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'maktab_ai_user';
const PWD_KEY = 'maktab_ai_pwd';

export type StoredUser = {
  phone: string;
  firstName: string;
  lastName: string;
  maktab?: string;
  sinf?: string;
  jins?: 'erkak' | 'ayol';
  yosh?: string;
  profileComplete: boolean;
};

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export async function getUser(): Promise<StoredUser | null> {
  const raw = await AsyncStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export async function saveUser(user: StoredUser): Promise<void> {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function savePassword(password: string): Promise<void> {
  await SecureStore.setItemAsync(PWD_KEY, password);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const pwd = await SecureStore.getItemAsync(PWD_KEY);
  return pwd === candidate;
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(USER_KEY);
  try {
    await SecureStore.deleteItemAsync(PWD_KEY);
  } catch {
    // ignore missing
  }
}
