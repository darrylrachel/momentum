import { fireEvent, screen } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import Root from '../app/_layout';
import Tabs from '../app/(tabs)/_layout';
import Today from '../app/(tabs)/index';
import Plans from '../app/(tabs)/plans';
import Pantry from '../app/(tabs)/pantry';
import Grocery from '../app/(tabs)/grocery';
import Profile from '../app/(tabs)/profile';
import Settings from '../app/settings';

jest.mock('expo-font', () => ({ useFonts: () => [true, null], isLoaded: () => true, loadAsync: jest.fn(), isLoading: () => false }));
test('five tabs and appearance route are reachable', async () => {
  await renderRouter({ _layout: Root, '(tabs)/_layout': Tabs, '(tabs)/index': Today, '(tabs)/plans': Plans, '(tabs)/pantry': Pantry, '(tabs)/grocery': Grocery, '(tabs)/profile': Profile, settings: Settings });
  await screen.findByText('Good food starts here');
  await fireEvent.press(screen.getByText('Explore your plans'));
  await screen.findByText('A plan that fits your life');
  for (const [name, heading] of [['Pantry', 'Your shelves start here'], ['Grocery', 'A lighter shopping list'], ['Profile', 'Welcome to Fresh Fuel']]) {
    await fireEvent.press(screen.getByText(name));
    await screen.findByText(heading);
  }
  await fireEvent.press(screen.getByText('Appearance settings'));
  await screen.findByText('Your theme');
});
