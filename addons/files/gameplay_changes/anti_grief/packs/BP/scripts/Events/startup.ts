import {
	system,
	StartupEvent,
	CustomCommand,
	CommandPermissionLevel,
	CustomCommandParamType
} from '@minecraft/server';
import { toggleSetting, uninstall, dumpSettings } from '../Actions';
import { AntiGriefModules } from '../Models';

system.beforeEvents.startup.subscribe((init: StartupEvent) => {
	const commandRegistry = init.customCommandRegistry;

	commandRegistry.registerEnum('bt_ag:modules', Object.values(AntiGriefModules));
	const antigriefSettingsCommand: CustomCommand = {
		name: 'bt_ag:antigrief',
		description: 'Interacts with AntiGrief',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
		mandatoryParameters: [
			{
				name: 'bt_ag:modules',
				type: CustomCommandParamType.Enum,
			},
		],
		optionalParameters: [
			{
				name: 'state',
				type: CustomCommandParamType.Boolean,
			},
		],
	};
	commandRegistry.registerCommand(antigriefSettingsCommand, toggleSetting);

	const uninstallCommand: CustomCommand = {
		name: 'bt_ag:uninstall',
		description: 'Prepares Anti Creeper Grief for removal',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(uninstallCommand, uninstall);

	// sneaky sneaky debugging commands
	const dumpSettingsCommand: CustomCommand = {
		name: 'bt_ag:dump',
		description: 'Dumps current AntiGrief settings to chat',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(dumpSettingsCommand, dumpSettings);
});
