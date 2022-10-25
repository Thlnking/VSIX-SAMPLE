const vscode = require("vscode");
const path = require("path");
const shelljs = require("shelljs");

const interfaces = require("os").networkInterfaces(); //服务器本机地址

const processMap = new Map();

const getIP = () => {
  let IPAdress = "";

  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];

      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal &&
        alias.netmask === "255.255.255.0"
      ) {
        IPAdress = alias.address;
        return IPAdress;
      }
    }
  }
};

// 获取webpack的devServer的进程相关信息
const collectWebpackDevServerPIDs = () => {
  // 执行shell命令获取到webpack-dev-server的进程相关信息的解析数组
  const webpackProcesses = shelljs
    .exec("ps au | grep node | grep dev | grep webpack")
    .toString()
    .split("\n")
    .filter((item) => !!item.trim());

  // 将相关的进程列表中的重要信息解析成对象
  return webpackProcesses
    .map((item) => {
      const parseArr = item.split(" ").filter((itm) => !!itm.trim());
      return {
        command: parseArr.slice(10).join(" "),
        pid: parseArr[1],
        startTime: parseArr[8],
      };
    })
    .filter((item) => !!item);
};

// 通过进程ID获取进程的监听的端口
const getProcessURL = (pid, ip) => {
  const lsofRes = shelljs
    .exec(`lsof -nP | grep ${pid} | grep LISTEN`)
    .toString();
  if (!lsofRes.trim()) {
    return "no host";
  }
  const portMsgArr = lsofRes.split(" ").filter((item) => !!item.trim());
  const port = portMsgArr[portMsgArr.length - 2].split(":")[1];
  return `http://${ip}:${port}`;
};

// 通过进程ID获取进程的启动目录
const getProcessCWD = (pid) => {
  return shelljs
    .exec(`lsof -a -p ${pid} -d cwd -Fn | cut -c2- | grep -v ${pid}`)
    .toString()
    .split("\n")
    .filter((item) => !!item.trim())[1];
};

// 通过文件目录获取目标目录的git的分支信息
const getGitBranch = (cwd) => {
  const branchMsg = shelljs
    .exec('git branch | grep "*"', {
      cwd: cwd,
    })
    .toString()
    .trim();

  return branchMsg;
};

// 对进程的信息映射进行收集并且存储到processMap中
const collectWebpackDevServerProcessMap = (processMsgArr) => {
  const ip = getIP();
  processMsgArr.forEach((item) => {
    const { pid } = item;
    const processURL = getProcessURL(pid, ip);
    const processCWD = getProcessCWD(pid);
    const processGitBranch = getGitBranch(processCWD);
    if (processMap.has(processCWD)) {
      processMap.set(processCWD, [
        ...processMap.get(processCWD),
        {
          url: processURL,
          branch: processGitBranch,
          pid,
        },
      ]);
    } else {
      processMap.set(processCWD, [
        {
          url: processURL,
          branch: processGitBranch,
          pid,
        },
      ]);
    }
  });
};

const generateWebpackDevServerProcessMap = () => {
  const webpackDevServerPIDs = collectWebpackDevServerPIDs();
  collectWebpackDevServerProcessMap(webpackDevServerPIDs);
  return processMap;
};

const generateTreeItem = (label, iconPath, collapsibleState, type) => {};

module.exports = {
  generateWebpackDevServerProcessMap,
  generateTreeItem,
};
