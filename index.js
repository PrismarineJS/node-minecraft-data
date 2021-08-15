const mcDataToNode = require('./lib/loader')
const indexer = require('./lib/indexer.js')
const protocolVersions = {
  pc: require('./minecraft-data/data/pc/common/protocolVersions.json'),
  bedrock: require('./minecraft-data/data/bedrock/common/protocolVersions.json')
}
const versionsByMinecraftVersion = {}
const versionsByMajorVersion = {}
const preNettyVersionsByProtocolVersion = {}
const postNettyVersionsByProtocolVersion = {}

const types = ['pc', 'bedrock']
types.forEach(function (type) {
  for (let i = 0; i < protocolVersions[type].length; i++) {
    if (!protocolVersions[type][i].dataVersion) {
      // We start top to bottom, so the ones at the bottom should be greater
      protocolVersions[type][i].dataVersion = -protocolVersions[type].length + i
    }
  }
  versionsByMinecraftVersion[type] = indexer.buildIndexFromArray(protocolVersions[type], 'minecraftVersion')
  versionsByMajorVersion[type] = indexer.buildIndexFromArray(protocolVersions[type].slice().reverse(), 'majorVersion')
  preNettyVersionsByProtocolVersion[type] = indexer.buildIndexFromArrayNonUnique(protocolVersions[type].filter(function (e) { return !e.usesNetty }), 'version')
  postNettyVersionsByProtocolVersion[type] = indexer.buildIndexFromArrayNonUnique(protocolVersions[type].filter(function (e) { return e.usesNetty }), 'version')
})

function Version (type, version, majorVersion) {
  const versions = versionsByMinecraftVersion[type]
  // TODO: Data for Minecraft classic is missing in protocolVersions.json, move this to its own type ?
  const v1 = versions[version]?.dataVersion ?? 0
  const raise = other => { throw new RangeError(`Version '${other}' not found in [${Object.keys(versions).join(' ; ')}] for ${type}`) }
  this['>='] = other => versions[other] ? v1 >= versions[other].dataVersion : raise(other)
  this['>'] = other => versions[other] ? v1 > versions[other].dataVersion : raise(other)
  this['<'] = other => versions[other] ? v1 < versions[other].dataVersion : raise(other)
  this['<='] = other => versions[other] ? v1 <= versions[other].dataVersion : raise(other)
  this['=='] = other => versions[other] ? v1 === versions[other].dataVersion : raise(other)
  this.type = type
  this.majorVersion = majorVersion
  return this
}

const cache = {} // prevent reindexing when requiring multiple time the same version

module.exports = function (mcVersion, preNetty) {
  preNetty = preNetty || false
  mcVersion = String(mcVersion).replace('pe_', 'bedrock_')

  const majorVersion = toMajor(mcVersion, preNetty)
  if (majorVersion == null) { return null }
  if (cache[majorVersion.type + '_' + majorVersion.majorVersion]) { return cache[majorVersion.type + '_' + majorVersion.majorVersion] }
  const mcData = data[majorVersion.type][majorVersion.majorVersion]
  if (mcData == null) { return null }
  const nmcData = mcDataToNode(mcData)
  nmcData.type = majorVersion.type
  nmcData.isNewerOrEqualTo = function (version) {
    const v1 = versionsByMinecraftVersion[this.type][this.version.minecraftVersion].dataVersion
    const v2 = versionsByMinecraftVersion[this.type][version].dataVersion
    return v1 >= v2
  }
  nmcData.isOlderThan = function (version) {
    const v1 = versionsByMinecraftVersion[this.type][this.version.minecraftVersion].dataVersion
    const v2 = versionsByMinecraftVersion[this.type][version].dataVersion
    return v1 < v2
  }
  nmcData.version = Object.assign(majorVersion, nmcData.version)
  cache[majorVersion.type + '_' + majorVersion.majorVersion] = nmcData

  if (majorVersion.type === 'bedrock') {
    const dp = require('./lib/bedrock')(nmcData)
    return Object.assign(dp, nmcData)
  }

  return nmcData
}

module.exports.Version = Version

// adapt the version, most often doesn't convert to major version, can even convert to minor version when possible
function toMajor (mcVersion, preNetty, typeArg) {
  const parts = (mcVersion + '').split('_')
  const type = typeArg || (parts.length === 2 ? parts[0] : 'pc')
  const version = parts.length === 2 ? parts[1] : mcVersion
  let majorVersion
  if (data[type][version]) {
    majorVersion = version
  } else if (versionsByMinecraftVersion[type][version]) {
    majorVersion = versionsByMinecraftVersion[type][version].majorVersion
  } else if (preNetty && preNettyVersionsByProtocolVersion[type][version]) {
    return toMajor(preNettyVersionsByProtocolVersion[type][version][0].minecraftVersion, preNetty, type)
  } else if (!preNetty && postNettyVersionsByProtocolVersion[type][version]) {
    const versions = postNettyVersionsByProtocolVersion[type][version]
    const noSnaps = versions.filter((el) => {
      return !/[a-zA-Z]/g.test(el.minecraftVersion)
    })
    return toMajor(noSnaps[0]?.minecraftVersion ?? versions[0].minecraftVersion, preNetty, type)
  } else if (versionsByMajorVersion[type][version]) {
    majorVersion = versionsByMajorVersion[type][version].minecraftVersion
  }
  return new Version(type, version, majorVersion)
}

module.exports.supportedVersions = {
  pc: require('./minecraft-data/data/pc/common/versions.json'),
  bedrock: require('./minecraft-data/data/bedrock/common/versions.json')
}
module.exports.versions = protocolVersions
module.exports.versionsByMinecraftVersion = versionsByMinecraftVersion
module.exports.preNettyVersionsByProtocolVersion = preNettyVersionsByProtocolVersion
module.exports.postNettyVersionsByProtocolVersion = postNettyVersionsByProtocolVersion
module.exports.legacy = {
  pc: require('./minecraft-data/data/pc/common/legacy.json')
}

const schemas = {
  biomes: require('./minecraft-data/schemas/biomes_schema.json'),
  blocks: require('./minecraft-data/schemas/blocks_schema.json'),
  effects: require('./minecraft-data/schemas/effects_schema.json'),
  commands: require('./minecraft-data/schemas/commands_schema.json'),
  entities: require('./minecraft-data/schemas/entities_schema.json'),
  enchantments: require('./minecraft-data/schemas/enchantments_schema.json'),
  instruments: require('./minecraft-data/schemas/instruments_schema.json'),
  items: require('./minecraft-data/schemas/items_schema.json'),
  materials: require('./minecraft-data/schemas/materials_schema.json'),
  protocolVersions: require('./minecraft-data/schemas/protocolVersions_schema.json'),
  recipes: require('./minecraft-data/schemas/recipes_schema.json'),
  version: require('./minecraft-data/schemas/version_schema.json'),
  windows: require('./minecraft-data/schemas/windows_schema.json'),
  foods: require('./minecraft-data/schemas/foods_schema.json'),
  particles: require('./minecraft-data/schemas/particles_schema.json'),
  mapIcons: require('./minecraft-data/schemas/mapIcons_schema.json')
}
module.exports.schemas = schemas

const data = require('./data.js')
