import type { EntityId, NutritionGoal, Profile } from '../identity/models';
export interface Nutrients { calories: number; proteinGrams: number; carbohydrateGrams: number; fatGrams: number; }
export type NutritionEvidence = { status: 'verified'; source: string; sourceFoodId: string; retrievedAt: string; per100Grams: Nutrients } | { status: 'missing' | 'uncertain'; reason: string };
export interface Food { id: EntityId; name: string; preparation: 'raw' | 'cooked' | 'as-sold'; variant: string; nutrition: NutritionEvidence; }
export interface RecipeIngredient { foodId: EntityId; grams: number; }
export interface Recipe { id: EntityId; name: string; servings: number; ingredients: RecipeIngredient[]; }
export interface PlannedMeal { id: EntityId; recipeId: EntityId; servings: number; scheduledAt: string; timeZone: string; status: 'planned' | 'prepared' | 'consumed' | 'skipped'; }
export interface PlanSettings {
  memberProfileIds: EntityId[]; goal: NutritionGoal; targets?: Nutrients; startDate: string; endDate: string;
  schedule: { name: string; localTime: string }[]; ingredientSource: 'pantry-only' | 'pantry-first' | 'new-groceries';
  preferences: Pick<Profile, 'dietaryPreferences' | 'allergies' | 'dislikedFoodIds' | 'favoriteFoodIds'>;
  priority: 'macro-match' | 'fewest-ingredients' | 'pantry-first' | 'budget' | 'variety' | 'quick';
}
export type BuilderStep = 'people' | 'goal' | 'duration' | 'schedule' | 'ingredients' | 'preferences' | 'review';
export interface PlanDraft { id: EntityId; ownerId: EntityId; schemaVersion: 1; step: BuilderStep; settings: Partial<PlanSettings>; updatedAt: string; }
export interface MealPlan { id: EntityId; householdId: EntityId; ownerId: EntityId; settings: PlanSettings; meals: PlannedMeal[]; }
export type Feasibility = { status: 'feasible' } | { status: 'shortfall' | 'unknown'; explanations: string[] };
