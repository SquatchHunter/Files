import {
	world,
	Player,
	PlayerPermissionLevel
} from '@minecraft/server';

export const getOperators = (): Player[] => {
	const players = world.getAllPlayers();

	return players.filter(player => player.playerPermissionLevel === PlayerPermissionLevel.Operator);
};
