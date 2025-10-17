import {
	system,
	StartupEvent,
	CustomCommand,
	CommandPermissionLevel
} from '@minecraft/server';
import { openAdminMenu, openPlayerSettingsInterface } from '../UI';

system.beforeEvents.startup.subscribe(({ customCommandRegistry }: StartupEvent): void => {
	const playerConfigCommand: CustomCommand = {
		name: 'bt:xb_playerconfig',
		description: 'Opens the XP Bottling player config form',
		permissionLevel: CommandPermissionLevel.Any,
		cheatsRequired: false,
	};
	customCommandRegistry.registerCommand(playerConfigCommand, openPlayerSettingsInterface);
	const serverConfigCommand: CustomCommand = {
		name: 'bt:xb_serverconfig',
		description: 'Opens the XP Bottling server config form',
		permissionLevel: CommandPermissionLevel.Admin,
		cheatsRequired: false,
	};
	customCommandRegistry.registerCommand(serverConfigCommand, openAdminMenu);
});
