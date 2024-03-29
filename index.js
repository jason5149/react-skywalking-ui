const camelCase = name => {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase())
}

const req = require.context('./packages', false)

console.log(req)

req.keys().forEach(mod => {
  let v = req(mod)

  if (v && v.default) {
    v = v.default
  }

  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.jsx?$/)

  if (match && match[1]) {
    if (match[1] === 'message' || match[1] === 'notification') {
      exports[match[1]] = v
    } else {
      exports[camelCase(match[1])] = v
    }
  }
})

module.exports = require('./packages')