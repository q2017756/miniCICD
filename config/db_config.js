const path = require('path')
const sqlite3 = require('sqlite3').verbose()
module.exports = {
  test: {
    // storage: path.join(__dirname, '../db/db_test.sqlite'), // 文件路径
    // host: 'localhost', // 地址
    // dialect: 'sqlite', // 目标数据库种类
    // dialectModule: sqlite3,
    // logging: console.log,
    host: 'localhost',
    dialect: 'mysql', // 目标数据库种类
    logging: console.log,
    username: "root",
    password: "123456",
    database: "miniCICD",
    dialectOptions: {
      charset: 'utf8mb4',
      dateStrings: true,
      typeCast: true
    },
    timezone: '+08:00'
  }
}