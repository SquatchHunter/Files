import { system, world } from '@minecraft/server';

// IIFE
// https://developer.mozilla.org/en-US/docs/glossary/IIFE
(async () => {
  world.beforeEvents.explosion.subscribe(eventData => {
    // guard clause, exit unless creeper, prevent recursion
    if(eventData?.source?.typeId !== "minecraft:creeper") return;
    eventData.setImpactedBlocks([]); // the magic sauce
  })
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