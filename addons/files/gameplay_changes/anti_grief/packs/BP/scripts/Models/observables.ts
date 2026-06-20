import { world } from '@minecraft/server';
import {
	ObservableString,
	ObservableNumber,
	ObservableBoolean
} from '@minecraft/server-ui';
import {
	AntiGriefDefaults,
	AntiGriefDynamicProperties
} from '.';

type Observables = ObservableBoolean | ObservableNumber | ObservableString;

export interface AntiGriefObservableSettings {
	configVersion: ObservableNumber;
	creepersGrief: ObservableBoolean;
	creepersDoDamage: ObservableBoolean;
	endermenGrief: ObservableBoolean;
	ghastsGrief: ObservableBoolean;
	ghastsDoDamage: ObservableBoolean;
	withersGrief: ObservableBoolean;
	withersDoDamage: ObservableBoolean;
	withersBreakBedrock: ObservableBoolean;
	advancedSettings: ObservableBoolean;
	advAnnounceState: ObservableBoolean;
	advAnnounceEndermen: ObservableBoolean;
	[key: string]: Observables;
}

/**
 * Creates or restores an Observable from a dynamic property
 * @param {string} propId - The name of the dynamic property to save to
 * @returns {ObservableString|ObservableNumber|ObservableBoolean}
 */
const createObservable = (internalId: string, propId: string): ObservableString | ObservableNumber | ObservableBoolean => {
	const initialValue = AntiGriefDefaults[internalId as keyof typeof AntiGriefDefaults];

	let observable;
	const config = { clientWritable: true };

	switch (typeof initialValue) {
		case 'string':
			observable = new ObservableString(String(initialValue), config);
			break;
		case 'number':
			observable = new ObservableNumber(Number(initialValue), config);
			break;
		case 'boolean':
			observable = new ObservableBoolean(Boolean(initialValue), config);
			break;
		default:
			throw new Error(`Unsupported type for Observable: ${propId}: ${typeof initialValue}`);
	}

	observable.subscribe(value => {
		if (AntiGriefObservables.advAnnounceState.getData()) console.log(`Saving ${propId} = ${value}`);
		world.setDynamicProperty(propId, value);
	});

	return observable;
};

export const AntiGriefObservables = {} as AntiGriefObservableSettings;
for (const [key, value] of Object.entries(AntiGriefDynamicProperties)) {
	// assigns the shorthand name to our state manager, and uses the longhand name for property lookup
	AntiGriefObservables[key] = createObservable(key, value);
}
