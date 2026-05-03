import {
	system,
	StartupEvent,
	CustomCommand,
	CommandPermissionLevel,
	CustomCommandParamType
} from '@minecraft/server';
import { toggleDamage, uninstall } from '../Actions';
import { AntiGriefModules } from '../Models';

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

	// commandRegistry.registerEnum('ag_modules', Object.values(AntiGriefModules));
	// const antigriefSettingsCommand: CustomCommand = {
	// 	name: 'bt_ag:antigrief',
	// 	description: 'Interacts with AntiGrief',
	// 	permissionLevel: CommandPermissionLevel.Admin,
	// 	cheatsRequired: false,
	// 	mandatoryParameters: [
	// 		{
	// 			name: 'ag_modules',
	// 			type: CustomCommandParamType.Enum,
	// 		},
	// 	],
	// };
	// commandRegistry.registerCommand(antigriefSettingsCommand, commandCallback);

	const uninstallCommand: CustomCommand = {
		name: 'bt_ag:uninstall',
		description: 'Prepares Anti Creeper Grief for removal',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(uninstallCommand, uninstall);
});
