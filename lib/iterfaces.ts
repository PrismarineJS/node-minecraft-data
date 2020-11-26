// mcData

interface type_mcData {
  blocks: blocks
  blockCollisionShapes: blockCollisionShapes
  biomes: biomes[]
  items: items
  foods: foods
  recipes: recipes
  instruments: instruments
  materials: materials
  enchantments: enchantments
  entities: entities
  windows: windows
  protocol: protocol
  protocolComments: protocolComments
  version: version
  effects: effects
  particles: particles
  language: language
  blockLoot: blockLoot
  entityLoot: entityLoot
  commands: commands
  loginPacket: loginPacket
}

// Blocks

interface harvestTools {
  [key: string]: boolean
}

interface variations {
  metadata: number
  displayName: string
}

interface drops {
  drop: number
}

interface blocks {
  id: number
  displayName: string
  name: string
  hardness: number
  stackSize: number
  diggable: boolean
  boundingBox: string
  material: string
  harvestTools?: harvestTools
  variations?: variations[]
  drops: drops[] | []
  transparent: boolean
  emitLight: number
  filterLight: number
}

// Block Collision Shapes

interface blockCollisionShapes {
  [key: string]: number | number[]
}

// Biomes

interface biomes {
  id: number
  color: number
  name: string
  rainfall: number
  temperature: number
}

// Items

interface items {
  id: number
  displayName: string
  name: string
  stackSize: number
}

// Foods

interface foods {
  id: number
  displayName: string
  name: 'string'
  stackSize: number
  foodPoints: number
  saturation: number
  effectiveQuality: number
  saturationRatio: number
}

// Recipes

interface recipes {}

// Instruments

interface instruments {
  id: number
  name: string
}

// Materials

interface materials {
  [key: string]: { [key: string]: number }
}

// Enchantments

interface enchantments {
  id: number
  name: string
  displayName: string
}

// Entities

interface entities {
  id: number
  internalId: number
  name: string
  displayName: string
  type: string
  width: number
  height: number
  category: string
}

// Windows

interface slots {
  name: string
  index: number
  size?: number
}

interface openedWith {
  type: string
  id: number
}

interface windows {
  id: string
  name: string
  slots?: slots[]
  openedWith?: openedWith[]
  properties?: string[]
}

// Protocol

interface protocol {}

// Protocol Comments

interface protocolComments {}

// Version

interface version {}

// Effects

interface effects {
  id: number
  name: 'string'
  displayName: 'string'
  type: string
}

// Particles

interface particles {
  id: number
  name: 'string'
}

interface language {
  [key: string]: string
}

// Block Loot

interface blockLoot {}

// Entity Loot

interface entityLoot {}

// Commands

interface commands {}

// Login Packet

interface loginPacket {}
