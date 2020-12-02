import { buildIndexFromArray, buildIndexFromArrayWithRanges } from './indexer'
import {
  Biomes,
  BlockCollisionShapes,
  BlockLoot,
  Blocks,
  CommandsSchema,
  Effects,
  Enchantments,
  Entities,
  EntityLoot,
  Foods,
  Instruments,
  Items,
  Materials,
  Particles,
  Recipes,
  Version,
  Windows
} from './interfaces'

export interface Rawmcdata {
  blocks: Blocks[]
  blockCollisionShapes: BlockCollisionShapes[]
  blockLoot: BlockLoot[]
  biomes: Biomes[]
  enchantments: Enchantments[]
  effects: Effects[]
  items: Items[]
  recipes: Recipes[]
  instruments: Instruments[]
  materials: Materials
  entities: Entities[]
  protocol: any
  windows: Windows[]
  version: Version
  language: any
  foods: Foods[]
  commands: CommandsSchema
  entityLoot: EntityLoot[]
  particles: Particles[]
  protocolComments: any
  loginPacket: any
}

export interface Mcdata {
  blocks: { [key: string]: Blocks }
  blocksByName: { [key: string]: Blocks }
  blocksArray: Blocks[]
  blocksByStateId: { [key: string]: Blocks }
  blockCollisionShapes: BlockCollisionShapes[]
  biomes: { [key: string]: Biomes }
  biomesArray: Biomes[]
  items: { [key: string]: Items }
  itemsByName: { [key: string]: Items }
  itemsArray: Items[]
  foods: { [key: string]: Foods }
  foodsByName: { [key: string]: Foods }
  foodsByFoodPoints: { [key: string]: Foods }
  foodsBySaturation: { [key: string]: Foods }
  foodsArray: Foods[]
  recipes: Recipes[]
  instruments: { [key: string]: Instruments }
  instrumentsArray: Instruments[]
  materials: Materials
  enchantments: { [key: string]: Enchantments }
  enchantmentsByName: { [key: string]: Enchantments }
  enchantmentsArray: Enchantments[]
  mobs: { [key: string]: Entities }
  objects: { [key: string]: Entities }
  entitiesByName: { [key: string]: Blocks }
  entitiesArray: Entities[]
  windows: { [key: string]: Windows }
  windowsByName: { [key: string]: Windows }
  windowsArray: Windows[]
  protocol: any
  protocolComments: any
  version: Version
  effects: { [key: string]: Effects }
  effectsByName: { [key: string]: Effects }
  effectsArray: Effects[]
  particles: { [key: string]: Particles }
  particlesByName: { [key: string]: Particles }
  particlesArray: Particles[]
  language: any
  blockLoot: { [key: string]: BlockLoot }
  blockLootArray: BlockLoot[]
  entityLoot: { [key: string]: EntityLoot }
  entityLootArray: EntityLoot[]
  commands: CommandsSchema
  loginPacket: any
  type: string
}

export function LoadData (_mcData: Rawmcdata, type: string): Mcdata {
  const biomes = _mcData.biomes
  const blockCollisionShapes = _mcData.blockCollisionShapes
  const blockLoot = _mcData.blockLoot
  const blocks = _mcData.blocks
  const commands = _mcData.commands
  const effects = _mcData.effects
  const enchantments = _mcData.enchantments
  const entities = _mcData.entities
  const entityLoot = _mcData.entityLoot
  const foods = _mcData.foods
  const instruments = _mcData.instruments
  const items = _mcData.items
  const materials = _mcData.materials
  const particles = _mcData.particles
  const recipes = _mcData.recipes
  const version = _mcData.version
  const windows = _mcData.windows
  const mcData = {
    blocks: buildIndexFromArray(_mcData.blocks, 'id'),
    blocksByName: buildIndexFromArray(_mcData.blocks, 'name'),
    blocksArray: blocks,
    blocksByStateId: buildIndexFromArrayWithRanges(
      _mcData.blocks,
      'minStateId',
      'maxStateId'
    ),

    blockCollisionShapes: blockCollisionShapes,

    biomes: buildIndexFromArray(_mcData.biomes, 'id'),
    biomesArray: biomes,

    items: buildIndexFromArray(_mcData.items, 'id'),
    itemsByName: buildIndexFromArray(_mcData.items, 'name'),
    itemsArray: items,

    foods: buildIndexFromArray(_mcData.foods, 'id'),
    foodsByName: buildIndexFromArray(_mcData.foods, 'name'),
    foodsByFoodPoints: buildIndexFromArray(_mcData.foods, 'foodPoints'),
    foodsBySaturation: buildIndexFromArray(_mcData.foods, 'saturation'),
    foodsArray: foods,

    recipes: recipes,

    instruments: buildIndexFromArray(_mcData.instruments, 'id'),
    instrumentsArray: instruments,

    materials: materials,

    enchantments: buildIndexFromArray(_mcData.enchantments, 'id'),
    enchantmentsByName: buildIndexFromArray(_mcData.enchantments, 'name'),
    enchantmentsArray: enchantments,

    mobs:
      _mcData.entities === undefined
        ? undefined
        : buildIndexFromArray(
          _mcData.entities.filter((e: Entities) => e.type === 'mob'),
          'id'
        ),
    objects:
      _mcData.entities === undefined
        ? undefined
        : buildIndexFromArray(
          _mcData.entities.filter((e: Entities) => e.type === 'object'),
          'id'
        ),
    entitiesByName: buildIndexFromArray(_mcData.entities, 'name'),
    entitiesArray: entities,

    windows: buildIndexFromArray(_mcData.windows, 'id'),
    windowsByName: buildIndexFromArray(_mcData.windows, 'name'),
    windowsArray: windows,

    protocol: _mcData.protocol,
    protocolComments: _mcData.protocolComments,

    version: version,

    effects: buildIndexFromArray(_mcData.effects, 'id'),
    effectsByName: buildIndexFromArray(_mcData.effects, 'name'),
    effectsArray: effects,

    particles: buildIndexFromArray(_mcData.particles, 'id'),
    particlesByName: buildIndexFromArray(_mcData.particles, 'name'),
    particlesArray: particles,

    language: _mcData.language,

    blockLoot: buildIndexFromArray(_mcData.blockLoot, 'block'),
    blockLootArray: blockLoot,

    entityLoot: buildIndexFromArray(_mcData.entityLoot, 'entity'),
    entityLootArray: entityLoot,

    commands: commands,

    loginPacket: _mcData.loginPacket,
    type: type
  }
  return mcData
}
