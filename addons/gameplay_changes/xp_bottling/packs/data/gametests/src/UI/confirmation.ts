import { Player } from '@minecraft/server';
import { MessageFormData, MessageFormResponse } from '@minecraft/server-ui';

export const confirmationInterface = (player: Player, form: MessageFormData): boolean => {
	let returnedValue: boolean = false;
	form.show(player).then((response: MessageFormResponse): void => {
		if (response.selection) {
			returnedValue = true;
		}

		returnedValue = false;
	});

	return returnedValue;
};
