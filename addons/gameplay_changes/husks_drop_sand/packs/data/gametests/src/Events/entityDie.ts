import { EntityDieAfterEvent, world } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { dropItem } from '../Actions';

world.afterEvents.entityDie.subscribe(({ deadEntity, damageSource }: EntityDieAfterEvent): void => {
	void dropItem(deadEntity, damageSource);
}, { entityTypes: [MinecraftEntityTypes.Husk] });
