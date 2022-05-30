const path = require('path')
// const sqlite3 = require('sqlite3').verbose()
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
    password: "nan120403xu!",
    database: "miniCICD",
    retry: {
      match: [
          /ETIMEDOUT/,
          /EHOSTUNREACH/,
          /ECONNRESET/,
          /ECONNREFUSED/,
          /ETIMEDOUT/,
          /ESOCKETTIMEDOUT/,
          /EHOSTUNREACH/,
          /EPIPE/,
          /EAI_AGAIN/,
          /SequelizeConnectionError/,
          /SequelizeConnectionRefusedError/,
          /SequelizeHostNotFoundError/,
          /SequelizeHostNotReachableError/,
          /SequelizeInvalidConnectionError/,
          /SequelizeConnectionTimedOutError/
      ],
      max: 5
    }
  }
}