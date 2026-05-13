import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';
import { MaktabColors } from '@/constants/maktab-theme';

export default function LoginScreen() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  React.useEffect(() => {
    if (user?.profileComplete) router.replace('/');
    else if (user && !user.profileComplete) router.replace('/profile-setup');
  }, [user, router]);

  const onSubmit = async () => {
    setBusy(true);
    try {
      const u = await login(phone, password);
      if (u.profileComplete) router.replace('/');
      else router.replace('/profile-setup');
    } catch (e) {
      Alert.alert('Xato', e instanceof Error ? e.message : 'Kirish muvaffaqiyatsiz.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={8}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles.hero}>
              <Ionicons name="school" size={40} color={MaktabColors.teal} />
              <Text style={styles.title}>Maktab AI</Text>
              <Text style={styles.sub}>Hisobingizga kiring</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Telefon raqam</Text>
              <TextInput
                style={styles.input}
                placeholder="+998 90 123 45 67"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                autoComplete="tel"
              />
              <Text style={[styles.label, styles.labelSp]}>Parol</Text>
              <TextInput
                style={styles.input}
                placeholder="Parolingiz"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <Pressable
                onPress={onSubmit}
                disabled={busy}
                style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.92 }, busy && { opacity: 0.6 }]}>
                <Text style={styles.primaryBtnTxt}>{busy ? 'Kutilmoqda…' : 'Kirish'}</Text>
              </Pressable>

              <View style={styles.row}>
                <Text style={styles.muted}>Hisobingiz yo‘qmi? </Text>
                <Link href="/register" asChild>
                  <Pressable hitSlop={8}>
                    <Text style={styles.link}>Ro‘yxatdan o‘tish</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: MaktabColors.pageBg },
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 32 },
  hero: { alignItems: 'center', marginBottom: 28 },
  title: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
  },
  sub: { marginTop: 6, fontSize: 15, color: MaktabColors.textMuted, fontWeight: '500' },
  card: {
    backgroundColor: MaktabColors.cardBg,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  label: { fontSize: 12, fontWeight: '700', color: MaktabColors.textMuted, marginBottom: 6 },
  labelSp: { marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
    fontWeight: '600',
    color: MaktabColors.textPrimary,
    backgroundColor: '#fafafa',
  },
  primaryBtn: {
    marginTop: 22,
    backgroundColor: MaktabColors.teal,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnTxt: { color: MaktabColors.white, fontSize: 16, fontWeight: '800' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 18, flexWrap: 'wrap' },
  muted: { fontSize: 14, color: MaktabColors.textMuted, fontWeight: '500' },
  link: { fontSize: 14, fontWeight: '800', color: MaktabColors.tealDark },
});
