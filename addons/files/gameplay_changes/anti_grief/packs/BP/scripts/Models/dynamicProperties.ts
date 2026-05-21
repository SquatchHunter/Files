/**
 * Definitions to use multiple Dynamic Properties as a Typed Object
 * Enum keys and object properties should match for proper conversion.
 */
import { Vector3 } from '@minecraft/server';

type PropertiesTypes = boolean | number | string | Vector3 | undefined;

export enum AntiGriefDynamicProperties {
	configVersion = 'bt:ag.version',
	creepersGrief = 'bt:ag.creepersGrief',
	creepersDoDamage = 'bt:ag.creepersDoDamage',
	endermenGrief = 'bt:ag.endermenGrief',
	ghastsGrief = 'bt:ag.ghastsGrief',
	ghastsDoDamage = 'bt:ag.ghastsDoDamage',
	withersGrief = 'bt:ag.withersGrief',
	withersBreakBedrock = 'bt:ag.withersBreakBedrock',
	debugging = 'bt:ag.debugging' // for testing purposes, not used in actual settings
}

export interface AntiGriefSettings {
	configVersion: number;
	creepersGrief: boolean;
	creepersDoDamage: boolean;
	endermenGrief: boolean;
	ghastsGrief: boolean;
	ghastsDoDamage: boolean;
	withersGrief: boolean;
	withersBreakBedrock: boolean;
	debugging: boolean; // for testing purposes, not used in actual settings
	[key: string]: PropertiesTypes; // Allows any string key with PropertiesTypes values
}

export const AntiGriefDefaults: AntiGriefSettings = {
	configVersion: 2, // always latest version number, depended on elsewhere.
	creepersGrief: false,
	creepersDoDamage: false,
	endermenGrief: false,
	ghastsGrief: false,
	ghastsDoDamage: false,
	withersGrief: false,
	withersBreakBedrock: false,
	debugging: true,
};
