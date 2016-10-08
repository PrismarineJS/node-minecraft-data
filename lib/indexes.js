var indexer=require("./indexer.js");

module.exports= function(mcData){
  return {
    biomesById:indexer.buildIndexFromArray(mcData.biomes,"id"),

    blocksById:indexer.buildIndexFromArray(mcData.blocks,"id"),
    blocksByName:indexer.buildIndexFromArray(mcData.blocks,"name"),


    enchantmentsById:indexer.buildIndexFromArray(mcData.enchantments,"id"),
    enchantmentsByName:indexer.buildIndexFromArray(mcData.enchantments,"name"),

    entitiesByName:indexer.buildIndexFromArray(mcData.entities,"name"),
    mobsById:mcData.entities== undefined ? undefined : indexer.buildIndexFromArray(mcData.entities.filter(function(e){return e.type=='mob'}),"id"),
    objectsById:mcData.entities== undefined ? undefined : indexer.buildIndexFromArray(mcData.entities.filter(function(e){return e.type=='object'}),"id"),

    instrumentsById:indexer.buildIndexFromArray(mcData.instruments,"id"),

    itemsById:indexer.buildIndexFromArray(mcData.items,"id"),
    itemsByName:indexer.buildIndexFromArray(mcData.items,"name"),

    windowsById:indexer.buildIndexFromArray(mcData.windows,"id"),
    windowsByName:indexer.buildIndexFromArray(mcData.windows,"name"),

    effectsById:indexer.buildIndexFromArray(mcData.effects,"id"),
    effectsByName:indexer.buildIndexFromArray(mcData.effects,"name")
  };
};