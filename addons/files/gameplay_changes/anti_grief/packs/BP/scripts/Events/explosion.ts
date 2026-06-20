import { world, ExplosionBeforeEvent } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { disableCreeperExplosion, disableGhastExplosion, disableWitherExplosion } from '../Actions';

world.beforeEvents.explosion.subscribe((explosionEvent: ExplosionBeforeEvent): void => {
	const { source }: ExplosionBeforeEvent = explosionEvent;

	switch (source?.typeId) {
		case MinecraftEntityTypes.Creeper:
			void disableCreeperExplosion(explosionEvent);
			break;
		case MinecraftEntityTypes.Fireball:
			void disableGhastExplosion(explosionEvent);
			break;
		case MinecraftEntityTypes.Wither:
		case MinecraftEntityTypes.WitherSkull:
		case MinecraftEntityTypes.WitherSkullDangerous:
			void disableWitherExplosion(explosionEvent);
			break;
	}

	return;
});
