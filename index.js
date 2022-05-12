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
const runCmd = require("./shelljs/runCmd");

const port = 9200

let socketList = [];
const server = require("http").Server(app.callback());
const socketIo = require("socket.io")(server);

socketIo.on("connection", (socket) => {
  socketList.push(socket);
  console.log("a user connected");
});


router.post("/v1/api/deploy", async (ctx, next) => {
  console.log(1111)
  let execFunc = () => {
    return new Promise((resolve, reject) => {
      try {
        runCmd(
          "sh",
          ["./shelljs/deploy.sh"],
          function (text) {
            resolve(text);
          },
          socketIo
        );
      } catch (e) {
        logger.info(e);
        reject(e);
      }
    });
  };
  // publishController.deploy(ctx, execFunc)
  try {
    let res = await execFunc();
    ctx.body = {
      code: 0,
      msg: res,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message,
    };
  }
})
applyRoutes(router)

app.use(new KoaStatic(path.resolve(__dirname, "./")));
app.use(cors());
app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())
    
server.listen(port, () => console.log(`服务监听 ${port} 端口`));