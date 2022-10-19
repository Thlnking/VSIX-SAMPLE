const { window, StatusBarAlignment, workspace } = require("vscode");
const shell = require("shelljs");

shell.config.execPath = shell.which("node").toString();
const nvmStatusBarItem = () => {
  // const res = execSync("nvm -v", {
  //   cwd: workspace.workspaceFolders[0].uri.path,
  // }).toString();

  const statusBarItem = window.createStatusBarItem(
    StatusBarAlignment.Right,
    -99
  );

  const nodeVersion = shell
    .exec("node -v", {
      cwd: workspace.workspaceFolders[0].uri.path,
    })
    .toString();

  statusBarItem.text = `$(versions) Node ${nodeVersion}`;
  statusBarItem.tooltip = "";
  statusBarItem.show();
  return statusBarItem;
};

module.exports = nvmStatusBarItem;
