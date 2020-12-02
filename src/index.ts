import {
  main,
  schemas,
  postNettyVersionsByProtocolVersion,
  preNettyVersionsByProtocolVersion,
  protocolVersions,
  versionsByMinecraftVersion,
  supportedVersions
} from './main'

// Nice stuff
export {
  schemas,
  postNettyVersionsByProtocolVersion,
  preNettyVersionsByProtocolVersion,
  protocolVersions,
  versionsByMinecraftVersion,
  supportedVersions
} from './main'
export default main

// Backwards compatability but loses all the typing hints
module.exports = main
module.exports.schemas = schemas
module.exports.versions = protocolVersions
module.exports.versionsByMinecraftVersion = versionsByMinecraftVersion
module.exports.preNettyVersionsByProtocolVersion = preNettyVersionsByProtocolVersion
module.exports.postNettyVersionsByProtocolVersion = postNettyVersionsByProtocolVersion
module.exports.supportedVersions = supportedVersions
