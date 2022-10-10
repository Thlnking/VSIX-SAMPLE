const { workspace } = require("vscode");
const gitMessage = require("./index");

const gitUser = () => {
  const workDirPath = workspace.workspaceFolders[0].uri.path;

  const local_git_message = gitMessage("local", workDirPath);
  if (local_git_message && local_git_message.user) {
    return {
      ...local_git_message.user,
      type: "local",
    };
  }

  const global_git_message = gitMessage("global", workDirPath);

  if (global_git_message && global_git_message.user) {
    return {
      ...global_git_message.user,
      type: "global",
    };
  }

  return {
    name: "unknow",
    email: "unknow",
    type: "none",
  };
};

module.exports = gitUser;
