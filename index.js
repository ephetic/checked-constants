module.exports = c
const store = {}
function c(ss, ...vs) {
  const { ns, ks } = c.__parseArgs(ss, vs)
  const read = vs.length == 0

  if (read) {
    if (ks.length != 1) throw new Error('Can not get more than one value.')
    if (!(ns in store)) throw new Error(`Namespace ${ns} not found.`)
    const key = ks[0]
    if (!(key in store[ns])) throw new Error(`Key ${key} not found in namespace ${ns}.`)
    return store[ns][key]
  } else {
    if (vs.length != ks.length)
      throw new Error('Number of keys set must match number of values provided.')
    const space = store[ns] || {}
    ks.forEach((key, ix) => {
      if (key in space) throw new Error(`Value already exists in ${ns} for ${key}.`)
      space[key] = vs[ix]
    })
    store[ns] = space
  }
}
c.__parseArgs = (ss, vs) => {
  const nssegs = ss[0].split('/')
  const ks = [nssegs.slice(-1)[0], ...ss.slice(1)].map(s => s.trim()).filter(_ => _)
  const ns = nssegs
    .slice(0, -1)
    .join('/')
    .trim()
  return { ns, ks, vs }
}
