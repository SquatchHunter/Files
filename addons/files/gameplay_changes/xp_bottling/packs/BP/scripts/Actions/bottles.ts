import { Player, ItemStack, EntityComponentTypes, EquipmentSlot } from '@minecraft/server';
import { giveItemtoEntity, playSounds, removeExperiencefromPlayer, removeItemFromEntity } from '../Util';
import { xbItemTypes, xbSounds } from '../Models';

export const convertGlassBottle = (player: Player, item: ItemStack): void => {
	// TODO: reimplement stack fill
	// possibly use item in offhand? and inflict damage on player?
	// TODO: reimplement settings

	/* TEMP */ const amount: number = 23;

	const playerEquip = player.getComponent(EntityComponentTypes.Equippable)!;
	void removeItemFromEntity(player, item, 1, playerEquip.getEquipmentSlot(EquipmentSlot.Mainhand));
	void removeExperiencefromPlayer(player, amount);
	void giveItemtoEntity(player, new ItemStack(xbItemTypes.xpBottle), 1, playerEquip.getEquipmentSlot(EquipmentSlot.Mainhand));
	void player.onScreenDisplay.setActionBar({ translate: 'bt.xb.tooltip.decrease', with: [amount.toString()] });
	void playSounds<xbSounds>(player, xbSounds.fillBottle);
};

export const convertXpBottle = (player: Player): void => {
	/* TEMP */ const amount: number = 23;

	void player.addExperience(amount);
	void player.onScreenDisplay.setActionBar({ translate: 'bt.xb.tooltip.increase', with: [amount.toString()] });
	void playSounds<xbSounds>(player, xbSounds.drinkBottle, { pitch: [1, 1.1, 1.2, 1.3] });
};
