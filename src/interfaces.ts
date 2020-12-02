/* eslint-disable */

// To parse this data:
//
//   import { Convert, BlockCollisionShapes, CommandsSchema, Materials, Recipes, Version } from "./interfaces";
//
//   const biomes = Convert.toBiomes(json);
//   const blockCollisionShapes = Convert.toBlockCollisionShapes(json);
//   const blockLoot = Convert.toBlockLoot(json);
//   const blocks = Convert.toBlocks(json);
//   const commandsSchema = Convert.toCommandsSchema(json);
//   const effects = Convert.toEffects(json);
//   const enchantments = Convert.toEnchantments(json);
//   const entities = Convert.toEntities(json);
//   const entityLoot = Convert.toEntityLoot(json);
//   const foods = Convert.toFoods(json);
//   const instruments = Convert.toInstruments(json);
//   const items = Convert.toItems(json);
//   const materials = Convert.toMaterials(json);
//   const particles = Convert.toParticles(json);
//   const protocolVersions = Convert.toProtocolVersions(json);
//   const recipes = Convert.toRecipes(json);
//   const version = Convert.toVersion(json);
//   const windows = Convert.toWindows(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Biomes {
  /**
   * The color in a biome
   */
  color?: number;
  /**
   * The display name of a biome
   */
  displayName?: string;
  /**
   * The unique identifier for a biome
   */
  id: number;
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

export interface BlockCollisionShapes {
  /**
   * Each block's collision shape id(s).
   */
  blocks: { [key: string]: number[] | number };
  /**
   * Collision shapes by id, each shape being composed of a list of collision boxes.
   */
  shapes: { [key: string]: number[][] };
}

export interface BlockLoot {
  /**
   * The name of the block
   */
  block: string;
  /**
   * The list of item drops
   */
  drops: BlockLootDrop[];
}

export interface BlockLootDrop {
  /**
   * The required age of the block for the item drop to occur
   */
  blockAge?: number;
  /**
   * The percent chance of the item drop to occur
   */
  dropChance: number;
  /**
   * The name of the item being dropped
   */
  item: string;
  /**
   * If not having silk touch is required
   */
  noSilkTouch?: boolean;
  /**
   * If silk touch is required
   */
  silkTouch?: boolean;
  /**
   * The min/max of number of items in this item drop stack
   */
  stackSizeRange: any[];
}

export interface Blocks {
  /**
   * BoundingBox of a block
   */
  boundingBox: BoundingBox;
  /**
   * Default state id
   */
  defaultState?: number;
  /**
   * true if a block is diggable
   */
  diggable: boolean;
  /**
   * The display name of a block
   */
  displayName: string;
  drops: Array<PurpleDrop | number>;
  /**
   * Light emitted by that block
   */
  emitLight: number;
  /**
   * Light filtered by that block
   */
  filterLight: number;
  /**
   * Hardness of a block
   */
  hardness: number | null;
  /**
   * Using one of these tools is required to harvest a block, without that you get a 3.33x
   * time penalty.
   */
  harvestTools?: { [key: string]: any };
  /**
   * The unique identifier for a block
   */
  id: number;
  /**
   * Material of a block
   */
  material?: string;
  /**
   * Maximum state id
   */
  maxStateId?: number;
  /**
   * Minimum state id
   */
  minStateId?: number;
  /**
   * The name of a block
   */
  name: string;
  /**
   * Stack size for a block
   */
  stackSize: number;
  states?: State[];
  /**
   * true if a block is transparent
   */
  transparent: boolean;
  variations?: BlockVariation[];
}

/**
 * BoundingBox of a block
 */
export enum BoundingBox {
  Block = "block",
  Empty = "empty",
}

export interface PurpleDrop {
  drop: FluffyDrop | number;
  /**
   * maximum number or chance, default : minCount
   */
  maxCount?: number;
  /**
   * minimum number or chance, default : 1
   */
  minCount?: number;
}

export interface FluffyDrop {
  id: number;
  metadata: number;
}

