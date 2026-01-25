import {
	Player,
	CustomCommandOrigin,
	CustomCommandResult,
	CustomCommandStatus
	// CommandPermissionLevel
} from '@minecraft/server';
import { xbSubCommands } from '../Models';
import { uninstall } from './uninstall';

export const handleCommand = (origin: CustomCommandOrigin, subCommand: string): CustomCommandResult => {
	const { initiator, sourceEntity }: CustomCommandOrigin = origin;
	const source = initiator ?? sourceEntity;
	if (source instanceof Player) {
		switch (subCommand) {
			case xbSubCommands.SETTINGS:
				void handleSettings(origin);
				break;
			case xbSubCommands.RESET:
				void handleReset(origin);
				break;
			case xbSubCommands.UNINSTALL:
				void uninstall();
				break;
		}

		return { status: CustomCommandStatus.Success };
	}

	return {
		status: CustomCommandStatus.Failure,
		message: 'command was not executed by a player',
	};
};

const handleSettings = ({}: CustomCommandOrigin): void => {
	// TODO: global settings
	// quick fill toggle
	// quick empty toggle?
	// instant use toggle?
	// additional cost to fill/empty stacks
	// TODO: player settings
	// tooltip toggle
	// quick fill toggle
	// quick empty toggle?
	// xp per bottle (saved to item stack)
};

const handleReset = ({}: CustomCommandOrigin): void => {
	// TODO: list of all configured players
	// TODO: reset form

};
