var mcDataToNode=require("./lib/loader");
var indexer=require("./lib/indexer.js");
var protocolVersions=require('./minecraft-data/data/common/protocolVersions');
var versionsByMinecraftVersion=indexer.buildIndexFromArray(protocolVersions,"minecraftVersion");
var preNettyVersionsByProtocolVersion=indexer.buildIndexFromArrayNonUnique(protocolVersions.filter(function(e){return !e.usesNetty}),"version");
var postNettyVersionsByProtocolVersion=indexer.buildIndexFromArrayNonUnique(protocolVersions.filter(function(e){return e.usesNetty}),"version");

var cache={}; // prevent reindexing when requiring multiple time the same version

module.exports = function(mcVersion,preNetty)
{
  preNetty=preNetty || false;
  var majorVersion=toMajor(mcVersion,preNetty);
  if(majorVersion==null)
    return null;
  if(cache[majorVersion])
    return cache[majorVersion];
  var mcData=data[majorVersion];
  if(mcData==null)
    return null;
  var nmcData=mcDataToNode(mcData);
  cache[majorVersion]=nmcData;
  return nmcData;
};

function toMajor(mcVersion,preNetty)
{
  if(data[mcVersion])
    return mcVersion;
  if(versionsByMinecraftVersion[mcVersion])
    return versionsByMinecraftVersion[mcVersion].majorVersion;
  if(preNetty && preNettyVersionsByProtocolVersion[mcVersion])
    return preNettyVersionsByProtocolVersion[mcVersion][0].majorVersion;
  if(!preNetty && postNettyVersionsByProtocolVersion[mcVersion])
    return postNettyVersionsByProtocolVersion[mcVersion][0].majorVersion;
}

module.exports.versions=protocolVersions;
module.exports.versionsByMinecraftVersion=versionsByMinecraftVersion;
module.exports.preNettyVersionsByProtocolVersion=preNettyVersionsByProtocolVersion;
module.exports.postNettyVersionsByProtocolVersion=postNettyVersionsByProtocolVersion;

var data={
  "1.8":{
    blocks:require('./minecraft-data/data/1.8/blocks'),
    biomes: require('./minecraft-data/data/1.8/biomes'),
    effects: require('./minecraft-data/data/1.8/effects'),
    items: require('./minecraft-data/data/1.8/items'),
    recipes: require('./minecraft-data/data/1.8/recipes'),
    instruments: require('./minecraft-data/data/1.8/instruments'),
    materials: require('./minecraft-data/data/1.8/materials'),
    entities: require('./minecraft-data/data/1.8/entities'),
    protocol: require('./minecraft-data/data/1.8/protocol'),
    windows: require('./minecraft-data/data/1.8/windows'),
    version: require('./minecraft-data/data/1.8/version')
  },
  "15w40b":{
    blocks:require('./minecraft-data/data/1.9/blocks'),
    biomes: require('./minecraft-data/data/1.9/biomes'),
    effects: require('./minecraft-data/data/1.9/effects'),
    items: require('./minecraft-data/data/1.9/items'),
    recipes: require('./minecraft-data/data/1.9/recipes'),
    instruments: require('./minecraft-data/data/1.9/instruments'),
    materials: require('./minecraft-data/data/1.9/materials'),
    entities: require('./minecraft-data/data/1.9/entities'),
    protocol: require('./minecraft-data/data/15w40b/protocol'),
    windows: require('./minecraft-data/data/1.9/windows'),
    version: require('./minecraft-data/data/15w40b/version')
  },
  "1.9":{
    blocks:require('./minecraft-data/data/1.9/blocks'),
    biomes: require('./minecraft-data/data/1.9/biomes'),
    effects: require('./minecraft-data/data/1.9/effects'),
    items: require('./minecraft-data/data/1.9/items'),
    recipes: require('./minecraft-data/data/1.9/recipes'),
    instruments: require('./minecraft-data/data/1.9/instruments'),
    materials: require('./minecraft-data/data/1.9/materials'),
    entities: require('./minecraft-data/data/1.9/entities'),
    protocol: require('./minecraft-data/data/1.9/protocol'),
    windows: require('./minecraft-data/data/1.9/windows'),
    version: require('./minecraft-data/data/1.9/version')
  }
};