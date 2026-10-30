export type EntityId = string;
export type PlanningMode = 'everyday' | 'performance';
export type NutritionGoal = 'lose-weight' | 'maintain' | 'build-muscle' | 'eat-healthier' | 'custom';
export interface Household { id: EntityId; name: string; }
export interface HouseholdMember { id: EntityId; householdId: EntityId; profileId: EntityId; role: 'owner' | 'member'; }
export interface Profile {
  id: EntityId; displayName: string; imageUrl?: string; ageGroup: 'adult' | 'child' | 'unspecified';
  mode: PlanningMode; goal: NutritionGoal; dietaryPreferences: string[]; allergies: string[];
  dislikedFoodIds: EntityId[]; favoriteFoodIds: EntityId[]; defaultMealCount: number;
  measurements: 'metric' | 'imperial';
}
