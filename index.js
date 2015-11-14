var loader=require("./lib/loader");

module.exports = function(version)
{
  return loader(version,mcVersionToMcData);
};

function mcVersionToMcData(mcVersion)
{
  var dir="./minecraft-data/data/"+mcVersion;
  return {
    blocks: require(dir+'/blocks'),
    biomes: require(dir+'/biomes'),
    effects: require(dir+'/effects'),
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