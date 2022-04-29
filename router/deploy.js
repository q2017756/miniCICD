const KoaRouter = require("koa-router");
const router = new KoaRouter();

router.post("/deploy", async (ctx) => {
  // 执行部署脚本
  let execFunc = () => {};
  try {
    let res =  await execFunc();
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
});

module.exports = router