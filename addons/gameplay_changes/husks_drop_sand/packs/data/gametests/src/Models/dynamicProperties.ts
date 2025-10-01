/**
 * Definitions to use multiple Dynamic Properties as a Typed Object
 * Enum keys and object properties should match for proper conversion.
 */
export enum HusksDropSandSettingsDynamicProperties {
	initialized = 'bt:hds.settingsInitialized',
	configVersion = 'bt:hds.version',
	lootingEnabled = 'bt:hds.lootingEnabled',
	sandMax = 'bt:hds.sandMax',
	sandMin = 'bt:hds.sandMin'
}

export interface HusksDropSandSettings {
	// Indicates whether the HusksDropSand addon settings have been initialized.
	initialized: boolean;
	// Indicated the current version of the addon config.
	configVersion: number;
	// Controls whether or not looting will increase the number of items dropped.
	lootingEnabled: boolean;
	// Controls whether Minecraft looting algorithm is used or not.
	sandMax: number;
	// Specifies the maximum amount of sand to drop.
	sandMin: number;
}

export const HusksDropSandDefaults: HusksDropSandSettings = {
	initialized: false, // deprecated in favour of version number
	configVersion: 2, // always latest version number, depended on elsewhere.
	lootingEnabled: true,
	sandMax: 1,
	sandMin: 1,
};
