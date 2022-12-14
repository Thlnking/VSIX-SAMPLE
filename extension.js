// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const gitUser = require("./src/git_message/git_user");
const gitStatusBarItem = require("./src/status_bar_item/index");
const insertVariable = require("./src/insert_variable");
const nvmStatusBarItem = require("./src/nvm_status");
const {
  viewWebpackDataProvider,
  viewXbbDevDataProvider,
} = require("./src/process_view_container");
const opn = require("opn");

const open = (path) => {
  // const name = browser ? browser : standardizedBrowserName(defaultBrowser());
  // const name = standardizedBrowserName(browser);
  // console.log('path: ', path, ' name: ', name);
  opn(path).catch((_) => {
    vscode.window.showErrorMessage(
      `Open browser failed!! Please check if you have installed the browser correctly!`
    );
  });
};

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
  const gitStatusTooltip = `?????????: ${git_user.name}\n??????: ${git_user.email}\n????????????: ${git_user.type}`;
  const gitStatusBarItemCommand = gitStatusBarItem(
    gitStatusText,
    gitStatusTooltip
  );
  const nvmStatusBarItemCommand = nvmStatusBarItem();
  const insertVariableCommand = insertVariable();

  vscode.commands.registerCommand("NPM.refreshEntry", () => {
    const view = vscode.window.registerTreeDataProvider(
      "NPM",
      viewWebpackDataProvider()
    );
    context.subscriptions.push(view);
  });
  vscode.commands.registerCommand("XBB_DEV.refreshEntry", () => {
    const view = vscode.window.registerTreeDataProvider(
      "XBB_DEV",
      viewXbbDevDataProvider()
    );
    context.subscriptions.push(view);
  });
  context.subscriptions.push(gitStatusBarItemCommand);
  const openInBrowserCommand = vscode.commands.registerCommand(
    "url_path.open_in_browser",
    async (args) => {
      open(args.label);
    }
  );
  context.subscriptions.push(openInBrowserCommand);
  context.subscriptions.push(insertVariableCommand);
  context.subscriptions.push(nvmStatusBarItemCommand);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
