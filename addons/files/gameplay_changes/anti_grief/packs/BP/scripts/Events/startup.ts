import {
	system,
	StartupEvent,
	CustomCommand,
	CommandPermissionLevel,
	CustomCommandParamType
} from '@minecraft/server';
import { handleSettings, uninstall } from '../Actions';
import { AntiGriefDynamicProperties } from '../Models';

system.beforeEvents.startup.subscribe((startupEvent: StartupEvent) => {
	const commandRegistry = startupEvent.customCommandRegistry;

	commandRegistry.registerEnum('bt_ag:modules', Object.keys(AntiGriefDynamicProperties).filter(key => key !== 'configVersion' && key !== 'debugging')); // this is BAD
	const antigriefSettingsCommand: CustomCommand = {
		name: 'bt_ag:antigrief',
		description: 'Interacts with AntiGrief',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
		mandatoryParameters: [
		],
		optionalParameters: [
			{
				name: 'bt_ag:modules',
				type: CustomCommandParamType.Enum,
			},
			{
				name: 'state',
				type: CustomCommandParamType.Boolean,
			},
		],
	};
	commandRegistry.registerCommand(antigriefSettingsCommand, handleSettings);

	const uninstallCommand: CustomCommand = {
		name: 'bt_ag:uninstall',
		description: 'Prepares Anti Creeper Grief for removal',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	commandRegistry.registerCommand(uninstallCommand, uninstall);
});
