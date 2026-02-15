import { EntityDieAfterEvent, world } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { dropLoot } from '../Actions';

world.afterEvents.entityDie.subscribe(({ deadEntity, damageSource }: EntityDieAfterEvent): void => {
	void dropLoot(deadEntity, damageSource);
}, { entityTypes: [MinecraftEntityTypes.Husk, MinecraftEntityTypes.Parched] });
