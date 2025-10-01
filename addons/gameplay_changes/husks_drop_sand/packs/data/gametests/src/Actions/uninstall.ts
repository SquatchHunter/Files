import { CustomCommandResult, CustomCommandStatus, world } from '@minecraft/server';

export const uninstall = (): CustomCommandResult => {
	world.clearDynamicProperties();
	world.sendMessage({ translate: 'bt.hds.misc.uninstall', with: ['\n'] });

	return { status: CustomCommandStatus.Success };
};
