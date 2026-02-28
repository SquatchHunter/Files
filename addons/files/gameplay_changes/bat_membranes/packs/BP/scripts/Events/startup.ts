import {
	system,
	StartupEvent,
	CustomCommand,
	CommandPermissionLevel,
	CustomCommandParamType
} from '@minecraft/server';
import { toggleDrops, uninstall } from '../Actions';

system.beforeEvents.startup.subscribe((init: StartupEvent) => {
	const commandRegistry = init.customCommandRegistry;

	const configCommand: CustomCommand = {
		name: 'bt_bm:mob_config',
		description: 'Toggles whether or not specific mobs drop sand when they die',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
		optionalParameters: [
			{
				name: 'bt_bm:state',
				type: CustomCommandParamType.Boolean,
			},
		],
	};
	commandRegistry.registerCommand(configCommand, toggleDrops);

	const uninstallCommand: CustomCommand = {
		name: 'bt_bm:uninstall',
		description: 'Prepares the Addon for removal',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(uninstallCommand, uninstall);
});
