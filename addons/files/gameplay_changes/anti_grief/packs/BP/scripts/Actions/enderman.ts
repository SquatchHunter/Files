import {
	system,
	world,
	DimensionTypes,
	DimensionType,
	Dimension,
	Entity
} from '@minecraft/server';
import { getDynProps, getOperators } from '../Util';

export function* toggleEnderman(entities: Entity[]): Generator<void> {
	const { endermenGrief, advAnnounceEndermen } = getDynProps(['endermenGrief', 'advAnnounceEndermen']);
	const operators = getOperators();

	for (const [index, entity] of entities.entries()) {
		if (!entity.isValid) {
			switch (advAnnounceEndermen) {
				case 1:
					for (const op of operators) {
						try {
							op.sendMessage({
								translate: 'bt.ag.debug.invalidEnderman', with: {
									rawtext: [
										{ text: `${index + 1}` },
										{ text: `${entities.length}` },
									],
								},
							});
						} catch {} // do nothing if the send message fails, likely means player left mid loop
					}
					break;
				case 2:
					console.warn(`[AntiGrief] Enderman: ${index + 1}/${entities.length} is no longer valid, skipping.`);
					break;
			}

			yield;
			continue;
		}

		const command = endermenGrief
			? 'replaceitem entity @s slot.weapon.mainhand 0 air'
			: 'loot replace entity @s slot.weapon.mainhand 0 loot grief_blocker';

		entity.runCommand(command);

		switch (advAnnounceEndermen) {
			case 1:
				for (const op of operators) {
					try {
						op.sendMessage({
							translate: 'bt.ag.debug.toggleEndermen', with: {
								rawtext: [
									{ translate: endermenGrief ? 'bt.ag.state.enabled' : 'bt.ag.state.disabled' },
									{ text: `${index + 1}` },
									{ text: `${entities.length}` },
								],
							},
						});
					} catch {} // do nothing if the send message fails, likely means player left mid loop
				}
				break;
			case 2:
				console.log(`[AntiGrief] Enderman: ${endermenGrief ? 'Enabled' : 'Disabled'} {${index + 1}/${entities.length}}`);
				break;
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
