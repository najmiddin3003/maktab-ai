import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/context/auth-context';
import { MaktabColors } from '@/constants/maktab-theme';

export function MaktabTopBar() {
  const router = useRouter();
  const { logout } = useAuth();

  const confirmLogout = () => {
    Alert.alert('Hisobdan chiqish', 'Chiqishni tasdiqlaysizmi?', [
      { text: 'Bekor qilish', style: 'cancel' },
      {
        text: 'Chiqish',
        style: 'destructive',
        onPress: () => {
          void (async () => {
            await logout();
            router.replace('/login');
          })();
        },
      },
    ]);
  };

  return (
    <View style={styles.topNav}>
      <View style={styles.topNavRow}>
        <Text style={styles.brand}>Maktab AI</Text>
        <View style={styles.topNavEnd}>
          <View style={styles.syncRow}>
            <View style={styles.syncDot} />
            <Text style={styles.syncText} numberOfLines={1}>
              Real-vaqt sinxronizatsiya
            </Text>
          </View>
          <Pressable
            onPress={confirmLogout}
            hitSlop={12}
            accessibilityLabel="Hisobdan chiqish"
            accessibilityRole="button"
            style={({ pressed }) => [styles.logoutIconWrap, pressed && { opacity: 0.75 }]}>
            <Ionicons name="log-out-outline" size={21} color="rgba(255,255,255,0.72)" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/** Maktab + salom bloki: `ScrollView`dan tashqarida qoldiring — kontent scroll bo‘lsa ham tepada qotib turadi. */
export function MaktabHero({ below }: { below?: React.ReactNode }) {
  const { user } = useAuth();
  const fullName =
    user && (user.firstName || user.lastName)
      ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`.trim()
      : '';
  const schoolLabel = user?.maktab?.trim() ? user.maktab.trim() : 'Maktab';

  return (
    <View style={styles.hero}>
      <View style={styles.heroTopRow}>
        <View style={styles.schoolRow}>
          <Ionicons name="school" size={18} color={MaktabColors.white} />
          <Text style={styles.schoolText} numberOfLines={1}>
            {schoolLabel}
          </Text>
        </View>
        <Pressable hitSlop={12} accessibilityLabel="Bildirishnomalar">
          <Ionicons name="notifications-outline" size={22} color="#fcd34d" />
        </Pressable>
      </View>
      <Text style={styles.greeting}>
        {fullName ? `Assalomu alaykum, ${fullName}! 👋` : 'Assalomu alaykum! 👋'}
      </Text>
      <Text style={[styles.greetingSub, below ? styles.greetingSubTight : null]}>Bugungi holatni baholang</Text>
      {below}
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    backgroundColor: MaktabColors.navyDeep,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  topNavEnd: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
    justifyContent: 'flex-end',
  },
  logoutIconWrap: {
    padding: 4,
    marginRight: -2,
  },
  brand: {
    color: MaktabColors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
    flexShrink: 0,
  },
  syncRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
    flex: 1,
    minWidth: 0,
    maxWidth: '100%',
    justifyContent: 'flex-end',
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: MaktabColors.syncGreen,
  },
  syncText: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  hero: {
    backgroundColor: MaktabColors.navy,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 26,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  schoolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  schoolText: {
    color: MaktabColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  greeting: {
    color: MaktabColors.white,
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 6,
  },
  greetingSub: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    fontWeight: '500',
  },
  greetingSubTight: {
    marginBottom: 4,
  },
});
