const { compileFromFile } = require('json-schema-to-typescript')
const path = require('path')
const fs = require('fs')
const features = require('../minecraft-data/data/pc/common/features.json')

const templateTypings = fs.readFileSync(path.resolve(__dirname, './index-template.d.ts'), 'utf8')

// Recursively get path of all files in a directory
function walkSync (dir, fileList = []) {
  const files = fs.readdirSync(dir)
  files.forEach((file) => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      fileList = walkSync(path.join(dir, file), fileList)
    } else {
      fileList.push(path.join(dir, file))
    }
  })
  return fileList
}

async function generate () {
  let typingString = 'declare namespace MinecraftData {\n\n'
  typingString += (
    await Promise.all(
      walkSync(path.resolve(__dirname, '../minecraft-data/schemas')).map(async (schemaPath) => {
        if (schemaPath.includes('protocol_types')) return
        return (await compileFromFile(schemaPath, { bannerComment: '' })).replace(/export /g, '')
      })
    )
  )
    .join('\n\n')
    .split('\n')
    .map((line) => '  ' + line)
    .join('\n')

  // #region supports features
  typingString += '\n\n  export interface SupportsFeature {\n'
  // prevent duplicates, use last feature with the same name
  const featureNames = features.map(feature => feature.name)
  const featuresUnique = features.filter(({ name }, i) => featureNames.lastIndexOf(name) === i)
  for (const feature of featuresUnique) {
    const versionsRange = feature.values
      ? ''
      : feature.version
        ? feature.version
        : feature.versions.join(' - ')

    const valueType = feature.values ? feature.values.map(({ value }) => JSON.stringify(value)).join(' | ') : 'boolean'

    typingString += '    /**' + (versionsRange && ` \`${versionsRange}\``) + '\n' + '     * ' + feature.description + ' */\n'
    typingString += '    "' + feature.name.replaceAll('"', '\\"') + `": ${valueType};\n`
  }
  typingString += '  }\n\n'
  // #endregion

  typingString += templateTypings
    .split('\n')
    .map((line) => '  ' + line)
    .join('\n')
  typingString += '\n}\n\n' // Close namespace
  typingString += 'declare function MinecraftData(version: string | number): MinecraftData.IndexedData;\n'
  typingString += 'export = MinecraftData'

  fs.writeFileSync(path.resolve(__dirname, '../index.d.ts'), typingString)
}

generate()
  .then(() => console.log('Generated index.d.ts'))
  .catch((err) => console.error(err.stack))
