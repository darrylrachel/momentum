import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../src/theme/ThemeProvider';
const tabs = [ ['index', 'Today', 'sunny-outline'], ['plans', 'Plans', 'calendar-outline'], ['pantry', 'Pantry', 'cube-outline'], ['grocery', 'Grocery', 'basket-outline'], ['profile', 'Profile', 'person-outline'] ] as const;
export default function TabLayout() {
  const { colors } = useTheme();
  const { fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.accent, tabBarInactiveTintColor: colors.muted, tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.divider, height: 64 * Math.max(fontScale, 1) + insets.bottom, paddingBottom: insets.bottom }, tabBarItemStyle: { minHeight: 48, paddingVertical: 4 }, tabBarLabelStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 12 }, tabBarAllowFontScaling: true }}>
    {tabs.map(([name, title, icon]) => <Tabs.Screen key={name} name={name} options={{ title, tabBarAccessibilityLabel: `${title}, tab`, tabBarIcon: ({ color, size }) => <Ionicons accessible={false} name={icon} color={typeof color === 'string' ? color : colors.muted} size={size} /> }} />)}
  </Tabs>;
}
