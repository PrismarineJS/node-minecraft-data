var mcDataToNode=require("./lib/loader");
var indexer=require("./lib/indexer.js");
var protocolVersions={
  pc:require('./minecraft-data/data/pc/common/protocolVersions'),
  pe:require('./minecraft-data/data/pe/common/protocolVersions')
};
var versionsByMinecraftVersion={};
var preNettyVersionsByProtocolVersion={};
var postNettyVersionsByProtocolVersion={};

var types=["pc","pe"];
types.forEach(function(type){
  versionsByMinecraftVersion[type]=indexer.buildIndexFromArray(protocolVersions[type],"minecraftVersion");
  preNettyVersionsByProtocolVersion[type]=indexer.buildIndexFromArrayNonUnique(protocolVersions[type].filter(function(e){return !e.usesNetty}),"version");
  postNettyVersionsByProtocolVersion[type]=indexer.buildIndexFromArrayNonUnique(protocolVersions[type].filter(function(e){return e.usesNetty}),"version");
});


var cache={}; // prevent reindexing when requiring multiple time the same version

module.exports = function(mcVersion,preNetty)
{
  preNetty=preNetty || false;
  var majorVersion=toMajor(mcVersion,preNetty);
  if(majorVersion==null)
    return null;
  if(cache[majorVersion.type+"_"+majorVersion.majorVersion])
    return cache[majorVersion.type+"_"+majorVersion.majorVersion];
  var mcData=data[majorVersion.type][majorVersion.majorVersion];
  if(mcData==null)
    return null;
  var nmcData=mcDataToNode(mcData);
  nmcData.type=majorVersion.type;
  cache[majorVersion.type+"_"+majorVersion.majorVersion]=nmcData;
  return nmcData;
};

function toMajor(mcVersion,preNetty,typeArg)
{
  var parts=(mcVersion+"").split("_");
  var type=typeArg ? typeArg : (parts.length==2 ? parts[0] : "pc");
  var version=parts.length==2 ? parts[1] : mcVersion;
  var majorVersion;
  if(data[type][version])
    majorVersion=version;
  else if(versionsByMinecraftVersion[type][version])
    majorVersion=versionsByMinecraftVersion[type][version].majorVersion;
  else if(preNetty && preNettyVersionsByProtocolVersion[type][version])
    return toMajor(preNettyVersionsByProtocolVersion[type][version][0].minecraftVersion,preNetty,type);
  else if(!preNetty && postNettyVersionsByProtocolVersion[type][version])
    return toMajor(postNettyVersionsByProtocolVersion[type][version][0].minecraftVersion,preNetty,type);
  return {
    majorVersion:majorVersion,
    type:type
  }
}

module.exports.supportedVersions={
  pc:require('./minecraft-data/data/pc/common/versions'),
  pe:require('./minecraft-data/data/pe/common/versions')
};
module.exports.versions=protocolVersions;
module.exports.versionsByMinecraftVersion=versionsByMinecraftVersion;
module.exports.preNettyVersionsByProtocolVersion=preNettyVersionsByProtocolVersion;
module.exports.postNettyVersionsByProtocolVersion=postNettyVersionsByProtocolVersion;

var schemas={
  biomes: require('./minecraft-data/schemas/biomes_schema'),
  blocks:require('./minecraft-data/schemas/blocks_schema'),
  effects: require('./minecraft-data/schemas/effects_schema'),
  entities: require('./minecraft-data/schemas/entities_schema'),
  enchantments: require('./minecraft-data/schemas/enchantments_schema'),
  instruments: require('./minecraft-data/schemas/instruments_schema'),
  items: require('./minecraft-data/schemas/items_schema'),
  materials: require('./minecraft-data/schemas/materials_schema'),
  protocolVersions: require('./minecraft-data/schemas/protocolVersions_schema'),
  recipes: require('./minecraft-data/schemas/recipes_schema'),
  version: require('./minecraft-data/schemas/version_schema'),
  windows: require('./minecraft-data/schemas/windows_schema')
};
module.exports.schemas=schemas;

var data=require('./data.js');
