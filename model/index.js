const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename) // index.js
const db = {}

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.' !== 0) && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = require(`./${file}`)
    const name = file.split('.')[0]
    db[name] = model
  })

module.exports = db