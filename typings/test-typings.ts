import getMcData = require('../')
const mcData = getMcData('1.8.8')

console.log(mcData.blocksByName['stone'])
console.log(mcData.windows['minecraft:brewing_stand'])
console.log(mcData.version)
console.log(mcData.effectsByName['Haste'])

console.log(mcData.mobs[62])
console.log(mcData.objects[62])

console.log(getMcData.versionsByMinecraftVersion['pc']['1.8.8'])

console.log(getMcData.versionsByMinecraftVersion['pc']['15w40b'])

console.log(getMcData.preNettyVersionsByProtocolVersion['pc'][47])

console.log(getMcData.postNettyVersionsByProtocolVersion['pc'][47][0])

console.log(getMcData(47).version)

const supportFeature: boolean = getMcData('1.8.8').supportFeature('mobSpawner')
console.log(supportFeature)
const supportFeature2: 'string' | 'short' = getMcData('1.8.8').supportFeature('typeOfValueForEnchantLevel')
console.log(supportFeature2)

console.log(getMcData('1.8').version)

console.log(getMcData('15w40b').version)

console.log(getMcData('0.30c').version)

console.log(getMcData('bedrock_0.14').version)

console.log(getMcData('pc_1.9').blocksByName['dirt'])
console.log(getMcData('pc_1.9').blocksByName['dirt'].minStateId.toExponential)
console.log(getMcData('pc_1.9').blocksByName['dirt'].name.includes)

console.log(getMcData('pc_1.9').protocol.toClient)

console.log(getMcData('bedrock_0.14').blocksByName['podzol'])
console.log(getMcData('bedrock_0.14').type)

console.log(getMcData('1.8').enchantments[5])

console.log(getMcData.supportedVersions.pc)

console.log(getMcData.schemas.blocks)

console.log(getMcData('1.12').language['options.sensitivity.max'])
