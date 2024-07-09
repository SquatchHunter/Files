import { world, EntitySpawnAfterEvent } from '@minecraft/server';

// IIFE - https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
	// Subscribe to entitySpawn event
	world.afterEvents.entitySpawn.subscribe((eventEntity: EntitySpawnAfterEvent) => {
		// filter for just wandering trader spawns
		if(eventEntity.entity.typeId === "minecraft:wandering_trader"){
			// send message to all players within 60 blocks of the trader
			eventEntity.entity.runCommand(`tellraw @e[r=60,type=player] {"rawtext":[{"text":"§6A Wandering Trader has appeared nearby!"}]}`)
		}
	});
})();