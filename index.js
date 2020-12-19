const cp = require('child_process');
const customConfig = require('./config.json');

const defaultConfig = {
  thread: [2, 10],
  connection: [10, 100]
};

const config = {
  ...defaultConfig,
  ...customConfig
};

function run() {
  const [connStart, connEnd] = config.connection;
  const [thStart, thEnd] = config.thread;
  // todo: 到达瓶颈时进行剪枝
  for (let i = connStart; i <= connEnd; i++) {
    for (let j = thStart; j <= thEnd; j++) {
      exec(`wrk -t${j} -c${i} ${config.host}`);
    }
  }
}

function exec(script) {
  cp.exec(script, (err, stdout, stderr) => {
    if (err) {
      console.error('exec err', err);
      return;
    }
    console.log(stdout);
    if (stderr) {
      console.error(stderr);
    }
  });
}

run();
