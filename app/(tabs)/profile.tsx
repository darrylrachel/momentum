import { router } from 'expo-router';
import { View } from 'react-native';
import { Card, CategoryChip, Copy, Divider, EmptyState, Screen, SectionHeader, SettingsRow } from '../../src/components/ui';
import { useTheme } from '../../src/theme/ThemeProvider';
export default function Profile() {
  const { preference } = useTheme();
  const theme = preference === 'system' ? 'Match device settings' : `${preference === 'dark' ? 'Dark' : 'Light'} theme`;
  return <Screen title="Your space" subtitle="Make Fresh Fuel feel like you.">
    <Card><EmptyState compact icon="person-outline" title="Welcome to Fresh Fuel" description="No account connected. Your appearance choice stays on this device." /></Card>
    <View style={{ gap: 12 }}><SectionHeader title="App preferences" /><Card><SettingsRow icon="color-palette-outline" title="Appearance settings" detail={theme} onPress={() => router.push('/settings')} /></Card></View>
    <View style={{ gap: 12 }}><SectionHeader title="Built around you" meta="Coming soon" /><Card><SettingsRow icon="nutrition-outline" title="Nutrition preferences" detail="Everyday or Performance, goals, and dietary needs" /><Divider /><SettingsRow icon="people-outline" title="Your household" detail="Named members and individual preferences" /></Card></View>
    <CategoryChip label="Profile setup · Coming soon" /><Copy muted style={{ fontSize: 12 }}>No personal nutrition information collected.</Copy>
  </Screen>;
}
