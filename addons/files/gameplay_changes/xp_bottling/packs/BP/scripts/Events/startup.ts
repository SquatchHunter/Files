import { system, Player, StartupEvent, ItemCustomComponent, ItemComponentConsumeEvent, CustomCommand, CommandPermissionLevel, CustomCommandParamType } from '@minecraft/server';
import { MinecraftEntityTypes } from '@minecraft/vanilla-data';
import { convertXpBottle, handleCommand } from '../Actions';
import { xbComponents, xbItemTypes, xbSubCommands } from '../Models';

const GrantXPComponent: ItemCustomComponent = {
	onConsume: ({ source, itemStack }: ItemComponentConsumeEvent): void => {
		if (!source.matches({ type: MinecraftEntityTypes.Player })) return;
		if (!itemStack.matches(xbItemTypes.xpBottle)) return;
		void convertXpBottle(source as Player);
	},
};

system.beforeEvents.startup.subscribe(({ itemComponentRegistry, customCommandRegistry }: StartupEvent): void => {
	itemComponentRegistry.registerCustomComponent(xbComponents.bottleOfXp, GrantXPComponent);

	customCommandRegistry.registerEnum('subCommand', Object.values(xbSubCommands));
	const rootCommand: CustomCommand = {
		name: 'bt:xb',
		description: 'Interact with the XP Bottling Addon',
		permissionLevel: CommandPermissionLevel.Any,
		cheatsRequired: false,
		mandatoryParameters: [{
			name: 'subCommand',
			type: CustomCommandParamType.Enum,
		}],
	};
	customCommandRegistry.registerCommand(rootCommand, handleCommand);
});
