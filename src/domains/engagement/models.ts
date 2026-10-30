import type { EntityId } from '../identity/models';
export type NotificationCategory = 'meal' | 'preparation' | 'shopping' | 'planning' | 'expiration' | 'low-stock' | 'summary';
export interface NotificationPreferences { enabled: Record<NotificationCategory, boolean>; quietHours?: { start: string; end: string }; timeZone: string; }
export interface ScheduledReminder { id: EntityId; nativeId: string; mealId?: EntityId; category: NotificationCategory; scheduledAt: string; deduplicationKey: string; }
export interface MealCompletion { id: EntityId; mealId: EntityId; profileId: EntityId; completedAt: string; inventoryOperationId?: string; }
