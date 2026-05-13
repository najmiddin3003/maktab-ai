import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaktabHero, MaktabTopBar } from '@/components/maktab-header';
import { useAuth } from '@/context/auth-context';
import { useKeyboardBottomInset } from '@/hooks/use-keyboard-bottom-inset';
import { MaktabColors } from '@/constants/maktab-theme';

const TOTAL_STEPS = 6;

const MOODS = [
  { id: 'alo' as const, label: "A'lo", emoji: '😁' },
  { id: 'yaxshi' as const, label: 'Yaxshi', emoji: '🙂' },
  { id: 'oddiy' as const, label: 'Oddiy', emoji: '😐' },
  { id: 'yomon' as const, label: 'Yomon', emoji: '☹️' },
  { id: 'dahshat' as const, label: 'Dahshat', emoji: '😭' },
];

type MoodId = (typeof MOODS)[number]['id'];

function ProgressCard({ filled }: { filled: number }) {
  const { width } = useWindowDimensions();
  const inner = Math.max(0, width - 40);
  const pct = Math.min(100, (filled / TOTAL_STEPS) * 100);
  const fillW = Math.max(4, (inner * pct) / 100);
  return (
    <View style={progressStyles.wrap}>
      <View style={progressStyles.titleRow}>
        <Ionicons name="document-text-outline" size={22} color="rgba(255,255,255,0.95)" />
        <Text style={progressStyles.title}>Kunlik Baholash</Text>
      </View>
      <Text style={progressStyles.sub}>Barcha savollarga halol javob bering</Text>
      <View style={[progressStyles.track, { width: inner }]}>
        <View style={[progressStyles.fill, { width: fillW }]} />
      </View>
      <Text style={progressStyles.count}>
        {filled} / {TOTAL_STEPS} savol
      </Text>
    </View>
  );
}

const progressStyles = StyleSheet.create({
  wrap: {
    marginTop: 14,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  title: {
    color: MaktabColors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  sub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 14,
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
    marginBottom: 10,
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: MaktabColors.teal,
  },
  count: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '700',
  },
});

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={cardStyles.outer}>
      <Text style={cardStyles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const cardStyles = StyleSheet.create({
  outer: {
    backgroundColor: MaktabColors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      web: { boxShadow: '0 1px 8px rgba(15, 23, 42, 0.06)' },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
      },
    }),
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    marginBottom: 14,
    letterSpacing: 0.4,
  },
});

const fieldStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 15,
    fontWeight: '600',
    color: MaktabColors.textPrimary,
    backgroundColor: '#fafafa',
  },
});

