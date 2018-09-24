
interface VersionSet {
  pc: { [version: string]: Version };
  pe: { [version: string]: Version };
}

interface SupportedVersions {
  pc: string[];
  pe: string[];
}

interface Schemas {
  biomes: any;
  blocks: any;
  effects: any;
  entities: any;
  instruments: any;
  items: any;
  materials: any;
  protocol: any;
  protocolVersions: any;
  recipes: any;
  version: any;
  windows: any;
}

interface IndexedData {
  blocks: { [id: number]: Block; };
  blocksByName: { [name: string]: Block; };
  blocksArray: Block[];

  items: { [id: number]: Item; };
  itemsByName: { [name: string]: Item; };
  itemsArray: Item[];

  biomes: { [id: number]: Biome; };
  biomesArray: Biome[];

  recipes: { [id: number]: Recipe; };

  instruments: { [id: number]: Instrument; };
  instrumentsArray: Instrument[];

  materials: { [name: string]: Material };

  mobs: { [id: number]: Entity; };
  objects: { [id: number]: Entity; };
  entitiesByName: { [name: string]: Entity; };
  entitiesArray: Entity[];

  enchantments: { [id: number]: Enchantment; };
  enchantmentsByName: { [name: string]: Enchantment; };
  enchantmentsArray: Enchantment[];

  protocol: any;
  protocolComments: any;

  findItemOrBlockById(id: number): Block | Item;
  findItemOrBlockByName(name: string): Block | Item;

  windows: { [id: number]: Window; };
  windowsByName: { [name: string]: Window; };
  windowsArray: Window[];

  effects: { [id: number]: Effect; };
  effectsByName: { [name: string]: Effect; };
  effectsArray: Effect[];

  version: Version;

  type: string;

  language: { [key: string]: string };
}

const GetMinecraftData: {
  (version: string | number): IndexedData;
  versions: Version[];
  versionsByMinecraftVersion: VersionSet;
  preNettyVersionsByProtocolVersion: VersionSet;
  postNettyVersionsByProtocolVersion: VersionSet;
  supportedVersions: SupportedVersions;
  schemas: Schemas;
}