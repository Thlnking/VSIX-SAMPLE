const vscode = require("vscode");

const statusBarItem = (text, tooltip) => {
  const myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1
  );

  myStatusBarItem.text = text;
  myStatusBarItem.tooltip = tooltip;
  myStatusBarItem.show();
  return myStatusBarItem;
};
module.exports = statusBarItem;
