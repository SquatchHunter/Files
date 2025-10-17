import { system, CustomCommandOrigin, CustomCommandResult, CustomCommandStatus, Player } from '@minecraft/server';
import { ModalFormData, ModalFormResponse } from '@minecraft/server-ui';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { getPlayerSettings, setPlayerSettings } from '../Actions';
import { PlayerXpBottlingSettings } from '../Models';

export const openPlayerSettingsInterface = (origin: CustomCommandOrigin): CustomCommandResult => {
	if (origin.sourceEntity?.typeId !== MinecraftEntityTypes.Player) return { status: CustomCommandStatus.Failure, message: 'A player must execute this command' };
	const player = origin.sourceEntity as Player;
	const playerXpBottlingSettings: PlayerXpBottlingSettings = getPlayerSettings(player);

	const form: ModalFormData = new ModalFormData()
		.title({ translate: 'bt.xb.playerSettings.title' })
		.toggle({ translate: 'bt.xb.playerSettings.enableToolTips', with: ['\n'] }, { defaultValue: playerXpBottlingSettings.enableToolTips })
		.toggle({ translate: 'bt.xb.playerSettings.consumeFullStack', with: ['\n'] }, { defaultValue: playerXpBottlingSettings.consumeFullStack })
		.toggle({ translate: 'bt.xb.playerSettings.fillFullStack', with: ['\n'] }, { defaultValue: playerXpBottlingSettings.fillFullStack });

	system.run(() => {
		form.show(player).then((response: ModalFormResponse): void => {
			if (response.formValues) {
				// toggle = boolean
				// slider = number
				// textField = string
				const formValues: [boolean, boolean, boolean] = response.formValues as [boolean, boolean, boolean];

				playerXpBottlingSettings.enableToolTips = formValues[0];
				playerXpBottlingSettings.consumeFullStack = formValues[1];
				playerXpBottlingSettings.fillFullStack = formValues[2];
			}

			if (!response.canceled) {
				setPlayerSettings(player, playerXpBottlingSettings);
			}
		});
	});

	return { status: CustomCommandStatus.Success };
};
