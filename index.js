const path = require("path");

const Koa = require("koa");
const KoaStatic = require("koa-static");
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const KoaRouter = require("koa-router");

const applyRoutes = require('./router');

const app = new Koa();
const router = new KoaRouter();

const port = 9200

applyRoutes(router)
app.use(new KoaStatic(path.resolve(__dirname, "./")));
app.use(cors());

app.use(bodyParser()).use(router.routes()).use(router.allowedMethods())
    
app.listen(port, () => console.log(`服务监听 ${port} 端口`));