/**
 * Definitions to use multiple Dynamic Properties as a Typed Object
 * Enum keys and object properties should match for proper conversion.
 */
import { Vector3 } from '@minecraft/server';

type PropertiesTypes = boolean | number | string | Vector3 | undefined;

export enum AntiGriefDynamicProperties {
	configVersion = 'bt:ag.version',
	creepersDoDamage = 'bt:ag.creepersDoDamage',
	ghastsDoDamage = 'bt:ag.ghastsDoDamage',
	withersDoDamage = 'bt:ag.withersDoDamage',
	withersBreakBedrock = 'bt:ag.withersBreakBedrock'
}

export interface AntiGriefSettings {
	// Indicated the current version of the addon config.
	configVersion: number;
	// Indicates whether creeper explosions will damage players or not.
	creepersDoDamage: boolean;
	ghastsDoDamage: boolean;
	withersDoDamage: boolean;
	withersBreakBedrock: boolean;
	[key: string]: PropertiesTypes; // Allows any string key with PropertiesTypes values
}

export const AntiGriefDefaults: AntiGriefSettings = {
	configVersion: 2, // always latest version number, depended on elsewhere.
	creepersDoDamage: false,
	ghastsDoDamage: false,
	withersDoDamage: false,
	withersBreakBedrock: false,
};
