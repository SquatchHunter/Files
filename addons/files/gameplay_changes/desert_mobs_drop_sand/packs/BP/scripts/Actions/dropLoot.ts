import {
	world,
	Entity,
	ItemStack,
	EntityDamageSource,
	EquipmentSlot,
	EntityComponentTypes
} from '@minecraft/server';
import { DesertMobsDropSandForbiddenDeaths } from '../Models';
import { getSettings } from './settings';

export const dropLoot = (entity: Entity, { damagingEntity, cause }: EntityDamageSource): void => {
	// load settings
	const settings = getSettings();
	// guard clause against "forbidden" deaths
	if (cause in DesertMobsDropSandForbiddenDeaths) {
		if (settings.debug) console.log(`Not dropping loot for ${entity.typeId} due to forbidden death cause: ${cause}.`);

		return;
	}

	const mobName = entity.typeId.split(':')[1].toLocaleLowerCase(); // e.g., "minecraft:skeleton" -> "skeleton"
	if (!settings[`${mobName}DropSand`]) {
		if (settings.debug) console.log(`Not dropping loot for ${entity.typeId} due to disabled mob type.`);

		return;
	}

	// check for held tool
	let heldTool: ItemStack | undefined;
	if (damagingEntity) {
		heldTool = damagingEntity.getComponent(EntityComponentTypes.Equippable)?.getEquipment(EquipmentSlot.Mainhand);
	}
	spawnLoot(entity, heldTool);
};

const spawnLoot = (entity: Entity, tool?: ItemStack): void => {
	const lootManager = world.getLootTableManager();
	const lootTable = lootManager.getLootTable('entities/desert_mobs_drop_sand');
	if (lootTable) {
		const lootItems = lootManager.generateLootFromTable(lootTable, tool);
		if (lootItems) {
			lootItems.forEach(loot => entity.dimension.spawnItem(loot, entity.location));
		}
	}
};
