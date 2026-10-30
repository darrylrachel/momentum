import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../../src/theme/ThemeProvider';
const tabs = [ ['index', 'Today', 'sunny-outline'], ['plans', 'Plans', 'calendar-outline'], ['pantry', 'Pantry', 'cube-outline'], ['grocery', 'Grocery', 'basket-outline'], ['profile', 'Profile', 'person-outline'] ] as const;
export default function TabLayout() {
  const { colors } = useTheme();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted, tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border }, tabBarLabelStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 11 } }}>
    {tabs.map(([name, title, icon]) => <Tabs.Screen key={name} name={name} options={{ title, tabBarIcon: ({ color, size }) => <Ionicons name={icon} color={typeof color === 'string' ? color : colors.muted} size={size} /> }} />)}
  </Tabs>;
}
