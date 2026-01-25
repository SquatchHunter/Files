import { system, Player, StartupEvent, ItemCustomComponent, ItemComponentConsumeEvent, CustomCommand, CommandPermissionLevel, CustomCommandParamType } from '@minecraft/server';
import { convertXpBottle, handleCommand } from '../Actions';
import { xbComponents, xbItemTypes, xbSubCommands } from '../Models';

const GrantXPComponent: ItemCustomComponent = {
	onConsume: ({ source, itemStack }: ItemComponentConsumeEvent): void => {
		if (!(source instanceof Player)) return;
		if (!itemStack.matches(xbItemTypes.xpBottle)) return;
		void convertXpBottle(source);
	},
};

system.beforeEvents.startup.subscribe(({ itemComponentRegistry, customCommandRegistry }: StartupEvent): void => {
	itemComponentRegistry.registerCustomComponent(xbComponents.bottleOfXp, GrantXPComponent);

	customCommandRegistry.registerEnum('bt:subCommand', Object.values(xbSubCommands));
	const rootCommand: CustomCommand = {
		name: 'bt:xb',
		description: 'Interact with the XP Bottling Addon',
		permissionLevel: CommandPermissionLevel.Any,
		cheatsRequired: false,
		mandatoryParameters: [{
			name: 'bt:subCommand',
			type: CustomCommandParamType.Enum,
		}],
	};
	customCommandRegistry.registerCommand(rootCommand, handleCommand);
});