export interface State {
  /**
   * The name of the property
   */
  name: string;
  /**
   * The number of possible values
   */
  num_values: number;
  /**
   * The type of the property
   */
  type: StateType;
  /**
   * The possible values of the property
   */
  values?: any[];
}

/**
 * The type of the property
 */
export enum StateType {
  Bool = "bool",
  Enum = "enum",
  Int = "int",
}

export interface BlockVariation {
  displayName: string;
  metadata: number;
}

export interface CommandsSchema {
  graph?: RootNode;
  parsers: ParserInfo[];
  root: any;
}

export interface RootNode {
  children: Node[];
  executable: boolean;
  name: string;
  redirects: string[];
  type: GraphType;
}

export interface Node {
  children: Node[];
  executable: boolean;
  name: string;
  redirects: string[];
  type: ChildType;
  parser?: Parser;
}

export interface Parser {
  modifier?: { [key: string]: any } | null;
  parser?: string;
}

export enum ChildType {
  Argument = "argument",
  Literal = "literal",
}

export enum GraphType {
  Root = "root",
}

export interface ParserInfo {
  examples: string[];
  modifier: { [key: string]: any } | null;
  parser: string;
}

export interface Effects {
  /**
   * The display name of an effect
   */
  displayName: string;
  /**
   * The unique identifier for an effect
   */
  id: number;
  /**
   * The name of an effect
   */
  name: string;
  /**
   * Whether an effect is positive or negative
   */
  type: EffectType;
}

/**
 * Whether an effect is positive or negative
 */
export enum EffectType {
  Bad = "bad",
  Good = "good",
}

export interface Enchantments {
  /**
   * The display name of an enchantment
   */
  displayName: string;
  /**
   * The unique identifier for an enchantment
   */
  id: number;
  /**
   * The name of an enchantment
   */
  name: string;
}

export interface Entities {
  /**
   * The category of an entity : a semantic category
   */
  category?: string;
  /**
   * The display name of an entity
   */
  displayName: string;
  /**
   * The height of the entity
   */
  height: number | null;
  /**
   * The unique identifier for an entity
   */
  id: number;
  /**
   * The internal id of an entity : used in eggs metadata for example
   */
  internalId?: number;
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
}

export interface EntityLoot {
  /**
   * The list of item drops
   */
  drops: EntityLootDrop[];
  /**
   * The name of the entity
   */
  entity: string;
}

export interface EntityLootDrop {
  /**
   * The percent chance of the item drop to occur
   */
  dropChance: number;
  /**
   * The name of the item being dropped
   */
  item: string;
  /**
   * If a player killer is required
   */
  playerKill?: boolean;
  /**
   * The min/max of number of items in this item drop stack
   */
  stackSizeRange: any[];
}

export interface Foods {
  /**
   * The display name of an item
   */
  displayName: string;
  /**
   * The effective quality of the food item
   */
  effectiveQuality: number;
  /**
   * The amount of food points the food item replenishes
   */
  foodPoints: number;
  /**
   * The unique identifier for an item
   */
  id: number;
  /**
   * The name of an item
   */
  name: string;
  /**
   * The amount of saturation points the food  restores
   */
  saturation: number;
  /**
   * The saturation ratio of the food item
   */
  saturationRatio: number;
  /**
   * Stack size for an item
   */
  stackSize: number;
  variations?: FoodVariation[];
}

export interface FoodVariation {
  displayName: string;
  metadata: number;
}

export interface Instruments {
  /**
   * The unique identifier for an instrument
   */
  id: number;
  /**
   * The name of an instrument
   */
  name: string;
}

export interface Items {
  /**
   * The display name of an item
   */
  displayName: string;
  /**
   * The durability of an item
   */
  durability?: number | null;
  /**
   * The unique identifier for an item
   */
  id: number;
  /**
   * The name of an item
   */
  name: string;
  /**
   * Stack size for an item
   */
  stackSize: number;
  variations?: ItemVariation[];
}

export interface ItemVariation {
  displayName: string;
  metadata: number;
}

export interface Materials {}

export interface Particles {
  /**
   * The unique identifier for a particle
   */
  id?: number;
  /**
   * The name of a particle
   */
  name?: string;
}

