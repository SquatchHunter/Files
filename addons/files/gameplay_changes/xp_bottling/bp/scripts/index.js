import { system, world, ItemStack } from '@minecraft/server';

// IIFE
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
	world.beforeEvents.itemUseOn.subscribe(async eventData => {
		const player = eventData.source;

		if(eventData.itemStack.typeId === "minecraft:glass_bottle" && player.getTotalXp() >= 12 && eventData.block.matches("minecraft:enchanting_table")){
			eventData.cancel = true;
			// 1.20.0 added privilage system
			// https://wiki.bedrock.dev/scripting/script-server.html#beforeevents-privilege-system
			system.run(() => {
				var inv = player.getComponent("inventory").container;
				var stack = inv.getItem(player.selectedSlotIndex);
				inv.setItem(player.selectedSlotIndex, null);
				if(stack.amount !== 1){
					inv.setItem(player.selectedSlotIndex, new ItemStack(stack.typeId,stack.amount-1));
				};
				if(player.xpEarnedAtCurrentLevel >= 12){
					player.addExperience(-12);
				} else {
					const remainder = 12 - player.xpEarnedAtCurrentLevel;
					player.addExperience(0 - player.xpEarnedAtCurrentLevel);
					player.addLevels(-1);
					const freebee = player.totalXpNeededForNextLevel - remainder;
					player.addExperience(freebee);
				};
				player.dimension.runCommand(`title ${player.name} actionbar §r§o§6-12 XP§r`);
				inv.addItem(new ItemStack("bt:bottle_of_xp"));
				player.playSound('bottle.dragonbreath',{volume:0.5});
			});
		};
	});
	world.afterEvents.itemCompleteUse.subscribe(eventData => {
		if(eventData.itemStack.typeId === "bt:bottle_of_xp"){
			const player = eventData.source;
			player.dimension.runCommand(`title ${player.name} actionbar §r§o§6+12 XP§r`);
			player.addExperience(12);
		};
	});
})();
/* XP bug fix
1. get current XP to level
2. if greater then 12
	if yes
		take 12 xp
	if no
		take as much as possible, then store remainder
		remove level from player
		fetch total till level up
		remove remainder
		award difference
*/
/* Method
1. check if bottle being used on enchanting table
2. check if player has enough xp to bottle
	if yes
		a. cancel item usage if enough XP (prevent enchanting table UI from opening)
		b. remove glass bottle
		c. give bottle of experience
	if no
		a. do nothing
3. finish
*/