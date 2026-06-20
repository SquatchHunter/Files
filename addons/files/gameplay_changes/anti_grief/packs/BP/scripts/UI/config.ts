import { system } from '@minecraft/server';
import { CustomForm } from '@minecraft/server-ui';
import { Player } from '@minecraft/server';
import { AntiGriefObservables as settings } from '../Models';
import { iterateExistingEndermen } from '../Actions';

export const openConfig = (player: Player): void => {
	system.run(() => {
		void configFlow(player);
	});
};

const configFlow = (player: Player): void => {
	new CustomForm(player, 'Anti Grief Settings')
		.toggle('Creeper Griefing', settings.creepersGrief, { description: 'Whether Creepers can destroy blocks when they explode.' })
		.toggle('Creepers do Damage', settings.creepersDoDamage, { description: 'Whether Creepers can damage players when they explode.' })
		.toggle('Endermen Griefing', settings.endermenGrief, { description: 'Whether Endermen can destroy blocks.' })
		.toggle('Ghast Griefing', settings.ghastsGrief, { description: 'Whether Ghasts can destroy blocks.' })
		.toggle('Ghasts do Damage', settings.ghastsDoDamage, { description: 'Whether Ghasts can damage players.' })
		.toggle('Wither Griefing', settings.withersGrief, { description: 'Whether Withers can destroy blocks.' })
		.toggle('Withers do Damage', settings.withersDoDamage, { description: 'Whether Withers can damage players.' })
		.toggle('Withers Break Bedrock', settings.withersBreakBedrock, { disabled: true })
		.spacer()
		.header('Advanced Settings', { visible: settings.advancedSettings })
		.spacer()
		.label('Only touch these settings if you know what you are doing.', { visible: settings.advancedSettings })
		.spacer()
		.toggle('Announce State', settings.advAnnounceState, { description: 'Whether to announce the state of the anti-grief system.', visible: settings.advancedSettings })
		.toggle('Announce Endermen', settings.advAnnounceEndermen, { description: 'Whether to announce the progress of IterateEndermen function.', visible: settings.advancedSettings })
		.button('Force Run Anti Endermen', () => {
			void iterateExistingEndermen();
		}, { visible: settings.advancedSettings })
		.button('Dump Settings to Console', () => {
			let text = '§6-= Anti Grief Settings =-§r';
			for (const [key, observable] of Object.entries(settings)) {
				if (observable?.getData) {
					text += `\n  ${key}: ${observable.getData()}`;
				}
			}
			console.log(text);
		}, { visible: settings.advancedSettings })
		.button('Disable Advanced Settings', () => {
			settings.advancedSettings.setData(false);
			settings.advAnnounceState.setData(false);
			settings.advAnnounceEndermen.setData(false);
		}, { visible: settings.advancedSettings })
		.show();
};
