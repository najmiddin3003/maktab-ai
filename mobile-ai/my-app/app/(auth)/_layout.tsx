import { Stack } from 'expo-router';

import { MaktabColors } from '@/constants/maktab-theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: MaktabColors.pageBg },
        animation: 'fade',
      }}
    />
  );
}
