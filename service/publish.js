const db = require('../model/index.js')
module.exports = {
  create: payload => db.Publish.create(payload),
  find: payload => db.Publish.findAll({
    where: {
      id: payload.id
    }
  }),
  findAll: () => db.Publish.findAll({
  }),
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