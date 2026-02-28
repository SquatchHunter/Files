import {
	GameRule,
	GameRuleChangeAfterEvent,
	world
} from '@minecraft/server';

world.afterEvents.gameRuleChange.subscribe(({ rule, value }: GameRuleChangeAfterEvent): void => {
	if (rule === GameRule.DoInsomnia && value === true) {
		world.sendMessage({ translate: 'bt.bm.logic.do_insomnia' });

		world.gameRules.doInsomnia = false;
	}
});
