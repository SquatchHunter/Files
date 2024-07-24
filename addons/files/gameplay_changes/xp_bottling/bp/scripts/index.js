import { system, world, ItemStack } from '@minecraft/server';

// IIFE - https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(async () => {
	world.beforeEvents.itemUseOn.subscribe(async eventData => {
		if(eventData.itemStack.typeId === "minecraft:glass_bottle" && eventData.source.getTotalXp() >= 12 && eventData.block.matches("minecraft:enchanting_table")){
			eventData.cancel = true;
			// 1.20.0 added privilage system
			// https://wiki.bedrock.dev/scripting/script-server.html#beforeevents-privilege-system
			system.run(() => {
				var inv = eventData.source.getComponent("inventory").container;
				var stack = inv.getItem(eventData.source.selectedSlotIndex);
				inv.setItem(eventData.source.selectedSlotIndex, null);
				if(stack.amount !== 1){
					inv.setItem(eventData.source.selectedSlotIndex, new ItemStack(stack.typeId,stack.amount-1));
				};
				if(eventData.source.xpEarnedAtCurrentLevel >= 12){
					eventData.source.addExperience(-12);
				} else {
					const remainder = 12 - eventData.source.xpEarnedAtCurrentLevel;
					eventData.source.addExperience(0 - eventData.source.xpEarnedAtCurrentLevel);
					eventData.source.addLevels(-1);
					const freebee = eventData.source.totalXpNeededForNextLevel - remainder;
					eventData.source.addExperience(freebee);
				};
				eventData.source.sendMessage('§o§8-12 Experience...§r');
				inv.addItem(new ItemStack("bt:bottle_of_xp"));
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
			});
		};
	});
	/* 
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

	world.afterEvents.itemCompleteUse.subscribe(eventData => {
		if(eventData.itemStack.typeId === "bt:bottle_of_xp"){
			eventData.source.sendMessage('§o§8+12 Experience...§r');
			eventData.source.addExperience(12);
		};
	});
})();