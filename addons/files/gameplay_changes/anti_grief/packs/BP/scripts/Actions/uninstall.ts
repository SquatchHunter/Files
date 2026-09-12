import { world, CustomCommandResult, CustomCommandStatus } from '@minecraft/server';
import { unsubscribeObservables } from '../Models';

export const uninstall = (): CustomCommandResult => {
	// unsub observables before clearing props to prevent data being rewritten in the same tick
	void unsubscribeObservables();
	world.clearDynamicProperties();
	world.sendMessage({ translate: 'bt.ag.misc.uninstall', with: ['\n'] });

	return { status: CustomCommandStatus.Success };
};
