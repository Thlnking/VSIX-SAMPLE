// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const gitUser = require("./src/git_message/git_user");
const gitStatusBarItem = require("./src/status_bar_item/index");
const insertVariable = require("./src/insert_variable");
const nvmStatusBarItem = require("./src/nvm_status");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsix-sample" is now active!');
  const git_user = gitUser();
  // context.subscriptions.push(
  //   vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
  // );
  // context.subscriptions.push(
  //   vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem)
  // );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "vsix-sample.ToolTip",
    async function () {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(JSON.stringify(git_user));
    }
  );
  context.subscriptions.push(disposable);
  const gitStatusText = `$(github) ${git_user.name}`;
  const gitStatusTooltip = `账户名: ${git_user.name}\n邮箱: ${git_user.email}\n配置类型: ${git_user.type}`;
  const gitStatusBarItemCommand = gitStatusBarItem(
    gitStatusText,
    gitStatusTooltip
  );
  const nvmStatusBarItemCommand = nvmStatusBarItem();
  const insertVariableCommand = insertVariable();
  const view = vscode.window.registerTreeDataProvider("NPM", {
    getChildren: (element) => {
      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-48 [children element]->",
        "color:#fc6528",
        element
      );
    },
    getTreeItem: (element) => {
      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-55 [treeItem element]->",
        "color:#fc6528",
        element
      );
    },
    getParent: (element) => {
      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-62 [parent element]->",
        "color:#fc6528",
        element
      );
    },
    refresh: () => {
      console.log(
        "⭐️⭐️Thlnking⭐️⭐️%c line-62 [refresh]->",
        "color:#fc6528"
      );
    },
  });
  context.subscriptions.push(view);
  vscode.commands.registerCommand("NPM.refreshEntry", () => {
    console.log(
      "⭐️⭐️Thlnking⭐️⭐️%c line-48 [NPM.refreshEntry]->",
      "color:#fc6528"
    );
  });
  context.subscriptions.push(gitStatusBarItemCommand);
  context.subscriptions.push(insertVariableCommand);
  context.subscriptions.push(nvmStatusBarItemCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
