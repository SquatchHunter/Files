import {
	system,
	world,
	Player,
	CustomCommandOrigin,
	CustomCommandResult,
	CustomCommandStatus
} from '@minecraft/server';
import {
	ObservableString,
	ObservableNumber,
	ObservableBoolean
} from '@minecraft/server-ui';
import { AntiGriefObservables, AntiGriefObservableSettings, AntiGriefDefaults } from '../Models';
import { openConfig } from '../UI';
import { getDynProp, getDynProps, AntiGriefPropertyKey } from '../Util';

export const initializeSettings = (): void => {
	console.log('[AntiGrief] Initializing settings...');
	// clean up any old versions of settings kek
	const version = getDynProp('configVersion');
	switch (version) {
		case 1:
		case 2:
		case 3:
			world.clearDynamicProperties();
		case 4:
			const advanced = world.getDynamicProperty('bt:ag.debugging') as boolean | undefined;
			AntiGriefObservables.advancedSettings.setData(advanced ?? false);
		default:
			// always do this
			AntiGriefObservables.configVersion.setData(AntiGriefDefaults.configVersion);
			break;
	}
};

export const initializeObservables = (): void => {
	const savedSettings = getDynProps(Object.keys(AntiGriefObservables) as AntiGriefPropertyKey[]);

	for (const settingKey of Object.keys(AntiGriefObservables) as (keyof AntiGriefObservableSettings)[]) {
		const observable = AntiGriefObservables[settingKey];
		const savedValue = savedSettings[settingKey as AntiGriefPropertyKey];
		if (!observable || savedValue === undefined) continue;

		if (observable instanceof ObservableBoolean && typeof savedValue === 'boolean') {
			void observable.setData(savedValue);
		} else if (observable instanceof ObservableNumber && typeof savedValue === 'number') {
			void observable.setData(savedValue);
		} else if (observable instanceof ObservableString && typeof savedValue === 'string') {
			void observable.setData(savedValue);
		}
	}
};

export const toggleSetting = ({ sourceEntity }: CustomCommandOrigin, setting: keyof AntiGriefObservableSettings, state: boolean | undefined): CustomCommandResult => {
	const observable = AntiGriefObservables[setting] as ObservableBoolean;
	if (state === undefined) {
		state = !observable.getData();
	}
	void observable.setData(state);
	if (sourceEntity instanceof Player) {
		sourceEntity.sendMessage({ translate: `bt.ag.command.${setting}`, with: { rawtext: [{ translate: state ? 'bt.ag.state.enabled' : 'bt.ag.state.disabled' }] } });
	}

	return { status: CustomCommandStatus.Success };
};

export const handleSettings = (origin: CustomCommandOrigin, setting: keyof AntiGriefObservableSettings | undefined, state: boolean | undefined): CustomCommandResult => {
	system.run(() => {
		if (setting === undefined) {
			if (!(origin.sourceEntity instanceof Player)) return { status: CustomCommandStatus.Failure };
			void openConfig(origin.sourceEntity);
		} else {
			toggleSetting(origin, setting, state);
		}

		return { status: CustomCommandStatus.Success };
	});

	return { status: CustomCommandStatus.Success };
};
