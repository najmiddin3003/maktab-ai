import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaktabHero, MaktabTopBar } from '@/components/maktab-header';
import { useKeyboardBottomInset } from '@/hooks/use-keyboard-bottom-inset';
import { MaktabColors } from '@/constants/maktab-theme';

const TEAL_SEND = '#00a896';

type ContactCard = {
  key: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  phoneLabel: string;
  phoneColor: string;
  tel: string;
};

function openTel(raw: string) {
  const digits = raw.replace(/\s/g, '');
  const href = digits.startsWith('+') ? `tel:${digits}` : `tel:${digits}`;
  Linking.openURL(href).catch(() => {});
}

export default function YordamScreen() {
  const [message, setMessage] = useState('');
  const keyboardBottom = useKeyboardBottomInset(56);

  const contacts: ContactCard[] = [
    {
      key: 'psy',
      bg: '#d1fae5',
      border: '#6ee7b7',
      icon: <Ionicons name="person-circle-outline" size={40} color="#059669" />,
      title: 'Maktab psixologi',
      subtitle: 'Mohinur Karimova — 14-maktab',
      phoneLabel: '+998 90 555 12 34',
      phoneColor: '#047857',
      tel: '+998905551234',
    },
    {
      key: 'youth',
      bg: '#dbeafe',
      border: '#93c5fd',
      icon: <Ionicons name="call" size={28} color="#dc2626" />,
      title: 'Yoshlar ishonch telefoni',
      subtitle: '24/7, bepul, maxfiy',
      phoneLabel: '1064',
      phoneColor: '#1d4ed8',
      tel: '1064',
    },
    {
      key: 'emergency',
      bg: '#fef3c7',
      border: '#fcd34d',
      icon: <Ionicons name="warning" size={28} color="#ea580c" />,
      title: 'Favqulodda vaziyat',
      subtitle: "Xavf tug'ilsa zudlik bilan",
      phoneLabel: '101 — 102',
      phoneColor: '#c2410c',
      tel: '101',
    },
  ];

  const send = () => {
    if (!message.trim()) {
      Alert.alert('Diqqat', 'Iltimos, xabar yozing.');
      return;
    }
    Alert.alert('Yuborildi', 'Xabaringiz qabul qilindi (namuna).');
    setMessage('');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <MaktabTopBar />
        <View style={styles.flex}>
          <MaktabHero />
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.scrollInner, { paddingBottom: 32 + keyboardBottom }]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}>
            <View style={styles.sheet}>
              <LinearGradient
                colors={['#7c3aed', '#4f46e5', '#2563eb']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.banner}>
                <View style={styles.sosBadge}>
                  <Text style={styles.sosBadgeText}>SOS</Text>
                </View>
                <Text style={styles.bannerTitle}>Yordam Markazi</Text>
                <Text style={styles.bannerSub}>Siz hech qachon yolg&apos;iz emassiz</Text>
              </LinearGradient>

              <View style={styles.sectionHead}>
                <Text style={styles.sectionEmoji}>📞</Text>
                <Text style={styles.sectionTitle}>Murojaat qiling</Text>
              </View>

              {contacts.map((c) => (
                <Pressable
                  key={c.key}
                  onPress={() => openTel(c.tel)}
                  style={({ pressed }) => [
                    styles.contactCard,
                    { backgroundColor: c.bg, borderColor: c.border },
                    pressed && { opacity: 0.92 },
                  ]}>
                  <View style={styles.contactIconWrap}>{c.icon}</View>
                  <View style={styles.contactBody}>
                    <Text style={styles.contactTitle}>{c.title}</Text>
                    <Text style={styles.contactSub}>{c.subtitle}</Text>
                    <Text style={[styles.contactPhone, { color: c.phoneColor }]}>{c.phoneLabel}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={MaktabColors.textMuted} />
                </Pressable>
              ))}

              <View style={[styles.sectionHead, styles.sectionHeadSpaced]}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color={MaktabColors.textPrimary} />
                <Text style={styles.sectionTitle}>Psixologga xabar</Text>
              </View>

              <TextInput
                style={styles.textArea}
                placeholder="Xabaringizni yozing..."
                placeholderTextColor="#94a3b8"
                multiline
                textAlignVertical="top"
                value={message}
                onChangeText={setMessage}
                numberOfLines={5}
              />

              <Pressable onPress={send} style={({ pressed }) => [styles.sendBtn, pressed && { opacity: 0.92 }]}>
                <Ionicons name="send" size={18} color={MaktabColors.white} />
                <Text style={styles.sendBtnText}>Yuborish</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: MaktabColors.navyDeep,
  },
  safe: {
    flex: 1,
    backgroundColor: MaktabColors.navyDeep,
  },
  flex: { flex: 1 },
  scroll: {
    flex: 1,
    backgroundColor: MaktabColors.pageBg,
  },
  scrollInner: {
    paddingBottom: 32,
  },
  sheet: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  banner: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 22,
    ...Platform.select({
      web: { boxShadow: '0 8px 28px rgba(79, 70, 229, 0.35)' },
      default: {
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
      },
    }),
  },
  sosBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E53935',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  sosBadgeText: {
    color: MaktabColors.white,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: MaktabColors.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  bannerSub: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionHeadSpaced: {
    marginTop: 8,
  },
  sectionEmoji: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 14,
    marginBottom: 12,
    gap: 12,
    ...Platform.select({
      web: { boxShadow: '0 2px 10px rgba(15, 23, 42, 0.06)' },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      },
    }),
  },
  contactIconWrap: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBody: {
    flex: 1,
    minWidth: 0,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    marginBottom: 4,
  },
  contactSub: {
    fontSize: 13,
    fontWeight: '600',
    color: MaktabColors.textMuted,
    marginBottom: 6,
  },
  contactPhone: {
    fontSize: 17,
    fontWeight: '800',
  },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    fontWeight: '500',
    color: MaktabColors.textPrimary,
    backgroundColor: MaktabColors.white,
    marginBottom: 14,
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: TEAL_SEND,
    borderRadius: 14,
    paddingVertical: 15,
  },
  sendBtnText: {
    color: MaktabColors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
