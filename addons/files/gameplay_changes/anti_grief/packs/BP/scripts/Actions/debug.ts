import { CustomCommandOrigin, CustomCommandResult, CustomCommandStatus, Player } from '@minecraft/server';
import { getSettings } from '../Actions';
import { AntiGriefSettings } from '../Models';

export const dumpSettings = ({ sourceEntity }: CustomCommandOrigin): CustomCommandResult => {
	const settings: AntiGriefSettings = getSettings();
	if (settings.debugging) {
		if (sourceEntity?.isValid && sourceEntity instanceof Player) {
			sourceEntity.sendMessage({ translate: 'bt.ag.debug.dump', with: [`\n`, `${JSON.stringify(settings, null, 2)}`] });
		}
		console.log(`Anti Grief Settings:\n${JSON.stringify(settings, null, 2)}`);
	} else {
		if (sourceEntity?.isValid && sourceEntity instanceof Player) {
			sourceEntity.sendMessage({ translate: 'bt.ag.debug.dumpDisabled' });
		}
		console.warn(`Debugging is disabled.`);
	}

	return { status: CustomCommandStatus.Success };
};
