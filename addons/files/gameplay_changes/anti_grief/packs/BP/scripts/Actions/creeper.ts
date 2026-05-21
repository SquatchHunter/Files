import {
	system,
	ExplosionBeforeEvent,
	Vector3
} from '@minecraft/server';
import { getSettings } from '.';
import {
	AntiGriefSettings,
	AntiGriefParticles,
	AntiGriefSounds
} from '../Models';

export const disableCreeperExplosion = (explosion: ExplosionBeforeEvent): void => {
	const { dimension, source } = explosion;
	const { creepersGrief, creepersDoDamage }: AntiGriefSettings = getSettings();

	if (!source?.isValid) return;
	if (creepersGrief) return;

	if (creepersDoDamage) {
		// creeper will do damage to entities
		explosion.setImpactedBlocks([]);
	} else {
		// creeper will NOT do damage to entities
		explosion.cancel = true;
		const loc: Vector3 = source.location;
		system.run(() => {
			dimension.spawnParticle(AntiGriefParticles.explosion, loc);
			dimension.playSound(AntiGriefSounds.explosion, loc);
		});
	}
};
