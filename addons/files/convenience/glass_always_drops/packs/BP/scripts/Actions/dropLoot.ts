import {
	system,
	Block,
	ItemStack
} from '@minecraft/server';
import { getEnchantment } from '../Util/';
import { MinecraftEnchantmentTypes } from '@minecraft/vanilla-data';

export const dropLoot = (block: Block, item: ItemStack | undefined): void => {
	const skip = item ? getEnchantment(MinecraftEnchantmentTypes.SilkTouch, item) : false;
	if (skip) return;

	const itemToSpawn: string = block.typeId;
	system.run(() => {
		block.dimension.spawnItem(new ItemStack(itemToSpawn, 1), block.center());
	});
};
