import { Player, ItemStack, EntityComponentTypes, EquipmentSlot } from '@minecraft/server';
import { xbItemTypes, xbSounds } from '../Models';
import { giveItemtoEntity, playSounds, removeExperiencefromPlayer, removeItemFromEntity, Status } from '../Util';

export const convertGlassBottle = (player: Player, item: ItemStack): void => {
	// TODO: implement stack fill
	// - done? there is a bug that lets you fill quickly
	// possibly use item in offhand? and inflict damage on player?
	// TODO: replace with getSettings call
	/* TEMP */ const amount: number = 23;

	// if anyone wants to know what the 4 letters before "Res" are, they are the function as an acronym
	const refpRes: Status = removeExperiencefromPlayer(player, amount);
	if (refpRes.error) {
		void player.onScreenDisplay.setActionBar({ translate: 'bt.xb.tooltip.notEnough' });

		return;
	}
	const playerEquip = player.getComponent(EntityComponentTypes.Equippable)!;
	const rifeRes: Status = removeItemFromEntity(player, item, 1, playerEquip.getEquipmentSlot(EquipmentSlot.Mainhand));
	if (rifeRes.error) {
		console.warn(`BT:XB | failed to remove ${item.typeId} from ${player.name}\nError: ${rifeRes.error}`);

		return;
	}
	const giteRes = giveItemtoEntity(player, new ItemStack(xbItemTypes.xpBottle), 1, playerEquip.getEquipmentSlot(EquipmentSlot.Mainhand));
	if (giteRes.error) {
		console.warn(`BT:XB | failed to give xp_bottle to ${player.name}\nError: ${giteRes.error}`);

		return;
	}
	void player.onScreenDisplay.setActionBar({ translate: 'bt.xb.tooltip.decrease', with: [amount.toString()] });
	void playSounds(player, xbSounds.fillBottle);
};

export const convertXpBottle = (player: Player): void => {
	// TODO: implement stack empty
	// TODO: replace with getSettings call
	/* TEMP */ const amount: number = 23;

	void player.addExperience(amount);
	void player.onScreenDisplay.setActionBar({ translate: 'bt.xb.tooltip.increase', with: [amount.toString()] });
	void playSounds(player, xbSounds.drinkBottle, { pitch: [1, 1.1, 1.2, 1.3] });
};
