var loader=require("./lib/loader");

module.exports = function(version)
{
  return loader(version,mcVersionToMcData);
};

function mcVersionToMcData(mcVersion)
{
  return data[mcVersion];
}

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