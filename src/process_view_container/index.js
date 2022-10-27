const vscode = require("vscode");
const path = require("path");

const {
  generateWebpackProcessMap,
  generateXbbDevProcessMap,
} = require("./utils");

const viewWebpackDataProvider = () => {
  const webpackProcessMap = generateWebpackProcessMap();

  return {
    getChildren: (element) => {
      if (!element) {
        const tabs = [...webpackProcessMap.keys()].map((item) => {
          const treeItem = new vscode.TreeItem(`${item}`);
          treeItem.iconPath = path.join(
            __filename,
            "..",
            "..",
            "..",
            "media",
            "icon-dark.svg"
          );
          treeItem.collapsibleState = 1;
          treeItem.tooltip = `当前分支：${webpackProcessMap.get(item).branch}`;
          treeItem.type = "tab";
          treeItem.contextValue = "tab";
          treeItem.data = webpackProcessMap.get(item);
          return treeItem;
        });

        return [].concat(tabs);
      }

      if (element.type === "tab") {
        const urlItems = element.data.urlArr.map((item) => {
          const treeItem = new vscode.TreeItem(`${item.url}`);
          treeItem.contextValue = "url";
          treeItem.type = "url";
          treeItem.desc = {
            pid: item.pid,
            command: item.command,
          };
          treeItem.collapsibleState = 1;
          return treeItem;
        });
        return [].concat(urlItems);
      }

      if (element.type === "url") {
        return [
          new vscode.TreeItem(`PID: ${element.desc.pid}`),
          new vscode.TreeItem(`CMD: ${element.desc.command}`),
        ];
      }
    },
    getTreeItem: (element) => {
      return element;
    },
    getParent: (element) => {
      return element;
    },
  };
};

const viewXbbDevDataProvider = () => {
  const xbbDevProcessMap = generateXbbDevProcessMap();

  return {
    getChildren: (element) => {
      if (!element) {
        const tabs = [...xbbDevProcessMap.keys()].map((item) => {
          const treeItem = new vscode.TreeItem(`${item}`);
          treeItem.iconPath = path.join(
            __filename,
            "..",
            "..",
            "..",
            "media",
            "icon-dark.svg"
          );
          treeItem.collapsibleState = 1;
          treeItem.tooltip = `当前分支：${xbbDevProcessMap.get(item).branch}`;
          treeItem.type = "tab";
          treeItem.contextValue = "tab";
          treeItem.data = xbbDevProcessMap.get(item);
          return treeItem;
        });

        return [].concat(tabs);
      }

      if (element.type === "tab") {
        const urlItems = element.data.urlArr.map((item) => {
          const treeItem = new vscode.TreeItem(`${item.url}`);
          treeItem.contextValue = "url";
          treeItem.type = "url";
          treeItem.desc = {
            pid: item.pid,
            command: item.command,
          };
          treeItem.collapsibleState = 1;
          return treeItem;
        });
        return [].concat(urlItems);
      }

      if (element.type === "url") {
        return [
          new vscode.TreeItem(`PID: ${element.desc.pid}`),
          new vscode.TreeItem(`CMD: ${element.desc.command}`),
        ];
      }
    },
    getTreeItem: (element) => {
      return element;
    },
    getParent: (element) => {
      return element;
    },
  };
};

module.exports = {
  viewWebpackDataProvider,
  viewXbbDevDataProvider,
};
