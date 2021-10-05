/* eslint-env mocha */
const assert = require('assert')

describe('load', () => {
  it('loads the lib', () => {
    require('minecraft-data')
    require('../example')
  })
  it('run the example', () => {
    require('../example')
  })
  it('newerOrEqualTo', () => {
    const mcData = require('minecraft-data')('1.13.2')
    assert.strictEqual(mcData.isNewerOrEqualTo('1.13'), true)
    assert.strictEqual(mcData.isOlderThan('1.14'), true)
    assert.strictEqual(mcData.isOlderThan('1.13'), false)
    assert.strictEqual(mcData.isNewerOrEqualTo('1.14'), false)
    assert.strictEqual(mcData.isNewerOrEqualTo('1.1'), true)

    const firstDataVersion = require('minecraft-data')('15w32a') // dataVersion = 100
    assert.strictEqual(firstDataVersion.isNewerOrEqualTo('15w31c'), true) // no dataVersion
  })
})
