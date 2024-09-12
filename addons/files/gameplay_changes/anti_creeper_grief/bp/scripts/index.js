import { system, world } from '@minecraft/server';

// IIFE
// https://developer.mozilla.org/en-US/docs/glossary/IIFE
(async () => {
	world.beforeEvents.explosion.subscribe(eventData => {
		// guard clause, exit unless creeper, prevent recursion
		if(eventData?.source?.typeId !== "minecraft:creeper") return;
		eventData.cancel = true;

		// "copy" any data we need
		const location = {...eventData.source.location};
		const dimension = {...eventData.source.dimension};

		// system.run for privilage reasons.
		system.run(() => {
			const creeper = world.getDimension(dimension.id).spawnEntity('minecraft:creeper',{x:location.x,y:220,z:location.z});
			// method wants explicit "radius" input, documentation & creeper.json use "power" to describe the explosion - are they the same?
			eventData.dimension.createExplosion(location,5,{breaksBlocks:false});
			creeper.remove();
		});
	});
	/*
	1. sub to beforeExplosion
	2. check if creeper
		if yes;
			a. cancel explosion
			b. create new explosion, without block breaking
		if no;
			do nothing
	*/
})();