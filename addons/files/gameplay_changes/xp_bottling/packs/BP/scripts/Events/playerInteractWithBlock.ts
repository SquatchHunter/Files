import { system, world, PlayerInteractWithBlockBeforeEvent } from '@minecraft/server';
import { MinecraftBlockTypes, MinecraftItemTypes } from '@minecraft/vanilla-data';
import { convertGlassBottle } from '../Actions';

world.beforeEvents.playerInteractWithBlock.subscribe((eventData: PlayerInteractWithBlockBeforeEvent): void => {
	const { block, player, itemStack } = eventData;
	if (!block.matches(MinecraftBlockTypes.EnchantingTable)) return;
	if (!itemStack?.matches(MinecraftItemTypes.GlassBottle)) return;

	eventData.cancel = true;
	system.run(() => {
		void convertGlassBottle(player, itemStack);
	});
});