export interface ProtocolVersions {
  dataVersion?: number;
  majorVersion: string;
  minecraftVersion: string;
  usesNetty?: boolean;
  /**
   * The protocol version
   */
  version: number;
}

/**
 * A dictionary of quoted numerical item IDs. Each ID maps to a list of recipes. There may
 * be multiple different recipes per item (same ID and metadata). The recipes may not be
 * sorted.
 */
export interface Recipes {}

export interface Version {
  majorVersion?: string;
  minecraftVersion?: string;
  /**
   * The protocol version
   */
  version?: number;
}

export interface Windows {
  /**
   * The unique identifier for the window
   */
  id: string;
  /**
   * The default displayed name of the window
   */
  name: string;
  openedWith?: OpenedWith[];
  /**
   * Names of the properties of the window
   */
  properties?: string[];
  /**
   * The slots displayed in the window
   */
  slots?: Slot[];
}

export interface OpenedWith {
  id: number;
  type: OpenedWithType;
}

export enum OpenedWithType {
  Block = "block",
  Entity = "entity",
  Item = "item",
}

/**
 * A slot or slot range in the window
 */
export interface Slot {
  /**
   * The position of the slot or begin of the slot range
   */
  index: number;
  /**
   * The name of the slot or slot range
   */
  name: string;
  /**
   * The size of the slot range
   */
  size?: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toBiomes(json: string): Biomes[] {
    return cast(JSON.parse(json), a(r("Biomes")));
  }

  public static biomesToJson(value: Biomes[]): string {
    return JSON.stringify(uncast(value, a(r("Biomes"))), null, 2);
  }

  public static toBlockCollisionShapes(json: string): BlockCollisionShapes {
    return cast(JSON.parse(json), r("BlockCollisionShapes"));
  }

  public static blockCollisionShapesToJson(
    value: BlockCollisionShapes
  ): string {
    return JSON.stringify(uncast(value, r("BlockCollisionShapes")), null, 2);
  }

  public static toBlockLoot(json: string): BlockLoot[] {
    return cast(JSON.parse(json), a(r("BlockLoot")));
  }

  public static blockLootToJson(value: BlockLoot[]): string {
    return JSON.stringify(uncast(value, a(r("BlockLoot"))), null, 2);
  }

  public static toBlocks(json: string): Blocks[] {
    return cast(JSON.parse(json), a(r("Blocks")));
  }

  public static blocksToJson(value: Blocks[]): string {
    return JSON.stringify(uncast(value, a(r("Blocks"))), null, 2);
  }

  public static toCommandsSchema(json: string): CommandsSchema {
    return cast(JSON.parse(json), r("CommandsSchema"));
  }

  public static commandsSchemaToJson(value: CommandsSchema): string {
    return JSON.stringify(uncast(value, r("CommandsSchema")), null, 2);
  }

  public static toEffects(json: string): Effects[] {
    return cast(JSON.parse(json), a(r("Effects")));
  }

  public static effectsToJson(value: Effects[]): string {
    return JSON.stringify(uncast(value, a(r("Effects"))), null, 2);
  }

  public static toEnchantments(json: string): Enchantments[] {
    return cast(JSON.parse(json), a(r("Enchantments")));
  }

  public static enchantmentsToJson(value: Enchantments[]): string {
    return JSON.stringify(uncast(value, a(r("Enchantments"))), null, 2);
  }

  public static toEntities(json: string): Entities[] {
    return cast(JSON.parse(json), a(r("Entities")));
  }

  public static entitiesToJson(value: Entities[]): string {
    return JSON.stringify(uncast(value, a(r("Entities"))), null, 2);
  }

  public static toEntityLoot(json: string): EntityLoot[] {
    return cast(JSON.parse(json), a(r("EntityLoot")));
  }

  public static entityLootToJson(value: EntityLoot[]): string {
    return JSON.stringify(uncast(value, a(r("EntityLoot"))), null, 2);
  }

  public static toFoods(json: string): Foods[] {
    return cast(JSON.parse(json), a(r("Foods")));
  }

