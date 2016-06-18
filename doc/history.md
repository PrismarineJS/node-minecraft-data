## 2.5.1
* update mcdata, fix 1.10 version

## 2.5.0
* update mcdata to 2.3.0, add 1.10 support

## 2.4.0
* update to mcdata 2.2.0, add pe protocol

## 2.3.0
* update minecraft-data to 2.1.0, add pc 1.10-pre1 support

## 2.2.0
* add type (pe or pc) to API

## 2.1.0
* use blocks of pc 1.8 for pe 0.14

## 2.0.0
* update to minecraft-data to 2.0.0, adapt to handle both pc and pe
* the api of versionsByMinecraftVersion changed : now indexed by pc and pe : BREAKING CHANGE

## 1.6.0
* update minecraft-data to 1.1.0, add 16w20a support (1.1.0)

## 1.5.0
* update minecraft-data to 1.0.0, add 1.9.4 support

## 1.4.1
* actually add 1.9.2 support

## 1.4.0
* update mcdata : 1.9.2 support

## 1.3.1
* fix release (submodule)

## 1.3.0
* export schemas

## 1.2.6
* update mcdata : add 1.9.1-pre2

## 1.2.5
* update mcdata : fix in 1.9 protocol

## 1.2.4
* i8 not byte

## 1.2.3
* a few fixes in 1.9 protocol

## 1.2.2
* update mcdata : 1.9 release

## 1.2.1
* update minecraft-data : update blocks, items and recipes in 1.9, and fix a small error in 1.9 protocol

## 1.2.0
* update 1.9 protocol to 1.9-pre4

## 1.1.0
* update mcdata : protocol schema change, add classic

## 1.0.3
* update mcdata : 1.9 protocol fix

## 1.0.2
* forgot a short in 1.7 protocol

## 1.0.1
* update mcdata : fix short in 1.7 protocol

## 1.0.0
* update minecraft data, protocol.json has new numerical type names

## 0.20.4
* update minecraft-data : 1.7 plugin channel data buffers are length-prefixed

## 0.20.3
* update mcdata : fix in 1.7 protocol

## 0.20.2
* update minecraft-data : a fix in the key of 1.7 protocol

## 0.20.1
* fix release

## 0.20.0
* 1.9 updated to 16w05b
* 15w40b support kept
* 1.7 support added
* add transparency and light data in blocks

## 0.19.1
* fix release (missing submodule)

## 0.19.0
* move protocol data to top level
* expose preNettyVersionsByProtocolVersion and postNettyVersionsByProtocolVersion
* use it for a better resolution of the "major" version

## 0.18.0
* add protocol versions

## 0.17.0
* some windows fixing
* update entities : now mobs and objects

## 0.16.3
* use require-self to use require('minecraft-data') in example and make tonicdev actually work

## 0.16.2
* Usage -> Example, for tonicdev integration

## 0.16.1
 * update mcData : improvement in the protocol for slot, optionalNbt and nbt

## 0.16.0
 * add effects

## 0.15.0
 * make node-minecraft-data browserify compatible

## 0.14.0
 * move to new minecraft-data organization: master branch containing all the versions instead of one branch per version

## 0.13.0
 * minecraft-data 1.9 to 15w40b + 76

## 0.12.0
 * update minecraft-data : update 1.8 version to 1.8.8, update 1.9 version to 15w39c
 
## 0.11.0
 * update minecraft-data : in protocol.json the context is now implemented with ../ instead of this.

## 0.10.0
 * add version to the API

## 0.9.0
 * update minecraft-data : windows and protocol updates

## 0.8.1
 * actually update protocol.json

## 0.8.0
 * update protocol.json
 * add windows

## 0.7.0
 * update protocol.json : condition becomes switch

## 0.6.0
 * update protocol.json in 1.8 and 1.9 : the schema is now better for types (see minecraft-data for more details)

## 0.5.2
 * update README and example : the package is now called minecraft-data in npm

## 0.5.1
 * fix bug with fs.existsSync
 * fix npm badge in readme

## 0.5.0
 * bumping a few versions because package now published as minecraft-data
 * add multi-version support
 * add protocol.json access

## 0.2.0
 * add unindexed version of blocks, items, biomes, instruments and entities

## 0.1.2
 * fix bug in indexes

## 0.1.1
 * fix bug in find functions

## 0.1.0

 * provide : id-indexed data, name-indexed data and two functions to find items or blocks
