import {
  Biomes,
  Blocks,
  CommandsSchema,
  Effects,
  Enchantments,
  Entities,
  Foods,
  Instruments,
  Items,
  Materials,
  Particles,
  ProtocolVersions,
  Recipes,
  Version,
  Windows
} from './interfaces'
import { buildIndexFromArray, buildIndexFromArrayNonUnique } from './indexer'
import data from './data'
import { LoadData, Mcdata } from './loader'

export interface _ProtocolVersions extends ProtocolVersions {
  [x: string]: any
}

export const protocolVersions: {
  pc: _ProtocolVersions[]
  pe: _ProtocolVersions[]
  [key: string]: _ProtocolVersions[]
} = {
  pc: require('../minecraft-data/data/pc/common/protocolVersions.json'),
  pe: require('../minecraft-data/data/pe/common/protocolVersions.json')
}

export const versionsByMinecraftVersion: {
  [key: string]: _ProtocolVersions
} = {}
const versionsByMajorVersion: {
  [key: string]: _ProtocolVersions
} = {}
export const preNettyVersionsByProtocolVersion: {
  [key: string]: _ProtocolVersions
} = {}
export const postNettyVersionsByProtocolVersion: {
  [key: string]: _ProtocolVersions
} = {}

const types = ['pc', 'pe']
types.forEach(function (type): void {
  versionsByMinecraftVersion[type] = buildIndexFromArray(
    protocolVersions[type],
    'minecraftVersion'
  )
  versionsByMajorVersion[type] = buildIndexFromArray(
    protocolVersions[type].slice().reverse(),
    'majorVersion'
  )
  preNettyVersionsByProtocolVersion[type] = buildIndexFromArrayNonUnique(
    protocolVersions[type].filter(function (e: ProtocolVersions) {
      return !(e.usesNetty === true)
    }),
    'version'
  )
  postNettyVersionsByProtocolVersion[type] = buildIndexFromArrayNonUnique(
    protocolVersions[type].filter(function (e: ProtocolVersions) {
      return e.usesNetty
    }),
    'version'
  )
})

function toMajor (
  mcVersion: string,
  preNetty: boolean,
  typeArg?: string | undefined
): { majorVersion: string, type: string } {
  const parts = (mcVersion + '').split('_')
  const type = typeArg ?? (parts.length === 2 ? parts[0] : 'pc')
  const version = parts.length === 2 ? parts[1] : mcVersion
  let majorVersion
  // @ts-expect-error
  if (data[type][version] != null) {
    majorVersion = version
  } else if (versionsByMinecraftVersion[type][version] != null) {
    majorVersion = versionsByMinecraftVersion[type][version].majorVersion
  } else if (
    preNetty &&
    preNettyVersionsByProtocolVersion[type][version] != null
  ) {
    return toMajor(
      preNettyVersionsByProtocolVersion[type][version][0].minecraftVersion,
      preNetty,
      type
    )
  } else if (
    !preNetty &&
    postNettyVersionsByProtocolVersion[type][version] != null
  ) {
    return toMajor(
      postNettyVersionsByProtocolVersion[type][version][0].minecraftVersion,
      preNetty,
      type
    )
  } else if (versionsByMajorVersion[type][version] != null) {
    majorVersion = versionsByMajorVersion[type][version].minecraftVersion
  }
  return {
    majorVersion: majorVersion,
    type: type
  }
}

export const schemas: {
  biomes: Biomes
  blocks: Blocks
  effects: Effects
  commands: CommandsSchema
  entities: Entities
  enchantments: Enchantments
  instruments: Instruments
  items: Items
  materials: Materials
  protocolVersions: ProtocolVersions
  recipes: Recipes
  version: Version
  windows: Windows
  foods: Foods
  particles: Particles
} = {
  biomes: require('../minecraft-data/schemas/biomes_schema.json'),
  blocks: require('../minecraft-data/schemas/blocks_schema.json'),
  effects: require('../minecraft-data/schemas/effects_schema.json'),
  commands: require('../minecraft-data/schemas/commands_schema.json'),
  entities: require('../minecraft-data/schemas/entities_schema.json'),
  enchantments: require('../minecraft-data/schemas/enchantments_schema.json'),
  instruments: require('../minecraft-data/schemas/instruments_schema.json'),
  items: require('../minecraft-data/schemas/items_schema.json'),
  materials: require('../minecraft-data/schemas/materials_schema.json'),
  protocolVersions: require('../minecraft-data/schemas/protocolVersions_schema.json'),
  recipes: require('../minecraft-data/schemas/recipes_schema.json'),
  version: require('../minecraft-data/schemas/version_schema.json'),
  windows: require('../minecraft-data/schemas/windows_schema.json'),
  foods: require('../minecraft-data/schemas/foods_schema.json'),
  particles: require('../minecraft-data/schemas/particles_schema.json')
}

const cache: {
  [key: string]: Mcdata | null
} = {} // prevent reindexing when requiring multiple time the same version

export function main (
  mcVersion: string,
  preNetty: boolean = false
): Mcdata | null {
  const majorVersion = toMajor(mcVersion, preNetty)
  if (majorVersion == null) {
    return null
  }
  if (cache[majorVersion.type + '_' + majorVersion.majorVersion] != null) {
    return cache[majorVersion.type + '_' + majorVersion.majorVersion]
  }

  // @ts-expect-error
  const _mcData = data[majorVersion.type][majorVersion.majorVersion]
  if (_mcData == null) {
    return null
  }
  const mcData = LoadData(_mcData, majorVersion.type)
  cache[majorVersion.type + '_' + majorVersion.majorVersion] = mcData
  return mcData
}

export const supportedVersions = {
  pc: require('../minecraft-data/data/pc/common/versions.json'),
  pe: require('../minecraft-data/data/pe/common/versions.json')
}
