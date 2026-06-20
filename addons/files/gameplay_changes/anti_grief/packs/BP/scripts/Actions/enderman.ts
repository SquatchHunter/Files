/* eslint-disable @minecraft/avoid-unnecessary-command */
import {
	system,
	world,
	DimensionTypes,
	DimensionType,
	Dimension,
	Entity
} from '@minecraft/server';
import { getDynProps } from '../Util';

export function* toggleEnderman(entities: Entity[]): Generator<void, void, void> {
	const { endermenGrief, advAnnounceEndermen } = getDynProps(['endermenGrief', 'advAnnounceEndermen']);

	for (const [index, entity] of entities.entries()) {
		if (!entity.isValid) {
			// Debug log for invalid entity
			if (advAnnounceEndermen) console.log(`${entity.typeId} is no longer valid. Skipping...`);

			yield;
		}
		if (endermenGrief) {
			entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air');
		} else {
			entity.runCommand('loot replace entity @s slot.weapon.mainhand 0 loot grief_blocker');
		}
		if (advAnnounceEndermen) {
			world.sendMessage({
				translate: 'bt.ag.debug.toggleEndermen',
				with: { rawtext: [{ translate: endermenGrief ? 'bt.ag.state.enabled' : 'bt.ag.state.disabled' }, { text: `${index + 1}` }, { text: `${entities.length}` }] },
			});
		}
		yield;
	}
}

export const iterateExistingEndermen = (): void => {
	// get all dimensions
	const dimensionsList: DimensionType[] = DimensionTypes.getAll();
	const dimensions: Dimension[] = [];
	// convert all dimensions to dimension objects
	for (const dimension of dimensionsList) {
		dimensions.push(world.getDimension(dimension.typeId));
	}
	// repeat for endermen
	const endermen: Entity[] = [];
	for (const dimension of dimensions) {
		endermen.push(...dimension.getEntities({ type: 'minecraft:enderman' }));
	}

	// lazily toggle all endermen
	system.runJob(toggleEnderman(endermen));
};
