/* global describe, it */
const assert = require('assert')
const mcData = require('../index')

describe('Version Comparison', () => {
  it('should correctly compare versions with and without dataVersion', () => {
    const version = new mcData.Version('pc', '1.7.10')

    // Test case from issue #399
    assert.strictEqual(version['<=']('1.7.10'), true, '1.7.10 should be <= 1.7.10')
    assert.strictEqual(version['<']('1.8'), true, '1.7.10 should be < 1.8')
    assert.strictEqual(version['<=']('1.8'), true, '1.7.10 should be <= 1.8')

    // Additional test cases
    assert.strictEqual(version['>']('1.7.2'), true, '1.7.10 should be > 1.7.2')
    assert.strictEqual(version['>=']('1.7.2'), true, '1.7.10 should be >= 1.7.2')
    assert.strictEqual(version['==']('1.7.10'), true, '1.7.10 should be == 1.7.10')
  })
})
