# node-minecraft-data

node-minecraft-data provides easy access to minecraft-data in node.js.

The objective of this package is to make looking for information into minecraft-data in node projects.

## Features

For example it's often useful to : 

* find blocks by id
* find items by name
* find block or item by name
* find block or item by id

## Usage

Simple example of usage of node-minecraft-data : 

```js
var nmcData=require("node-minecraft-data");

console.log(nmcData.blocksByName["stone"]);
```

## API

### node-minecraft-data.blocks

blocks indexed by id

### node-minecraft-data.blocksByName

blocks indexed by name

### node-minecraft-data.items

items indexed by id

### node-minecraft-data.itemsByName

items indexed by name

### node-minecraft-data.biomes

biomes indexed by id

### node-minecraft-data.recipes

recipes indexed by id

### node-minecraft-data.instruments

instruments indexed by id

### node-minecraft-data.materials

materials indexed by id

### node-minecraft-data.entities

entities indexed by id

### node-minecraft-data.entitiesByName

entities indexed by name

### node-minecraft-data.findItemOrBlockById

find a block or an item by its id

### node-minecraft-data.findItemOrBlockByName

find a block or an item by its name