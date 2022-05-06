const Sequelize = require('sequelize')
const config = require('../config/db_config.js')
const sequelize = new Sequelize(config.test)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

sequelize.sync({ alter: false })

module.exports = sequelize