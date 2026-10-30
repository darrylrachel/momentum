import { router } from 'expo-router';
import { View } from 'react-native';
import { Card, CategoryChip, Copy, EmptyState, PrimaryButton, Screen, SectionHeader, SettingsRow } from '../../src/components/ui';
import { NutritionSummary } from '../../src/components/nutrition';
export default function Today() {
  const date = new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  return <Screen title="Today" subtitle={date}>
    <View style={{ gap: 12 }}><SectionHeader title="Daily nutrition" meta="No active plan" /><NutritionSummary /></View>
    <Card><EmptyState compact icon="sparkles-outline" title="Good food starts here" description="Make room for meals that fit your goals and your day." /><PrimaryButton label="Explore your plans" icon="arrow-forward" onPress={() => router.navigate('/plans')} /></Card>
    <View style={{ gap: 12 }}><SectionHeader title="Today's meals" /><Card><EmptyState compact icon="restaurant-outline" title="Nothing on the menu yet" description="Your scheduled meals will appear here when planning is available." /></Card></View>
    <View style={{ gap: 12 }}><SectionHeader title="Your kitchen, connected" /><Card><SettingsRow icon="leaf-outline" title="See your pantry" detail="A home for the food you have" onPress={() => router.navigate('/pantry')} /><SettingsRow icon="basket-outline" title="Open groceries" detail="Your future shopping companion" onPress={() => router.navigate('/grocery')} /></Card></View>
    <CategoryChip label="Meal planning is coming soon" />
    <Copy muted style={{ fontSize: 12 }}>No meal, intake, or target data has been created.</Copy>
  </Screen>;
}
