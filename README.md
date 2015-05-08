# node-minecraft-data
[![NPM version](https://badge.fury.io/js/node-minecraft-data.svg)](http://badge.fury.io/js/node-minecraft-data)

node-minecraft-data provides easy access to minecraft-data in node.js.

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
var nmcData=require("node-minecraft-data");

console.log(nmcData.blocksByName["stone"]);
```

## Documentation

 * See [doc/api.md](doc/api.md)
 * See [doc/history.md](doc/history.md)
