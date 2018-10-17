const { promisify } = require("util");
const fs = require("fs");
const readfile = promisify(fs.readFile);

const readConfig = async path => {
  try {
    return await readfile(path, "utf-8");
  } catch (error) {
    console.error(`No such file ${path}`);
  }
};

module.exports = { readConfig };
