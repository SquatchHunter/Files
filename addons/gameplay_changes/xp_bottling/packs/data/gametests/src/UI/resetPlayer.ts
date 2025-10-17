import { world, Player, CustomCommandResult, CustomCommandStatus, CustomCommandOrigin } from '@minecraft/server';
import { ModalFormData, ModalFormResponse } from '@minecraft/server-ui';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { openAdminMenu } from '../UI';
import { initializePlayerSettings } from '../Actions';

export const openResetPlayerInterface = async(origin: CustomCommandOrigin): Promise<CustomCommandResult> => {
	if (origin.sourceEntity?.typeId !== MinecraftEntityTypes.Player) return { status: CustomCommandStatus.Failure, message: 'A player must execute this command' };
	const admin = origin.sourceEntity as Player;
	const onlinePlayers: Player[] = world.getAllPlayers();
	const playerList: string[] = [];
	for (const player of onlinePlayers) {
		playerList.push(player.name);
	}

	const form: ModalFormData = new ModalFormData()
		.title({ translate: 'bt.xb.util.title' })
		.dropdown({ translate: 'bt.xb.util.dropdown', with: ['\n'] }, playerList, { defaultValueIndex: playerList.indexOf(admin.name) });

	const response: ModalFormResponse = await form.show(admin);
	if (response.canceled) {
		void openAdminMenu(origin);
	} else {
		if (!response.formValues) return { status: CustomCommandStatus.Failure, message: 'Cannot find any online players' };
		const playerIndex = response.formValues[0] as number;
		const player = world.getPlayers({ name: playerList[playerIndex] })[0];
		void player.clearDynamicProperties();
		void player.sendMessage({ translate: 'bt.xb.misc.clearPlayer', with: ['\n', player.name] });
		void initializePlayerSettings(player);
	}

	return { status: CustomCommandStatus.Success };
};
