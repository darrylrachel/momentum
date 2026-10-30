import { useState, type ComponentProps, type PropsWithChildren } from 'react';
import { Pressable, ScrollView, Text, View, useWindowDimensions, type TextProps, type ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { tokens } from '../theme/tokens';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export function Icon({ name, color, size = 22 }: { name: IconName; color?: string; size?: number }) {
  const { colors } = useTheme();
  return <Ionicons name={name} size={size} color={color ?? colors.accent} accessible={false} importantForAccessibility="no" />;
}
export function Copy({ children, title = false, muted = false, style, ...props }: TextProps & { title?: boolean; muted?: boolean }) {
  const { colors } = useTheme();
  return <Text {...props} style={[{ color: muted ? colors.muted : colors.text, fontFamily: title ? tokens.font.heading : tokens.font.body, fontSize: title ? tokens.type.screen : tokens.type.body, lineHeight: title ? 40 : 23, flexShrink: 1 }, style]}>{children}</Text>;
}
export function AppHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const { colors } = useTheme();
  return <View style={{ gap: 4 }}>
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 4 }}><Icon name="leaf" size={16} /><Copy style={{ color: colors.accent, fontFamily: tokens.font.medium, fontSize: 12, letterSpacing: 1.6 }}>{eyebrow.toUpperCase()}</Copy></View>
    <Copy title accessibilityRole="header">{title}</Copy>{subtitle && <Copy muted style={{ fontSize: 14, lineHeight: 21 }}>{subtitle}</Copy>}
  </View>;
}
export function Screen({ eyebrow = 'Fresh Fuel', title, subtitle, children }: PropsWithChildren<{ eyebrow?: string; title: string; subtitle?: string }>) {
  const { colors } = useTheme();
  const { width, fontScale } = useWindowDimensions();
  return <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, backgroundColor: colors.background }}>
    <ScrollView contentContainerStyle={{ padding: width < 360 ? 16 : 20, gap: 24, width: '100%', maxWidth: 720, alignSelf: 'center', paddingBottom: 32 }}>
      <AppHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <View testID="screen-content" style={{ gap: fontScale > 1.3 ? 28 : 24 }}>{children}</View>
    </ScrollView>
  </SafeAreaView>;
}
export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  const { colors } = useTheme();
  return <View style={[{ backgroundColor: colors.surface, borderRadius: tokens.radius.card, padding: 16, gap: 16 }, style]}>{children}</View>;
}
export function Section({ children }: PropsWithChildren) {
  return <Copy accessibilityRole="header" style={{ fontFamily: tokens.font.medium, fontSize: tokens.type.section, lineHeight: 28 }}>{children}</Copy>;
}
export function SectionHeader({ title, meta }: { title: string; meta?: string }) {
  return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}><Section>{title}</Section>{meta && <Copy muted style={{ fontSize: 13 }}>{meta}</Copy>}</View>;
}
export function Badge({ children }: PropsWithChildren) {
  const { colors } = useTheme();
  return <Copy style={{ color: colors.accent, fontSize: 12, fontFamily: tokens.font.medium, letterSpacing: 0.8 }}>{children}</Copy>;
}
export function CategoryChip({ label, icon = 'information-circle-outline' }: { label: string; icon?: IconName }) {
  const { colors } = useTheme();
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', backgroundColor: colors.elevated, borderRadius: tokens.radius.pill, paddingHorizontal: 12, paddingVertical: 8 }}><Icon name={icon} size={14} /><Copy style={{ color: colors.accent, fontSize: 12, lineHeight: 18, fontFamily: tokens.font.medium }}>{label}</Copy></View>;
}
export function Action({ label, onPress, selected, variant = 'secondary', icon }: { label: string; onPress: () => void; selected?: boolean; variant?: 'primary' | 'secondary'; icon?: IconName }) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const filled = selected || variant === 'primary';
  const foreground = filled ? colors.onAccent : colors.accent;
  return <Pressable accessibilityLabel={label} accessibilityRole={selected === undefined ? 'button' : 'radio'} accessibilityState={selected === undefined ? undefined : { checked: selected }} onPress={onPress} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
    style={({ pressed }) => ({ minHeight: tokens.state.minTouch, padding: 12, paddingHorizontal: 16, borderRadius: tokens.radius.button, borderWidth: 2, borderColor: focused ? colors.focus : (filled ? colors.accent : colors.border), backgroundColor: filled ? colors.accent : colors.surface, opacity: pressed ? tokens.state.pressedOpacity : 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 })}>
    {icon && <Icon name={icon} color={foreground} size={18} />}<Copy style={{ color: foreground, fontFamily: tokens.font.medium }}>{label}</Copy>{selected && <Icon name="checkmark-circle" color={foreground} size={20} />}
  </Pressable>;
}
export function PrimaryButton(props: Omit<ComponentProps<typeof Action>, 'variant' | 'selected'>) { return <Action {...props} variant="primary" />; }
export function SecondaryButton(props: Omit<ComponentProps<typeof Action>, 'variant' | 'selected'>) { return <Action {...props} />; }
export function EmptyState({ icon, title, description, compact = false, children }: PropsWithChildren<{ icon: IconName; title: string; description: string; compact?: boolean }>) {
  const { colors } = useTheme();
  return <View style={{ gap: 12, alignItems: compact ? 'flex-start' : 'center', paddingVertical: compact ? 0 : 16 }}>
    <View style={{ width: compact ? 44 : 72, height: compact ? 44 : 72, backgroundColor: colors.elevated, borderRadius: compact ? 14 : 24, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-5deg' }] }}><Icon name={icon} size={compact ? 24 : 34} /></View>
    <View style={{ gap: 8, alignSelf: 'stretch' }}><Copy accessibilityRole="header" style={{ fontFamily: tokens.font.medium, fontSize: 18, lineHeight: 26, textAlign: compact ? 'left' : 'center' }}>{title}</Copy><Copy muted style={{ textAlign: compact ? 'left' : 'center', fontSize: 14, lineHeight: 22 }}>{description}</Copy></View>{children}
  </View>;
}
export function SettingsRow({ icon, title, detail, onPress }: { icon: IconName; title: string; detail: string; onPress?: () => void }) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const content = <><View style={{ backgroundColor: colors.elevated, padding: 12, borderRadius: 12 }}><Icon name={icon} size={20} /></View><View style={{ flex: 1, gap: 4 }}><Copy style={{ fontFamily: tokens.font.medium }}>{title}</Copy><Copy muted style={{ fontSize: 13, lineHeight: 20 }}>{detail}</Copy></View>{onPress && <Icon name="chevron-forward" size={18} color={colors.muted} />}</>;
  const style: ViewStyle = { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 64, paddingVertical: 8, paddingHorizontal: 4, borderRadius: 12 };
  return onPress ? <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={({ pressed }) => [style, { borderWidth: 2, borderColor: focused ? colors.focus : 'transparent', opacity: pressed ? tokens.state.pressedOpacity : 1 }]}>{content}</Pressable> : <View style={style}>{content}</View>;
}
export function Divider() { const { colors } = useTheme(); return <View style={{ height: 1, backgroundColor: colors.divider }} />; }
