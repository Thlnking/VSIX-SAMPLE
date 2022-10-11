const { window, commands, Range, Position } = require("vscode");
const gitUser = require("../git_message/git_user");

const logStatementGenerator = (selectStatement, lineNumber) => {
  const git_user = gitUser();

  return [
    `console.table({name: '${git_user.name}', email: '${git_user.email}', type: '${git_user.type}'})`,
    `console.log(\'%c [${selectStatement}, line: ${lineNumber}]\', 'font-size: 16px; font-color: #000; background: #e6e6e6', ${selectStatement}) `,
  ];
};

const handleInsertVariable = () => {
  const textEditor = window.activeTextEditor;
  const { selection, document } = textEditor;
  // 获取文本的位置信息
  const range =
    document.getWordRangeAtPosition(selection.anchor) ||
    new Range(selection.start, selection.end);

  // 获取行号
  const lineNumber = range.start.line;
  // 获取选中的文本
  const selectStatement = document.getText(range);
  // 选中行的行前最右一个空字符的索引值
  const index = document.lineAt(lineNumber).firstNonWhitespaceCharacterIndex;
  // 行前的空字符串的前缀
  const linePrefix = document.lineAt(lineNumber).text.substring(0, index);
  // 生成的需要插入的log语句
  const logStatement = logStatementGenerator(selectStatement, 2 + lineNumber);
  const wrapData = {
    insertStatement: logStatement,
    item: selectStatement,
    document: document,
    range: range,
    lineNumber: lineNumber,
    selection: selection,
    isLastLine: document.lineCount - 1 === lineNumber,
    linePrefix,
  };
  editorInsertStatement(wrapData, textEditor);
};

const editorInsertStatement = (wrapData, editor) => {
  let nextLine = null;
  let nextLinePrefix = "";

  if (!wrapData.isLastLine) {
    nextLine = wrapData.document.lineAt(wrapData.lineNumber + 1);
    nextLinePrefix = nextLine.text.substring(
      0,
      nextLine.firstNonWhitespaceCharacterIndex
    );
  }

  editor.edit((editor) => {
    const linePrefix =
      nextLinePrefix.length > wrapData.linePrefix.length
        ? `\n${nextLinePrefix}`
        : `\n${wrapData.linePrefix}`;

    editor.insert(
      new Position(
        wrapData.lineNumber,
        wrapData.document.lineAt(wrapData.lineNumber).range.end.character
      ),
      `${linePrefix}${wrapData.insertStatement.join(linePrefix)}\n`
    );
  });
};

const insertVariableCommand = () => {
  const commandId = "vsix-sample.insertVariable";
  // 注册命令
  const command = commands.registerTextEditorCommand(
    commandId,
    handleInsertVariable
  );

  return command;
};
module.exports = insertVariableCommand;
