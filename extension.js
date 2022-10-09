// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs_1 = require("fs");
const execSync = require("child_process").execSync;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsix-sample" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "vsix-sample.ToolTip",
    async function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello VS Code from vsix-sample!");
      let name = await execSync("git show -s --format=%cn", {
        cwd: vscode.workspace.workspaceFolders[0].uri.path,
      })
        .toString()
        .trim(); //姓名
      let email = await execSync("git show -s --format=%ce", {
        cwd: vscode.workspace.workspaceFolders[0].uri.path,
      })
        .toString()
        .trim(); //邮箱
      console.log(name, email);
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
