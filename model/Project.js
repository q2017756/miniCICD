const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

const Project = sequelize.define('project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gitRepository: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  people: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  status: {
    type: DataTypes.ENUM,
    values: ['USE', 'UNUSE'],
    defaultValue: 'USE'
  },
})

module.exports = Project