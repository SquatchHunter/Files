import {
	world,
	Entity,
	// Player,
	ItemStack,
	EntityDamageSource,
	EquipmentSlot,
	EntityComponentTypes
} from '@minecraft/server';

export const dropLoot = (entity: Entity, { damagingEntity }: EntityDamageSource): void => {
	// load settings
	// const settings: BatMembranesSettings = getSettings();

	// guard clauses
	// if (damagingEntity instanceof Player) {
	// 	console.log(`Not dropping loot for ${entity.typeId} due to not being killed by player.`);

	// 	return;
	// }

	// check for held tool
	let heldTool: ItemStack | undefined;
	if (damagingEntity) {
		heldTool = damagingEntity.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand);
	}
	spawnLoot(entity, heldTool);
};

const spawnLoot = (entity: Entity, tool?: ItemStack): void => {
	const lootManager = world.getLootTableManager();
	const lootTable = lootManager.getLootTable('entities/bat_membranes');
	if (lootTable) {
		const lootItems = lootManager.generateLootFromTable(lootTable, tool);
		if (lootItems) {
			lootItems.forEach(loot => entity.dimension.spawnItem(loot, entity.location));
		}
	}
};
