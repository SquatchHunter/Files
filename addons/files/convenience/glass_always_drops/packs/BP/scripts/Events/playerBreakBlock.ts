import { world, PlayerBreakBlockBeforeEvent } from '@minecraft/server';
import { dropLoot } from '../Actions';
import { glassBlocks } from '../Models';

world.beforeEvents.playerBreakBlock.subscribe(({ block, itemStack }: PlayerBreakBlockBeforeEvent): void => {
	void dropLoot(block, itemStack);
}, { blockTypes: glassBlocks });
