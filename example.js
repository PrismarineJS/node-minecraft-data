var mcData=require("minecraft-data")("1.8.8");

console.log(mcData.blocksByName["stone"]);
console.log(mcData.windows["minecraft:brewing_stand"]);
console.log(mcData.version);
console.log(mcData.effectsByName["Haste"]);


console.log(mcData.mobs[62]);
console.log(mcData.objects[62]);

console.log(require("minecraft-data").versionsByMinecraftVersion["1.8.8"]);

console.log(require("minecraft-data").versionsByMinecraftVersion["15w40b"]);


console.log(require("minecraft-data").preNettyVersionsByProtocolVersion[47]);

console.log(require("minecraft-data").postNettyVersionsByProtocolVersion[47][0]);


console.log(require("minecraft-data")(47).version);

console.log(require("minecraft-data")("1.8").version);


console.log(require("minecraft-data")("15w40b").version);

console.log(require("minecraft-data")("0.30c").version);