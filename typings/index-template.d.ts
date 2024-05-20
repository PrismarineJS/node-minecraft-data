type Object = { [key: string]: any }

export interface Version {
  // Returns true if the current version is greater than or equal to the `other` version's dataVersion
  ['>='](other: string): boolean
  // Returns true if the current version is greater than the `other` version's dataVersion
  ['>'](other: string): boolean
  // Returns true if the current version is less than the `other` version's dataVersion
  ['<'](other: string): boolean
  // Returns true if the current version is less than than or equal to the `other` version's dataVersion
  ['<='](other: string): boolean
  // Returns true if the current version is equal to the `other` version's dataVersion
  ['=='](other: string): boolean
  type: 'pc' | 'bedrock'
  version?: number
  dataVersion?: number
  majorVersion?: string
  minecraftVersion?: string
}

export interface VersionSet {
  pc: { [version: string]: Version }
  bedrock: { [version: string]: Version }
}

export interface SupportedVersions {
  pc: string[]
  bedrock: string[]
}

export interface Schemas {
  biomes: Object
  blocks: Object
  effects: Object
  entities: Object
  instruments: Object
  items: Object
  materials: Object
  protocol: Object
  protocolVersions: Object
  recipes: Object
  version: Object
  windows: Object
  foods: Object
  blockLoot: Object
  entityLoot: Object
}

export interface LoginPacket {
  entityId: number

  /**
   * introduced in Minecraft 1.16.2
   */
  isHardcore?: boolean

  gameMode: number

  /**
   * Introduced in Minecraft 1.17
   */
  previousGameMode?: number
  /**
   * Introduced in Minecraft 1.17
   */
  worldNames?: string[]
  /**
   * Introduced in Minecraft 1.17
   */
  dimensionCodec?: Object

  dimension: Object

  /**
   * Introduced in Minecraft 1.17
   */
  worldName?: string

  hashedSeed: number
  maxPlayers: number
  viewDistance: number

  /**
   * Introduced in Minecraft 1.18
   */
  simulationDistance?: number

  reducedDebugInfo: boolean
  enableRespawnScreen: boolean

  /**
   * Introduced in Minecraft 1.17
   */
  isDebug?: boolean
  /**
   * Introduced in Minecraft 1.17
   */
  isFlat?: boolean
}

type RequireOnly<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>

type IndexedBlock = RequireOnly<Block, 'minStateId' | 'maxStateId' | 'defaultState'>

export interface IndexedData {
  isOlderThan(version: string): boolean
  isNewerOrEqualTo(version: string): boolean

  blocks: { [id: number]: IndexedBlock }
  blocksByName: { [name: string]: IndexedBlock }
  blocksByStateId: { [id: number]: IndexedBlock }
  blocksArray: IndexedBlock[]
  blockMappings: {
    pc: { name: string, states: Record<string, string | number> },
    pe: { name: string, states: Record<string, string | number> }
  }[]
  /**
   * Bedrock edition only
   */
  blockStates?: { name: string; states: object; version: number }[]
  /**
   * id is the shape id of the block converted to a string
   */
  blockCollisionShapes: { blocks: { [name: string]: number | number[] }; shapes: { [id: string]: [number[]] } }

  loginPacket: LoginPacket

  items: { [id: number]: Item }
  itemsByName: { [name: string]: Item }
  itemsArray: Item[]

  foods: { [id: number]: Food }
  foodsByName: { [name: string]: Food }
  foodsArray: Food[]

  biomes: { [id: number]: Biome }
  biomesArray: Biome[]
  biomesByName: { [name: string]: Biome }

  recipes: { [id: number]: Recipe[] }

  instruments: { [id: number]: Instrument }
  instrumentsArray: Instrument[]

  materials: { [name: string]: Material }

  mobs: { [id: number]: Entity }
  objects: { [id: number]: Entity }
  entities: { [id: number]: Entity }
  entitiesByName: { [name: string]: Entity }
  entitiesArray: Entity[]

  enchantments: { [id: number]: Enchantment }
  enchantmentsByName: { [name: string]: Enchantment }
  enchantmentsArray: Enchantment[]

  /**
   * Bedrock edition only
   */
  defaultSkin?: Object

  protocol: Object
  protocolComments: Object
  /**
   * Bedrock edition only
   */
  protocolYaml?: string[]

  windows: { [id: string]: Window }
  windowsByName: { [name: string]: Window }
  windowsArray: Window[]

  effects: { [id: number]: Effect }
  effectsByName: { [name: string]: Effect }
  effectsArray: Effect[]

  particles: { [id: number]: Particle }
  particlesByName: { [name: string]: Particle }
  particlesArray: Particle[]

  attributes: { [resource: string]: string }
  attributesByName: { [name: string]: string }
  attributesArray: Attribute[]

  commands: {}

  version: Version

  type: 'pc' | 'bedrock'

  language: { [key: string]: string }

  blockLoot: { [name: string]: BlockLootEntry }

  entityLoot: { [name: string]: EntityLootEntry }

  mapIcons: { [id: number]: MapIcon }
  mapIconsByName: { [name: string]: MapIcon }
  mapIconsArray: MapIcon[]

  tints: Tints

  supportFeature: <T extends keyof SupportsFeature>(key: T) => SupportsFeature[T]
}

const versions: {
  [key in keyof SupportedVersions]: ProtocolVersions
}
const versionsByMinecraftVersion: VersionSet
const preNettyVersionsByProtocolVersion: VersionSet
const postNettyVersionsByProtocolVersion: VersionSet
const supportedVersions: SupportedVersions
const legacy: { pc: { blocks: { [id: string]: string } } }
const schemas: Schemas
