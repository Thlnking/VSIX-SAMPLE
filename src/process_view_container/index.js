const vscode = require("vscode");
const path = require("path");
const shelljs = require("shelljs");

const viewNPMDataProvider = () => {
  return {
    getChildren: (element) => {
      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-8 [children element]->",
        "color:#fc6528",
        element
      );

      const res = shelljs
        .exec("ps au | grep node | grep proxy")
        .toString()
        .split("\n");

      const processMsgArr = res
        .filter((item) => !!item.trim())
        .map((item) => {
          const parseArr = item.split(" ").filter((itm) => !!itm.trim());
          return {
            command: parseArr.slice(10).join(" "),
            pid: parseArr[1],
            startTime: parseArr[8],
          };
        })
        .filter((item) => !!item);

      const itemArr = processMsgArr.map((item) => {
        const treeItem = new vscode.TreeItem(`进程ID：${item.pid}`);
        treeItem.iconPath = path.join(
          __filename,
          "..",
          "..",
          "..",
          "media",
          "icon-dark.svg"
        );
        treeItem.tooltip = `执行命令：${item.command}`;
        treeItem.collapsibleState = 1;
        treeItem.type = "label";
        treeItem.pid = item.pid;
        return treeItem;
      });
      if (element && element.type === "label") {
        const { pid } = element;
        const processRes = shelljs
          .exec(`lsof -nP | grep LISTEN | grep ${pid}`)
          .toString();
        console.log(
          "⭐️⭐️Thlnking⭐️⭐️%c line-50 [processRes]->",
          "color:#fc6528",
          processRes
        );

        return [new vscode.TreeItem(element.tooltip)];
      }
      return [].concat(itemArr);
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

module.exports = viewNPMDataProvider;
