const vscode = require("vscode");
const path = require("path");
const shelljs = require("shelljs");

const interfaces = require("os").networkInterfaces(); //服务器本机地址
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

const getNPMWebpackProcessesMsgArr = () => {
  const npmWebpackProcesses = shelljs
    .exec("ps au | grep node | grep webpack | grep dev")
    .toString()
    .split("\n")
    .filter((item) => !!item.trim());
  const npmWebpackProcessesMsgArr = npmWebpackProcesses
    .map((item) => {
      const parseArr = item.split(" ").filter((itm) => !!itm.trim());
      return {
        command: parseArr.slice(10).join(" "),
        pid: parseArr[1],
        startTime: parseArr[8],
      };
    })
    .filter((item) => !!item);
  return npmWebpackProcessesMsgArr;
};

const getWebpackDevServerUrl = (ProcessMsgArr) => {
  const npmWebpackDevServerUrl = ProcessMsgArr.map((item) => {
    const { pid, command } = item;
    const lsofRes = shelljs
      .exec(`lsof -nP | grep ${pid} | grep LISTEN`)
      .toString();
    const portMsgArr = lsofRes.split(" ").filter((item) => !!item.trim());
    const port = portMsgArr[portMsgArr.length - 2].split(":")[1];
    return {
      url: `http://${getIP()}:${port}`,
      pid,
      command,
    };
  });
  return npmWebpackDevServerUrl;
};

const viewNPMDataProvider = () => {
  return {
    getChildren: (element) => {
      const processesMsgArr = getNPMWebpackProcessesMsgArr();

      const urlArr = getWebpackDevServerUrl(processesMsgArr);
      const npmProcessItemArr = urlArr.map((item) => {
        const treeItem = new vscode.TreeItem(`${item.url}`);
        treeItem.iconPath = path.join(
          __filename,
          "..",
          "..",
          "..",
          "media",
          "icon-dark.svg"
        );
        treeItem.tooltip = `${item.command}`;
        treeItem.collapsibleState = 1;
        treeItem.type = "label";
        treeItem.pid = item.pid;
        return treeItem;
      });

      if (element && element.type === "label") {
        return [
          new vscode.TreeItem(`command: ${element.tooltip}`),
          new vscode.TreeItem(`pid: ${element.pid}`),
        ];
      }
      return [].concat(npmProcessItemArr);
    },
    getTreeItem: (element) => {
      return element;
    },
    getParent: (element) => {
      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-62 [parent element]->",
        "color:#fc6528",
        element
      );
      return element;
    },
    refresh: () => {
      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-62 [refresh]->",
        "color:#fc6528"
      );
    },
  };
};

const getXbbDevProcessMsgArr = () => {
  const xbbDevProcesses = shelljs
    .exec("ps au | grep node | grep xbb-dev")
    .toString()
    .split("\n")
    .filter((item) => !!item.trim());

  const xbbDevProcessesMsgArr = xbbDevProcesses
    .map((item) => {
      const parseArr = item.split(" ").filter((itm) => !!itm.trim());
      return {
        command: parseArr.slice(10).join(" "),
        pid: parseArr[1],
        startTime: parseArr[8],
      };
    })
    .filter((item) => !!item);
  return xbbDevProcessesMsgArr;
};

const getXbbDevServerUrl = (ProcessMsgArr) => {
  const xbbDevServerUrl = ProcessMsgArr.map((item) => {
    const { pid, command } = item;
    const lsofRes = shelljs
      .exec(`lsof -nP | grep ${pid} | grep LISTEN`)
      .toString();
    const portMsgArr = lsofRes.split(" ").filter((item) => !!item.trim());
    const port = portMsgArr[portMsgArr.length - 2].split(":")[1];
    return {
      url: `http://${getIP()}:${port}`,
      pid,
      command,
    };
  });
  return xbbDevServerUrl;
};
const viewXbbDevDataProvider = () => {
  return {
    getChildren: (element) => {
      const processesMsgArr = getXbbDevProcessMsgArr();
      const urlArr = getXbbDevServerUrl(processesMsgArr);
      const npmProcessItemArr = urlArr.map((item) => {
        const treeItem = new vscode.TreeItem(`${item.url}`);
        treeItem.iconPath = path.join(
          __filename,
          "..",
          "..",
          "..",
          "media",
          "icon-dark.svg"
        );
        treeItem.tooltip = `${item.command}`;
        treeItem.collapsibleState = 1;
        treeItem.type = "label";
        treeItem.pid = item.pid;
        return treeItem;
      });

      if (element && element.type === "label") {
        return [
          new vscode.TreeItem(`command: ${element.tooltip}`),
          new vscode.TreeItem(`pid: ${element.pid}`),
        ];
      }

      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-192 [npmProcessItemArr]->",
        "color:#fc6528",
        npmProcessItemArr
      );

      return [].concat(npmProcessItemArr);
    },
    getTreeItem: (element) => {
      return element;
    },
    getParent: (element) => {
      return element;
    },
    refresh: () => {},
  };
};

module.exports = {
  viewNPMDataProvider,
  viewXbbDevDataProvider,
};
