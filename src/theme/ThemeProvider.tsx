import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { useColorScheme } from 'react-native';
import { palettes } from './tokens';
import { parseTheme, resolveTheme, THEME_KEY, type ThemePreference } from './preferences';

function useAppearance() {
  const [preference, setPreference] = useState<ThemePreference>('dark');
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const queue = useRef(Promise.resolve());
  const device = useColorScheme();
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(THEME_KEY).then(value => { if (active) setPreference(parseTheme(value)); })
      .catch(() => { if (active) setError('Appearance could not be restored. Dark theme is active.'); })
      .finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, []);
  function selectTheme(value: ThemePreference) {
    if (!ready) return;
    setPreference(value);
    setError(null);
    queue.current = queue.current.then(() => AsyncStorage.setItem(THEME_KEY, value))
      .catch(() => setError('Your appearance changed, but could not be saved. Please select it again to retry.'));
  }
  const mode = resolveTheme(preference, device);
  return { preference, selectTheme, ready, error, mode, colors: palettes[mode] };
}
const ThemeContext = createContext<ReturnType<typeof useAppearance> | null>(null);
export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useAppearance();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('ThemeProvider is required');
  return theme;
}