  public static foodsToJson(value: Foods[]): string {
    return JSON.stringify(uncast(value, a(r("Foods"))), null, 2);
  }

  public static toInstruments(json: string): Instruments[] {
    return cast(JSON.parse(json), a(r("Instruments")));
  }

  public static instrumentsToJson(value: Instruments[]): string {
    return JSON.stringify(uncast(value, a(r("Instruments"))), null, 2);
  }

  public static toItems(json: string): Items[] {
    return cast(JSON.parse(json), a(r("Items")));
  }

  public static itemsToJson(value: Items[]): string {
    return JSON.stringify(uncast(value, a(r("Items"))), null, 2);
  }

  public static toMaterials(json: string): Materials {
    return cast(JSON.parse(json), r("Materials"));
  }

  public static materialsToJson(value: Materials): string {
    return JSON.stringify(uncast(value, r("Materials")), null, 2);
  }

  public static toParticles(json: string): Particles[] {
    return cast(JSON.parse(json), a(r("Particles")));
  }

  public static particlesToJson(value: Particles[]): string {
    return JSON.stringify(uncast(value, a(r("Particles"))), null, 2);
  }

  public static toProtocolVersions(json: string): ProtocolVersions[] {
    return cast(JSON.parse(json), a(r("ProtocolVersions")));
  }

  public static protocolVersionsToJson(value: ProtocolVersions[]): string {
    return JSON.stringify(uncast(value, a(r("ProtocolVersions"))), null, 2);
  }

  public static toRecipes(json: string): Recipes {
    return cast(JSON.parse(json), r("Recipes"));
  }

  public static recipesToJson(value: Recipes): string {
    return JSON.stringify(uncast(value, r("Recipes")), null, 2);
  }

  public static toVersion(json: string): Version {
    return cast(JSON.parse(json), r("Version"));
  }

  public static versionToJson(value: Version): string {
    return JSON.stringify(uncast(value, r("Version")), null, 2);
  }

  public static toWindows(json: string): Windows[] {
    return cast(JSON.parse(json), a(r("Windows")));
  }

