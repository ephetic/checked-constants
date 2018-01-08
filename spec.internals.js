const test = require('tape')
const sinon = require('sinon')

test('can parse args', t => {
  t.plan(7)

  const c = require('./index')(false)
  sinon.spy(c, '__parseArgs')
  // simple cases
  c`ns/key${'value'}`
  t.ok(c.__parseArgs.calledOnce, '__parseArgs only called once')
  t.deepEquals(c.__parseArgs.returnValues[0], { ns: 'ns', ks: ['key'], vs: ['value'] })
  c`ns/key`
  t.deepEquals(c.__parseArgs.returnValues[1], { ns: 'ns', ks: ['key'], vs: [] })

  // deep ns
  c`foo/bar/thing${123}`
  t.deepEquals(c.__parseArgs.returnValues[2], { ns: 'foo/bar', ks: ['thing'], vs: [123] })
  c`foo/bar/thing`
  t.deepEquals(c.__parseArgs.returnValues[3], { ns: 'foo/bar', ks: ['thing'], vs: [] })

  // simple with spaces
  c`foo/bar/thang ${123}`
  t.deepEquals(c.__parseArgs.returnValues[4], { ns: 'foo/bar', ks: ['thang'], vs: [123] })

  // multiple
  c`foo/bar/
            wokka  ${111}
            hooba  ${222}`
  t.deepEquals(c.__parseArgs.returnValues[5], {
    ns: 'foo/bar',
    ks: ['wokka', 'hooba'],
    vs: [111, 222]
  })
})
