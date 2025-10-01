/* eslint-disable no-fallthrough */
import {
	Entity,
	EntityDamageSource,
	EntityComponentTypes,
	EquipmentSlot,
	ItemStack
} from '@minecraft/server';
import { MinecraftEnchantmentTypes, MinecraftItemTypes } from '@minecraft/vanilla-data';
import { HusksDropSandForbiddenDeaths, HusksDropSandSettings } from '../Models';
import { getSettings } from './settings';
import { getEnchantment } from '../Util';

export const dropItem = (deadEntity: Entity, { damagingEntity, damagingProjectile, cause }: EntityDamageSource): void => {
	if (cause in HusksDropSandForbiddenDeaths) return;
	switch (false) {
		case !damagingEntity: {
			if (!damagingEntity?.hasComponent(EntityComponentTypes.Equippable)) return;
			const equipment = damagingEntity.getComponent(EntityComponentTypes.Equippable);
			if (!equipment?.getEquipmentSlot(EquipmentSlot.Mainhand)) return;
			const enchantment = getEnchantment(MinecraftEnchantmentTypes.Looting, equipment.getEquipmentSlot(EquipmentSlot.Mainhand));
			void spawnLoot(deadEntity, MinecraftItemTypes.Sand, enchantment?.level);

			break;
		}
		case !damagingProjectile:
			// future proofing.
		default:
			void spawnLoot(deadEntity, MinecraftItemTypes.Sand);
	}
};

/**
 * Takes in an item, the lootingLevel of the weapon that killed the entity and the dead entity
 * and spawns the item at the dead entities feet.
 *
 * @param {Entity} entity - The entity that should drop the item.
 * @param {string} item - The item to drop on the ground.
 * @param {number} lootingLevel - The number of levels of looting that should be applied to the dropped item.
 */
const spawnLoot = (entity: Entity, item: string, lootingLevel?: number): void => {
	if (typeof lootingLevel === 'undefined') {
		lootingLevel = 0;
	} // ^ this is lazy, I am lazy, I do not give a shit.
	const settings: HusksDropSandSettings = getSettings();

	const dropChance: number = 0.33 - 0.01 * lootingLevel;
	if (Math.random() > dropChance) {
		const safeMin: number = Math.ceil(settings.sandMin);
		const safeMax: number = Math.floor(settings.sandMax);
		const amount: number = Math.floor(Math.random() * (safeMax - safeMin + 1) + safeMin + Math.floor(Math.random() * lootingLevel));
		entity.dimension.spawnItem(new ItemStack(item, amount), entity.location);
	}
};
``