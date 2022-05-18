const path = require("path");

const Koa = require("koa");
const KoaStatic = require("koa-static");
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const KoaRouter = require("koa-router");
const applyRoutes = require('./router');
const app = new Koa();
const router = new KoaRouter();
const publishController = require('./controller/publish')
const publishServices = require('./service/publish')
const runCmd = require("./shelljs/runCmd");
const port = 9200

let socketList = [];
const server = require("http").Server(app.callback());
const socketIo = require("socket.io")(server, {
  allowEIO3: true,
  cors: {credentials: true, origin: 'http://localhost:3000'},

});

socketIo.on("connection", (socket) => {
  socketList.push(socket);
  console.log("a user connected");
});

/**
 * 自动打包发布接口，调用socket
 */
router.post("/v1/api/deploy", async ctx => {
  const { request: { body }, response } = ctx
  const data = await publishController.deploy(body, response)
  console.log(333, data)
  if (!data.projectName) {
    ctx.response.status = 500
    return response.body = {
      errorMsg: data.errorMsg,
      result: data.errorMsg,
      success: false
    }
  }
  const devGitRepository = "git@gitlab.bestpay.com.cn:o2o/o2o-fund-service-h5.git"
  const publishEntity = await publishServices.create(body)
  let execFunc = () => {
    return new Promise((resolve, reject) => {
      try {
        runCmd(
          "sh",
          [
            "./shelljs/deploy.sh", 
            data.nodeEnv, 
            devGitRepository,
            data.branchName,
            data.projectName,
            data.envType,
            data.gitRepository,
            data.gitProjectName,
          ],
          function (text) {
            resolve(text);
          },
          socketIo
        );
      } catch (e) {
        logger.error(e);
        reject(e);
      }
    });
  };
  try {
    let res = await execFunc();
    await publishServices.update({
      ...publishEntity.dataValues,
      result: res.error ? 'FAIL' : 'SUCCESS',
      logs: res.logs
    })
    response.body = {
      message: res.error ? '部署失败' : '部署成功',
      result: res.logs,
      success: true
    }
  } catch (e) {
    await publishServices.update({
      ...publishEntity.dataValues,
      result: 'FAIL',
      logs: e.message
    })
    response.body = {
      errorMsg: e.message,
      result: res,
      success: false
    }
  }
})
applyRoutes(router)

app.use(new KoaStatic(path.resolve(__dirname, "./")));
app.use(cors());
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())
    
server.listen(port, () => console.log(`服务监听 ${port} 端口`));