const fs = require("fs");
const path = require("path");
const { generateHtml } = require("./html");
var showdown = require("showdown");
const chalk = require("chalk");

/**
 * Process file to generate HTML content
 * @param {string} fileName
 * @param {string} outputFolder
 */
processFile = (fileName, folderName, outputFolder, language) => {
    const fileExtension = path.extname(fileName);
    if (".MD" === fileExtension?.toUpperCase()) {
        processMDFile(fileName, folderName, outputFolder, language);
    } else {
        processTextFile(fileName, folderName, outputFolder, language);
    }
};

processMDFile = (fileName, folderName, outputFolder, language) => {
    const data = fs.readFileSync(path.join(folderName, fileName), {
        encoding: "utf8",
        flag: "r",
    });
    var showdown = require("showdown"),
        converter = new showdown.Converter(),
        html = converter.makeHtml(data);
    const htmlFile = fileName?.split(".")[0] + ".html";
    const fullPath = path.join(outputFolder, htmlFile);
    const dirPath = path.dirname(fullPath);
    if (!isExists(dirPath)) {
        makeDir(dirPath);
    }
    fs.writeFile(path.join(outputFolder, htmlFile), html, (err) => {
        if (err) {
            console.log(chalk.red.bold(err));
            return;
        }
    });
};

processTextFile = (fileName, folderName, outputFolder, language) => {
    const data = fs.readFileSync(path.join(folderName, fileName), {
        encoding: "utf8",
        flag: "r",
    });
    const paragraphs = data.split(/\r?\n\r?\n/);
    if (!isExists(outputFolder)) {
        makeDir(outputFolder);
    }
    if (!isExists(path.join(outputFolder, folderName))) {
        makeDir(path.join(outputFolder, folderName));
    }
    generateHtml({
        fileName,
        outputFolder: path.join(outputFolder, folderName),
        paragraphs,
        language,
    });
};

processMD = (mdText, pattern, openTag, closeTag) => {
    const result = "";
    const closed = true;

    const arr = mdText.split(pattern);

    arr.forEach((element, ind) => {
        result += element;
        if (ind < arr.length - 1) {
            result += ind % 2 === 0 ? openTag : closeTag;
            closed = !closed;
        }
    });
    result += !closed ? closeTag : "";

    return result;
};

/**
 * Process folder to generate HTML content
 * @param {string} folderName
 */
processDir = (folderName, outputFolder, language) => {
    fs.readdirSync(folderName).forEach((fileName) => {
        const fullPath = path.join(folderName, fileName);
        if (isFile(fullPath)) {
            processFile(fileName, folderName, outputFolder, language);
        } else {
            processDir(fullPath, outputFolder, language);
        }
    });
};

module.exports = {
    processFile,
    processMD,
    processDir,
};
