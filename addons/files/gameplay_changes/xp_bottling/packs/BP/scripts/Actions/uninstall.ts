import { world } from '@minecraft/server';

export const uninstall = (): void => {
	world.clearDynamicProperties();
	world.sendMessage({ translate: 'bt.xb.misc.uninstall', with: ['\n'] });
};
