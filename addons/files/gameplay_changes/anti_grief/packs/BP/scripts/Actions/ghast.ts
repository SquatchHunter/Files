import { system, EntityHurtBeforeEvent, ExplosionBeforeEvent } from '@minecraft/server';
import { getSettings } from '../Actions';
import {
	AntiGriefSettings,
	AntiGriefParticles,
	AntiGriefSounds
} from '../Models';

export const disableGhastExplosion = (explosion: ExplosionBeforeEvent): void => {
	const { dimension, source } = explosion;
	const { ghastsGrief, ghastsDoDamage }: AntiGriefSettings = getSettings();

	if (!source?.isValid) return;
	if (ghastsGrief) return;
	if (ghastsDoDamage) {
		// ghast will do damage to entities
		explosion.setImpactedBlocks([]);
	} else {
		// ghast will NOT do damage to entities
		explosion.cancel = true;
		const loc = source.location;
		system.run(() => {
			dimension.spawnParticle(AntiGriefParticles.explosion, loc);
			dimension.playSound(AntiGriefSounds.explosion, loc);
		});
	}
};

export const disableFireballDamage = (eventData: EntityHurtBeforeEvent): void => {
	const { ghastsDoDamage }: AntiGriefSettings = getSettings();

	if (!ghastsDoDamage) {
		eventData.cancel = true;
	}
};
