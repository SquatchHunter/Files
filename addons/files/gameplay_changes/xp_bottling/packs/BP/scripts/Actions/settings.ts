import { Player, world } from '@minecraft/server';
import {
	XBGlobalSettings,
	// xbGlobalDefaults,
	XBPlayerSettings
	// xbPlayerDefaults
} from '../Models';

export const getSettings = (scope: Player | string = 'global'): object | void => {
	if (scope instanceof Player) scope = scope.name;
	const res = world.getDynamicProperty(`bt:xb.${scope}`) as string;

	return JSON.parse(res);
};

export const setSettings = (settings: XBGlobalSettings | XBPlayerSettings, scope: Player | string = 'global'): void => {
	if (scope instanceof Player) scope = scope.name;
	const prop = JSON.stringify(settings);
	world.setDynamicProperty(`bt:xb.${scope}`, prop);
};

// export const initSettings = (scope: Player | string = 'global'): void => {
// 	let settings = getSettings(scope);

// };

