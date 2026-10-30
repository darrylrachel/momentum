import { useState, type PropsWithChildren } from 'react';
import { Image, View, type ImageSourcePropType } from 'react-native';
import { Card, Copy, Icon, type IconName } from './ui';
import { useTheme } from '../theme/ThemeProvider';
import { tokens } from '../theme/tokens';

export function RecipeImage({ source, label, aspectRatio = 1.6 }: { source?: ImageSourcePropType; label: string; aspectRatio?: number }) {
  // Remount request state when the source changes so failed images can recover.
  return <ImageFrame key={JSON.stringify(source)} source={source} label={label} aspectRatio={Number.isFinite(aspectRatio) && aspectRatio > 0 ? aspectRatio : 1.6} />;
}
function ImageFrame({ source, label, aspectRatio }: { source?: ImageSourcePropType; label: string; aspectRatio: number }) {
  const { colors } = useTheme();
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>(source ? 'loading' : 'error');
  return <View accessible accessibilityRole="image" accessibilityLabel={state === 'loaded' ? label : `${label}. ${state === 'loading' ? 'Loading photo' : 'Photo unavailable'}`} style={{ width: '100%', aspectRatio, backgroundColor: colors.elevated, borderRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ position: 'absolute', width: 160, height: 160, borderRadius: 80, borderWidth: 1, borderColor: colors.border, transform: [{ translateX: 60 }, { translateY: 35 }] }} />
    <View style={{ position: 'absolute', width: 110, height: 110, borderRadius: 55, borderWidth: 1, borderColor: colors.border, transform: [{ translateX: -65 }, { translateY: -30 }] }} />
    {state !== 'loaded' && <View style={{ alignItems: 'center', gap: 8 }}><Icon name="restaurant-outline" size={30} /><Copy style={{ fontSize: 12, color: colors.mutedOnElevated }}>{state === 'loading' ? 'Loading photo…' : 'Fresh possibilities'}</Copy></View>}
    {source && state !== 'error' && <Image testID="recipe-image" accessible={false} source={source} resizeMode="cover" onLoad={() => setState('loaded')} onError={() => setState('error')} style={{ position: 'absolute', width: '100%', height: '100%', opacity: state === 'loaded' ? 1 : 0 }} />}
  </View>;
}
export function MealCard({ name, detail, image }: { name: string; detail: string; image?: ImageSourcePropType }) {
  return <Card><RecipeImage source={image} label={name} /><Copy style={{ fontFamily: tokens.font.medium, fontSize: 17 }}>{name}</Copy><Copy muted>{detail}</Copy></Card>;
}
export function PlanCard({ title, description, children }: PropsWithChildren<{ title: string; description: string }>) { return <Card><Copy accessibilityRole="header" style={{ fontFamily: tokens.font.medium, fontSize: 17 }}>{title}</Copy><Copy muted style={{ fontSize: 14 }}>{description}</Copy>{children}</Card>; }
export function ItemRow({ title, detail, icon = 'leaf-outline' }: { title: string; detail: string; icon?: IconName }) {
  const { colors } = useTheme();
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 }}><View style={{ backgroundColor: colors.elevated, padding: 12, borderRadius: 14 }}><Icon name={icon} /></View><View style={{ flex: 1, gap: 2 }}><Copy style={{ fontFamily: tokens.font.medium }}>{title}</Copy><Copy muted style={{ fontSize: 13 }}>{detail}</Copy></View></View>;
}
export function IngredientRow(props: { name: string; quantityLabel: string }) { return <ItemRow title={props.name} detail={props.quantityLabel} />; }
export function GroceryItemRow(props: { name: string; quantityLabel: string }) { return <ItemRow title={props.name} detail={props.quantityLabel} icon="basket-outline" />; }
export function ListGroup({ title, children }: PropsWithChildren<{ title: string }>) { return <View style={{ gap: 8 }}><Copy muted style={{ fontSize: 13, fontFamily: tokens.font.medium }}>{title}</Copy>{children}</View>; }
