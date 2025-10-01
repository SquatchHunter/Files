import {
	system,
	Block,
	ItemStack
} from '@minecraft/server';
import { MinecraftEnchantmentTypes, MinecraftItemTypes } from '@minecraft/vanilla-data';
import { getEnchantment } from '../Util';

export const dropItem = async(block: Block, itemStack: ItemStack): Promise<void> => {
	if (getEnchantment(MinecraftEnchantmentTypes.SilkTouch, itemStack)) {
		await system.waitTicks(1);
		block.dimension.spawnItem(new ItemStack(MinecraftItemTypes.BuddingAmethyst, 1), block.center());
	}
};
