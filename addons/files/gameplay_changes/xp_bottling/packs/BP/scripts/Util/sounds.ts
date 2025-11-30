import { World, Dimension, Player, Vector3 } from '@minecraft/server';

interface PlaySoundsArgs {
	// location to play the sound
	location?: Vector3;
	// volume to play the sound at; where 1.0 equals 16 blocks
	volume?: number;
	// pitch of the sounds; range 0-256.0
	pitch?: number[] | number;
	// minimum volume for sound when heard outside of the audible sphere; range 0.0 - 1.0
	minVolume?: number;
}

interface Status {
	// status of the operation
	status: boolean;
	// any error/s that were present
	error?: string;
}

/**
 * Wrapper for playSound methods and playsound command to facilitate an easy way to play sounds in any context.
 *
 * @template T The enum of sounds from the addon.
 * @param {World | Dimension | Player} scope The scope where the sound will be played.
 * @param {T} sound The sound that will be played.
 * @param {PlaySoundsArgs} args Additional arguments to control how the sound is played.
 *
 * @returns {Status} The result of the operation and any error/s.
 */
export const playSounds = <T>(scope: World | Dimension | Player, sound: T, args?: PlaySoundsArgs): Status => {
	if (!scope) return { status: false, error: 'no scope provided' };
	if (!sound) return { status: false, error: 'no sound provided' };

	let location: Vector3 | undefined, volume: number, pitch: number | number[], minVolume: number;
	if (args) {
		({ location = undefined, volume = 1, pitch = 1, minVolume = 0 } = args!);
	} else {
		location = undefined;
		volume = 1;
		pitch = 1;
		minVolume = 0;
	}

	if (typeof pitch === 'object') {
		// if range of numbers provided, select one and return it; treat pitch as just a number from then on.
		pitch = pitch[Math.floor(Math.random() * pitch.length)];
	}

	switch (true) {
		case scope instanceof World:
			const players: Player[] = scope.getAllPlayers();
			for (const player of players) {
				player.playSound(sound as string, { pitch, volume });
			}
			break;
		case scope instanceof Dimension && !location:
			scope.runCommand(`playsound ${sound} @a`);
			break;
		case scope instanceof Dimension && minVolume > 0:
			scope.runCommand(`playsound ${sound} @a ${location?.x} ${location?.y} ${location?.z} ${minVolume}`);
			break;
		case scope instanceof Dimension:
			scope.playSound(sound as string, location!, { pitch, volume });
			break;
		case scope instanceof Player:
			scope.playSound(sound as string, { pitch, volume });
			break;
		default:
			return { status: false, error: 'missing arguments' };
	}

	return { status: true };
};
