import { Player } from '@minecraft/server';

/**
 * Removes the amount of XP from the player provided.
 *
 * @param {Player} player The player to remove the XP from.
 * @param {number} amount The amount of XP to remove from the player.
 *
 * @returns {boolean} The result of the operation.
 */
export const removeExperiencefromPlayer = (player: Player, amount: number): boolean => {
	if (player.getTotalXp() < amount) return false;

	if (player.xpEarnedAtCurrentLevel >= amount) {
		void player.addExperience(-amount);
	} else {
		let remainder: number = amount - player.xpEarnedAtCurrentLevel;
		void player.addExperience(-player.xpEarnedAtCurrentLevel);

		do {
			void player.addLevels(-1);
			remainder -= player.totalXpNeededForNextLevel;
		} while (remainder >= 0);
		void player.addExperience(Math.abs(remainder));
	}

	return true;
};
