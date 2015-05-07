var mcData=require("minecraft-data");
var indexes=require("./indexes.js");

module.exports = {
  blocks: indexes.blocksById,
  blocksByName: indexes.blocksByName,
  blocksArray:mcData.blocks,

  biomes: indexes.biomesById,
  biomesArray: mcData.biomes,

  items: indexes.itemsById,
  itemsByName: indexes.itemsByName,
  itemsArray: mcData.items,

  recipes: mcData.recipes,

  instruments: indexes.instrumentsById,
  instrumentsArray: mcData.instruments,

  materials: mcData.materials,

  entities: indexes.entitiesById,
  entitiesByName:indexes.entitiesByName,
  entitiesArray: mcData.entities,



  findItemOrBlockById:function(id)
  {
    var item=indexes.itemsById[id];
    if(item !== undefined) return item;
    return indexes.blocksById[id];
  },
  findItemOrBlockByName:function(name)
  {
    var item=indexes.itemsByName[name];
    if(item !== undefined) return item;
    return indexes.blocksByName[name];
  }
};

