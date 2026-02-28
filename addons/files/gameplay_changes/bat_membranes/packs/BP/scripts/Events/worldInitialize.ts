import { world } from '@minecraft/server';
// import { initializeSettings } from '../Actions';

world.afterEvents.worldLoad.subscribe((): void => {
	// void initializeSettings();

	// set the gamerule to false on load, just in case it was enabled before the addon was added.
	world.gameRules.doInsomnia = false;
});
