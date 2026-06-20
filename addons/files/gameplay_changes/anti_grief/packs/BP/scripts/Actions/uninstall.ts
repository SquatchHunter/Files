import { world, CustomCommandResult, CustomCommandStatus } from '@minecraft/server';

export const uninstall = (): CustomCommandResult => {
	// TODO: set uninstall observable to true to prevent saving new data before cleaning old data
	world.clearDynamicProperties();
	world.sendMessage({ translate: 'bt.ag.misc.uninstall', with: ['\n'] });

	return { status: CustomCommandStatus.Success };
};
