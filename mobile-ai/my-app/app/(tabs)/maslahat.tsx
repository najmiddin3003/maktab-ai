import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaktabHero, MaktabTopBar } from '@/components/maktab-header';
import { MaktabColors } from '@/constants/maktab-theme';

type Tip = {
  emoji: string;
  title: string;
  body: string;
  bg: string;
  border: string;
};

const TIPS: Tip[] = [
  {
    emoji: '😴',
    title: "Sog'lom uyqu",
    body: "Har kuni 8-9 soat uxlang. Kechqurun telefon ekranini ko'rmang - bu uyquni buzadi.",
    bg: MaktabColors.tipGreen,
    border: MaktabColors.tipGreenBorder,
  },
  {
    emoji: '📚',
    title: 'Dars tayyorlash',
    body: "Kuniga 45 daqiqa dars tayyorlang, so'ng 15 daqiqa tanaffus qiling. Bu usul yodlashni 2 baravar yaxshilaydi.",
    bg: MaktabColors.tipBlue,
    border: MaktabColors.tipBlueBorder,
  },
  {
    emoji: '💛',
    title: "Do'stlar bilan munosabat",
    body: "Kun davomida kamida bitta yaxshi suhbat qiling. Ijtimoiy aloqalar ruhiy sog'liqni mustahkamlaydi.",
    bg: MaktabColors.tipYellow,
    border: MaktabColors.tipYellowBorder,
  },
  {
    emoji: '🏃',
    title: 'Jismoniy faollik',
    body: "Kuniga 30 daqiqa sport yoki sayr - stress kamayadi, kayfiyat ko'tariladi. Har kuni!",
    bg: MaktabColors.tipOrange,
    border: MaktabColors.tipOrangeBorder,
  },
  {
    emoji: '🧘',
    title: 'Nafas mashqi',
    body: "Xavotir bo'lsa: 4 sanab nafas oling, 4 sanab ushlab turing, 4 sanab qo'yib yuboring. 3 marta takrorlang.",
    bg: MaktabColors.tipBlue,
    border: MaktabColors.tipBlueBorder,
  },
  {
    emoji: '📵',
    title: 'Telefon rejimi',
    body: "Dars paytida telefon jim rejimda bo'lsin. Tanaffuslarda foydalaning - diqqat kuchayadi.",
    bg: MaktabColors.tipYellow,
    border: MaktabColors.tipYellowBorder,
  },
];

export default function MaslahatScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <MaktabTopBar />
        <MaktabHero />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.sheet}>
            <Text style={styles.pageTitle}>💡 Foydali Maslahatlar</Text>
            {TIPS.map((tip) => (
              <View
                key={tip.title}
                style={[
                  styles.tipCard,
                  { backgroundColor: tip.bg, borderColor: tip.border },
                  Platform.OS === 'web' ? styles.tipCardWeb : styles.tipCardNative,
                ]}>
                <Text style={styles.tipEmoji}>{tip.emoji}</Text>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipBody}>{tip.body}</Text>
              </View>
            ))}
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
  scrollContent: {
    paddingBottom: 28,
  },
  sheet: {
    backgroundColor: MaktabColors.pageBg,
    paddingHorizontal: 16,
    paddingTop: 28,
    gap: 12,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    marginBottom: 4,
    marginTop: 10,
  },
  tipCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  tipCardWeb: {
    boxShadow: '0 1px 8px rgba(15, 23, 42, 0.06)',
  },
  tipCardNative: {
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  tipEmoji: {
    fontSize: 28,
    marginBottom: 2,
  },
  tipTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
  },
  tipBody: {
    fontSize: 15,
    lineHeight: 22,
    color: MaktabColors.textMuted,
    fontWeight: '500',
  },
});
