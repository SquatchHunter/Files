import { system, world, EntitySpawnAfterEvent, EntityLoadAfterEvent } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { toggleEnderman } from '../Actions';

world.afterEvents.entitySpawn.subscribe(({ entity }: EntitySpawnAfterEvent): void => {
	if (entity.typeId !== MinecraftEntityTypes.Enderman) return;
	system.runJob(toggleEnderman([entity]));
});

world.afterEvents.entityLoad.subscribe(({ entity }: EntityLoadAfterEvent): void => {
	if (entity.typeId !== MinecraftEntityTypes.Enderman) return;
	system.runJob(toggleEnderman([entity]));
});
