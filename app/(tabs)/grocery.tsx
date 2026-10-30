import { View } from 'react-native';
import { Card, CategoryChip, Copy, Divider, EmptyState, Screen, SectionHeader, SettingsRow } from '../../src/components/ui';
export default function Grocery() {
  return <Screen title="Your groceries" subtitle="A focused list. A simpler shop.">
    <Card><EmptyState icon="basket-outline" title="A lighter shopping list" description="Future lists will bring together what your meals need, minus what's in your pantry." /><CategoryChip label="Shopping lists · Coming soon" icon="list-outline" /></Card>
    <View style={{ gap: 12 }}><SectionHeader title="From list to kitchen" /><Card><SettingsRow icon="bag-check-outline" title="Shop with confidence" detail="Review and confirm what you purchased." /><Divider /><SettingsRow icon="cube-outline" title="Keep stock accurate" detail="Add the confirmed quantity to your pantry separately." /></Card></View>
    <Copy muted style={{ fontSize: 13 }}>No lists or purchases recorded.</Copy>
  </Screen>;
}
