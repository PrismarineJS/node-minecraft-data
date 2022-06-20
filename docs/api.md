# API

Import the module:

```js
const MinecraftData = require('minecraft-data');

const minecraftData = MinecraftData('1.19');
```

or using es6 import syntax:

```js
import MinecraftData from 'minecraft-data';

const minecraftData = MinecraftData('1.19');
```

All examples reference `MinecraftData` as the module, and `minecraftData` as the version data.

## Blocks

### `minecraftData.blocks`

Blocks indexed by id

### `minecraftData.blocksByName`

Blocks indexed by name

### `minecraftData.blocksArray`

Array of blocks

### `minecraftData.blocksByStateId`

Blocks indexed by state id

### `minecraftData.blockStates`

**_Bedrock edition only_**

Block states

### `minecraftData.blockCollisionShapes`

Block collision shapes

## Items

### `minecraftData.items`

Items indexed by id

### `minecraftData.itemsByName`

Items indexed by name

### `minecraftData.itemsArray`

Array of items

## Foods

### `minecraftData.foods`

Foods indexed by id

### `minecraftData.foodsByName`

Foods indexed by name

### `minecraftData.foodsByFoodPoints`

Foods indexed by food points

### `minecraftData.foodsBySaturation`

Foods indexed by saturation

### `minecraftData.foodsArray`

Array of foods

## Biomes

### `minecraftData.biomes`

Biomes indexed by id

### `minecraftData.biomesByName`

Biomes indexed by name

### `minecraftData.biomesArray`

Array of biomes

## Recipes

### `minecraftData.recipes`

Recipes indexed by the resulting item id

## Instruments

### `minecraftData.instruments`

Instruments indexed by id

### `minecraftData.instrumentsArray`

Array of instruments

## Materials

### `minecraftData.materials`

materials indexed by name

## Entities

### `minecraftData.mobs`

Mobs (passive, neutral, and hostile) indexed by id

### `minecraftData.objects`

Objects (non-mob entities such as vehicles and projectiles) indexed by id

### `minecraftData.entitiesByName`

Entities indexed by name

### `minecraftData.entitiesArray`

Array of entities

## Enchantments

### `minecraftData.enchantments`

Enchantments indexed by id

### `minecraftData.enchantmentsByName`

Enchantments indexed by name

### `minecraftData.enchantmentsArray`

Array of enchantments

### `minecraftData.defaultSkin`

**_Bedrock edition only_**

Skin geometry and texture data for default player skin

## Protocol

### `minecraftData.protocol`

The Minecraft protocol

### `minecraftData.protocolComments`

The Minecraft protocol comments

### `minecraftData.protocolYaml`

**_Bedrock edition only_**

The url to the file of the protocol yaml

## Windows (GUIs)

### `minecraftData.windows`

Windows indexed by id

### `minecraftData.windowsByName`

Windows indexed by name

### `minecraftData.windowsArray`

Array of windows

## Version

For version comparison, the other version must be of the same type, and the prefix is always implied

### `minecraftData.version.version`

The version number

### `minecraftData.version.minecraftVersion`

The full Minecraft version

### `minecraftData.version.type`

The version type, either `pc` or `bedrock`

### `minecraftData.version.majorVersion`

The major Minecraft version

### `minecraftData.version.dataVersion`

The "data version" for this Minecraft version, used for example when writing chunks to disk

### `minecraftData.version.[<](<version>)`, `minecraftData.isOlderThan(<version>)`

Returns `true` if the current version is less than than the other version's `dataVersion`, or else `false`

### `minecraftData.version.[<=](<version>)`, `minecraftVersion.isOlderOrEqualTo(<version>)`

Same as above but also checks for an equivalent `dataVersion`

### `minecraftData.version.[==](<version>)`, `minecraftVersion.isEqualTo(<version>)`

Returns `true` if the current version is equal to the other version's `dataVersion`, or else `false`

### `minecraftData.version.[>](<version>)`, `minecraftVersion.isNewerThan(<version>)`

Returns `true` if the current version is greater than the other version's `dataVersion`, or else `false`

### `minecraftData.version.[>=](<version>)`, `minecraftVersion.isNewerOrEqualTo(<version>)`

Same as above but also checks for an equivalent `dataVersion`

Example Usage:

```js
const minecraftData = MinecraftData('1.16.4');
console.log(minecraftData.version['>=']('1.17')); // False, 1.16.4 is older than 1.17

const minecraftData = MinecraftData('bedrock_1.17.0');
console.log(minecraftData.version['>']('1.16.220')); // True, 1.17.0 is newer than 1.16.220
```

## Effects

### `minecraftData.effects`

Effects indexed by id

### `minecraftData.effectsByName`

Effects indexed by name

### `minecraftData.effectsArray`

Array of effects

## Attributes

### `minecraftData.attributes`

Attributes indexed by resource name (example: `minecraft:generic.movement_speed`)

### `minecraftData.attributesByName`

Attributes indexed by name (in camelCase, example: `movementSpeed`)

### `minecraftData.attributesArray`

Array of attributes

## Particles

### `minecraftData.particles`

Particles indexed by id

### `minecraftData.particlesByName`

Particles indexed by name

### `minecraftData.particlesArray`

Array of particles

## Commands

### `minecraftData.commands.root`

Commands and parsers

## Loot

### `minecraftData.entityLoot`

Entity loot indexed by entity name

### `minecraftData.entityLootArray`

Array of entity loot

### `minecraftData.blockLoot`

Block loot indexed by block name

### `minecraftData.blockLootArray`

Array of block loot

## Map icons

### `minecraftData.mapIcons`

Map icons indexed by id

### `minecraftData.mapIconsByName`

Map icons indexed by name

### `minecraftData.mapIconsArray`

Array of map icons

### `minecraftData.type`

The type of the current version, either `pc` or `bedrock`

### minecraftData.language

Object containing `en_US` language conversions

### minecraftData.loginPacket

Login packet example

### `minecraftData.supportFeature(<feature>)`

This can be used to check if a specific feature is available in the current Minecraft version. This is usually only used for handling version-specific functionality.

## Tints

### `minecraftData.tints`

Tints indexed by the tint type (`grass`, `foliage`, `water`, `redstone`, `constant`)

## Protocol versions

These are common data and directly available in the `MinecraftData` object.
No need to specify a version before accessing them.

### `MinecraftData.versions`

Array of all Minecraft versions (separated into `pc` (java) and `bedrock`)

### `MinecraftData.versionsByMinecraftVersion`

All versions indexed by Minecraft version (separated into `pc` (java) and `bedrock`)

### `MinecraftData.preNettyVersionsByProtocolVersion`

Pre-netty Minecraft versions indexed by protocol version (separated into `pc` (java) and `bedrock`)

### `MinecraftData.postNettyVersionsByProtocolVersion`

Post netty minecraft versions indexed by protocol version (separated into `pc` (java) and `bedrock`)

### `MinecraftData.supportedVersions`

Array of supported versions (separated into `pc` (java) and `bedrock`)

### `MinecraftData.legacy.pc.blocks`

Mapping from 1.12 block:metadata to 1.13 block names

## Schemas

These are common data and directly available in the `MinecraftData` object.
No need to specify a version before accessing them.

Available schemas:

`biomes`, `blocks`, `blockLoot`, `effects`, `entities`, `entityLoot`, `instruments`, `items`, `materials`, `particles`, `protocol`, `protocolVersions`, `recipes`, `version`, `windows`
