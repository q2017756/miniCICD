const controllers = require('../controller/project.js');

module.exports =  router => {
    router.post('/v1/api/createProject', controllers.create)
    router.post('/v1/api/getProjectList', controllers.getList)
    router.post('/v1/api/getProjectInfo', controllers.getInfo)
    router.post('/v1/api/deleteProject', controllers.delete)
    router.post('/v1/api/updateProject', controllers.update)
}