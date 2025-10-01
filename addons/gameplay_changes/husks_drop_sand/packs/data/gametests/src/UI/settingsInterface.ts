import { CustomCommandOrigin, CustomCommandResult, CustomCommandStatus, Player, system } from '@minecraft/server';
import {
	ModalFormData,
	ModalFormResponse
} from '@minecraft/server-ui';
import { getSettings, setSettings } from '../Actions';
import { HusksDropSandSettings } from '../Models';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';

export const openSettingsInterface = (origin: CustomCommandOrigin): CustomCommandResult => {
	// type guard
	if (origin.sourceEntity?.typeId !== MinecraftEntityTypes.Player) return { status: CustomCommandStatus.Failure };
	const player = origin.sourceEntity as Player;
	const currentSettings: HusksDropSandSettings = getSettings();
	let newSettings: HusksDropSandSettings = currentSettings;

	const form: ModalFormData = new ModalFormData()
		.title({ translate: 'bt.hds.settings.title' })
		.slider({ translate: 'bt.hds.settings.sandMax', with: ['\n'] }, 1, 10, { valueStep: 1, defaultValue: currentSettings.sandMax })
		.slider({ translate: 'bt.hds.settings.sandMin', with: ['\n'] }, 1, 10, { valueStep: 1, defaultValue: currentSettings.sandMin })
		.toggle({ translate: 'bt.hds.settings.lootingEnabled', with: ['\n'] }, { defaultValue: currentSettings.lootingEnabled })
		.label({ translate: 'bt.hds.settings.versionLabel', with: [currentSettings.configVersion.toString()] });

	system.run(() => {
		form.show(player).then((response: ModalFormResponse): void => {
			if (response.formValues) {
				// toggle = boolean
				// slider = number
				// textField = string
				const formValues: [number, number, boolean, null] = response.formValues as [number, number, boolean, null];

				newSettings = {
					initialized: currentSettings.initialized,
					configVersion: currentSettings.configVersion,
					lootingEnabled: formValues[2],
					sandMax: formValues[0],
					sandMin: formValues[1],
				};
			}

			if (!response.canceled) {
				setSettings(newSettings);
			}
		});
	});

	return { status: CustomCommandStatus.Success };
};
