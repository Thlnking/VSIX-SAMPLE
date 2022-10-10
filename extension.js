// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const gitUser = require("./src/git_message/git_user");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
let myStatusBarItem = null;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsix-sample" is now active!');
  const git_user = gitUser();
  console.log(git_user);
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

  const myCommandId = "vsix-sample.showSelectionCount";
  context.subscriptions.push(
    vscode.commands.registerCommand(myCommandId, async () => {
      const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);

      vscode.window.showInformationMessage(
        `Yeah, ${n} line(s) selected... Keep going!`
      );
    })
  );

  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1
  );
  myStatusBarItem.text = `账号: ${git_user.name}, 邮箱: ${git_user.email}, 类型: ${git_user.type}`;
  myStatusBarItem.show();
  context.subscriptions.push(myStatusBarItem);
}

function updateStatusBarItem() {
  const n = getNumberOfSelectedLines(vscode.window.activeTextEditor);
  console.log(
    "%c [ n ]-19",
    "font-size:13px; background:pink; color:#bf2c9f;",
    n
  );
  if (n > 0) {
    myStatusBarItem.text = `$(megaphone) ${n} line(s) selected`;
    myStatusBarItem.show();
  } else {
    myStatusBarItem.hide();
  }
}

function getNumberOfSelectedLines(editor) {
  let lines = 0;
  if (editor) {
    lines = editor.selections.reduce(
      (prev, curr) => prev + (curr.end.line - curr.start.line),
      0
    );
  }
  return lines;
}
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
