import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
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
import { SINF_OPTIONS } from '@/constants/sinf-options';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const { completeProfile, user, logout } = useAuth();
  const [maktab, setMaktab] = useState('');
  const [sinf, setSinf] = useState<string | null>(null);
  const [sinfPickerOpen, setSinfPickerOpen] = useState(false);
  const [yosh, setYosh] = useState('');
  const [jins, setJins] = useState<'erkak' | 'ayol' | null>(null);
  const [busy, setBusy] = useState(false);

  React.useEffect(() => {
    if (!user) router.replace('/login');
    else if (user.profileComplete) router.replace('/');
  }, [user, router]);

  const onSubmit = async () => {
    if (!sinf || !jins) {
      Alert.alert('Diqqat', 'Sinf va jinsni tanlang.');
      return;
    }
    setBusy(true);
    try {
      await completeProfile({ maktab, sinf, jins, yosh });
      router.replace('/');
    } catch (e) {
      Alert.alert('Xato', e instanceof Error ? e.message : 'Saqlash muvaffaqiyatsiz.');
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
            <Text style={styles.title}>Profilni to‘ldiring</Text>
            <Text style={styles.sub}>Maktab, sinf, jins va yosh — keyin ilovadan foydalanasiz.</Text>

            <View style={styles.card}>
              <Text style={styles.label}>Maktab</Text>
              <TextInput
                style={styles.input}
                placeholder="Masalan: 14-sonli maktab"
                placeholderTextColor="#94a3b8"
                value={maktab}
                onChangeText={setMaktab}
              />

              <Text style={[styles.label, styles.labelSp]}>Sinf</Text>
              <Pressable
                onPress={() => setSinfPickerOpen(true)}
                style={({ pressed }) => [
                  styles.selectField,
                  !sinf && styles.selectFieldPlaceholder,
                  pressed && { opacity: 0.9 },
                ]}>
                <Text style={[styles.selectFieldText, !sinf && styles.selectFieldTextPh]} numberOfLines={1}>
                  {sinf ?? 'Sinfni tanlang'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={MaktabColors.textMuted} />
              </Pressable>

              <Text style={[styles.label, styles.labelSp]}>Yosh</Text>
              <TextInput
                style={styles.input}
                placeholder="Masalan: 15"
                placeholderTextColor="#94a3b8"
                keyboardType="number-pad"
                value={yosh}
                onChangeText={setYosh}
              />

              <Text style={[styles.label, styles.labelSp]}>Jins</Text>
              <View style={styles.jinsRow}>
                <Pressable
                  onPress={() => setJins('erkak')}
                  style={[styles.jinsBtn, jins === 'erkak' && styles.jinsBtnOn]}>
                  <Text style={[styles.jinsTxt, jins === 'erkak' && styles.jinsTxtOn]}>Erkak</Text>
                </Pressable>
                <Pressable
                  onPress={() => setJins('ayol')}
                  style={[styles.jinsBtn, jins === 'ayol' && styles.jinsBtnOn]}>
                  <Text style={[styles.jinsTxt, jins === 'ayol' && styles.jinsTxtOn]}>Ayol</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={onSubmit}
                disabled={busy}
                style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.92 }, busy && { opacity: 0.6 }]}>
                <Text style={styles.primaryBtnTxt}>{busy ? 'Kutilmoqda…' : 'Boshlash'}</Text>
              </Pressable>

              <Pressable onPress={() => logout().then(() => router.replace('/login'))} style={styles.outlineBtn}>
                <Text style={styles.outlineBtnTxt}>Chiqish</Text>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <Modal
          visible={sinfPickerOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setSinfPickerOpen(false)}>
          <View style={styles.modalRoot}>
            <Pressable style={styles.modalBackdropFill} onPress={() => setSinfPickerOpen(false)} />
            <View style={styles.modalPanel}>
              <Text style={styles.modalTitle}>Sinfni tanlang</Text>
              <FlatList
                data={[...SINF_OPTIONS]}
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                style={styles.modalList}
                renderItem={({ item }) => (
                  <Pressable
                    style={({ pressed }) => [
                      styles.modalRow,
                      sinf === item && styles.modalRowOn,
                      pressed && { opacity: 0.85 },
                    ]}
                    onPress={() => {
                      setSinf(item);
                      setSinfPickerOpen(false);
                    }}>
                    <Text style={[styles.modalRowTxt, sinf === item && styles.modalRowTxtOn]}>{item}</Text>
                    {sinf === item ? <Ionicons name="checkmark-circle" size={22} color={MaktabColors.teal} /> : null}
                  </Pressable>
                )}
              />
              <Pressable style={styles.modalClose} onPress={() => setSinfPickerOpen(false)}>
                <Text style={styles.modalCloseTxt}>Yopish</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: MaktabColors.pageBg },
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 32 },
  title: { fontSize: 24, fontWeight: '800', color: MaktabColors.textPrimary },
  sub: { marginTop: 8, marginBottom: 20, fontSize: 15, color: MaktabColors.textMuted, fontWeight: '500', lineHeight: 22 },
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
  selectField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    backgroundColor: '#fafafa',
    gap: 8,
  },
  selectFieldPlaceholder: { borderStyle: 'dashed' },
  selectFieldText: { flex: 1, fontSize: 16, fontWeight: '600', color: MaktabColors.textPrimary },
  selectFieldTextPh: { color: '#94a3b8' },
  jinsRow: { flexDirection: 'row', gap: 10 },
  jinsBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    backgroundColor: MaktabColors.white,
  },
  jinsBtnOn: {
    borderColor: MaktabColors.teal,
    borderWidth: 2,
    backgroundColor: '#ecfdf5',
  },
  jinsTxt: { fontSize: 15, fontWeight: '700', color: MaktabColors.textPrimary },
  jinsTxtOn: { color: MaktabColors.tealDark },
  primaryBtn: {
    marginTop: 22,
    backgroundColor: MaktabColors.teal,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryBtnTxt: { color: MaktabColors.white, fontSize: 16, fontWeight: '800' },
  outlineBtn: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  outlineBtnTxt: { fontSize: 15, fontWeight: '700', color: MaktabColors.textMuted },
  modalRoot: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  modalBackdropFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  modalPanel: {
    backgroundColor: MaktabColors.white,
    borderRadius: 16,
    maxHeight: '72%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    zIndex: 1,
    ...Platform.select({
      web: { boxShadow: '0 12px 40px rgba(0,0,0,0.2)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 12,
      },
    }),
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e8f0',
  },
  modalList: { maxHeight: 320 },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f1f5f9',
  },
  modalRowOn: { backgroundColor: '#f0fdfa' },
  modalRowTxt: { fontSize: 16, fontWeight: '700', color: MaktabColors.textPrimary },
  modalRowTxtOn: { color: MaktabColors.tealDark },
  modalClose: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e2e8f0',
  },
  modalCloseTxt: { fontSize: 15, fontWeight: '800', color: MaktabColors.textMuted },
});
