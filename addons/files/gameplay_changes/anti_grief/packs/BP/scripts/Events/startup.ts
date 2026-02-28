import {
	system,
	StartupEvent,
	CustomCommand,
	CommandPermissionLevel,
	CustomCommandParamType
} from '@minecraft/server';
import { toggleDamage, uninstall } from '../Actions';

system.beforeEvents.startup.subscribe((init: StartupEvent) => {
	const commandRegistry = init.customCommandRegistry;

	const configCommand: CustomCommand = {
		name: 'bt_ag:playerdamage',
		description: 'Toggle if players take damage from creeper explosions',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
		optionalParameters: [
			{
				name: 'enableDamage',
				type: CustomCommandParamType.Boolean,
			},
		],
	};
	commandRegistry.registerCommand(configCommand, toggleDamage);

	const uninstallCommand: CustomCommand = {
		name: 'bt_ag:uninstall',
		description: 'Prepares Anti Creeper Grief for removal',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(uninstallCommand, uninstall);
});
