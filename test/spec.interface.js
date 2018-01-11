const test = require('tape')

test('can require function cc', t => {
  t.plan(1)
  const cc = require('../index')
  t.ok(typeof cc == 'function', 'cc is function')
})
test('can create and query simple ns/key', t => {
  t.plan(2)
  const cc = require('../index')
  t.doesNotThrow(() => {
    cc`ns/key ${'value'}`
  }, 'sets key without throwing')
  t.equals(cc`ns/key`, 'value', 'finds existing value')
})
test('cc is shared', t => {
  const cc = require('../index')
  t.plan(1)
  t.equals(cc`ns/key`, 'value', 'finds existing value')
})
test('querying non-existant ns throws', t => {
  t.plan(1)
  const cc = require('../index')
  t.throws(() => {
    const foo = cc`no-such/foo`
  }, 'did not find no-such')
})
test('querying non-existant key of extant ns throws', t => {
  t.plan(1)
  const cc = require('../index')
  t.throws(() => {
    cc`ns/foo${123}`
    const foo = cc`ns/bar`
  }, 'did not find ns/bar')
})
test('attempting to overwrite key throws', t => {
  t.plan(1)
  const cc = require('../index')
  t.throws(() => {
    cc`ns-ow/foo${123}`
    cc`ns-ow/foo${123}`
  }, 'does not overwrite ns-ow/foo')
})
test('can create and query multiple/multiline ns/keys', t => {
  t.plan(2)
  const cc = require('../index')
  cc`ns-m/bar/
    wokka  ${111}
    hooba  ${222}`
  t.equals(cc`ns-m/bar/wokka`, 111)
  t.equals(cc`ns-m/bar/hooba`, 222)
})
test('can create isolated store') // cc.isolated() rather than require('cc')
test('can use ns to query keys without stating ns')
test('can use ns then query sub-ns/key')
