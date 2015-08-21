var cache={}; // prevent reindexing when requiring multiple time the same version

module.exports = function(mcVersion)
{
  var majorVersion=toMajor(mcVersion);
  if(majorVersion==null)
    return null;
  if(cache[majorVersion])
    return cache[majorVersion];
  var mcData=mcVersionToMcData(majorVersion);
  if(mcData==null)
    return null;
  var nmcData=mcDataToNode(mcData);
  cache[majorVersion]=nmcData;
  return nmcData;
};

function toMajor(mcVersion)
{
  var parts=mcVersion.split(".");
  if(parts.size<=1)
    return null;
  mcVersion=parts.slice(0,2).join(".");
  return mcVersion;
}

function mcVersionToMcData(mcVersion)
{
  var dir="./minecraft-data/"+mcVersion;
  return {
    blocks: require(dir+'/enums/blocks'),
    biomes: require(dir+'/enums/biomes'),
    items: require(dir+'/enums/items'),
    recipes: require(dir+'/enums/recipes'),
    instruments: require(dir+'/enums/instruments'),
    materials: require(dir+'/enums/materials'),
    entities: require(dir+'/enums/entities'),
    protocol: require(dir+'/enums/protocol')
  };
}

function mcDataToNode(mcData) {
  var indexes=require("./indexes.js")(mcData);
  return {
    blocks: indexes.blocksById,
    blocksByName: indexes.blocksByName,
    blocksArray: mcData.blocks,

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
    entitiesByName: indexes.entitiesByName,
    entitiesArray: mcData.entities,

    protocol: mcData.protocol,

    findItemOrBlockById: function (id) {
      var item = indexes.itemsById[id];
      if (item !== undefined) return item;
      return indexes.blocksById[id];
    },
    findItemOrBlockByName: function (name) {
      var item = indexes.itemsByName[name];
      if (item !== undefined) return item;
      return indexes.blocksByName[name];
    }
  };
}
