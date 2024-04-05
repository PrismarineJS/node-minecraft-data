const fs = require('fs')
const path = require('path')

let cache = null
const archivePath = path.join(__dirname, '../minecraft-data.zip')

module.exports = (fileName) => {
  if (cache !== null || fs.existsSync(archivePath)) {
    if (cache === null) {
      const AdmZip = require('adm-zip')
      cache = new AdmZip(archivePath)
    }
    fileName = fileName.split('/').slice(1).join('/')
    return JSON.parse(cache.readAsText(fileName))
  } else {
    return require(fileName)
  }
}
