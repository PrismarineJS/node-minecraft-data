import { mcDataToNode } from './loader'
import { buildIndexFromArray, buildIndexFromArrayNonUnique } from './indexer'
const data = require('../data.js')

const protocolVersions: { [key: string]: any } = {
  pc: require('../minecraft-data/data/pc/common/protocolVersions.json'),
  pe: require('../minecraft-data/data/pe/common/protocolVersions.json')
}
const versionsByMinecraftVersion: { [key: string]: any } = {}
const versionsByMajorVersion: { [key: string]: any } = {}
const preNettyVersionsByProtocolVersion: { [key: string]: any } = {}
const postNettyVersionsByProtocolVersion: { [key: string]: any } = {}

const types = ['pc', 'pe']
types.forEach(function (type) {
  versionsByMinecraftVersion[type] = buildIndexFromArray(
    protocolVersions[type],
    'minecraftVersion'
  )
  versionsByMajorVersion[type] = buildIndexFromArray(
    protocolVersions[type].slice().reverse(),
    'majorVersion'
  )
  preNettyVersionsByProtocolVersion[type] = buildIndexFromArrayNonUnique(
    protocolVersions[type].filter(function (e: { usesNetty: boolean }) {
      return !e.usesNetty
    }),
    'version'
  )
  postNettyVersionsByProtocolVersion[type] = buildIndexFromArrayNonUnique(
    protocolVersions[type].filter(function (e: { usesNetty: boolean }) {
      return e.usesNetty
    }),
    'version'
  )
})
// adapt the version, most often doesn't convert to major version, can even convert to minor version when possible
function toMajor (
  mcVersion: string,
  preNetty: boolean,
  typeArg?: string
): { majorVersion: string, type: string } {
  const parts = (mcVersion + '').split('_')
  const type = typeArg || (parts.length === 2 ? parts[0] : 'pc')
  const version = parts.length === 2 ? parts[1] : mcVersion
  let majorVersion: string
  if (data[type][version]) {
    majorVersion = version
  } else if (versionsByMinecraftVersion[type][version]) {
    majorVersion = versionsByMinecraftVersion[type][version].majorVersion
  } else if (preNetty && preNettyVersionsByProtocolVersion[type][version]) {
    return toMajor(
      preNettyVersionsByProtocolVersion[type][version][0].minecraftVersion,
      preNetty,
      type
    )
  } else if (!preNetty && postNettyVersionsByProtocolVersion[type][version]) {
    return toMajor(
      postNettyVersionsByProtocolVersion[type][version][0].minecraftVersion,
      preNetty,
      type
    )
  } /* if (versionsByMajorVersion[type][version]) */ else {
    majorVersion = versionsByMajorVersion[type][version].minecraftVersion
  }
  return {
    majorVersion: majorVersion,
    type: type
  }
}
const cache: { [key: string]: any } = {} // prevent reindexing when requiring multiple time the same version

module.exports = function (mcVersion: string, preNetty?: boolean) {
  preNetty = preNetty || false
  const majorVersion = toMajor(mcVersion, preNetty)
  if (majorVersion == null) {
    return null
  }
  if (cache[majorVersion.type + '_' + majorVersion.majorVersion]) {
    return cache[majorVersion.type + '_' + majorVersion.majorVersion]
  }
  const mcData = data[majorVersion.type][majorVersion.majorVersion]
  if (mcData == null) {
    return null
  }
  const nmcData = mcDataToNode(mcData)
  nmcData.type = majorVersion.type
  cache[majorVersion.type + '_' + majorVersion.majorVersion] = nmcData
  return nmcData
}
module.exports.supportedVersions = {
  pc: require('../minecraft-data/data/pc/common/versions.json'),
  pe: require('../minecraft-data/data/pe/common/versions.json')
}
module.exports.versions = protocolVersions
module.exports.versionsByMinecraftVersion = versionsByMinecraftVersion
module.exports.preNettyVersionsByProtocolVersion = preNettyVersionsByProtocolVersion
module.exports.postNettyVersionsByProtocolVersion = postNettyVersionsByProtocolVersion
const schemas = {
  biomes: require('../minecraft-data/schemas/biomes_schema.json'),
  blocks: require('../minecraft-data/schemas/blocks_schema.json'),
  effects: require('../minecraft-data/schemas/effects_schema.json'),
  commands: require('../minecraft-data/schemas/commands_schema.json'),
  entities: require('../minecraft-data/schemas/entities_schema.json'),
  enchantments: require('../minecraft-data/schemas/enchantments_schema.json'),
  instruments: require('../minecraft-data/schemas/instruments_schema.json'),
  items: require('../minecraft-data/schemas/items_schema.json'),
  materials: require('../minecraft-data/schemas/materials_schema.json'),
  protocolVersions: require('./minecraft-data/schemas/protocolVersions_schema.json'),
  recipes: require('../minecraft-data/schemas/recipes_schema.json'),
  version: require('../minecraft-data/schemas/version_schema.json'),
  windows: require('../minecraft-data/schemas/windows_schema.json'),
  foods: require('../minecraft-data/schemas/foods_schema.json'),
  particles: require('../minecraft-data/schemas/particles_schema.json')
}
module.exports.schemas = schemas
