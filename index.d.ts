type Biomes = Biome[];

interface Biome {
  /**
   * The unique identifier for a biome
   */
  id: number;
  /**
   * The color in a biome
   */
  color: number;
  /**
   * The name of a biome
   */
  name: string;
  /**
   * How much rain there is in a biome
   */
  rainfall: number;
  /**
   * An indicator for the temperature in a biome
   */
  temperature: number;
}


type Blocks = Block[];

interface Block {
  /**
   * The unique identifier for a block
   */
  id: number;
  /**
   * The display name of a block
   */
  displayName: string;
  /**
   * The name of a block
   */
  name: string;
  /**
   * Hardness of a block
   */
  hardness: number | null;
  /**
   * Stack size for a block
   */
  stackSize: number;
  /**
   * true if a block is diggable
   */
  diggable: boolean;
  /**
   * BoundingBox of a block
   */
  boundingBox: "block" | "empty";
  /**
   * Material of a block
   */
  material?: string;
  /**
   * Using one of these tools is required to harvest a block, without that you get a 3.33x time penalty.
   */
  harvestTools?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^[0-9]+$".
     */
    [k: string]: boolean;
  };
  variations?: {
    metadata: number;
    displayName: string;
  }[];
  drops: {
    /**
     * minimum number or chance, default : 1
     */
    minCount?: number;
    /**
     * maximum number or chance, default : minCount
     */
    maxCount?: number;
    drop:
      | number
      | {
          id: number;
          metadata: number;
        };
  }[];
  /**
   * true if a block is transparent
   */
  transparent: boolean;
  /**
   * Light emitted by that block
   */
  emitLight: number;
  /**
   * Light filtered by that block
   */
  filterLight: number;
}


type Effects = Effect[];

interface Effect {
  /**
   * The unique identifier for an effect
   */
  id: number;
  /**
   * The display name of an effect
   */
  displayName: string;
  /**
   * The name of an effect
   */
  name: string;
  /**
   * Whether an effect is positive or negative
   */
  type: "good" | "bad";
}


type Enchantments = Enchantment[];

interface Enchantment {
  /**
   * The unique identifier for an enchantment
   */
  id: number;
  /**
   * The name of an enchantment
   */
  name: string;
  /**
   * The display name of an enchantment
   */
  displayName: string;
}


type Entities = Entity[];

interface Entity {
  /**
   * The unique identifier for an entity
   */
  id: number;
  /**
   * The internal id of an entity : used in eggs metadata for example
   */
  internalId?: number;
  /**
   * The display name of an entity
   */
  displayName: string;
  /**
   * The name of an entity
   */
  name: string;
  /**
   * The type of an entity
   */
  type: string;
  /**
   * The width of the entity
   */
  width: number | null;
  /**
   * The height of the entity
   */
  height: number | null;
  /**
   * The category of an entity : a semantic category
   */
  category?: string;
}


type Instruments = Instrument[];

interface Instrument {
  /**
   * The unique identifier for an instrument
   */
  id: number;
  /**
   * The name of an instrument
   */
  name: string;
}


type Items = Item[];

interface Item {
  /**
   * The unique identifier for an item
   */
  id: number;
  /**
   * The display name of an item
   */
  displayName: string;
  /**
   * Stack size for an item
   */
  stackSize: number;
  /**
   * The name of an item
   */
  name: string;
  variations?: {
    metadata: number;
    displayName: string;
  }[];
}


interface EnUs {
  /**
   * This interface was referenced by `EnUs`'s JSON-Schema definition
   * via the `patternProperty` "^[a-zA-Z.0-9_-]+$".
   */
  [k: string]: string;
}


interface Materials {
  [k: string]: Material;
}
/**
 * This interface was referenced by `Materials`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z]+$".
 */
interface Material {
  /**
   * This interface was referenced by `Material`'s JSON-Schema definition
   * via the `patternProperty` "^[0-9]+$".
   */
  [k: string]: number;
}


type ProtocolVersions = {
  version: number;
  minecraftVersion: string;
  majorVersion: string;
  usesNetty?: boolean;
}[];






type Recipe = ShapedRecipe | ShapelessRecipe;
/**
 * An item can be represented different ways.
 */
type RecipeItem = Id | IdMetadata | Id1Metadata1Count1;
/**
 * A single numerical ID or null.
 */
type Id = number | null;
/**
 * A list of id and metadata. This is preferred if there are many items at once, e.g. in a shape.
 */
type IdMetadata = [Id, Metadata];
type Metadata = number;
type Count = number;
type ShapeRow = RecipeItem[];
/**
 * A shape is a list of rows, which are lists of items. There must be at least one row with at least one item in it. All rows must have the same length. Empty rows at the beginning or end of a shape may be omitted. Empty colums at the end may also be omitted. When an item can be crafted in a 2x2 grid, the shape may not be larger than 2x2.
 */
type Shape = ShapeRow[];
type Ingredients = RecipeItem[];

/**
 * A dictionary of quoted numerical item IDs. Each ID maps to a list of recipes. There may be multiple different recipes per item (same ID and metadata). The recipes may not be sorted.
 */
interface Recipes {
  /**
   * This interface was referenced by `Recipes`'s JSON-Schema definition
   * via the `patternProperty` "^[0-9]+$".
   */
  [k: string]: Recipe[];
}
/**
 * A shaped recipe is a dictionary of result, inShape and optionally outShape
 */
interface ShapedRecipe {
  result: RecipeItem;
  inShape: Shape;
  outShape?: Shape;
}
/**
 * A dictionary of at least id, optionally metadata and count. This is preferred if there are not many items at once, e.g. result in a recipe.
 */
interface Id1Metadata1Count1 {
  id: Id;
  metadata?: Metadata;
  count?: Count;
}
/**
 * A shapeless recipe is a dictionary of result and ingredients
 */
interface ShapelessRecipe {
  result: RecipeItem;
  ingredients: Ingredients;
}


interface Version {
  version?: number;
  minecraftVersion?: string;
  majorVersion?: string;
}


type Windows = Window[];

interface Window {
  /**
   * The unique identifier for the window
   */
  id: string;
  /**
   * The default displayed name of the window
   */
  name: string;
  /**
   * The slots displayed in the window
   */
  slots?: {
    /**
     * The name of the slot or slot range
     */
    name: string;
    /**
     * The position of the slot or begin of the slot range
     */
    index: number;
    /**
     * The size of the slot range
     */
    size?: number;
  }[];
  /**
   * Names of the properties of the window
   */
  properties?: string[];
  openedWith?: {
    type: "item" | "entity" | "block";
    id: number;
  }[];
}

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