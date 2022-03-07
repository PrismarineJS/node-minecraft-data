const features = require('../minecraft-data/data/pc/common/features.json')

const versions = {
  pc: require('../minecraft-data/data/pc/common/protocolVersions.json'),
  bedrock: require('../minecraft-data/data/bedrock/common/protocolVersions.json')
}
const versionList = versions.pc
const versionToIndex = Object.fromEntries(versionList.map((version, i) => [version.minecraftVersion, versionList.length - i]))
const nameToFeature = Object.fromEntries(features.map(feature => [feature.name, feature]))

module.exports = (featureName, minecraftVersion) => {
  const feature = nameToFeature[featureName]
  if (feature === undefined) {
    throw new Error(`Feature ${feature} doesn't exist`)
  }

  const currentVer = versionToIndex[minecraftVersion]
  const minVer = versionToIndex[feature.versions[0]]
  const maxVer = versionToIndex[feature.versions[1]]
  if (currentVer === undefined) {
    throw new Error(`Version ${minecraftVersion} doesn't exist`)
  }
  if (minVer === undefined) {
    throw new Error(`Version ${feature.versions[0]} doesn't exist`)
  }
  if (maxVer === undefined) {
    throw new Error(`Version ${feature.versions[1]} doesn't exist`)
  }

  return minVer <= currentVer && currentVer <= maxVer
}
