import {
	system,
	ExplosionBeforeEvent,
	Entity,
	Vector3
} from '@minecraft/server';
import { getSettings } from '.';
import {
	AntiGriefSettings,
	AntiGriefParticles,
	AntiGriefSounds
} from '../Models';

export const disableExplosion = async(explosion: ExplosionBeforeEvent): Promise<void> => {
	const entity = explosion.source as Entity;
	const { dimension } = explosion;
	const { creepersDoDamage }: AntiGriefSettings = getSettings();

	if (creepersDoDamage) {
		// creeper will do damage to entities
		explosion.setImpactedBlocks([]);
	} else {
		// creeper will NOT do damage to entities
		explosion.cancel = true;
		const loc: Vector3 = entity.location;
		await system.waitTicks(1);
		dimension.spawnParticle(AntiGriefParticles.explosion, loc);
		dimension.playSound(AntiGriefSounds.explosion, loc);
	}
};
