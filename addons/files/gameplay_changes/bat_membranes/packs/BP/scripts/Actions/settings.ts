import {
	world,
	Player,
	CustomCommandOrigin,
	CustomCommandStatus,
	CustomCommandResult
} from '@minecraft/server';
import { BatMembranesDynamicProperties, BatMembranesSettings, BatMembranesDefaults } from '../Models';
import { getProperties, setProperties } from '../Util';

/**
 * * Initializes the general addon settings for BatMembranes if they are not already initialized.
 * * Sets default values for them and ensures required properties are set.
 */
export const initializeSettings = (): void => {
	let settings = getSettings();
	// mitigation system for config updates.
	switch (settings?.configVersion) {
		case 1: {
			const temp = Object.assign({}, BatMembranesDefaults, settings);
			settings = temp;
		}
		case -1: // never a valid version and always last for fallthrough.
			settings.configVersion = BatMembranesDefaults.configVersion; // use latest version number, set in the defaults object in ../Models/dynamicProperties.ts
			void setSettings(settings);
			break;
		case undefined:
			void setSettings(BatMembranesDefaults);
	}
};

export const toggleDrops = ({ sourceEntity }: CustomCommandOrigin, state: boolean): CustomCommandResult => {
	if (sourceEntity instanceof Player) {
		sourceEntity.sendMessage({ translate: 'bt.bm.command.toggleDrops', with: [state ? 'bt.bm.state.enabled' : 'bt.bm.state.disabled'] });
	}

	return { status: CustomCommandStatus.Success };
};

/**
 * Retrieves the current addon settings from the world properties.
 *
 * @returns {BatMembranesSettings} - The current BatMembranes settings
 */
export const getSettings = (): BatMembranesSettings => getProperties<BatMembranesSettings>(world, BatMembranesDynamicProperties);

/**
 * Updates the addon settings in the world properties.
 *
 * @param {BatMembranesSettings} batMembranesSettings - The updated settings to be saved.
 */
export const setSettings = (batMembranesSettings: BatMembranesSettings): void => {
	setProperties(world, BatMembranesDynamicProperties, batMembranesSettings);
};
