#!/usr/bin/env node

const fs = require('fs')
const { spawnSync } = require('child_process')

const dataPaths = 'minecraft-data/data/dataPaths.json'
const dataRepo = 'https://github.com/mneuhaus/minecraft-data.git'
const dataBranch = 'pc_26_1_2'

if (fs.existsSync(dataPaths)) process.exit(0)

if (fs.existsSync('.git')) {
  const result = spawnSync('git', ['submodule', 'update', '--init', '--recursive'], { stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status || 1)
  if (fs.existsSync(dataPaths)) process.exit(0)
}

fs.rmSync('minecraft-data', { recursive: true, force: true })

const clone = spawnSync('git', ['clone', '--depth', '1', '--filter=blob:none', '--sparse', '--branch', dataBranch, dataRepo, 'minecraft-data'], { stdio: 'inherit' })
if (clone.status !== 0) process.exit(clone.status || 1)

const sparse = spawnSync('git', ['-C', 'minecraft-data', 'sparse-checkout', 'set', 'data', 'schemas'], { stdio: 'inherit' })
if (sparse.status !== 0) process.exit(sparse.status || 1)

if (!fs.existsSync(dataPaths)) {
  console.error(`Could not load ${dataPaths}`)
  process.exit(1)
}
