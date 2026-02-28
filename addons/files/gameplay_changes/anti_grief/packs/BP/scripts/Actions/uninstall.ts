import { world, CustomCommandResult, CustomCommandStatus } from '@minecraft/server';

export const uninstall = (): CustomCommandResult => {
	world.clearDynamicProperties();
	world.sendMessage({ translate: 'bt.ag.misc.uninstall', with: ['\n'] });

	return { status: CustomCommandStatus.Success };
};
