const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')

const Project = sequelize.define('project', {
  // 项目名称
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 所需node版本
  nodeEnv: {
    type: DataTypes.ENUM,
    values: ['11.11.0', '16.13.0'],
    defaultValue: '16.13.0'
  },
  // 打包后目标git路径
  gitRepository: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 打包后目标git库文件夹
  gitProjectName: {
    type: DataTypes.STRING,
  },
  // 描述
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 负责人
  people: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  // 状态
  status: {
    type: DataTypes.ENUM,
    values: ['USE', 'UNUSE'],
    defaultValue: 'USE'
  },  
})

module.exports = Project