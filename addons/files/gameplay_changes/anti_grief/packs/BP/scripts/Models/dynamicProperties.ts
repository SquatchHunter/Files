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
	withersDoDamage = 'bt:ag.withersDoDamage',
	withersBreakBedrock = 'bt:ag.withersBreakBedrock',
	advancedSettings = 'bt:ag.advancedSettings',
	advAnnounceState = 'bt:ag.advAnnounceState',
	advAnnounceEndermen = 'bt:ag.advAnnounceEndermen'
}

export interface AntiGriefSettings {
	configVersion: number;
	creepersGrief: boolean;
	creepersDoDamage: boolean;
	endermenGrief: boolean;
	ghastsGrief: boolean;
	ghastsDoDamage: boolean;
	withersGrief: boolean;
	withersDoDamage: boolean;
	withersBreakBedrock: boolean;
	advancedSettings: boolean;
	advAnnounceState: boolean;
	advAnnounceEndermen: boolean;
	[key: string]: PropertiesTypes;
}

export const AntiGriefDefaults: AntiGriefSettings = {
	configVersion: 4, // always latest version number, depended on elsewhere.
	creepersGrief: false,
	creepersDoDamage: true,
	endermenGrief: false,
	ghastsGrief: false,
	ghastsDoDamage: true,
	withersGrief: true,
	withersDoDamage: true,
	withersBreakBedrock: true,
	advancedSettings: false,
	advAnnounceState: false,
	advAnnounceEndermen: false,
};
