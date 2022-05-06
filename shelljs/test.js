const runCmd = () => {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    // const child = spawn('ls', ['-lh']);; // 执行 sh deploy.sh 命令
    const child = spawn('sh', ['shelljs/deploy.sh']); // 执行 sh deploy.sh 命令

    let msg = ''
    console.log(2)
    child.stdout.on('data', (data) => {
      console.log(3)
      // shell 执行的 log 在这里搜集，可以通过接口返回给前端
      console.log(`stdout: ${data}`);
      // 普通接口仅能返回一次，需要把 log 都搜集到一次，在 end 时 返回给前端
      msg += `${data}`
    });

    child.stdout.on('end', (data) => {
      resolve(msg) // 执行完毕后，接口 resolve，返回给前端
    });

    child.stderr.on('data', (data) => {
      // 如果发生错误，错误从这里输出
      console.error(`stderr: ${data}`);
      msg += `${data}`
    });

    child.on('close', (code) => {
      // 执行完成后正常退出就是 0 
      console.log(`child process exited with code ${code}`);
    });
  })
}

module.exports = runCmd