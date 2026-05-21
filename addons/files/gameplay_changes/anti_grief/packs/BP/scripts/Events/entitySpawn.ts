import { EntitySpawnAfterEvent, world } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { toggleEnderman } from '../Actions';

world.afterEvents.entitySpawn.subscribe(({ entity }: EntitySpawnAfterEvent): void => {
	if (entity.typeId !== MinecraftEntityTypes.Enderman) return;
	void toggleEnderman(entity);
});
