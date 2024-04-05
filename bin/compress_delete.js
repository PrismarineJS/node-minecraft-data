const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')
const { exit } = require('process')

const dataPath = path.join(__dirname, '../minecraft-data')

if (!fs.existsSync(dataPath)) {
  exit(0)
}

const zip = new AdmZip()

const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file)
    const isDirectory = fs.statSync(name).isDirectory()
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name]
  }, [])

const files = getAllFiles(dataPath)

files.forEach(file => {
  const localPath = file.replace(path.resolve(path.join(__dirname, '..')) + '/', '')
  const localDir = localPath.split('/').slice(0, -1).join('/')
  const fileName = localPath.split('/').slice(-1)[0]

  zip.addLocalFile(file, localDir, fileName)
})
zip.writeZip('minecraft-data.zip')

fs.rmSync(dataPath, { recursive: true, force: true })
