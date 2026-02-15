import {
	world,
	Player,
	CustomCommandOrigin,
	CustomCommandStatus,
	CustomCommandResult
} from '@minecraft/server';
import { DesertMobsDropSandDefaults, DesertMobsDropSandSettings, DesertMobsDropSandDynamicProperties } from '../Models';
import { getProperties, setProperties } from '../Util';

/**
 * * Initializes the general addon settings for DesertMobsDropSand if they are not already initialized.
 * * Sets default values for them and ensures required properties are set.
 */
export const initializeSettings = (): void => {
	let settings = getSettings();
	// mitigation system for config updates.
	switch (settings?.configVersion) {
		case 1: {
			const temp = Object.assign({}, DesertMobsDropSandDefaults, settings);
			settings = temp;
		}
		case -1: // never a valid version and always last for fallthrough.
			settings.configVersion = DesertMobsDropSandDefaults.configVersion; // use latest version number, set in the defaults object in ../Models/dynamicProperties.ts
			void setSettings(settings);
			break;
		case undefined:
			void setSettings(DesertMobsDropSandDefaults);
	}
};

export const toggleDrops = ({ sourceEntity }: CustomCommandOrigin, mob_type: string, state: boolean): CustomCommandResult => {
	const settings = getSettings();
	if (!state) state = !settings[`${mob_type.toLocaleLowerCase()}DropSand`];
	setSettings({
		...settings,
		[`${mob_type.toLocaleLowerCase()}DropSand`]: state,
	});

	if (sourceEntity instanceof Player) {
		// sourceEntity.sendMessage(`§g${mob_type}§r sand drops have been ${state ? '§qenabled§r' : '§mdisabled§r'}.`);
		sourceEntity.sendMessage({ translate: 'bt.dmds.command.toggleDrops', with: { rawtext: [{ text: mob_type }, { translate: state ? 'bt.dmds.state.enabled' : 'bt.dmds.state.disabled' }] } });
	}

	return { status: CustomCommandStatus.Success };
};

/**
 * Retrieves the current addon settings from the world properties.
 *
 * @returns {DesertMobsDropSandSettings} - The current DesertMobsDropSand settings
 */
export const getSettings = (): DesertMobsDropSandSettings => getProperties<DesertMobsDropSandSettings>(world, DesertMobsDropSandDynamicProperties);

/**
 * Updates the addon settings in the world properties.
 *
 * @param {DesertMobsDropSandSettings} desertMobsDropSandSettings - The updated settings to be saved.
 */
export const setSettings = (desertMobsDropSandSettings: DesertMobsDropSandSettings): void => {
	setProperties(world, DesertMobsDropSandDynamicProperties, desertMobsDropSandSettings);
};
