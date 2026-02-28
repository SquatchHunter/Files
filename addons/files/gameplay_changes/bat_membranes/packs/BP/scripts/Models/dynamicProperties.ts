/**
 * Definitions to use multiple Dynamic Properties as a Typed Object
 * Enum keys and object properties should match for proper conversion.
 */
import { Vector3 } from '@minecraft/server';

type PropertiesTypes = boolean | number | string | Vector3 | undefined;

export enum BatMembranesDynamicProperties {
	configVersion = 'bt:hds.version',
	lootingEnabled = 'bt:hds.lootingEnabled'

}

export interface BatMembranesSettings {
	// Indicated the current version of the addon config.
	configVersion: number;
	// Controls whether or not looting will increase the number of items dropped.
	lootingEnabled: boolean;
	[key: string]: PropertiesTypes; // Allows any string key with PropertiesTypes values
}

export const BatMembranesDefaults: BatMembranesSettings = {
	configVersion: 2, // always latest version number, depended on elsewhere.
	lootingEnabled: true,

	debug: false, // not included in the interface since it's not required and only used for development purposes.
};
