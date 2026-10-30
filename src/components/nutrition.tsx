import { View, useWindowDimensions } from 'react-native';
import { type PropsWithChildren } from 'react';
import { Card, Copy, Icon } from './ui';
import { useTheme } from '../theme/ThemeProvider';
import { tokens } from '../theme/tokens';

export type NutritionMetric = 'protein' | 'carbohydrate' | 'fat' | 'calories';
export interface ProgressProps { current?: number | null; goal?: number | null; unit: string; label: string; }
// Presentation-only arithmetic. No nutrition targets or food values originate here.
export function progressPresentation({ current, goal, unit, label }: ProgressProps) {
  const knownCurrent = typeof current === 'number' && Number.isFinite(current) && current >= 0;
  const knownGoal = typeof goal === 'number' && Number.isFinite(goal) && goal > 0;
  const value = knownCurrent ? current.toLocaleString(undefined, { maximumFractionDigits: 1 }) : '—';
  const target = knownGoal ? goal.toLocaleString(undefined, { maximumFractionDigits: 1 }) : undefined;
  const ratio = knownCurrent && knownGoal ? current / goal : null;
  const description = `${label}: ${knownCurrent ? `${value} ${unit}` : 'No intake data'}. ${knownGoal ? `Goal ${target} ${unit}.` : 'No target set.'}${ratio !== null && ratio > 1 ? ' Over target.' : ''}`;
  return { value, target, ratio, description, percent: ratio === null ? null : Math.min(ratio, 1) * 100 };
}
export function NutritionRing(props: ProgressProps) {
  const { colors } = useTheme();
  const data = progressPresentation(props);
  // A small segmented ring uses native views without a chart or SVG dependency.
  return <View accessible accessibilityRole={data.percent === null ? 'text' : 'progressbar'} accessibilityLabel={data.description}
    accessibilityValue={data.percent === null ? undefined : { min: 0, max: 100, now: data.percent, text: data.description }} style={{ alignItems: 'center', gap: 4 }}>
    <View importantForAccessibility="no-hide-descendants" accessibilityElementsHidden style={{ width: 112, height: 112 }}>
      {Array.from({ length: 64 }, (_, index) => {
        const angle = index / 64 * Math.PI * 2 - Math.PI / 2;
        return <View key={index} style={{ position: 'absolute', left: 54 + 50 * Math.cos(angle), top: 52 + 50 * Math.sin(angle), width: 3, height: 8, borderRadius: 2, transform: [{ rotate: `${index / 64 * 360}deg` }], backgroundColor: data.ratio !== null && index / 64 < Math.min(data.ratio, 1) ? colors.calories : colors.border }} />;
      })}<View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}><Icon name="flame-outline" color={data.ratio === null ? colors.muted : colors.calories} size={30} /></View>
    </View>
    <Copy style={{ fontFamily: tokens.font.medium, fontSize: 28, lineHeight: 36, fontVariant: ['tabular-nums'] }}>{data.value}<Copy muted style={{ fontSize: 12 }}> {props.unit}</Copy></Copy>
    <Copy muted style={{ fontSize: 12 }}>{data.target ? `Goal ${data.target} ${props.unit}` : 'No target set'}</Copy>
    {data.ratio !== null && data.ratio > 1 && <Copy style={{ fontSize: 12, color: colors.warning }}>Over target</Copy>}
  </View>;
}
export function MacroProgressBar({ metric, ...props }: ProgressProps & { metric: NutritionMetric }) {
  const { colors } = useTheme();
  const data = progressPresentation(props);
  return <View accessible accessibilityRole={data.percent === null ? 'text' : 'progressbar'} accessibilityLabel={data.description} accessibilityValue={data.percent === null ? undefined : { min: 0, max: 100, now: data.percent, text: data.description }} style={{ gap: 8 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}><Copy style={{ fontSize: 13, fontFamily: tokens.font.medium }}>{props.label}</Copy><Copy style={{ fontSize: 13, color: colors[metric], fontVariant: ['tabular-nums'] }}>{data.value} {props.unit}{data.target ? ` / ${data.target} ${props.unit}` : ''}</Copy></View>
    <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.border, overflow: 'hidden' }}><View testID={`${metric}-fill`} style={{ height: '100%', width: `${data.percent ?? 0}%`, backgroundColor: colors[metric] }} /></View>
    {data.ratio !== null && data.ratio > 1 && <Copy style={{ fontSize: 12, color: colors.warning }}>Over target</Copy>}
  </View>;
}
export function MetricCard({ label, value, unit, description }: { label: string; value?: number | null; unit: string; description?: string }) {
  const valid = typeof value === 'number' && Number.isFinite(value) && value >= 0;
  return <Card><Copy muted>{label}</Copy><Copy style={{ fontFamily: tokens.font.medium, fontSize: 32, lineHeight: 40, fontVariant: ['tabular-nums'] }}>{valid ? value : '—'} <Copy muted>{unit}</Copy></Copy><Copy muted style={{ fontSize: 13 }}>{description ?? (valid ? label : 'No data available')}</Copy></Card>;
}
export function ChartCard({ title, children }: PropsWithChildren<{ title: string }>) { return <Card><Copy accessibilityRole="header" style={{ fontFamily: tokens.font.medium, fontSize: 17 }}>{title}</Copy>{children ?? <Copy muted>No history available</Copy>}</Card>; }
export function nutritionLayout(width: number, fontScale: number) {
  return width < 350 || fontScale > 1.3 ? 'column' : 'row';
}
export function NutritionSummary() {
  const { width, fontScale } = useWindowDimensions();
  const stack = nutritionLayout(width, fontScale) === 'column';
  return <Card><View testID="nutrition-layout" style={{ flexDirection: stack ? 'column' : 'row', alignItems: stack ? 'stretch' : 'center', gap: 24 }}>
    <NutritionRing label="Calories" unit="kcal" /><View style={{ flex: 1, gap: 16 }}><MacroProgressBar label="Protein" metric="protein" unit="g" /><MacroProgressBar label="Carbs" metric="carbohydrate" unit="g" /><MacroProgressBar label="Fat" metric="fat" unit="g" /></View>
  </View><Copy muted style={{ fontSize: 12, lineHeight: 19 }}>No intake recorded · No nutrition targets set</Copy></Card>;
}
