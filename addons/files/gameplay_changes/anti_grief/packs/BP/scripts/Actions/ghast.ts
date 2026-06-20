import { system, EntityHurtBeforeEvent, ExplosionBeforeEvent } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import {
	AntiGriefObservables,
	AntiGriefParticles,
	AntiGriefSounds
} from '../Models';
import { getDynProp } from '../Util';

export const disableGhastExplosion = (explosionEvent: ExplosionBeforeEvent): void => {
	const { dimension, source } = explosionEvent;
	const ghastsGrief = getDynProp('ghastsGrief');
	const ghastsDoDamage = getDynProp('ghastsDoDamage');

	if (!source?.isValid) return;
	if (ghastsGrief) return;
	if (ghastsDoDamage) {
		// ghast will do damage to entities
		explosionEvent.setImpactedBlocks([]);
	} else {
		// ghast will NOT do damage to entities
		explosionEvent.cancel = true;
		const loc = source.location;
		system.run(() => {
			dimension.spawnParticle(AntiGriefParticles.explosion, loc);
			dimension.playSound(AntiGriefSounds.explosion, loc);
		});
	}
};

export const disableFireballDamage = (entityHurtEvent: EntityHurtBeforeEvent): void => {
	const ghastsDoDamage = AntiGriefObservables.ghastsDoDamage.getData();
	if (!entityHurtEvent.damageSource?.damagingEntity?.matches({ type: MinecraftEntityTypes.Ghast })) return;
	if (!ghastsDoDamage) {
		entityHurtEvent.cancel = true;
	}
};
