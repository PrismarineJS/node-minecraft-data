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
  entitiesByName:indexes.entitiesByName,
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

