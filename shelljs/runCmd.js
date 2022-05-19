const logger = require("../utils/logger");

// 使用子进程执行命令
function runCmd(cmd, args, callback, socketIo) {
  const spawn = require("child_process").spawn;
  const child = spawn(cmd, args);
  let resp = "当前执行路径：" + process.cwd() + "\n";
  logger.info(resp);
  socketIo && socketIo.emit("deploy-log", resp);
  child.stdout.on("data", (buffer) => {
    let info = buffer.toString();
    info = `${new Date().toLocaleString()}: ${info}`;
    resp += info;
    logger.info(info);
    socketIo && socketIo.emit("deploy-log", info);
  });
  child.stdout.on("end", function () {
    console.log(5555555)
    // callback({
    //   logs: resp
    // });
  });

  // shell 脚本执行错误信息也返回
  // let errorMsg = ""; // 错误信息 end、正常信息 end 可能有先后，统一成一个信息
  child.stderr.on("data", (buffer) => {
    let info = buffer.toString();
    info = `${new Date().toLocaleString()}: ${info}`;
    resp += info;
    logger.info(info);
    socketIo && socketIo.emit("deploy-log", info);
  });
  child.stderr.on("end", function () {
    console.log(66666)
    // callback({
    //   logs: resp,
    //   error: true
    // });
  });
  child.on('exit', function(code) {
    console.log('Oh noez, teh errurz: ' + code);
    console.log('Oh noez, teh errurz: ' + typeof code);
    callback({
      logs: resp,
      error: code === 1
    });
  });
}

module.exports = runCmd;