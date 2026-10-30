export type ThemePreference = 'dark' | 'light' | 'system';
export const THEME_KEY = 'fresh-fuel.appearance.v1';
export function parseTheme(value: unknown): ThemePreference {
  return value === 'light' || value === 'system' ? value : 'dark';
}
export function resolveTheme(preference: ThemePreference, device: string | null | undefined): 'dark' | 'light' {
  return preference === 'system' ? (device === 'light' ? 'light' : 'dark') : preference;
}
