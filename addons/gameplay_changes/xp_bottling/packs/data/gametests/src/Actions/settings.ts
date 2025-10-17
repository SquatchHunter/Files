/* eslint-disable no-fallthrough */
import { world,	Player } from '@minecraft/server';
import {
	XpBottlingSettings,
	XpBottlingSettingsDynamicProperties,
	XpBottlingServerDefaults,
	PlayerXpBottlingSettings,
	PlayerXpBottlingSettingsDynamicProperties,
	XpBottlingPlayerDefaults
} from '../Models';
import {
	getProperties,
	setProperties
} from '../Util';

/**
 * * Initializes the general addon settings for XpBottling if they are not already initialized.
 * * Sets default values for them and ensures required properties are set.
 */
export const initializeSettings = (): void => {
	let settings = getSettings();
	// mitigation system for config updates.
	switch (settings.configVersion) {
		case 1: {
			const temp = Object.assign({}, XpBottlingServerDefaults, settings);
			settings = temp;
		}
		case -1: // never a valid version and always last for fallthrough.
			settings.configVersion = XpBottlingServerDefaults.configVersion; // use latest version number, set in the defaults object in ../Models/dynamicProperties.ts
			void setSettings(settings);
			break;
		default:
			void setSettings(XpBottlingServerDefaults);
	}
};

// TODO: test if player props can be accessed if player offline ❌
//       - not possible afaik, as player object returns invalid
// TODO: convert all player props to fake player props in world scope
//       - now possible thanks to versioning system, simply bump version number with a case for config v3 built in
export const initializePlayerSettings = (player: Player): void => {
	let settings = getPlayerSettings(player);
	// mitigation system for config updates.
	switch (settings.configVersion) {
		case 1: {
			const temp = Object.assign({}, XpBottlingPlayerDefaults, settings);
			settings = temp;
		}
		case -1: // never a valid version and always last for fallthrough.
			settings.configVersion = XpBottlingPlayerDefaults.configVersion; // use latest version number, set in the defaults object in ../Models/dynamicProperties.ts
			void setPlayerSettings(player, settings);
			break;
		default:
			void setPlayerSettings(player, XpBottlingPlayerDefaults);
	}
};

/**
 * * Retrieves the current addon settings from the world properties.
 *
 * @returns {XpBottlingSettings} - The current XpBottling settings
 */
export const getSettings = (): XpBottlingSettings => getProperties<XpBottlingSettings>(world, XpBottlingSettingsDynamicProperties);

/**
 * * Updates the addon settings in the world properties.
 *
 * @param {XpBottlingSettings} xpBottlingSettings - The updated settings to be saved.
 */
export const setSettings = (xpBottlingSettings: XpBottlingSettings): void => {
	setProperties(world, XpBottlingSettingsDynamicProperties, xpBottlingSettings);
};

/**
 * * Updates the addon settings of the properties.
 *
 * @param {object} newSettings - The updated settings to be saved.
 */
export const updateSettings = (newSettings: XpBottlingSettings): void => {
	const currentSettings: XpBottlingSettings = getSettings();
	const updatedSettings: XpBottlingSettings = Object.assign({}, currentSettings, newSettings);
	setSettings(updatedSettings);
};

/**
 * * Retrieves the player's current settings.
 *
 * @param {Player} player - The player whose settings should be fetched.
 * @returns {PlayerXpBottlingSettings} - The player's current XpBottling settings
 */
export const getPlayerSettings = (player: Player): PlayerXpBottlingSettings => getProperties<PlayerXpBottlingSettings>(player, PlayerXpBottlingSettingsDynamicProperties);

/**
 * * Sets the player's settings.
 *
 * @param {Player} player - The player whose settings are to be saved.
 * @param {PlayerXpBottlingSettings} playerXpBottlingSettings - The player's new settings to be set.
 */
export const setPlayerSettings = (player: Player, playerXpBottlingSettings: PlayerXpBottlingSettings): void => {
	setProperties(player, PlayerXpBottlingSettingsDynamicProperties, playerXpBottlingSettings);
};

/**
 * * Updates the player's settings.
 *
 * @param {Player} player - The player whose settings are to be updated.
 * @param {object} newSettings - The player's updated settings to be saved.
 */
export const updatePlayerSettings = (player: Player, newSettings: object): void => {
	const currentSettings: PlayerXpBottlingSettings = getPlayerSettings(player);
	const updatedSettings: PlayerXpBottlingSettings = Object.assign({}, currentSettings, newSettings);
	setPlayerSettings(player, updatedSettings);
};
