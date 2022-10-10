"use strict";

const fs = require("fs");
const gitConfigPath = require("./git_config_path");
const ini = require("ini");

module.exports = function (type, workDir) {
  const path = gitConfigPath(type, workDir);
  if (path) {
    const file = fs.readFileSync(path, "utf8");
    return ini.parse(file);
  }
  return "";
};
