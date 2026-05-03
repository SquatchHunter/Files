import { world } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { disableEnderman } from '../Actions';

world.afterEvents.entitySpawn.subscribe(({ entity }): void => {
	if (entity.typeId !== MinecraftEntityTypes.Enderman) return;
	void disableEnderman(entity);
});
