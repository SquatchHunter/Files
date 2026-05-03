import { Entity } from '@minecraft/server';
import { getSettings } from '.';
import { AntiGriefSettings } from '../Models';

export const disableEnderman = (entity: Entity): void => {
	const {}: AntiGriefSettings = getSettings();
	entity.runCommand('loot replace entity @s slot.weapon.mainhand 0 loot grief_blocker');
};

export const iterateExisting = (entities: Entity[]): void => {
	// todo: "disable" griefing for existing endermen on settings change
	//   todo: drop any held items if item is held before state change
	// todo: "enable" griefing for existing endermen on settings change
	// todo: make performant
	//   todo: consider using system.RunJob? async?
};
