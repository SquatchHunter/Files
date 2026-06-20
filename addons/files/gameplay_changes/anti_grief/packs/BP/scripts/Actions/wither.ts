import {
	system,
	ExplosionBeforeEvent,
	Vector3
} from '@minecraft/server';
import {
	AntiGriefParticles,
	AntiGriefSounds
} from '../Models';
import { getDynProp } from '../Util';

export const disableWitherExplosion = (explosionEvent: ExplosionBeforeEvent): void => {
	const { dimension, source } = explosionEvent;
	const withersGrief = getDynProp('withersGrief');
	const withersDoDamage = getDynProp('withersDoDamage');

	if (!source?.isValid) return;
	if (withersGrief) return;

	if (withersDoDamage) {
		// withers will do damage to entities
		explosionEvent.setImpactedBlocks([]);
	} else {
		// withers will NOT do damage to entities
		explosionEvent.cancel = true;
		const loc: Vector3 = source.location;
		system.run(() => {
			dimension.spawnParticle(AntiGriefParticles.explosion, loc);
			dimension.playSound(AntiGriefSounds.explosion, loc);
		});
	}
};
