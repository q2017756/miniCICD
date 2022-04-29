const controllers = require('../controller/user.js');

module.exports =  router => {
    router.post('/v1/api/createUser', controllers.create)
    router.post('/v1/api/getUserList', controllers.getList)
    router.post('/v1/api/getUserInfo', controllers.getInfo)
    router.post('/v1/api/deleteUser', controllers.delete)
    router.post('/v1/api/updateUser', controllers.update)
}