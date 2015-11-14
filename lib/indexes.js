var indexer=require("./indexer.js");

module.exports= function(mcData){
  return {
    biomesById:indexer.buildIndexFromArray(mcData.biomes,"id"),

    blocksById:indexer.buildIndexFromArray(mcData.blocks,"id"),
    blocksByName:indexer.buildIndexFromArray(mcData.blocks,"name"),

    entitiesById:indexer.buildIndexFromArray(mcData.entities,"id"),
    entitiesByName:indexer.buildIndexFromArray(mcData.entities,"name"),

    instrumentsById:indexer.buildIndexFromArray(mcData.instruments,"id"),

    itemsById:indexer.buildIndexFromArray(mcData.items,"id"),
    itemsByName:indexer.buildIndexFromArray(mcData.items,"name"),

    windowsById:indexer.buildIndexFromArray(mcData.windows,"id"),
    windowsByName:indexer.buildIndexFromArray(mcData.windows,"name"),

    effectsById:indexer.buildIndexFromArray(mcData.effects,"id"),
    effectsByName:indexer.buildIndexFromArray(mcData.effects,"name")
  };
};