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

	commandRegistry.registerEnum('bt_dmds:mob_types', ['Husk', 'Parched']);

	const configCommand: CustomCommand = {
		name: 'bt_dmds:mob_config',
		description: 'Toggles whether or not specific mobs drop sand when they die',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
		mandatoryParameters: [
			{
				name: 'bt_dmds:mob_types',
				type: CustomCommandParamType.Enum,
			},
		],
		optionalParameters: [
			{
				name: 'bt_dmds:state',
				type: CustomCommandParamType.Boolean,
			},
		],
	};
	commandRegistry.registerCommand(configCommand, toggleDrops);

	const uninstallCommand: CustomCommand = {
		name: 'bt_dmds:uninstall',
		description: 'Prepares the Addon for removal',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(uninstallCommand, uninstall);
});
