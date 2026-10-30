import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import Settings from '../app/settings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { parseTheme, resolveTheme, THEME_KEY } from '../src/theme/preferences';

function App() { return <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}><ThemeProvider><Settings /></ThemeProvider></SafeAreaProvider>; }
beforeEach(async () => { jest.clearAllMocks(); await AsyncStorage.clear(); });
test('defaults safely and follows device only when requested', () => {
  expect(parseTheme(null)).toBe('dark'); expect(parseTheme('invalid')).toBe('dark');
  expect(resolveTheme('dark', 'light')).toBe('dark'); expect(resolveTheme('system', 'light')).toBe('light');
  expect(resolveTheme('system', null)).toBe('dark');
});
test('selects and persists light, system, and dark preferences', async () => {
  await render(<App />);
  await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith(THEME_KEY));
  for (const [label, value] of [['Light theme', 'light'], ['Match device settings', 'system'], ['Dark theme', 'dark']]) {
    await fireEvent.press(screen.getByRole('radio', { name: new RegExp(label) }));
    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(THEME_KEY, value));
  }
});
test('restores a saved preference after remount', async () => {
  await AsyncStorage.setItem(THEME_KEY, 'light');
  await render(<App />);
  await waitFor(() => expect(screen.getByRole('radio', { name: /Light theme/ }).props.accessibilityState.checked).toBe(true));
});
test('reports persistence failure without discarding selection', async () => {
  await render(<App />);
  await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalled());
  jest.mocked(AsyncStorage.setItem).mockRejectedValueOnce(new Error('storage unavailable'));
  await fireEvent.press(screen.getByRole('radio', { name: /Light theme/ }));
  await waitFor(() => expect(screen.getByRole('alert')).toBeTruthy());
});
