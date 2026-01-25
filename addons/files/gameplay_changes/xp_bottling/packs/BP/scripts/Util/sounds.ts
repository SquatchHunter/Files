import { World, Dimension, Player, Vector3 } from '@minecraft/server';
import { xbSounds } from '../Models';
import { Status } from './interfaces';

interface PlaySoundsArgs {
	// location to play the sound
	location?: Vector3;
	// volume to play the sound at; where 1.0 equals 16 blocks
	// scope dependent; when playing to a player directly, volume affects how loud it is
	volume?: number;
	// pitch of the sounds; range 0-256.0
	pitch?: number[] | number;
	// minimum volume for sound when heard outside of the audible sphere; range 0.0 - 1.0
	minVolume?: number;
}

/**
 * Wrapper for playSound methods and playsound command to facilitate an easy way to play sounds in any context.
 *
 * @template T The enum of sounds from the addon.
 * @param {World | Dimension | Player} scope The scope where the sound will be played.
 * @param {xbSounds} sound The sound that will be played.
 * @param {PlaySoundsArgs} args Additional arguments to control how the sound is played.
 *
 * @returns {Status} The result of the operation and any error/s.
 */
export const playSounds = (scope: World | Dimension | Player, sound: xbSounds, args?: PlaySoundsArgs): Status => {
	if (!scope) return { status: false, error: 'no scope provided' };
	if (!sound) return { status: false, error: 'no sound provided' };

	let location: Vector3 | undefined, volume: number, pitch: number | number[], minVolume: number;
	({ location = undefined, volume = 1, pitch = 1, minVolume = 0 } = args ?? {}); // copilot cleaned this up

	if (typeof pitch === 'object') { // arrays are objects, vague yes but works
		// if range of numbers provided, select one and return it; treat pitch as just a number from then on.
		pitch = pitch[Math.floor(Math.random() * pitch.length)];
	}

	// copilot converted from messy switch/case to if/else, functional code remains untouched
	if (scope instanceof World) {
		const players: Player[] = scope.getAllPlayers();
		for (const player of players) {
			player.playSound(sound, { pitch, volume });
		}
	} else if (scope instanceof Dimension) {
		// If no location provided, use the playsound command for all players in the dimension
		if (location == null) {
			scope.runCommand(`playsound ${sound} @a`);
		} else if (minVolume > 0) {
			// location is present here (narrowed), safe to access coordinates
			scope.runCommand(`playsound ${sound} @a ${location.x} ${location.y} ${location.z} ${volume} ${pitch} ${minVolume}`);
		} else {
			// location is present here as well
			scope.playSound(sound, location, { pitch, volume });
		}
	} else if (scope instanceof Player) {
		scope.playSound(sound, { pitch, volume });
	} else {
		return { status: false, error: 'missing arguments' };
	}

	return { status: true };
};
