#!/usr/bin/env node

const dataSource = require('../minecraft-data/data/dataPaths')
const fs = require('fs')
const path = require('path')

function generate () {
  let str = 'module.exports =\n{\n'
  let str2 = ''
  for (let platform in dataSource) {
    str += `  ${platform}: {\n`
    const versions = dataSource[platform]
    for (const version in versions) {
      str += `    "${version}": {\n`
      const data = versions[version]
      for (const name in data) {
        const relPath = data[name]
        const path = `'./minecraft-data/data/${relPath}/${name}.json'`
        str += `      ${name}: require(${path}),\n`
        str2 += `delete require.cache[require.resolve(${path})]\n`
      }
      str += '\n    },\n'
    }
    str += '\n  },\n'
  }
  str += '\n}\n'
  return str + str2
}

fs.writeFileSync(path.join(__dirname, '/../data.js'), generate())
