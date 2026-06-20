import {
	world,
	EntityHurtBeforeEvent,
	EntityDamageCause
} from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { disableFireballDamage } from '../Actions';

world.beforeEvents.entityHurt.subscribe((entityHurtEvent: EntityHurtBeforeEvent): void => {
	void disableFireballDamage(entityHurtEvent);
}, { allowedDamageCauses: [EntityDamageCause.projectile], entityFilter: { type: MinecraftEntityTypes.Player } });
