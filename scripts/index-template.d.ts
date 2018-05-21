
interface SupportedVersions {
  pc: string[];
  pe: string[];
}

declare interface MinecraftData {
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
  versions: string[];
  versionsByMinecraftVersion: any;
  postNettyVersionByProtocolVersion: any;
  supportedVersion: SupportedVersions;

  type: string;

  language: { [key: string]: string };
  schema: any;
}

declare function GetMinecraftData(version: string): MinecraftData;

export = GetMinecraftData