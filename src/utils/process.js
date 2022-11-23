const fs = require("fs");
const path = require("path");
const { generateHtml } = require("./html");
const { writeToFile } = require("./os");

/**
 * Process file to generate HTML content
 * @param {string} fileName
 * @param {string} outputFolder
 */
processFile = (
    fileName,
    folderName,
    outputFolder = "dist",
    language = "en"
) => {
    if (!fileName) {
        return undefined;
    }
    const fileExtension = path.extname(fileName);
    if (".MD" === fileExtension?.toUpperCase()) {
        processMDFile(fileName, folderName, outputFolder, language);
    } else {
        processTextFile(fileName, folderName, outputFolder, language);
    }
};

processMDFile = (fileName, folderName, outputFolder, language) => {
    const data = readFromFile(fileName);
    var showdown = require("showdown"),
        converter = new showdown.Converter(),
        html = converter.makeHtml(data);
    const htmlFile = fileName?.split(".")[0] + ".html";
    const htmlContent = generateHtml({
        fileName: htmlFile,
        outputFolder: path.join(outputFolder, folderName),
        htmlBody: html,
        language,
    });
    const htmlFullPath = path.join(outputFolder, htmlFile);
    writeToFile(htmlFullPath, htmlContent);
};

processTextFile = (fileName, folderName, outputFolder, language) => {
    const data = readFromFile(path.join(folderName, fileName));
    if (!data) {
        return undefined;
    }
    const paragraphs = data.split(/\r?\n\r?\n/);
    let htmlContent = generateHtml({
        fileName,
        outputFolder: path.join(outputFolder, folderName),
        paragraphs,
        language,
    });
    const htmlFullPath = path.join(outputFolder, fileName);
    writeToFile(htmlFullPath, htmlContent);
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
