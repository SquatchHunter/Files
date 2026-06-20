// import { CustomCommandOrigin, CustomCommandResult, CustomCommandStatus, Player } from '@minecraft/server';
// import { AntiGriefObservables } from '../Models';

// TODO: REFACTOR!!!!!
// export const dumpSettings = ({ sourceEntity }: CustomCommandOrigin): CustomCommandResult => {
// 	const debugging = AntiGriefObservables.debugging.getData();
// 	if (debugging) {
// 		if (sourceEntity?.isValid && sourceEntity instanceof Player) {
// 			sourceEntity.sendMessage({ translate: 'bt.ag.debug.dump', with: [`\n`, `${JSON.stringify(AntiGriefObservables, null, 2)}`] });
// 		}
// 		console.log(`Anti Grief Settings:\n${JSON.stringify(AntiGriefObservables, null, 2)}`);
// 	} else {
// 		if (sourceEntity?.isValid && sourceEntity instanceof Player) {
// 			sourceEntity.sendMessage({ translate: 'bt.ag.debug.dumpDisabled' });
// 		}
// 		console.warn(`Debugging is disabled.`);
// 	}

// 	return { status: CustomCommandStatus.Success };
// };
