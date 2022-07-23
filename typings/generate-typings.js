const { compileFromFile } = require('json-schema-to-typescript')
const path = require('path')
const fs = require('fs')

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
