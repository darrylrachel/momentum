import type { EntityId } from '../identity/models';
export type Unit = 'g' | 'kg' | 'oz' | 'lb' | 'ml' | 'l' | 'count';
// Never convert mass to volume/count without food-specific density/weight evidence.
export interface Quantity { value: number; unit: Unit; }
export interface PantryItem { id: EntityId; householdId: EntityId; foodId: EntityId; quantity: Quantity; expiresOn?: string; version: number; }
export interface Reservation { id: EntityId; pantryItemId: EntityId; mealId: EntityId; quantity: Quantity; state: 'reserved' | 'released' | 'consumed'; }
export interface InventoryAdjustment { id: EntityId; pantryItemId: EntityId; operationId: string; delta: Quantity; reason: 'purchase' | 'consumption' | 'correction' | 'waste'; createdAt: string; }
export interface GroceryList { id: EntityId; householdId: EntityId; planId?: EntityId; name: string; }
export interface GroceryItem { id: EntityId; listId: EntityId; foodId: EntityId; required: Quantity; purchased?: Quantity; checkedAt?: string; inventoryReceiptId?: EntityId; }
