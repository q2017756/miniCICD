const db = require('../model/index.js')
const { Op } = require("sequelize");
module.exports = {
  create: payload => db.Publish.create(payload),
  find: payload => db.Publish.findOne({
    where: {
      id: payload.id
    }
  }),
  findAll: payload => {
    const arr = []
    payload.projectId && arr.push({ projectId: payload.projectId })
    payload.branchName && arr.push({ branchName: payload.branchName })
    payload.envType && arr.push({ envType: payload.envType })
    return db.Publish.findAll({
      where: {
        [Op.and]: arr
      },
      order: [[ 'createdAt', 'DESC' ]],
    })
  },
  // findAll: () => db.Publish.findAll({
  //   order: [[ 'createdAt', 'DESC' ]],
  // }),
  delete: payload => db.Publish.destroy({
    where: {
      id: payload.id
    }
  }),
  update: payload => db.Publish.update(payload, {
    where: {
      id: payload.id
    }
  }),
}