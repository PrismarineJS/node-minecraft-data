var mcData=require("minecraft-data");
var indexes=require("./indexes.js");

module.exports = {
  blocks: indexes.blocksById,
  blocksByName: indexes.blocksByName,
  biomes: indexes.biomesById,
  items: indexes.itemsById,
  itemsByName: indexes.itemsByName,
  recipes: mcData.recipes,
  instruments: indexes.instrumentsById,
  materials: mcData.materials,
  entities: indexes.entitiesById,
  entitiesByName:indexes.entitiesByName
};

