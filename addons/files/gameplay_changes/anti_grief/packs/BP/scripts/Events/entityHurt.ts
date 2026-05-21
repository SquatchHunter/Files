import {
	world,
	EntityHurtBeforeEvent,
	EntityDamageCause
} from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { disableFireballDamage } from '../Actions';

world.beforeEvents.entityHurt.subscribe((eventData: EntityHurtBeforeEvent): void => {
	void disableFireballDamage(eventData);
}, { allowedDamageCauses: [EntityDamageCause.projectile], entityFilter: { type: MinecraftEntityTypes.Player } });
