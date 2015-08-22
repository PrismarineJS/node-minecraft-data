# node-minecraft-data
[![NPM version](https://badge.fury.io/js/minecraft-data.svg)](http://badge.fury.io/js/minecraft-data)

node-minecraft-data provides easy access to [minecraft-data](https://github.com/PrismarineJS/minecraft-data) in node.js.

The objective of this module is to make easier to look for information in minecraft-data in node.

## Features

For example it's often useful to : 

* find blocks by id
* find items by name
* find block or item by name
* find block or item by id

## Usage

Simple example of usage of node-minecraft-data : 

```js
var mcData=require("minecraft-data")("1.8.8");

console.log(mcData.blocksByName["stone"]);
```

## Documentation

 * See [doc/api.md](doc/api.md)
 * See [doc/history.md](doc/history.md)
