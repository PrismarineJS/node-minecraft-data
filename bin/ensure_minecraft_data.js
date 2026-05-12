#!/usr/bin/env node

const fs = require('fs')
const { spawnSync } = require('child_process')

if (fs.existsSync('minecraft-data/data/dataPaths.json')) process.exit(0)

const result = spawnSync('git', ['submodule', 'update', '--init', '--recursive'], { stdio: 'inherit' })
if (result.status !== 0) process.exit(result.status || 1)
