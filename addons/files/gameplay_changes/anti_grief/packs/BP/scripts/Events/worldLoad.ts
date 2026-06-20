import { system, world } from '@minecraft/server';
import { ObservableNumber, ObservableBoolean } from '@minecraft/server-ui';
import { initializeObservables, initializeSettings, iterateExistingEndermen } from '../Actions';
import { AntiGriefDefaults, AntiGriefObservables as settings } from '../Models';
import { getDynProp } from '../Util';

world.afterEvents.worldLoad.subscribe((): void => {
	const version = getDynProp('configVersion');
	if (version !== AntiGriefDefaults.configVersion) void initializeSettings();
	void initializeObservables();
	void iterateExistingEndermen();
});

settings.endermenGrief.subscribe(() => {
	void iterateExistingEndermen();
});

let debugCounter: ObservableNumber | undefined;
const advToggle = settings.creepersGrief.subscribe(() => {
	const adv = settings.advancedSettings as ObservableBoolean | undefined; // get shorthand
	if (adv?.getData()) {
		settings.creepersGrief.unsubscribe(advToggle);

		return;
	}

	if (!debugCounter) {
		debugCounter = new ObservableNumber(0, { clientWritable: false });
	}

	const timer = system.runTimeout(() => {
		debugCounter?.setData(0);
	}, 5 * 20);

	debugCounter.setData(debugCounter.getData() + 1);
	if (debugCounter.getData() >= 7) {
		system.clearRun(timer);
		debugCounter?.setData(0);
		adv?.setData(!adv.getData());
	}
});
