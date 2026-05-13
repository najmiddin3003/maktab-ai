import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaktabHero, MaktabTopBar } from '@/components/maktab-header';
import { MaktabColors } from '@/constants/maktab-theme';

type TileGraphic = 'clipboard' | 'bulbYellow' | 'chartRed' | 'sosRed';

type GridItem = {
  title: string;
  subtitle: string;
  fill: string;
  graphic: TileGraphic;
  href: '/baholash' | '/maslahat' | '/tarix' | '/yordam';
};

const GRID: GridItem[] = [
  {
    title: 'Baholash',
    subtitle: 'Kundalik test',
    fill: MaktabColors.tileBaholash,
    graphic: 'clipboard',
    href: '/baholash',
  },
  {
    title: 'Maslahatlar',
    subtitle: 'Foydali tavsiyalar',
    fill: MaktabColors.tileMaslahat,
    graphic: 'bulbYellow',
    href: '/maslahat',
  },
  {
    title: 'Tarix',
    subtitle: 'Oldingi natijalar',
    fill: MaktabColors.tileTarix,
    graphic: 'chartRed',
    href: '/tarix',
  },
  {
    title: 'Yordam',
    subtitle: 'Psixologga murojaat',
    fill: MaktabColors.tileYordam,
    graphic: 'sosRed',
    href: '/yordam',
  },
];

function TileIcon({ graphic }: { graphic: TileGraphic }) {
  switch (graphic) {
    case 'clipboard':
      return <Ionicons name="clipboard-outline" size={36} color={MaktabColors.white} />;
    case 'bulbYellow':
      return <Ionicons name="bulb" size={38} color="#FFEB3B" />;
    case 'chartRed':
      return (
        <View style={tileGfx.chartBox}>
          <Ionicons name="trending-up" size={26} color="#E53935" />
        </View>
      );
    case 'sosRed':
      return (
        <View style={tileGfx.sosBox}>
          <Text style={tileGfx.sosText}>SOS</Text>
        </View>
      );
    default:
      return null;
  }
}

const tileGfx = StyleSheet.create({
  chartBox: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: MaktabColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosBox: {
    backgroundColor: '#E53935',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  sosText: {
    color: MaktabColors.white,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});

const STATUS_ROWS = [
  { emoji: '😴', label: 'Uyqu:' },
  { emoji: '😇', label: 'Kayfiyat:' },
  { emoji: '📚', label: 'Dars tayyorlash:' },
  { emoji: '🤝', label: "Do'stlar bilan munosabat:" },
] as const;

export default function HomeScreen() {
  const gridGap = 14;

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <MaktabTopBar />
        <MaktabHero />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.sheet}>
            <View style={styles.workCard}>
              <Text style={styles.workCardTitle}>Bugungi ish</Text>
              <View style={[styles.grid, { marginHorizontal: -gridGap / 2 }]}>
                {GRID.map((item) => (
                  <View key={item.href} style={[styles.gridCell, { paddingHorizontal: gridGap / 2, marginBottom: gridGap }]}>
                    <Link href={item.href} asChild>
                      <Pressable
                        style={({ pressed }) => [
                          styles.tilePress,
                          pressed && styles.tilePressed,
                        ]}>
                        <View
                          style={[
                            styles.tileFace,
                            { backgroundColor: item.fill },
                            Platform.OS === 'web' ? styles.tileFaceWeb : styles.tileFaceNative,
                          ]}>
                          <View style={styles.tileInner}>
                            <TileIcon graphic={item.graphic} />
                            <Text style={styles.tileTitle} numberOfLines={2}>
                              {item.title}
                            </Text>
                            <Text style={styles.tileSub} numberOfLines={2}>
                              {item.subtitle}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </Link>
                  </View>
                ))}
              </View>
            </View>

            <Text style={[styles.sectionTitle, styles.sectionSpaced]}>Bugungi holatingiz</Text>
            <View style={styles.card}>
              {STATUS_ROWS.map((row) => (
                <View key={row.label} style={styles.statusRow}>
                  <Text style={styles.statusEmoji}>{row.emoji}</Text>
                  <Text style={styles.statusLabel}>
                    {row.label} <Text style={styles.statusDash}>—</Text>
                  </Text>
                </View>
              ))}
              <Link href="/baholash" asChild>
                <Pressable
                  style={({ pressed }) => [
                    styles.cta,
                    pressed && { opacity: 0.92, transform: [{ scale: 0.998 }] },
                  ]}>
                  <Ionicons name="clipboard-outline" size={20} color={MaktabColors.white} />
                  <Text style={styles.ctaText}>Baholashni boshlash</Text>
                </Pressable>
              </Link>
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
  safeTop: {
    flex: 1,
    backgroundColor: MaktabColors.navyDeep,
  },
  scroll: {
    flex: 1,
    backgroundColor: MaktabColors.pageBg,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sheet: {
    backgroundColor: MaktabColors.pageBg,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  workCard: {
    backgroundColor: MaktabColors.cardBg,
    borderRadius: 18,
    padding: 16,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#e8ecf1',
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
  workCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    marginBottom: 14,
  },
  sectionSpaced: {
    marginTop: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '50%',
  },
  tilePress: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 18,
    overflow: 'hidden',
  },
  tilePressed: {
    opacity: 0.94,
    transform: [{ scale: 0.98 }],
  },
  tileFace: {
    width: '100%',
    height: 120,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tileFaceWeb: {
    boxShadow: '0 6px 18px rgba(15, 23, 42, 0.2)',
  },
  tileFaceNative: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 6,
  },
  tileInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    gap: 8,
  },
  tileTitle: {
    color: MaktabColors.white,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  tileSub: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 2,
  },
  card: {
    backgroundColor: MaktabColors.cardBg,
    borderRadius: 16,
    padding: 16,
    gap: 10,
    marginTop: 4,
    ...Platform.select({
      web: { boxShadow: '0 2px 16px rgba(15, 23, 42, 0.06)' },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 2,
      },
    }),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MaktabColors.rowTint,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  statusEmoji: {
    fontSize: 18,
  },
  statusLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: MaktabColors.textPrimary,
  },
  statusDash: {
    color: MaktabColors.textMuted,
    fontWeight: '600',
  },
  cta: {
    marginTop: 6,
    backgroundColor: MaktabColors.teal,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaText: {
    color: MaktabColors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
