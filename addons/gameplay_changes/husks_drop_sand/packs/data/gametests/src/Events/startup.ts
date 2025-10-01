import {
	system,
	StartupEvent,
	CustomCommand,
	CommandPermissionLevel
} from '@minecraft/server';
import { openSettingsInterface } from '../UI';
import { uninstall } from '../Actions';

system.beforeEvents.startup.subscribe((init: StartupEvent) => {
	const commandRegistry = init.customCommandRegistry;

	const configCommand: CustomCommand = {
		name: 'bt:hds_config',
		description: 'Opens the Husks Drop Sand config form',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(configCommand, openSettingsInterface);

	const uninstallCommand: CustomCommand = {
		name: 'bt:hds_uninstall',
		description: 'Prepares the Addon for removal',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(uninstallCommand, uninstall);
});
