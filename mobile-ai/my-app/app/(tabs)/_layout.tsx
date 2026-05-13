import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { MaktabColors } from '@/constants/maktab-theme';

function TabIcon({ name, color }: { name: keyof typeof Ionicons.glyphMap; color: string }) {
  return <Ionicons name={name} size={24} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: MaktabColors.tabActive,
        tabBarInactiveTintColor: MaktabColors.tabInactive,
        tabBarStyle: {
          backgroundColor: MaktabColors.white,
          borderTopColor: '#e8eaed',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Bosh',
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="baholash"
        options={{
          title: 'Baholash',
          tabBarIcon: ({ color }) => <TabIcon name="bar-chart-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="maslahat"
        options={{
          title: 'Maslahat',
          tabBarIcon: ({ color }) => <TabIcon name="bulb-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tarix"
        options={{
          title: 'Tarix',
          tabBarActiveTintColor: '#ef4444',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="stats-chart-outline" color={focused ? '#ef4444' : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="yordam"
        options={{
          title: 'Yordam',
          tabBarActiveTintColor: '#e53935',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="help-buoy-outline" color={focused ? '#e53935' : color} />
          ),
        }}
      />
    </Tabs>
  );
}
