const fs = require("fs");
const path = require("path");

/**
 * Process file to generate HTML content
 * @param {string} fileName
 * @param {string} outputFolder
 */
processFile = (fileName, folderName, outputFolder, language) => {
    const fileExtension = path.extname(fileName);
    var data = fs.readFileSync(path.join(folderName, fileName), {
        encoding: "utf8",
        flag: "r",
    });
    if ("MD" === fileExtension?.toUpperCase()) {
        data = processMD(data, "__", "<strong>", "</strong>");
        data = processMD(data, "_", "<i>", "</i>");
        data = processMD(data, "**", "<strong>", "</strong>");
        data = processMD(data, "*", "<i>", "</i>");
        data = processMD(data, "---", "<hr>", "");
    }
    const paragraph = data.split(/\r?\n\r?\n/);
    if (!isExists(outputFolder)) {
        makeDir(outputFolder);
    }
    if (!isExists(path.join(outputFolder, folderName))) {
        makeDir(path.join(outputFolder, folderName));
    }
    generateHtml({
        fileName,
        outputFolder: path.join(outputFolder, folderName),
        paragraph,
        language,
    });
};

processMD = (mdText, pattern, openTag, closeTag) => {
    let result = "";
    let closed = true;

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
        }
        // else {
        //     processDir(fullPath, outputFolder);
        // }
    });
};

module.exports = {
    processFile,
    processMD,
    processDir,
};
