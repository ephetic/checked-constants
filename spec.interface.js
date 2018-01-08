const test = require('tape')

test('can require function c', t => {
  t.plan(1)
  const c = require('./index')
  t.ok(typeof c == 'function', 'c is function')
})
test('can create and query simple ns/key', t => {
  t.plan(2)
  const c = require('./index')(false)
  t.doesNotThrow(() => {
    c`ns/key ${'value'}`
  }, 'sets key without throwing')
  t.equals(c`ns/key`, 'value', 'finds existing value')
})
test('querying non-existant ns throws', t => {
  t.plan(1)
  const c = require('./index')(false)
  t.throws(() => {
    const foo = c`no-such/foo`
  }, 'did not find no-such')
})
test('querying non-existant key of extant ns throws', t => {
  t.plan(1)
  const c = require('./index')(false)
  t.throws(() => {
    c`ns/foo${123}`
    const foo = c`ns/bar`
  }, 'did not find ns/bar')
})
test('attempting to overwrite key throws', t => {
  t.plan(1)
  const c = require('./index')(false)
  t.throws(() => {
    c`ns/foo${123}`
    c`ns/foo${123}`
  }, 'does not overwrite ns/foo')
})
test('can create and query multiple/multiline ns/keys', t => {
  t.plan(2)
  const c = require('./index')(false)
  c`foo/bar/
    wokka  ${111}
    hooba  ${222}`
  t.equals(c`foo/bar/wokka`, 111)
  t.equals(c`foo/bar/hooba`, 222)
})
test('can create isolated store') // c.isolated() rather than require('c')(false)
test('can use ns to query keys without stating ns')
test('can use ns then query sub-ns/key')
