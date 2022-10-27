const fs = require("fs");
const path = require("path");
const { generateHtml } = require("./html");

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
    generateHtml({
        fileName: htmlFile,
        outputFolder: path.join(outputFolder, folderName),
        htmlBody: html,
        language,
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
    processDir,
};
