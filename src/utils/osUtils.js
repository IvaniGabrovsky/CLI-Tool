const fs = require("fs");

function isDir(pathItem) {
  try {
      var stat = fs.lstatSync(pathItem);
      return stat.isDirectory();
  } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
  }
}

function isFile(pathItem) {
  try {
      var stat = fs.lstatSync(pathItem);
      return !stat.isDirectory();
  } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
  }
}

function isExists(pathItem) {
  try {
      if (fs.existsSync(pathItem)) {
          return true;
      } else {
          return false;
      }
  } catch (err) {
      console.error(err);
      return false;
  }
}

function makeDir(pathItem) {
  try {
      if (!fs.existsSync(pathItem)) {
          fs.mkdirSync(pathItem);
      }
  } catch (err) {
      console.error(err);
  }
}

function removeDir(pathItem) {
  fs.rmSync(pathItem, { recursive: true }, (err) => {
      if (err) {
          throw err;
      }
  });
}

module.exports = { isDir, isFile, isExists, makeDir, removeDir};