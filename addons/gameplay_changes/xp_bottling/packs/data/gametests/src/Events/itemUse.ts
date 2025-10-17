import {
	system,
	world,
	PlayerInteractWithBlockBeforeEvent
} from '@minecraft/server';
import { MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes } from '@minecraft/vanilla-data';
import { getSettings, giveXpBottle } from '../Actions';
import { XpBottlingSettings } from '../Models';

world.beforeEvents.playerInteractWithBlock.subscribe((playerInteract: PlayerInteractWithBlockBeforeEvent): void => {
	const { player, itemStack, block, isFirstEvent } = playerInteract;

	if (!player.matches({ type: MinecraftEntityTypes.Player })) return;
	if (!itemStack?.matches(MinecraftItemTypes.GlassBottle)) return;
	if (!block.matches(MinecraftBlockTypes.EnchantingTable)) return;
	if (!isFirstEvent && player.isSneaking) return;

	const { configVersion }: XpBottlingSettings = getSettings();
	if (!configVersion) {
		player.sendMessage({ translate: 'bt.xb.misc.notInitialized', with: ['\n'] });

		return;
	}

	playerInteract.cancel = true;
	system.run(() => {
		void giveXpBottle(player, itemStack);
	});
});
