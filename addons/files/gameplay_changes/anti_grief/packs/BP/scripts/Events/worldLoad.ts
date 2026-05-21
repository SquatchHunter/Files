import { world } from '@minecraft/server';
import { initializeSettings, iterateExistingEndermen } from '../Actions';

world.afterEvents.worldLoad.subscribe((): void => {
	void initializeSettings();
	void iterateExistingEndermen();
});
