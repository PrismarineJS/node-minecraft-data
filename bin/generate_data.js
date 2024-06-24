#!/usr/bin/env node

const readData = require('../lib/readData')
const dataSource = readData('../minecraft-data/data/dataPaths.json')
const fs = require('fs')
const path = require('path')

const data = 'const readData = require(\'./lib/readData\')\n\nmodule.exports =\n{\n' + Object
  .keys(dataSource)
  .map(k1 =>
    "  '" + k1 + "': {\n" + Object
      .keys(dataSource[k1])
      .map(k2 =>
        "    '" + k2 + "': {" + '\n' + Object
          .keys(dataSource[k1][k2])
          .map(k3 => {
            const loc = `minecraft-data/data/${dataSource[k1][k2][k3]}/`
            try {
              // Check if the file can be loaded as JSON
              readData('../' + loc + k3 + '.json')
              return `      get ${k3} () { return readData("./${loc}${k3}.json") }`
            } catch {
              // No ? Return it as a URL path so other code can decide how to handle it
              return `      ${k3}: __dirname + '/${loc}${k3}'`
            }
          })
          .join(',\n') +
      '\n    }'
      )
      .join(',\n') +
    '\n  }'
  )
  .join(',\n') + '\n}\n'

fs.writeFileSync(path.join(__dirname, '/../data.js'), data)
