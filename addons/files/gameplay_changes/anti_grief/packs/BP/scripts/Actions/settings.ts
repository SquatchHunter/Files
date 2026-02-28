import {
	world,
	Player,
	CustomCommandOrigin,
	CustomCommandResult,
	CustomCommandStatus
} from '@minecraft/server';
import { AntiGriefSettings, AntiGriefDynamicProperties, AntiGriefDefaults } from '../Models';
import { getProperties, setProperties } from '../Util';

/**
 * * Initializes the general addon settings for AntiGrief if they are not already initialized.
 * * Sets default values for them and ensures required properties are set.
 */
export const initializeSettings = (): void => {
	let settings = getSettings();
	// mitigation system for config updates.
	switch (settings?.configVersion) {
		case 1: {
			const temp = Object.assign({}, AntiGriefDefaults, settings);
			settings = temp;
		}
		case -1: // never a valid version and always last for fallthrough.
			settings.configVersion = AntiGriefDefaults.configVersion; // use latest version number, set in the defaults object in ../Models/dynamicProperties.ts
			void setSettings(settings);
			break;
		case undefined:
			void setSettings(AntiGriefDefaults);
	}
};

export const toggleDamage = ({ sourceEntity }: CustomCommandOrigin, state: boolean | undefined): CustomCommandResult => {
	const settings = getSettings();
	if (state === undefined) state = !settings.creepersDoDamage;
	setSettings({
		...settings,
		creepersDoDamage: state,
	});

	if (sourceEntity instanceof Player) {
		sourceEntity.sendMessage({ translate: 'bt.acg.command.toggleDamage', with: { rawtext: [{ translate: state ? 'bt.acg.state.enabled' : 'bt.acg.state.disabled' }] } });
	}

	return { status: CustomCommandStatus.Success };
};

/**
 * Retrieves the current addon settings from the world properties.
 *
 * @returns {AntiGriefSettings} - The current AntiGrief settings
 */
export const getSettings = (): AntiGriefSettings => getProperties<AntiGriefSettings>(world, AntiGriefDynamicProperties);

/**
 * Updates the addon settings in the world properties.
 *
 * @param {AntiGriefSettings} antiGriefSettings - The updated settings to be saved.
 */
export const setSettings = (antiGriefSettings: AntiGriefSettings): void => {
	setProperties(world, AntiGriefDynamicProperties, antiGriefSettings);
};
