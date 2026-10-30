import { type PropsWithChildren } from 'react';
import { Pressable, ScrollView, Text, View, type TextProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { tokens } from '../theme/tokens';

export function Copy({ children, title = false, muted = false, style, ...props }: TextProps & { title?: boolean; muted?: boolean }) {
  const { colors } = useTheme();
  return <Text {...props} style={[{ color: muted ? colors.muted : colors.text, fontFamily: title ? tokens.font.heading : tokens.font.body, fontSize: title ? 28 : 16, lineHeight: title ? 37 : 25, flexShrink: 1 }, style]}>{children}</Text>;
}
export function Screen({ eyebrow, title, subtitle, children }: PropsWithChildren<{ eyebrow: string; title: string; subtitle: string }>) {
  const { colors } = useTheme();
  return <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView contentContainerStyle={{ padding: 24, gap: 24, width: '100%', maxWidth: 640, alignSelf: 'center', paddingBottom: 40 }}>
      <View style={{ gap: 8 }}><Copy style={{ color: colors.accent, fontFamily: tokens.font.medium, fontSize: 12, letterSpacing: 2 }}>{eyebrow.toUpperCase()}</Copy><Copy title accessibilityRole="header">{title}</Copy><Copy muted>{subtitle}</Copy></View>
      {children}
    </ScrollView>
  </SafeAreaView>;
}
export function Card({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  return <View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: tokens.radius.card, padding: 24, gap: 16 }}>{children}</View>;
}
export function Section({ children }: PropsWithChildren) {
  return <Copy accessibilityRole="header" style={{ fontFamily: tokens.font.heading, fontSize: 19 }}>{children}</Copy>;
}
export function Badge({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  return <Copy style={{ color: colors.accent, fontSize: 12, fontFamily: tokens.font.medium, letterSpacing: 1 }}>{children}</Copy>;
}
export function Action({ label, onPress, selected }: { label: string; onPress: () => void; selected?: boolean }) {
  const { colors } = useTheme();
  return <Pressable accessibilityRole={selected === undefined ? 'button' : 'radio'} accessibilityState={selected === undefined ? undefined : { checked: selected }} onPress={onPress}
    style={({ pressed }) => ({ minHeight: 52, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.accent, backgroundColor: selected ? colors.accent : colors.surface, opacity: pressed ? 0.7 : 1 })}>
    <Copy style={{ color: selected ? colors.onAccent : colors.accent, fontFamily: tokens.font.medium }}>{label}{selected ? '  ✓' : ''}</Copy>
  </Pressable>;
}
