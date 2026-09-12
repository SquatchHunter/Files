import { system, world, Player } from '@minecraft/server';
import { CustomForm } from '@minecraft/server-ui';
import { iterateExistingEndermen } from '../Actions';
import { AntiGriefDefaults, AntiGriefObservables as settings } from '../Models';
import { getAllDynProps } from '../Util';

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
		.dropdown('Announce Endermen', settings.advAnnounceEndermen, [{ label: 'None', value: 0, description: 'Do not Announce' }, { label: 'Chat', value: 1 }, { label: 'Console', value: 2 }], { description: 'Select where to announce the IterateEndermen function.', visible: settings.advancedSettings })
		.button('Force Run Anti Endermen', () => {
			void iterateExistingEndermen();
		}, { visible: settings.advancedSettings })
		.button('Dump Settings to Console', () => {
			const properties = getAllDynProps(world);
			let text = '§6-= Anti Grief Settings =-§r';
			for (const [key, observable] of Object.entries(settings)) {
				text += `\n  ${key}: §4O:${observable?.getData()}§r §5[DP:${properties[key] ?? 'undefined'}]§r`;
			}
			console.log(text);
		}, { visible: settings.advancedSettings })
		.button('Disable Advanced Settings', () => {
			settings.advancedSettings.setData(AntiGriefDefaults.advancedSettings);
			settings.advAnnounceState.setData(AntiGriefDefaults.advAnnounceState);
			settings.advAnnounceEndermen.setData(AntiGriefDefaults.advAnnounceEndermen);
		}, { visible: settings.advancedSettings })
		.show();
};
