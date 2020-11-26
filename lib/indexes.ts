import {buildIndexFromArray, buildIndexFromArrayWithRanges} from './indexer'

export function (mcData: type_mcData) {
  return {
    biomesById: buildIndexFromArray(mcData.biomes, 'id'),

    blocksById: buildIndexFromArray(mcData.blocks, 'id'),
    blocksByName: buildIndexFromArray(mcData.blocks, 'name'),
    blocksByStateId: buildIndexFromArrayWithRanges(
      mcData.blocks,
      'minStateId',
      'maxStateId'
    ),

    enchantmentsById: buildIndexFromArray(mcData.enchantments, 'id'),
    enchantmentsByName: buildIndexFromArray(
      mcData.enchantments,
      'name'
    ),

    entitiesByName: buildIndexFromArray(mcData.entities, 'name'),
    mobsById:
      mcData.entities === undefined
        ? undefined
        : buildIndexFromArray(
          mcData.entities.filter((e: { type: string }) => e.type === 'mob'),
          'id'
        ),
    objectsById:
      mcData.entities === undefined
        ? undefined
        : buildIndexFromArray(
          mcData.entities.filter(
            (e: { type: string }) => e.type === 'object'
          ),
          'id'
        ),

    instrumentsById: buildIndexFromArray(mcData.instruments, 'id'),

    itemsById: buildIndexFromArray(mcData.items, 'id'),
    itemsByName: buildIndexFromArray(mcData.items, 'name'),

    foodsById: buildIndexFromArray(mcData.foods, 'id'),
    foodsByName: buildIndexFromArray(mcData.foods, 'name'),
    foodsByFoodPoints: buildIndexFromArray(mcData.foods, 'foodPoints'),
    foodsBySaturation: buildIndexFromArray(mcData.foods, 'saturation'),

    windowsById: buildIndexFromArray(mcData.windows, 'id'),
    windowsByName: buildIndexFromArray(mcData.windows, 'name'),

    effectsById: buildIndexFromArray(mcData.effects, 'id'),
    effectsByName: buildIndexFromArray(mcData.effects, 'name'),

    particlesById: buildIndexFromArray(mcData.particles, 'id'),
    particlesByName: buildIndexFromArray(mcData.particles, 'name'),

    blockLootByName: buildIndexFromArray(mcData.blockLoot, 'block'),
    entityLootByName: buildIndexFromArray(mcData.entityLoot, 'entity')
  }
}
