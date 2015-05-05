# node-minecraft-data

node-minecraft-data provides easy access to minecraft-data in node.js.

The objective of this package is to make looking for information into minecraft-data in node projects.

For example it's often useful to : 

* find blocks by id
* find items by name
* find block or item by name
* find block or item by id

Simple example of usage of node-minecraft-data : 

```js
var nmcData=require("node-minecraft-data");

console.log(nmcData.blocksByName["stone"]);
```