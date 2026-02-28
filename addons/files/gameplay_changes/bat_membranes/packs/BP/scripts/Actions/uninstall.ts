import { world, CustomCommandResult, CustomCommandStatus } from '@minecraft/server';

export const uninstall = (): CustomCommandResult => {
	world.clearDynamicProperties();
	world.sendMessage({ translate: 'bt.bm.misc.uninstall', with: ['\n'] });

	return { status: CustomCommandStatus.Success };
};
