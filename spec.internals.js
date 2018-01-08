const test = require('tape')
const sinon = require('sinon')

test('can parse args', t => {
  t.plan(7)

  const cc = require('./index')
  sinon.spy(cc, '__parseArgs')
  // simple cases
  cc`ns-i/key${'value'}`
  t.ok(cc.__parseArgs.calledOnce, '__parseArgs only called once')
  t.deepEquals(cc.__parseArgs.returnValues[0], { ns: 'ns-i', ks: ['key'], vs: ['value'] })
  cc`ns-i/key`
  t.deepEquals(cc.__parseArgs.returnValues[1], { ns: 'ns-i', ks: ['key'], vs: [] })

  // deep ns
  cc`foo-i/bar/thing${123}`
  t.deepEquals(cc.__parseArgs.returnValues[2], { ns: 'foo-i/bar', ks: ['thing'], vs: [123] })
  cc`foo-i/bar/thing`
  t.deepEquals(cc.__parseArgs.returnValues[3], { ns: 'foo-i/bar', ks: ['thing'], vs: [] })

  // simple with spaces
  cc`foo-i/bar/thang ${123}`
  t.deepEquals(cc.__parseArgs.returnValues[4], { ns: 'foo-i/bar', ks: ['thang'], vs: [123] })

  // multiple
  cc`foo-i/bar/
            wokka  ${111}
            hooba  ${222}`
  t.deepEquals(cc.__parseArgs.returnValues[5], {
    ns: 'foo-i/bar',
    ks: ['wokka', 'hooba'],
    vs: [111, 222]
  })
})
