const vscode = require("vscode");

const gitStatusBarItem = (text, tooltip) => {
  const myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1
  );

  myStatusBarItem.text = text;
  myStatusBarItem.tooltip = tooltip;
  myStatusBarItem.show();
  return myStatusBarItem;
};
module.exports = gitStatusBarItem;
 