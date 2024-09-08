import {
  Container,
  Entity,
  EntityComponentTypes,
  EntityEquippableComponent,
  EntityInventoryComponent,
  EquipmentSlot,
  ItemStack,
  Player,
  world
} from '@minecraft/server';
import { getProperties, setProperties } from '../Util';
import { GraveDynamicProperties, GraveEntityEvents } from '../Models';
import { Grave, GravesList, GravesListDynamicProperties, GravesSettings } from '../Models/DynamicProperties';
import { getSettings } from './settings';

export const openGrave = (player: Player, grave: Entity): void => {
  const gravesSettings: GravesSettings = getSettings();
  const graveProperties: Grave = getProperties(grave, GraveDynamicProperties);

  if (player.name === graveProperties.owner || gravesSettings.graveRobbing) {
    transferItems(player, grave);

    if (gravesSettings.xpCollection) {
      player.addExperience(graveProperties.playerExperience);
    }

    removeGraveFromList(grave);

    grave.triggerEvent(GraveEntityEvents.Despawn);
  }
};

export const forceOpenGrave = (grave: Entity): void => {
  getAllItems(grave);
  removeGraveFromList(grave);

  grave.triggerEvent(GraveEntityEvents.Despawn);
};

/**
 * If there is an item in the inventory slot replace with grave item of the same slot (if has) and drop the player inventory item to floor
 */
const transferItems = (player: Player, grave: Entity): void => {
  const playerContainer: Container = (player.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent)
    ?.container as Container;
  const graveContainer: Container = (grave.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent)
    ?.container as Container;
  const playerArmor: EntityEquippableComponent = player.getComponent(EntityComponentTypes.Equippable) as EntityEquippableComponent;

  const playerContainerSize = playerContainer?.size;

  if (playerContainer && graveContainer && playerContainerSize !== undefined) {
    const itemsToSpawn: ItemStack[] = [];

    // Transfer items from grave to player inventory
    for (let i = 0; i < playerContainerSize; i++) {
      if (!playerContainer.getSlot(i).hasItem()) {
        graveContainer.moveItem(i, i, playerContainer);
      } else {
        const slotItem = graveContainer.getItem(i);

        if (slotItem) {
          // Already checked if hasItem
          itemsToSpawn.push(playerContainer.getSlot(i).getItem() as ItemStack);
          graveContainer.moveItem(i, i, playerContainer);
        }
      }
    }

    // Transfer items from grave to player equipment slots
    // Note: equipment items are stored in
    // [playerContainerSize + 1, playerContainerSize + Object.entries(EquipmentSlot).length] slots of graveContainer
    let j = playerContainerSize;
    for (const value of Object.values(EquipmentSlot)) {
      j++;

      const slotItem = graveContainer.getItem(j);

      if (!playerArmor.getEquipmentSlot(value).hasItem()) {
        playerArmor.getEquipmentSlot(value).setItem(slotItem);
      } else {
        if (slotItem) {
          // Already checked if hasItem
          itemsToSpawn.push(playerArmor.getEquipmentSlot(value).getItem() as ItemStack);
          playerArmor.getEquipmentSlot(value).setItem(slotItem);
        }
      }
    }

    spawnItemsInWorld(grave, itemsToSpawn);
  }
};

const getAllItems = (grave: Entity): void => {
  const graveContainer: Container = (grave.getComponent(EntityComponentTypes.Inventory) as EntityInventoryComponent)
    ?.container as Container;

  const containerSize = graveContainer?.size;

  const itemsToSpawn: ItemStack[] = [];

  for (let i = 0; i < containerSize; i++) {
    const item = graveContainer.getSlot(i).getItem();

    if (item) {
      itemsToSpawn.push(item);
    }
  }

  spawnItemsInWorld(grave, itemsToSpawn);
};

const spawnItemsInWorld = (grave: Entity, itemsToSpawn: ItemStack[]): void => {
  itemsToSpawn.forEach((item: ItemStack): void => {
    grave.dimension.spawnItem(item, grave.location);
  });
};

const removeGraveFromList = (grave: Entity): void => {
  const gravesList: Grave[] = JSON.parse(getProperties<GravesList>(world, GravesListDynamicProperties).list);

  const filteredGraves: Grave[] = gravesList.filter((g: Grave): boolean => g.id !== grave.id);

  setProperties(world, GravesListDynamicProperties, { list: JSON.stringify(filteredGraves) });
};
