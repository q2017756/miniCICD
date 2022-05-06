const db = require('../model/index.js')
module.exports = {
  create: payload => db.User.create(payload),
  find: payload => db.User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: payload.id
    }
  }),
  findAll: () => db.User.findAll({
    attributes: { exclude: ['password'] },
  }),
  delete: payload => db.User.destroy({
    where: {
      id: payload.id
    }
  }),
  update: payload => db.User.update(payload, {
    where: {
      id: payload.id
    }
  }),
}