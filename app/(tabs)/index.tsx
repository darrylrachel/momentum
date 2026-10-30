import { router } from 'expo-router';
import { Action, Badge, Card, Copy, Screen, Section } from '../../src/components/ui';
export default function Today() {
  return <Screen eyebrow="Fresh Fuel / Today" title={'A little planning.\nA better day.'} subtitle="Tell us your goals and what food you have. We'll help you figure out what to eat.">
    <Card><Badge>YOUR NEXT CHAPTER</Badge><Section>Good food starts here</Section><Copy muted>Your meals, pantry, and shopping will come together in one place.</Copy><Action label="Explore your plans" onPress={() => router.navigate('/plans')} /></Card>
    <Section>Your daily picture</Section><Card><Badge>NO ACTIVE PLAN</Badge><Section>Room for a fresh start</Section><Copy muted>Nutrition progress and upcoming meals will appear here once planning is available. No targets or food intake have been recorded.</Copy></Card>
    <Card><Section>Built around you</Section><Copy muted>Everyday keeps things simple. Performance brings precise targets and portions. Both will share the same trusted planning engine.</Copy><Badge>FOUNDATION PREVIEW · PLANNING COMING LATER</Badge></Card>
  </Screen>;
}
