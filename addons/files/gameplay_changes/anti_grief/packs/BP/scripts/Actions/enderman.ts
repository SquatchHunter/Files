/* eslint-disable @minecraft/avoid-unnecessary-command */
import {
	system,
	world,
	DimensionTypes,
	DimensionType,
	Dimension,
	Entity
} from '@minecraft/server';
import { getSettings } from '.';
import { AntiGriefSettings } from '../Models';

export const toggleEnderman = (entity: Entity): void => {
	const { endermenGrief }: AntiGriefSettings = getSettings();
	if (endermenGrief) {
		entity.runCommand('replaceitem entity @s slot.weapon.mainhand 0 air');
	} else {
		entity.runCommand('loot replace entity @s slot.weapon.mainhand 0 loot grief_blocker');
	}
};

function* toggleAllEndermen(entities: Entity[]): Generator<void, void, void> {
	const { endermenGrief, debugging }: AntiGriefSettings = getSettings();

	for (let index = 0; index < entities.length; index++) {
		toggleEnderman(entities[index]);
		if (debugging) {
			console.log({
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
	var dimensions: Dimension[] = [];
	// convert all dimensions to dimension objects
	for (const dimension of dimensionsList) {
		dimensions.push(world.getDimension(dimension.typeId));
	}
	// repeat for endermen
	var endermen: Entity[] = [];
	for (const dimension of dimensions) {
		endermen.push(...dimension.getEntities({ type: 'minecraft:enderman' }));
	}

	// lazily toggle all endermen
	system.runJob(toggleAllEndermen(endermen));
};
