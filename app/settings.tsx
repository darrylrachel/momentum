import { View } from 'react-native';
import { Action, Card, Copy, Screen, Section, Icon } from '../src/components/ui';
import { useTheme } from '../src/theme/ThemeProvider';
export default function Settings() {
  const { preference, selectTheme, error } = useTheme();
  return <Screen title="Appearance" subtitle="A fresh perspective, day or night.">
    <Card><Section>Your theme</Section><Copy muted style={{ fontSize: 14 }}>Saved on this device. Dark is your first-visit default.</Copy>
      {(['dark', 'light', 'system'] as const).map(value => <View key={value} style={{ gap: 8 }}><Action icon={value === 'dark' ? 'moon-outline' : value === 'light' ? 'sunny-outline' : 'phone-portrait-outline'} label={value === 'system' ? 'Match device settings' : `${value === 'dark' ? 'Dark' : 'Light'} theme`} selected={preference === value} onPress={() => selectTheme(value)} /></View>)}
      {error && <Copy accessibilityRole="alert">{error}</Copy>}
    </Card><View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}><Icon name="shield-checkmark-outline" size={18} /><Copy muted style={{ fontSize: 13 }}>Works offline. No account needed.</Copy></View>
  </Screen>;
}
