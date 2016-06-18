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

module.exports.versions=protocolVersions;
module.exports.versionsByMinecraftVersion=versionsByMinecraftVersion;
module.exports.preNettyVersionsByProtocolVersion=preNettyVersionsByProtocolVersion;
module.exports.postNettyVersionsByProtocolVersion=postNettyVersionsByProtocolVersion;

var schemas={
  biomes: require('./minecraft-data/schemas/biomes_schema'),
  blocks:require('./minecraft-data/schemas/blocks_schema'),
  effects: require('./minecraft-data/schemas/effects_schema'),
  entities: require('./minecraft-data/schemas/entities_schema'),
  instruments: require('./minecraft-data/schemas/instruments_schema'),
  items: require('./minecraft-data/schemas/items_schema'),
  materials: require('./minecraft-data/schemas/materials_schema'),
  protocol: require('./minecraft-data/schemas/protocol_schema'),
  protocolVersions: require('./minecraft-data/schemas/protocolVersions_schema'),
  recipes: require('./minecraft-data/schemas/recipes_schema'),
  version: require('./minecraft-data/schemas/version_schema'),
  windows: require('./minecraft-data/schemas/windows_schema')
};
module.exports.schemas=schemas;

var data={
  "pc": {
    "0.30c": {
      protocol: require('./minecraft-data/data/pc/0.30c/protocol'),
      version: require('./minecraft-data/data/pc/0.30c/version')
    },
    "1.7": {
      blocks: require('./minecraft-data/data/pc/1.7/blocks'),
      biomes: require('./minecraft-data/data/pc/1.7/biomes'),
      effects: require('./minecraft-data/data/pc/1.7/effects'),
      items: require('./minecraft-data/data/pc/1.7/items'),
      recipes: require('./minecraft-data/data/pc/1.8/recipes'), // TODO: 1.7 recipes
      instruments: require('./minecraft-data/data/pc/1.7/instruments'),
      materials: require('./minecraft-data/data/pc/1.7/materials'),
      entities: require('./minecraft-data/data/pc/1.7/entities'),
      protocol: require('./minecraft-data/data/pc/1.7/protocol'),
      windows: require('./minecraft-data/data/pc/1.7/windows'),
      version: require('./minecraft-data/data/pc/1.7/version')
    },
    "1.8": {
      blocks: require('./minecraft-data/data/pc/1.8/blocks'),
      biomes: require('./minecraft-data/data/pc/1.8/biomes'),
      effects: require('./minecraft-data/data/pc/1.8/effects'),
      items: require('./minecraft-data/data/pc/1.8/items'),
      recipes: require('./minecraft-data/data/pc/1.8/recipes'),
      instruments: require('./minecraft-data/data/pc/1.8/instruments'),
      materials: require('./minecraft-data/data/pc/1.8/materials'),
      entities: require('./minecraft-data/data/pc/1.8/entities'),
      protocol: require('./minecraft-data/data/pc/1.8/protocol'),
      windows: require('./minecraft-data/data/pc/1.8/windows'),
      version: require('./minecraft-data/data/pc/1.8/version')
    },
    "15w40b": {
      blocks: require('./minecraft-data/data/pc/1.9/blocks'),
      biomes: require('./minecraft-data/data/pc/1.9/biomes'),
      effects: require('./minecraft-data/data/pc/1.9/effects'),
      items: require('./minecraft-data/data/pc/1.9/items'),
      recipes: require('./minecraft-data/data/pc/1.9/recipes'),
      instruments: require('./minecraft-data/data/pc/1.9/instruments'),
      materials: require('./minecraft-data/data/pc/1.9/materials'),
      entities: require('./minecraft-data/data/pc/1.9/entities'),
      protocol: require('./minecraft-data/data/pc/15w40b/protocol'),
      windows: require('./minecraft-data/data/pc/1.9/windows'),
      version: require('./minecraft-data/data/pc/15w40b/version')
    },
    "1.9": {
      blocks: require('./minecraft-data/data/pc/1.9/blocks'),
      biomes: require('./minecraft-data/data/pc/1.9/biomes'),
      effects: require('./minecraft-data/data/pc/1.9/effects'),
      items: require('./minecraft-data/data/pc/1.9/items'),
      recipes: require('./minecraft-data/data/pc/1.9/recipes'),
      instruments: require('./minecraft-data/data/pc/1.9/instruments'),
      materials: require('./minecraft-data/data/pc/1.9/materials'),
      entities: require('./minecraft-data/data/pc/1.9/entities'),
      protocol: require('./minecraft-data/data/pc/1.9/protocol'),
      windows: require('./minecraft-data/data/pc/1.9/windows'),
      version: require('./minecraft-data/data/pc/1.9/version')
    },
    "1.9.1-pre2": {
      blocks: require('./minecraft-data/data/pc/1.9/blocks'),
      biomes: require('./minecraft-data/data/pc/1.9/biomes'),
      effects: require('./minecraft-data/data/pc/1.9/effects'),
      items: require('./minecraft-data/data/pc/1.9/items'),
      recipes: require('./minecraft-data/data/pc/1.9/recipes'),
      instruments: require('./minecraft-data/data/pc/1.9/instruments'),
      materials: require('./minecraft-data/data/pc/1.9/materials'),
      entities: require('./minecraft-data/data/pc/1.9/entities'),
      protocol: require('./minecraft-data/data/pc/1.9.1-pre2/protocol'),
      windows: require('./minecraft-data/data/pc/1.9/windows'),
      version: require('./minecraft-data/data/pc/1.9.1-pre2/version')
    },
    "1.9.2": {
      blocks: require('./minecraft-data/data/pc/1.9/blocks'),
      biomes: require('./minecraft-data/data/pc/1.9/biomes'),
      effects: require('./minecraft-data/data/pc/1.9/effects'),
      items: require('./minecraft-data/data/pc/1.9/items'),
      recipes: require('./minecraft-data/data/pc/1.9/recipes'),
      instruments: require('./minecraft-data/data/pc/1.9/instruments'),
      materials: require('./minecraft-data/data/pc/1.9/materials'),
      entities: require('./minecraft-data/data/pc/1.9/entities'),
      protocol: require('./minecraft-data/data/pc/1.9.2/protocol'),
      windows: require('./minecraft-data/data/pc/1.9/windows'),
      version: require('./minecraft-data/data/pc/1.9.2/version')
    },
    "1.9.4": {
      blocks: require('./minecraft-data/data/pc/1.9/blocks'),
      biomes: require('./minecraft-data/data/pc/1.9/biomes'),
      effects: require('./minecraft-data/data/pc/1.9/effects'),
      items: require('./minecraft-data/data/pc/1.9/items'),
      recipes: require('./minecraft-data/data/pc/1.9/recipes'),
      instruments: require('./minecraft-data/data/pc/1.9/instruments'),
      materials: require('./minecraft-data/data/pc/1.9/materials'),
      entities: require('./minecraft-data/data/pc/1.9/entities'),
      protocol: require('./minecraft-data/data/pc/1.9.4/protocol'),
      windows: require('./minecraft-data/data/pc/1.9/windows'),
      version: require('./minecraft-data/data/pc/1.9.4/version')
    },
    "16w20a": {
      blocks: require('./minecraft-data/data/pc/1.9/blocks'),
      biomes: require('./minecraft-data/data/pc/1.9/biomes'),
      effects: require('./minecraft-data/data/pc/1.9/effects'),
      items: require('./minecraft-data/data/pc/1.9/items'),
      recipes: require('./minecraft-data/data/pc/1.9/recipes'),
      instruments: require('./minecraft-data/data/pc/1.9/instruments'),
      materials: require('./minecraft-data/data/pc/1.9/materials'),
      entities: require('./minecraft-data/data/pc/1.9/entities'),
      protocol: require('./minecraft-data/data/pc/16w20a/protocol'),
      windows: require('./minecraft-data/data/pc/1.9/windows'),
      version: require('./minecraft-data/data/pc/16w20a/version')
    },
    "1.10-pre1": {
      blocks: require('./minecraft-data/data/pc/1.9/blocks'),
      biomes: require('./minecraft-data/data/pc/1.9/biomes'),
      effects: require('./minecraft-data/data/pc/1.9/effects'),
      items: require('./minecraft-data/data/pc/1.9/items'),
      recipes: require('./minecraft-data/data/pc/1.9/recipes'),
      instruments: require('./minecraft-data/data/pc/1.9/instruments'),
      materials: require('./minecraft-data/data/pc/1.9/materials'),
      entities: require('./minecraft-data/data/pc/1.9/entities'),
      protocol: require('./minecraft-data/data/pc/1.10-pre1/protocol'),
      windows: require('./minecraft-data/data/pc/1.9/windows'),
      version: require('./minecraft-data/data/pc/1.10-pre1/version')
    },
    "1.10": {
      blocks: require('./minecraft-data/data/pc/1.10/blocks'),
      biomes: require('./minecraft-data/data/pc/1.10/biomes'),
      effects: require('./minecraft-data/data/pc/1.10/effects'),
      items: require('./minecraft-data/data/pc/1.10/items'),
      recipes: require('./minecraft-data/data/pc/1.10/recipes'),
      instruments: require('./minecraft-data/data/pc/1.10/instruments'),
      materials: require('./minecraft-data/data/pc/1.10/materials'),
      entities: require('./minecraft-data/data/pc/1.10/entities'),
      protocol: require('./minecraft-data/data/pc/1.10/protocol'),
      windows: require('./minecraft-data/data/pc/1.10/windows'),
      version: require('./minecraft-data/data/pc/1.10/version')
    }
  },
  "pe":{
    "0.14":{
      blocks: require('./minecraft-data/data/pe/0.14/blocks'),
      biomes: require('./minecraft-data/data/pc/1.8/biomes'),
      items: require('./minecraft-data/data/pe/0.14/items'),
      protocol: require('./minecraft-data/data/pe/0.14/protocol'),
      version: require('./minecraft-data/data/pe/0.14/version')
    }
  }
};