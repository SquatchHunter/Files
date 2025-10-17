import { system, CustomCommandOrigin, CustomCommandResult, CustomCommandStatus, Player } from '@minecraft/server';
import { ActionFormData, ActionFormResponse } from '@minecraft/server-ui';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { openServerSettingsInterface, openPlayerSettingsInterface, openResetPlayerInterface } from '../UI';

export const openAdminMenu = (origin: CustomCommandOrigin): CustomCommandResult => {
	if (origin.sourceEntity?.typeId !== MinecraftEntityTypes.Player) return { status: CustomCommandStatus.Failure, message: 'A player must execute this command' };
	const player = origin.sourceEntity as Player;
	const form: ActionFormData = new ActionFormData()
		.title({ translate: 'bt.xb.config.title' })
		.button({ translate: 'bt.xb.config.globalSettings' })
		.button({ translate: 'bt.xb.config.playerSettings' })
		.button({ translate: 'bt.xb.config.resetPlayer' });

	system.run(() => {
		form.show(player).then((response: ActionFormResponse): void => {
			switch (response.selection) {
				case 0:
					openServerSettingsInterface(origin);
					break;

				case 1:
					openPlayerSettingsInterface(origin);
					break;

				case 2:
					openResetPlayerInterface(origin);
					break;

				default:
					break;
			}
		});
	});

	return { status: CustomCommandStatus.Success };
};
