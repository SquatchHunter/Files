import { system, world } from '@minecraft/server';
import {
	ObservableString,
	ObservableNumber,
	ObservableBoolean
} from '@minecraft/server-ui';
import {
	AntiGriefDefaults,
	AntiGriefDynamicProperties
} from '.';

// custom types
type Teardown = () => void;
type Observables = ObservableBoolean | ObservableNumber | ObservableString;

// custom interfaces
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
	advAnnounceEndermen: ObservableNumber;
	[key: string]: Observables;
}

// containers
const observableListeners = new Set<Teardown>();

/**
 * Creates or restores an Observable from a dynamic property
 * @param {string} internalId - The internal ID of the observable (defined in ./dynamicProperties.ts)
 * @param {string} propId - The name of the dynamic property to save to
 * @returns {ObservableString|ObservableNumber|ObservableBoolean}
 */
const createObservable = (internalId: string, propId: string): ObservableString | ObservableNumber | ObservableBoolean => {
	const initialValue = AntiGriefDefaults[internalId as keyof typeof AntiGriefDefaults];
	const config = { clientWritable: true };

	const saveValue = (value: string | number | boolean): void => {
		if (AntiGriefObservables.advAnnounceState.getData()) console.log(`Saving ${propId} = ${value}`);
		world.setDynamicProperty(propId, value);
	};

	switch (typeof initialValue) {
		case 'string': {
			const observable = new ObservableString(initialValue, config);
			const listener = observable.subscribe(saveValue);
			observableListeners.add(() => observable.unsubscribe(listener));

			return observable;
		}
		case 'number': {
			const observable = new ObservableNumber(initialValue, config);
			const listener = observable.subscribe(saveValue);
			observableListeners.add(() => observable.unsubscribe(listener));

			return observable;
		}
		case 'boolean': {
			const observable = new ObservableBoolean(initialValue, config);
			const listener = observable.subscribe(saveValue);
			observableListeners.add(() => observable.unsubscribe(listener));

			return observable;
		}
		default:
			throw new Error(`Unsupported type for Observable: ${propId}: ${typeof initialValue}`);
	}
};

export const AntiGriefObservables = {} as AntiGriefObservableSettings;
for (const [key, value] of Object.entries(AntiGriefDynamicProperties)) {
	// assigns the shorthand name to our state manager, and uses the longhand name for property lookup
	AntiGriefObservables[key] = createObservable(key, value);
}

export const unsubscribeObservables = (): void => {
	system.run(() => {
		for (const teardown of observableListeners) teardown();
		observableListeners.clear();
	});
};
