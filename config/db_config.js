const path = require('path')
const sqlite3 = require('sqlite3').verbose()
module.exports = {
  test: {
    storage: path.join(__dirname, '../db/db_test.sqlite'), // 文件路径
    host: 'localhost', // 地址
    dialect: 'sqlite', // 目标数据库种类
    dialectModule: sqlite3,
    logging: console.log,
  }
}