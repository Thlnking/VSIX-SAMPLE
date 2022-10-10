"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

module.exports = function (type, workDir) {
  let configPath = "";
  console.log(workDir);

  if (type === "global") {
    configPath = path.join(os.homedir(), ".gitconfig");
  } else {
    configPath = path.resolve(workDir, ".git/config");
  }

  if (!fs.existsSync(configPath)) {
    configPath = path.join(os.homedir(), ".config/git/config");
  }

  return fs.existsSync(configPath) ? configPath : null;
};
