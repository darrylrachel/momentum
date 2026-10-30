import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';
import { ThemeProvider, useTheme } from '../src/theme/ThemeProvider';
import { Copy } from '../src/components/ui';
import { View } from 'react-native';

function Root() {
  const { mode, colors, ready } = useTheme();
  const [loaded, error] = useFonts({ Inter_400Regular, Inter_600SemiBold, PlusJakartaSans_700Bold });
  if (!ready || (!loaded && !error)) return <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 32 }}><Copy>Preparing Fresh Fuel…</Copy></View>;
  return <><StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
    {error && <View style={{ backgroundColor: colors.background, padding: 16 }}><Copy>Custom fonts unavailable. Using device fallback.</Copy></View>}
    <Stack screenOptions={{ headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.text, contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} /><Stack.Screen name="settings" options={{ title: 'Appearance' }} />
    </Stack></>;
}
export default function Layout() { return <ThemeProvider><Root /></ThemeProvider>; }
