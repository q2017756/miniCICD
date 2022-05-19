const controllers = require('../controller/publish.js');

module.exports =  router => {
    // router.post('/v1/api/deploy', controllers.deploy)
    router.post('/v1/api/getPublishList', controllers.getList)
    // router.post('/v1/api/getPublishInfo', controllers.getInfo)
    // router.post('/v1/api/deletePublish', controllers.delete)
    // router.post('/v1/api/updatePublish', controllers.update)
}