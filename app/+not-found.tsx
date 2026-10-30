import { router } from 'expo-router';
import { Action, Screen } from '../src/components/ui';
export default function NotFound() { return <Screen eyebrow="Fresh Fuel" title="Page not found" subtitle="This destination is unavailable."><Action label="Go to Today" onPress={() => router.replace('/')} /></Screen>; }
