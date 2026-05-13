import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaktabHero, MaktabTopBar } from '@/components/maktab-header';
import { MaktabColors } from '@/constants/maktab-theme';

const TARIX_ACTIVE = '#ef4444';

export default function TarixScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <MaktabTopBar />
        <MaktabHero />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator={false}>
          <View style={styles.sheet}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>📈 Mening Tarixim</Text>

              <View style={styles.empty}>
                <View style={styles.emptyIconWrap}>
                  <Ionicons name="clipboard-outline" size={56} color="#cbd5e1" />
                </View>
                <Text style={styles.emptyTitle}>Hali baholash yo&apos;q</Text>
                <Text style={styles.emptySub}>Birinchi baholashni bajaring</Text>
              </View>
            </View>
          </View>
        </ScrollView>
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
  scroll: {
    flex: 1,
    backgroundColor: MaktabColors.pageBg,
  },
  scrollInner: {
    paddingBottom: 28,
  },
  sheet: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: MaktabColors.cardBg,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#eef2f6',
    minHeight: 320,
    ...Platform.select({
      web: { boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)' },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 3,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    marginBottom: 8,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 16,
    gap: 10,
    minHeight: 260,
  },
  emptyIconWrap: {
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 15,
    fontWeight: '600',
    color: MaktabColors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  ctaLink: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  ctaLinkText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '800',
    color: TARIX_ACTIVE,
    textAlign: 'left',
  },
  ctaIconWrap: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
