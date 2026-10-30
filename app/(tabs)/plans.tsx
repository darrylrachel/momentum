import { View } from 'react-native';
import { Card, CategoryChip, Copy, Divider, EmptyState, Screen, SectionHeader, SettingsRow } from '../../src/components/ui';
export default function Plans() {
  return <Screen title="Your plans" subtitle="A little structure. A lot less deciding.">
    <Card><EmptyState icon="calendar-outline" title="A plan that fits your life" description="Your active plans and saved drafts will live here." /><CategoryChip label="Plan creation · Coming soon" icon="sparkles-outline" /></Card>
    <View style={{ gap: 12 }}><SectionHeader title="A thoughtful starting point" /><Card><SettingsRow icon="compass-outline" title="Guided from the start" detail="Goals, schedule, and food preferences — one step at a time." /><Divider /><SettingsRow icon="options-outline" title="Easy to adjust" detail="Edit an existing meal without repeating setup." /></Card></View>
    <Copy muted style={{ fontSize: 13 }}>Daily and weekly planning will share the same nutrition foundation.</Copy>
  </Screen>;
}
