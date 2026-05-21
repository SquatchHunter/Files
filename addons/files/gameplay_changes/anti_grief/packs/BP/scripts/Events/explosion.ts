import { world, ExplosionBeforeEvent } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { disableCreeperExplosion, disableGhastExplosion } from '../Actions';

world.beforeEvents.explosion.subscribe((explosionEvent: ExplosionBeforeEvent): void => {
	const { source }: ExplosionBeforeEvent = explosionEvent;

	if (source?.matches({ type: MinecraftEntityTypes.Creeper })) {
		void disableCreeperExplosion(explosionEvent);
	} else if (source?.matches({ type: MinecraftEntityTypes.Fireball })) {
		void disableGhastExplosion(explosionEvent);
	}

	return;
});
