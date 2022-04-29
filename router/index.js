const userRoutes = require('./user.js');
const projectRoutes = require('./project.js');
const publishRoutes = require('./publish.js');

module.exports = router => {
    userRoutes(router)
    projectRoutes(router)
    publishRoutes(router)
}