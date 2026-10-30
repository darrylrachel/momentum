import { fireEvent, render, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';
import * as Native from 'react-native';
import { ThemeProvider } from '../src/theme/ThemeProvider';
import { MacroProgressBar, NutritionRing, NutritionSummary, progressPresentation, nutritionLayout } from '../src/components/nutrition';
import { RecipeImage } from '../src/components/food';
import { PrimaryButton } from '../src/components/ui';
import { palettes } from '../src/theme/tokens';
import Today from '../app/(tabs)/index';
import Plans from '../app/(tabs)/plans';
import Pantry from '../app/(tabs)/pantry';
import Grocery from '../app/(tabs)/grocery';
import Profile from '../app/(tabs)/profile';

const wrap = (children: React.ReactNode) => <ThemeProvider>{children}</ThemeProvider>;
describe.each(['ring', 'bar'] as const)('%s nutrition presentation', kind => {
  const component = (current?: number, goal?: number) => kind === 'ring' ? <NutritionRing label="Protein" unit="g" current={current} goal={goal} /> : <MacroProgressBar metric="protein" label="Protein" unit="g" current={current} goal={goal} />;
  test('missing intake does not imply zero', async () => {
    await render(wrap(component(undefined, 100)));
    expect(screen.getByLabelText('Protein: No intake data. Goal 100 g.')).toBeTruthy();
    expect(screen.queryByRole('progressbar')).toBeNull();
  });
  test('zero intake with a valid target is a genuine zero', async () => {
    await render(wrap(component(0, 100)));
    expect(screen.getByRole('progressbar').props.accessibilityValue.now).toBe(0);
    expect(screen.getByLabelText('Protein: 0 g. Goal 100 g.')).toBeTruthy();
  });
  test('over target is stated and visual progress is capped', async () => {
    await render(wrap(component(150, 100)));
    expect(screen.getByRole('progressbar').props.accessibilityValue.now).toBe(100);
    expect(screen.getByLabelText('Protein: 150 g. Goal 100 g. Over target.')).toBeTruthy();
  });
  test.each([0, -1, Number.NaN, Number.POSITIVE_INFINITY])('invalid target %s has no ratio', async goal => {
    await render(wrap(component(0, goal)));
    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(screen.getByLabelText('Protein: 0 g. No target set.')).toBeTruthy();
  });
});
test('invalid intake is explicitly missing', () => {
  for (const current of [-1, NaN, Infinity]) expect(progressPresentation({ current, goal: 100, unit: 'g', label: 'Fat' }).ratio).toBeNull();
});
test('half target yields half-width progress', async () => {
  await render(wrap(<MacroProgressBar metric="fat" current={25} goal={50} unit="g" label="Fat" />));
  expect(StyleSheet.flatten(screen.getByTestId('fat-fill').props.style).width).toBe('50%');
});
test('image fallback, loading, success, failure, and source change retain aspect ratio', async () => {
  const result = await render(wrap(<RecipeImage label="Recipe" />));
  expect(screen.getByRole('image').props.accessibilityLabel).toContain('Photo unavailable');
  await result.rerender(wrap(<RecipeImage label="Recipe" source={{ uri: 'https://example.test/licensed.jpg' }} />));
  expect(screen.getByRole('image').props.accessibilityLabel).toContain('Loading photo');
  await fireEvent(screen.getByTestId('recipe-image'), 'load');
  expect(screen.getByRole('image').props.accessibilityLabel).toBe('Recipe');
  await fireEvent(screen.getByTestId('recipe-image'), 'error');
  expect(screen.getByRole('image').props.accessibilityLabel).toContain('Photo unavailable');
  await result.rerender(wrap(<RecipeImage label="Another recipe" source={{ uri: 'https://example.test/another.jpg' }} />));
  expect(screen.getByRole('image').props.accessibilityLabel).toContain('Loading photo');
  expect(StyleSheet.flatten(screen.getByRole('image').props.style).aspectRatio).toBe(1.6);
});
test.each([{ width: 320, fontScale: 1 }, { width: 390, fontScale: 1.8 }, { width: 430, fontScale: 1 }])('nutrition layout selects a safe direction at $width and text scale $fontScale', dimensions => {
  expect(nutritionLayout(dimensions.width, dimensions.fontScale)).toBe(dimensions.width < 350 || dimensions.fontScale > 1.3 ? 'column' : 'row');
});
test('nutrition renders a stacked layout with enlarged text', async () => {
  const mock = jest.spyOn(Native, 'useWindowDimensions').mockReturnValue({ width: 390, fontScale: 1.8, height: 844, scale: 1 });
  await render(wrap(<NutritionSummary />));
  expect(StyleSheet.flatten(screen.getByTestId('nutrition-layout').props.style).flexDirection).toBe('column');
  mock.mockRestore();
});
test('buttons have explicit names, touch size, and focus feedback', async () => {
  const press = jest.fn();
  await render(wrap(<PrimaryButton label="Open plans" onPress={press} />));
  const button = screen.getByRole('button', { name: 'Open plans' });
  expect(StyleSheet.flatten(button.props.style).minHeight).toBeGreaterThanOrEqual(44);
  await fireEvent(button, 'focus');
  expect(StyleSheet.flatten(screen.getByRole('button').props.style).borderColor).toBe(palettes.dark.focus);
  await fireEvent.press(button); expect(press).toHaveBeenCalledTimes(1);
});
test('Today contains no fabricated intake or targets and no logging action', async () => {
  await render(wrap(<Today />));
  expect(screen.getByText('No intake recorded · No nutrition targets set')).toBeTruthy();
  expect(screen.getByText('Nothing on the menu yet')).toBeTruthy();
  expect(screen.queryAllByRole('progressbar')).toHaveLength(0);
  expect(screen.queryByText(/\d+\s*kcal/)).toBeNull();
  expect(screen.queryByRole('button', { name: /log|generate|create plan/i })).toBeNull();
});
test.each([
  { name: 'Plans', Component: Plans, state: 'Plan creation · Coming soon' },
  { name: 'Pantry', Component: Pantry, state: 'Inventory · Coming soon' },
  { name: 'Grocery', Component: Grocery, state: 'No lists or purchases recorded.' },
  { name: 'Profile', Component: Profile, state: 'Profile setup · Coming soon' },
])('$name presents truthful empty states without fake operational controls', async ({ Component, state }) => {
  await render(wrap(<Component />));
  expect(screen.getByText(state)).toBeTruthy();
  expect(screen.queryAllByRole('search')).toHaveLength(0);
  expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  expect(screen.queryByRole('button', { name: /add|generate|create|sign in|invite|save/i })).toBeNull();
});

function luminance(hex: string) {
  const channels = hex.match(/[0-9a-f]{2}/gi)!.map(part => { const v = parseInt(part, 16) / 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; });
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(a: string, b: string) { const x = luminance(a); const y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
test.each(['dark', 'light'] as const)('%s text tokens meet WCAG AA against used surfaces', theme => {
  const p = palettes[theme];
  for (const foreground of [p.text, p.mutedOnElevated, p.accent, p.protein, p.carbohydrate, p.fat, p.calories, p.success, p.warning, p.error, p.disabled]) {
    for (const background of [p.background, p.surface, p.elevated]) expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  }
  for (const background of [p.background, p.surface]) expect(contrast(p.muted, background)).toBeGreaterThanOrEqual(4.5);
  expect(contrast(p.onAccent, p.accent)).toBeGreaterThanOrEqual(4.5);
  expect(contrast(p.focus, p.surface)).toBeGreaterThanOrEqual(3);
});
