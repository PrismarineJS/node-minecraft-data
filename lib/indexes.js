const indexer = require('./indexer.js')

module.exports = function (mcData) {
  return {
    biomesById: indexer.buildIndexFromArray(mcData.biomes, 'id'),
    biomesByName: indexer.buildIndexFromArray(mcData.biomes, 'name'),

    blocksById: indexer.buildIndexFromArray(mcData.blocks, 'id'),
    blocksByName: indexer.buildIndexFromArray(mcData.blocks, 'name'),
    blocksByStateId: indexer.buildIndexFromArrayWithRanges(mcData.blocks, 'minStateId', 'maxStateId'),

    enchantmentsById: indexer.buildIndexFromArray(mcData.enchantments, 'id'),
    enchantmentsByName: indexer.buildIndexFromArray(mcData.enchantments, 'name'),

    entitiesByName: indexer.buildIndexFromArray(mcData.entities, 'name'),
    mobsById: mcData.entities === undefined
      ? undefined
      : indexer.buildIndexFromArray(mcData.entities.filter(e => e.type === 'mob'), 'id'),
    objectsById: mcData.entities === undefined
      ? undefined
      : indexer.buildIndexFromArray(mcData.entities.filter(e => e.type === 'object'), 'id'),

    instrumentsById: indexer.buildIndexFromArray(mcData.instruments, 'id'),

    itemsById: indexer.buildIndexFromArray(mcData.items, 'id'),
    itemsByName: indexer.buildIndexFromArray(mcData.items, 'name'),

    foodsById: indexer.buildIndexFromArray(mcData.foods, 'id'),
    foodsByName: indexer.buildIndexFromArray(mcData.foods, 'name'),
    foodsByFoodPoints: indexer.buildIndexFromArray(mcData.foods, 'foodPoints'),
    foodsBySaturation: indexer.buildIndexFromArray(mcData.foods, 'saturation'),

    windowsById: indexer.buildIndexFromArray(mcData.windows, 'id'),
    windowsByName: indexer.buildIndexFromArray(mcData.windows, 'name'),

    effectsById: indexer.buildIndexFromArray(mcData.effects, 'id'),
    effectsByName: indexer.buildIndexFromArray(mcData.effects, 'name'),

    particlesById: indexer.buildIndexFromArray(mcData.particles, 'id'),
    particlesByName: indexer.buildIndexFromArray(mcData.particles, 'name'),

    blockLootByName: indexer.buildIndexFromArray(mcData.blockLoot, 'block'),
    entityLootByName: indexer.buildIndexFromArray(mcData.entityLoot, 'entity'),

    mapIconsById: indexer.buildIndexFromArray(mcData.mapIcons, 'id'),
    mapIconsByName: indexer.buildIndexFromArray(mcData.mapIcons, 'name'),

    attributesByName: indexer.buildIndexFromArray(mcData.attributes, 'name'),
    attributesByResource: indexer.buildIndexFromArray(mcData.attributes, 'resource')

  }
}