function SelectRow({
  selected,
  onPress,
  label,
  left,
}: {
  selected: boolean;
  onPress: () => void;
  label: string;
  left: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        rowStyles.row,
        selected && rowStyles.rowSelected,
        pressed && rowStyles.rowPressed,
      ]}>
      {left}
      <Text style={[rowStyles.label, selected && rowStyles.labelSelected]}>{label}</Text>
      {selected ? <Ionicons name="checkmark-circle" size={22} color={MaktabColors.teal} /> : null}
    </Pressable>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
    backgroundColor: MaktabColors.white,
  },
  rowSelected: {
    backgroundColor: '#ecfdf5',
    borderColor: MaktabColors.teal,
    borderWidth: 2,
  },
  rowPressed: {
    opacity: 0.92,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: MaktabColors.textPrimary,
  },
  labelSelected: {
    color: MaktabColors.tealDark,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function BaholashScreen() {
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const sheetPad = 16;
  const moodGap = 6;
  const moodCell = Math.max(56, Math.floor((width - sheetPad * 2 - moodGap * 4) / 5));

  const [mood, setMood] = useState<MoodId | null>(null);
  const [sleepHours, setSleepHours] = useState(7);
  const [attendance, setAttendance] = useState<'all' | 'partial' | 'none' | null>(null);
  const [friends, setFriends] = useState<'great' | 'ok' | 'conflict' | 'alone' | null>(null);
  const [homeEnv, setHomeEnv] = useState<'calm' | 'ok' | 'issues' | 'severe' | null>(null);
  const [comment, setComment] = useState('');
  const keyboardBottom = useKeyboardBottomInset(56);

  const filledSteps = useMemo(() => {
    let n = 0;
    if (mood) n += 1;
    if (sleepHours >= 3 && sleepHours <= 16) n += 1;
    if (attendance) n += 1;
    if (friends) n += 1;
    if (homeEnv) n += 1;
    if (comment.trim().length > 0 || (mood && attendance && friends && homeEnv)) n += 1;
    return Math.min(TOTAL_STEPS, n);
  }, [mood, sleepHours, attendance, friends, homeEnv, comment]);

  const sleepNorma = sleepHours >= 7 && sleepHours <= 9;

  const submit = () => {
    if (!user?.profileComplete) {
      Alert.alert('Diqqat', 'Avval profilingizni to‘liq to‘ldiring.');
      return;
    }
    if (!mood || !attendance || !friends || !homeEnv) {
      Alert.alert('Diqqat', 'Iltimos, barcha majburiy savollarni to‘ldiring.');
      return;
    }
    Alert.alert('Rahmat!', 'Natijangiz qabul qilindi (namuna rejim).');
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <MaktabTopBar />
        <View style={styles.flex}>
          <MaktabHero below={<ProgressCard filled={filledSteps} />} />
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[styles.scrollInner, { paddingBottom: 24 + keyboardBottom }]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}>
            <View style={styles.sheet}>
              <SectionCard title="1. BUGUNGI KAYFIYATINGIZ">
                <View style={[styles.moodRow, { gap: moodGap }]}>
                  {MOODS.map((m) => {
                    const on = mood === m.id;
                    return (
                      <Pressable
                        key={m.id}
                        onPress={() => setMood(m.id)}
                        style={[
                          styles.moodCell,
                          { width: moodCell, height: moodCell },
                          on && styles.moodCellOn,
                        ]}>
                        <View style={styles.moodEmojiWrap}>
                          <Text style={styles.moodEmoji} numberOfLines={1}>
                            {m.emoji}
                          </Text>
                        </View>
                        <Text style={[styles.moodLabel, on && styles.moodLabelOn]} numberOfLines={2}>
                          {m.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </SectionCard>

              <SectionCard title="2. KECHA NECHA SOAT UXLADINGIZ?">
                <Text style={styles.sleepBig}>{sleepHours} soat uyqu</Text>
                {sleepNorma ? (
                  <Text style={styles.sleepNorma}>{sleepHours} soat (norma)</Text>
                ) : (
                  <Text style={styles.sleepHint}>Tavsiya: 7–9 soat</Text>
                )}
                <View style={styles.sleepLabels}>
                  <Text style={styles.sleepEdge}>3 soat</Text>
                  <Text style={styles.sleepEdge}>16 soat</Text>
                </View>
                <View style={styles.sliderWrap}>
                  <Slider
                    style={styles.slider}
                    minimumValue={3}
                    maximumValue={16}
                    step={1}
                    value={sleepHours}
                    onValueChange={(v) => setSleepHours(Math.round(v))}
                    minimumTrackTintColor={MaktabColors.teal}
                    maximumTrackTintColor="#e2e8f0"
                    thumbTintColor={MaktabColors.teal}
                  />
                </View>
              </SectionCard>

              <SectionCard title="3. BUGUN DARSLARGA QATNASHDINGIZMI?">
                <SelectRow
                  selected={attendance === 'all'}
                  onPress={() => setAttendance('all')}
                  label="Ha, barcha darslarga"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#dcfce7' }]}>
                      <Ionicons name="checkmark" size={22} color="#16a34a" />
                    </View>
                  }
                />
                <SelectRow
                  selected={attendance === 'partial'}
                  onPress={() => setAttendance('partial')}
                  label="Qisman (2-3 dars qoldim)"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#fef9c3' }]}>
                      <Ionicons name="warning" size={20} color="#ca8a04" />
                    </View>
                  }
                />
                <SelectRow
                  selected={attendance === 'none'}
                  onPress={() => setAttendance('none')}
                  label="Yo'q, kelmadim"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#fee2e2' }]}>
                      <Ionicons name="close" size={22} color="#dc2626" />
                    </View>
                  }
                />
              </SectionCard>

              <SectionCard title="4. DO'STLARINGIZ BILAN MUNOSABAT">
                <SelectRow
                  selected={friends === 'great'}
                  onPress={() => setFriends('great')}
                  label="Juda yaxshi"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#fef3c7' }]}>
                      <Text style={{ fontSize: 22 }}>💛</Text>
                    </View>
                  }
                />
                <SelectRow
                  selected={friends === 'ok'}
                  onPress={() => setFriends('ok')}
                  label="Oddiy, do'stlarim bor"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#e0f2fe' }]}>
                      <Text style={{ fontSize: 22 }}>👍</Text>
                    </View>
                  }
                />
                <SelectRow
                  selected={friends === 'conflict'}
                  onPress={() => setFriends('conflict')}
                  label="Ziddiyat bor"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#ffedd5' }]}>
                      <Text style={{ fontSize: 22 }}>😟</Text>
                    </View>
                  }
                />
                <SelectRow
                  selected={friends === 'alone'}
                  onPress={() => setFriends('alone')}
                  label="Yolg'iz, do'stim yo'q"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#f1f5f9' }]}>
                      <Text style={{ fontSize: 22 }}>😔</Text>
                    </View>
                  }
                />
              </SectionCard>

              <SectionCard title="5. UYDA MUHIT QANDAY?">
                <SelectRow
                  selected={homeEnv === 'calm'}
                  onPress={() => setHomeEnv('calm')}
                  label="Tinch va yaxshi"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#dbeafe' }]}>
                      <Text style={{ fontSize: 20 }}>🏠</Text>
                    </View>
                  }
                />
                <SelectRow
                  selected={homeEnv === 'ok'}
                  onPress={() => setHomeEnv('ok')}
                  label="Oddiy"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#ecfdf5' }]}>
                      <Text style={{ fontSize: 22 }}>🙂</Text>
                    </View>
                  }
                />
                <SelectRow
                  selected={homeEnv === 'issues'}
                  onPress={() => setHomeEnv('issues')}
                  label="Ko'p muammolar bor"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#ffedd5' }]}>
                      <Text style={{ fontSize: 22 }}>😟</Text>
                    </View>
                  }
                />
                <SelectRow
                  selected={homeEnv === 'severe'}
                  onPress={() => setHomeEnv('severe')}
                  label="Juda og'ir vaziyat"
                  left={
                    <View style={[rowStyles.iconBox, { backgroundColor: '#fee2e2' }]}>
                      <Text style={{ fontSize: 22 }}>😰</Text>
                    </View>
                  }
                />
              </SectionCard>

              <SectionCard title="6. QO'SHIMCHA IZOH (IXTIYORIY)">
                <TextInput
                  style={styles.textArea}
                  placeholder="Bu yerga xohlaganingizni yozishingiz mumkin..."
                  placeholderTextColor="#94a3b8"
                  multiline
                  textAlignVertical="top"
                  value={comment}
                  onChangeText={setComment}
                  numberOfLines={5}
                />
                <View style={styles.privacyRow}>
                  <Ionicons name="lock-closed-outline" size={16} color={MaktabColors.textMuted} />
                  <Text style={styles.privacyTxt}>Faqat psixolog ko&apos;radi. Maxfiylik kafolatlanadi.</Text>
                </View>
              </SectionCard>

              <Pressable onPress={submit} style={({ pressed }) => [styles.submitBtn, pressed && { opacity: 0.92 }]}>
                <Text style={styles.submitTxt}>✅ Natijani yuborish va saqlash</Text>
              </Pressable>
              <View style={[styles.privacyRow, { justifyContent: 'center', marginBottom: 28 }]}>
                <Ionicons name="shield-checkmark-outline" size={16} color={MaktabColors.textMuted} />
                <Text style={styles.privacyTxt}>Ma&apos;lumotlaringiz xavfsiz saqlanadi</Text>
              </View>
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
    paddingBottom: 24,
  },
  sheet: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  moodRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  moodCell: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: MaktabColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  moodCellOn: {
    backgroundColor: '#ecfdf5',
    borderColor: MaktabColors.teal,
    borderWidth: 2,
  },
  moodEmojiWrap: {
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 2,
  },
  moodEmoji: {
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    ...Platform.select({
      android: { includeFontPadding: false },
    }),
  },
  moodLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: MaktabColors.textMuted,
    textAlign: 'center',
    width: '100%',
    paddingHorizontal: 2,
  },
  moodLabelOn: {
    color: MaktabColors.tealDark,
  },
  sleepBig: {
    fontSize: 26,
    fontWeight: '800',
    color: MaktabColors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  sleepNorma: {
    fontSize: 14,
    fontWeight: '700',
    color: MaktabColors.teal,
    textAlign: 'center',
    marginBottom: 12,
  },
  sleepHint: {
    fontSize: 13,
    fontWeight: '600',
    color: MaktabColors.textMuted,
    textAlign: 'center',
    marginBottom: 12,
  },
  sleepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sleepEdge: {
    fontSize: 12,
    fontWeight: '600',
    color: MaktabColors.textMuted,
  },
  sliderWrap: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  slider: {
    width: '100%',
    height: 44,
  },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    fontWeight: '500',
    color: MaktabColors.textPrimary,
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  privacyTxt: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: MaktabColors.textMuted,
  },
  submitBtn: {
    backgroundColor: MaktabColors.teal,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitTxt: {
    color: MaktabColors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});
