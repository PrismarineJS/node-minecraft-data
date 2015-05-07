var mcData=require("minecraft-data");
var indexer=require("./indexer.js");

module.exports= {
  biomesById:indexer.buildIndexFromObject(mcData.biomes,"id"),

  blocksById:indexer.buildIndexFromObject(mcData.blocks,"id"),
  blocksByName:indexer.buildIndexFromObject(mcData.blocks,"name"),

  entitiesById:indexer.buildIndexFromObject(mcData.entities,"id"),
  entitiesByName:indexer.buildIndexFromObject(mcData.entities,"name"),

  instrumentsById:indexer.buildIndexFromObject(mcData.instruments,"id"),

  itemsById:indexer.buildIndexFromObject(mcData.items,"id"),
  itemsByName:indexer.buildIndexFromObject(mcData.items,"name")
};