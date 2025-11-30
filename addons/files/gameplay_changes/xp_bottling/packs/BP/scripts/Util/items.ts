import {
	Entity,
	EntityComponentTypes,
	EntityInventoryComponent,
	Container,
	ContainerSlot,
	ItemStack
} from '@minecraft/server';

/**
 * Takes a provided entity and item and attempts to remove the item/s from the entity.
 *
 * @param {Entity} entity Entity you will be trying to remove an item from.
 * @param {ItemStack} item The ItemStack of the item you wish to remove.
 * @param {number} amount The amount of the item you wish to remove.
 * @param {ContainerSlot} slot The slot you wish to remove the item from.
 *
 * @returns {boolean} The result of the operation.
 */
export const removeItemFromEntity = (entity: Entity, item: ItemStack, amount: number = 1, slot?: ContainerSlot): boolean => {
	// guard clauses
	if (!entity.hasComponent(EntityComponentTypes.Inventory)) return false;
	const entityInv: Container = (entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent).container;
	if (!entityInv.contains(item)) return false;

	// default clauses
	slot ??= entityInv.getSlot(entityInv.find(item) as number);

	// action
	switch (true) {
		case slot.amount > amount:
			slot.amount--;
			break;
		case slot.amount === amount:
			slot.setItem(undefined);
			break;
		default:
			return false;
	}

	return true;
};

/**
 * Takes a provided entity and item and attempts to give the item/s to the entity.
 *
 * @param {Entity} entity Entity you will be trying to give an item to.
 * @param {ItemStack} item The ItemStack of the item you wish to give.
 * @param {number} amount The amount of the item you wish to give.
 * @param {ContainerSlot} slot The slot you wish to place the item in.
 *
 * @returns {boolean} The result of the operation.
 */
export const giveItemtoEntity = (entity: Entity, item: ItemStack, amount: number = 1, slot?: ContainerSlot): boolean => {
	if (!entity.hasComponent(EntityComponentTypes.Inventory)) return false;
	const entityInv: Container = (entity.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent).container;

	// what the fuck is this you ask?
	// stupid. its stupid. its preventing an edge case
	slot ??= entityInv.getSlot(entityInv.find(item) ?? entityInv.firstEmptySlot() ?? 0);

	switch (true) {
		case entityInv.emptySlotsCount === 0:
			entity.dimension.spawnItem(new ItemStack(item.type, amount), entity.location);
			break;
		case slot.isValid:
			let slotItem = slot.getItem();
			if (slotItem?.matches(item.typeId) && slotItem.amount < slotItem.maxAmount) {
				slotItem.amount++;
			} else {
				entityInv.addItem(new ItemStack(item.type, amount));
			}
			break;
		default:
			// this should never run, right?
			return false;
	}

	return true;
};
