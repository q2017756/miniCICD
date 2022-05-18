const { DataTypes } = require('sequelize')
const sequelize = require('./sequelize')
const Project = require('./Project.js')

const Publish = sequelize.define('publish', {
  // 打包分支名称：test/test_tmp
  branchName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 目标环境: test/pre/prod
  envType: {
    type: DataTypes.ENUM,
    values: ['test', 'pre', 'prod'],
    defaultValue: 'test'
  },
  // 打包结果
  result: {
    type: DataTypes.ENUM,
    values: ['SUCCESS', 'FAIL', 'DOING'],
    defaultValue: 'DOING'
  },
  // 日志内容
  logs: {
    type: DataTypes.TEXT,
    defaultValue: 'NO LOG'
  },
  // 备注
  remarks: {
    type: DataTypes.TEXT,
    defaultValue: 'NO LOG'
  },
  // 操作人
  operator: {
    type: DataTypes.STRING,
    allowNull: false
  }
})
// 外键ProjectId
Project.hasMany(Publish)

module.exports = Publish
