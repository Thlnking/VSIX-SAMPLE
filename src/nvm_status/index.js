const { window, StatusBarAlignment, workspace } = require("vscode");
const { execSync } = require("child_process");
const shell = require("shelljs");
shell.config.execPath = shell.which("node").toString();
const nvmStatusBarItem = () => {
  // const res = execSync("nvm -v", {
  //   cwd: workspace.workspaceFolders[0].uri.path,
  // }).toString();
  // const res = shell.exec("zsh").toString();

  // console.log("123123", res);
  const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right, 2);
  statusBarItem.text = `$(versions) Node ----`;
  statusBarItem.tooltip = "";
  statusBarItem.show();
  return statusBarItem;
};

module.exports = nvmStatusBarItem;
