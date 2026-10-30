import { View } from 'react-native';
import { Card, CategoryChip, Copy, EmptyState, Screen, SectionHeader } from '../../src/components/ui';
export default function Pantry() {
  return <Screen title="Your pantry" subtitle="Know what you have. Waste a little less.">
    <Card><EmptyState icon="leaf-outline" title="Your shelves start here" description="A clear view of ingredients, quantities, and freshness." /><CategoryChip label="Inventory · Coming soon" icon="cube-outline" /></Card>
    <View style={{ gap: 12 }}><SectionHeader title="Everything in its place" /><View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}><CategoryChip label="Ingredients" icon="nutrition-outline" /><CategoryChip label="Quantities" icon="scale-outline" /><CategoryChip label="Freshness" icon="time-outline" /></View><Copy muted style={{ fontSize: 14 }}>Ingredient search and categories will be available when inventory is ready.</Copy></View>
    <Card><SectionHeader title="Planned isn't consumed" /><Copy muted style={{ fontSize: 14 }}>Planning won't deduct stock. Ingredients will be consumed only after you confirm a meal.</Copy></Card>
  </Screen>;
}
