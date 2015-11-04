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
  var dir="./minecraft-data/data/"+mcVersion;
  return {
    blocks: require(dir+'/blocks'),
    biomes: require(dir+'/biomes'),
    items: require(dir+'/items'),
    recipes: require(dir+'/recipes'),
    instruments: require(dir+'/instruments'),
    materials: require(dir+'/materials'),
    entities: require(dir+'/entities'),
    protocol: require(dir+'/protocol'),
    windows: require(dir+'/windows'),
    version: require(dir+'/version')
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

    windows: indexes.windowsById,
    windowsByName: indexes.windowsByName,
    windowsArray: mcData.windows,

    protocol: mcData.protocol,

    version: mcData.version,

    pitchesArray: mcData.pitches,
    pitchesByNote: indexes.pitchesByNote,
    pitchesByNum: indexes.pitchesByNum,

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
