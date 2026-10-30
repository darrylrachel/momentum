import { Action, Card, Copy, Screen, Section } from '../src/components/ui';
import { useTheme } from '../src/theme/ThemeProvider';
export default function Settings() {
  const { preference, selectTheme, error } = useTheme();
  return <Screen eyebrow="Make yourself at home" title="Appearance" subtitle="Choose what feels right. Your choice is saved on this device."><Card><Section>Your theme</Section>{(['dark', 'light', 'system'] as const).map(value => <Action key={value} label={value === 'system' ? 'Match device settings' : `${value === 'dark' ? 'Dark' : 'Light'} theme`} selected={preference === value} onPress={() => selectTheme(value)} />)}{error && <Copy accessibilityRole="alert">{error}</Copy>}</Card><Copy muted>Dark is the default for your first visit. Appearance works offline and does not require an account.</Copy></Screen>;
}
