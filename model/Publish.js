const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')
const Project = require('./Project.js')

const Publish = sequelize.define('publish', {
  envType: {
    type: DataTypes.ENUM,
    values: ['test', 'pre', 'prod'],
    defaultValue: 'test'
  },
  result: {
    type: DataTypes.ENUM,
    values: ['SUCCESS', 'FAIL'],
    allowNull: false
  },
  logs: {
    type: DataTypes.TEXT,
    defaultValue: 'NO LOG'
  },
  remarks: {
    type: DataTypes.TEXT,
    defaultValue: 'NO LOG'
  },
  operator: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
Project.hasMany(Publish)

module.exports = Publish
