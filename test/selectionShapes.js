/* eslint-env mocha */
const assert = require('assert')
const convert = require('../lib/loader')

describe('selection shapes', () => {
  it('exports selection data independently of collision data', () => {
    const collision = { blocks: { wheat: 0 }, shapes: { 0: [] } }
    const selection = { blocks: { wheat: 0 }, shapes: { 0: [[0, 0, 0, 1, 0.125, 1]] } }
    const data = convert({ blockCollisionShapes: collision, blockSelectionShapes: selection })
    assert.strictEqual(data.blockCollisionShapes, collision)
    assert.strictEqual(data.blockSelectionShapes, selection)
  })

  it('leaves selection data unavailable for datasets without it', () => {
    assert.strictEqual(convert({}).blockSelectionShapes, undefined)
  })
})
