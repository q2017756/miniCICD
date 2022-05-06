const db = require('../model/index.js')
const { Op } = require("sequelize");
module.exports = {
  create: payload => db.Project.create(payload),
  find: payload => db.Project.findOne({
    where: {
      id: payload.id
    }
  }),
  findAll: payload => {
    const arr = []
    payload.id && arr.push({ id: payload.id })
    payload.name && arr.push({ name: payload.name })
    payload.status && arr.push({ status: payload.status })
    return db.Project.findAll({
      where: {
        [Op.and]: arr
      }
    })
  },
  delete: payload => db.Project.destroy({
    where: {
      id: payload.id
    }
  }),
  update: payload => db.Project.update(payload, {
    where: {
      id: payload.id
    }
  }),
}