const itemBlockRenames = require('../minecraft-data/data/pc/common/dataRenames.json')

exports.versionToNumber = (ver) => {
  const [x, y = '0', z = '0'] = ver.split('.')
  return +`${x.padStart(2, '0')}${(parseInt(y).toString().padStart(2, '0'))}${parseInt(z).toString().padStart(2, '0')}`
}

exports.getRenamedData = (type, blockOrItem, versionFrom, versionTo) => {
  const verFrom = exports.versionToNumber(versionFrom)
  const verTo = exports.versionToNumber(versionTo)
  const dir = verFrom < verTo ? 1 : -1
  const targetIdx = dir > 0 ? 1 : 0
  let renamed = blockOrItem
  const mapVersions = Object.keys(itemBlockRenames).sort((a, b) => dir * (exports.versionToNumber(a) - exports.versionToNumber(b)))
  const upperBoundVer = dir > 0 ? verTo : verFrom
  const lowerBoundVer = dir > 0 ? verFrom : verTo
  for (const mapVersion of mapVersions) {
    if (dir > 0 && versionToNumber(mapVersion) >= upperBoundVer) break
    if (dir < 0 && versionToNumber(mapVersion) <= lowerBoundVer) break
    const nextMapData = itemBlockRenames[mapVersion][type]
    if (!nextMapData) continue
    for (const namesArr of nextMapData) {
      const targetName = namesArr[targetIdx]
      const compareName = namesArr[1 - targetIdx]
      if (Array.isArray(renamed)) {
        if (renamed.includes(compareName)) renamed = renamed.map(x => x === compareName ? targetName : x)
      } else if (renamed === compareName) {
        renamed = targetName
        break
      }
    }
  }
  return renamed
}
