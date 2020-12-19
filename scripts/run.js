const cp = require('child_process');
const customConfig = require('../config.json');

const defaultConfig = {
  duration: 10,
  thread: {
    start: 2,
    end: 10,
    step: 2
  },
  connection: {
    start: 10,
    end: 100,
    step: 10
  }
};

const config = {
  ...defaultConfig,
  ...customConfig
};

function run() {
  const conn = config.connection;
  const th = config.thread;
  const duration = config.duration;
  // todo: 到达瓶颈时进行剪枝
  for (let i = conn.start; i <= conn.end; i += conn.step) {
    for (let j = th.start; j <= th.end; j += th.step) {
      exec(`wrk -t${j} -c${i} -d${duration} ${config.host}`);
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

// wrk -s ./scripts/report.lua http://localhost:3333/ -d3
