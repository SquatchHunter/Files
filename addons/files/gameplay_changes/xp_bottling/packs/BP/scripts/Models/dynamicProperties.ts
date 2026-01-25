/**
 * Definitions to use multiple Dynamic Properties as a Typed Object
 * Enum keys and object properties should match for proper conconfigVersion.
 */
export enum xbGlobalDynamicProperties {
	configVersion = 'bt:xb.settings.configVersion',
	instantUse = 'bt:xb.settings.instantUse',
	timeToUse = 'bt:xb.settings.timeToUse',
	enableStackConsume = 'bt:xb.settings.enableStackConsume',
	stackMultiplier = 'bt:xb.settings.stackMultiplier',
	enableStackCrafting = 'bt:xb.settings.enableStackCrafting'
}

export interface XBGlobalSettings {
	// Indicates the current loaded configVersion of the addon.
	configVersion: number;
	// Controls whether XP bottles are consumed instantly.
	instantUse: boolean;
	// Controls whether Sneak + Use consumes a full stack of XP bottles.
	enableStackConsume: boolean;
	// When consuming a stack of bottles, the amount to multiply it by.
	stackMultiplier: number;
	// Controls whether Sneak + Use fills an entire stack of empty Glass Bottles.
	enableStackCrafting: boolean;
}

export enum xbPlayerDynamicProperties {
	configVersion = 'bt:xb.player.configVersion',
	receivedBook = 'bt:xb.player.recievedBook',
	enableToolTips = 'bt:xb.player.enableToolTips',
	consumeFullStack = 'bt:xb.player.consumeFullStack',
	fillFullStack = 'bt:xb.player.fillFullStack'
}

export interface XBPlayerSettings {
	// Indicates the current loaded configVersion of the addon.
	configVersion: number;
	// The amount of XP to store per bottle.
	amountOfXp: number;
	// Controls whether actionbar tool tips are displayed.
	enableToolTips: boolean;
	// Controls whether Sneak + Use a stack of XP Bottles drinks all of them.
	consumeFullStack: boolean;
	// Controls whether Sneak + Use a stack of empty Glass Bottles fills all that it can.
	fillFullStack: boolean;
}

export const xbGlobalDefaults: XBGlobalSettings = {
	configVersion: 2,
	instantUse: false,
	enableStackConsume: false,
	stackMultiplier: 4,
	enableStackCrafting: false,
};

export const xbPlayerDefaults: XBPlayerSettings = {
	configVersion: 2,
	amountOfXp: 23,
	enableToolTips: true,
	consumeFullStack: true,
	fillFullStack: true,
};