  public static windowsToJson(value: Windows[]): string {
    return JSON.stringify(uncast(value, a(r("Windows"))), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any = ""): never {
  if (key) {
    throw Error(
      `Invalid value for key "${key}". Expected type ${JSON.stringify(
        typ
      )} but got ${JSON.stringify(val)}`
    );
  }
  throw Error(
    `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
  );
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ""): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.includes(val)) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, prop.key);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Biomes: o(
    [
      { json: "color", js: "color", typ: u(undefined, 0) },
      { json: "displayName", js: "displayName", typ: u(undefined, "") },
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "rainfall", js: "rainfall", typ: 3.14 },
      { json: "temperature", js: "temperature", typ: 3.14 },
    ],
    false
  ),
  BlockCollisionShapes: o(
    [
      { json: "blocks", js: "blocks", typ: m(u(a(3.14), 3.14)) },
      { json: "shapes", js: "shapes", typ: m(a(a(3.14))) },
    ],
    false
  ),
  BlockLoot: o(
    [
      { json: "block", js: "block", typ: "" },
      { json: "drops", js: "drops", typ: a(r("BlockLootDrop")) },
    ],
    false
  ),
  BlockLootDrop: o(
    [
      { json: "blockAge", js: "blockAge", typ: u(undefined, 3.14) },
      { json: "dropChance", js: "dropChance", typ: 3.14 },
      { json: "item", js: "item", typ: "" },
      { json: "noSilkTouch", js: "noSilkTouch", typ: u(undefined, true) },
      { json: "silkTouch", js: "silkTouch", typ: u(undefined, true) },
      { json: "stackSizeRange", js: "stackSizeRange", typ: a("any") },
    ],
    false
  ),
  Blocks: o(
    [
      { json: "boundingBox", js: "boundingBox", typ: r("BoundingBox") },
      { json: "defaultState", js: "defaultState", typ: u(undefined, 0) },
      { json: "diggable", js: "diggable", typ: true },
      { json: "displayName", js: "displayName", typ: "" },
      { json: "drops", js: "drops", typ: a(u(r("PurpleDrop"), 0)) },
      { json: "emitLight", js: "emitLight", typ: 0 },
      { json: "filterLight", js: "filterLight", typ: 0 },
      { json: "hardness", js: "hardness", typ: u(3.14, null) },
      { json: "harvestTools", js: "harvestTools", typ: u(undefined, m("any")) },
      { json: "id", js: "id", typ: 0 },
      { json: "material", js: "material", typ: u(undefined, "") },
      { json: "maxStateId", js: "maxStateId", typ: u(undefined, 0) },
      { json: "minStateId", js: "minStateId", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: "" },
      { json: "stackSize", js: "stackSize", typ: 0 },
      { json: "states", js: "states", typ: u(undefined, a(r("State"))) },
      { json: "transparent", js: "transparent", typ: true },
      {
        json: "variations",
        js: "variations",
        typ: u(undefined, a(r("BlockVariation"))),
      },
    ],
    false
  ),
  PurpleDrop: o(
    [
      { json: "drop", js: "drop", typ: u(r("FluffyDrop"), 0) },
      { json: "maxCount", js: "maxCount", typ: u(undefined, 3.14) },
      { json: "minCount", js: "minCount", typ: u(undefined, 3.14) },
    ],
    false
  ),
  FluffyDrop: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "metadata", js: "metadata", typ: 0 },
    ],
    false
  ),
  State: o(
    [
      { json: "name", js: "name", typ: "" },
      { json: "num_values", js: "num_values", typ: 3.14 },
      { json: "type", js: "type", typ: r("StateType") },
      { json: "values", js: "values", typ: u(undefined, a("any")) },
    ],
    false
  ),
  BlockVariation: o(
    [
      { json: "displayName", js: "displayName", typ: "" },
      { json: "metadata", js: "metadata", typ: 0 },
    ],
    false
  ),
  CommandsSchema: o(
    [
      { json: "graph", js: "graph", typ: u(undefined, r("RootNode")) },
      { json: "parsers", js: "parsers", typ: a(r("ParserInfo")) },
      { json: "root", js: "root", typ: "any" },
    ],
    "any"
  ),
  RootNode: o(
    [
      { json: "children", js: "children", typ: a(r("Node")) },
      { json: "executable", js: "executable", typ: true },
      { json: "name", js: "name", typ: "" },
      { json: "redirects", js: "redirects", typ: a("") },
      { json: "type", js: "type", typ: r("GraphType") },
    ],
    "any"
  ),
  Node: o(
    [
      { json: "children", js: "children", typ: a(r("Node")) },
      { json: "executable", js: "executable", typ: true },
      { json: "name", js: "name", typ: "" },
      { json: "redirects", js: "redirects", typ: a("") },
      { json: "type", js: "type", typ: r("ChildType") },
      { json: "parser", js: "parser", typ: u(undefined, r("Parser")) },
    ],
    "any"
  ),
  Parser: o(
    [
      {
        json: "modifier",
        js: "modifier",
        typ: u(undefined, u(m("any"), null)),
      },
      { json: "parser", js: "parser", typ: u(undefined, "") },
    ],
    "any"
  ),
  ParserInfo: o(
    [
      { json: "examples", js: "examples", typ: a("") },
      { json: "modifier", js: "modifier", typ: u(m("any"), null) },
      { json: "parser", js: "parser", typ: "" },
    ],
    "any"
  ),
  Effects: o(
    [
      { json: "displayName", js: "displayName", typ: "" },
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "type", js: "type", typ: r("EffectType") },
    ],
    false
  ),
  Enchantments: o(
    [
      { json: "displayName", js: "displayName", typ: "" },
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
    ],
    false
  ),
  Entities: o(
    [
      { json: "category", js: "category", typ: u(undefined, "") },
      { json: "displayName", js: "displayName", typ: "" },
      { json: "height", js: "height", typ: u(3.14, null) },
      { json: "id", js: "id", typ: 0 },
      { json: "internalId", js: "internalId", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: "" },
      { json: "type", js: "type", typ: "" },
      { json: "width", js: "width", typ: u(3.14, null) },
    ],
    false
  ),
  EntityLoot: o(
    [
      { json: "drops", js: "drops", typ: a(r("EntityLootDrop")) },
      { json: "entity", js: "entity", typ: "" },
    ],
    false
  ),
  EntityLootDrop: o(
    [
      { json: "dropChance", js: "dropChance", typ: 3.14 },
      { json: "item", js: "item", typ: "" },
      { json: "playerKill", js: "playerKill", typ: u(undefined, true) },
      { json: "stackSizeRange", js: "stackSizeRange", typ: a("any") },
    ],
    false
  ),
  Foods: o(
    [
      { json: "displayName", js: "displayName", typ: "" },
      { json: "effectiveQuality", js: "effectiveQuality", typ: 3.14 },
      { json: "foodPoints", js: "foodPoints", typ: 3.14 },
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "saturation", js: "saturation", typ: 3.14 },
      { json: "saturationRatio", js: "saturationRatio", typ: 3.14 },
      { json: "stackSize", js: "stackSize", typ: 0 },
      {
        json: "variations",
        js: "variations",
        typ: u(undefined, a(r("FoodVariation"))),
      },
    ],
    false
  ),
  FoodVariation: o(
    [
      { json: "displayName", js: "displayName", typ: "" },
      { json: "metadata", js: "metadata", typ: 0 },
    ],
    false
  ),
  Instruments: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
    ],
    false
  ),
  Items: o(
    [
      { json: "displayName", js: "displayName", typ: "" },
      { json: "durability", js: "durability", typ: u(undefined, u(0, null)) },
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "stackSize", js: "stackSize", typ: 0 },
      {
        json: "variations",
        js: "variations",
        typ: u(undefined, a(r("ItemVariation"))),
      },
    ],
    false
  ),
  ItemVariation: o(
    [
      { json: "displayName", js: "displayName", typ: "" },
      { json: "metadata", js: "metadata", typ: 0 },
    ],
    false
  ),
  Materials: o([], false),
  Particles: o(
    [
      { json: "id", js: "id", typ: u(undefined, 0) },
      { json: "name", js: "name", typ: u(undefined, "") },
    ],
    "any"
  ),
  ProtocolVersions: o(
    [
      { json: "dataVersion", js: "dataVersion", typ: u(undefined, 0) },
      { json: "majorVersion", js: "majorVersion", typ: "" },
      { json: "minecraftVersion", js: "minecraftVersion", typ: "" },
      { json: "usesNetty", js: "usesNetty", typ: u(undefined, true) },
      { json: "version", js: "version", typ: 0 },
    ],
    false
  ),
  Recipes: o([], false),
  Version: o(
    [
      { json: "majorVersion", js: "majorVersion", typ: u(undefined, "") },
      {
        json: "minecraftVersion",
        js: "minecraftVersion",
        typ: u(undefined, ""),
      },
      { json: "version", js: "version", typ: u(undefined, 0) },
    ],
    false
  ),
  Windows: o(
    [
      { json: "id", js: "id", typ: "" },
      { json: "name", js: "name", typ: "" },
      {
        json: "openedWith",
        js: "openedWith",
        typ: u(undefined, a(r("OpenedWith"))),
      },
      { json: "properties", js: "properties", typ: u(undefined, a("")) },
      { json: "slots", js: "slots", typ: u(undefined, a(r("Slot"))) },
    ],
    false
  ),
  OpenedWith: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "type", js: "type", typ: r("OpenedWithType") },
    ],
    false
  ),
  Slot: o(
    [
      { json: "index", js: "index", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "size", js: "size", typ: u(undefined, 0) },
    ],
    false
  ),
  BoundingBox: ["block", "empty"],
  StateType: ["bool", "enum", "int"],
  ChildType: ["argument", "literal"],
  GraphType: ["root"],
  EffectType: ["bad", "good"],
  OpenedWithType: ["block", "entity", "item"],
};
