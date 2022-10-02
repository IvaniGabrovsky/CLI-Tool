const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { version } = require("../../package.json");
const { isDir, isFile, isExists, makeDir, removeDir} = require("../utils/osUtils");

// return the string start part of html
const getStartHtml = (fileName) => {
    return(
`<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${fileName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>`);
}

// contain the end of html
const HTML_END = `
    </body>
</html>
`;

/**
 * Generate HTMLs
 * @param {object} options
 * @returns
 */
function runSsg(options) {
    let outputFolder = "./dist";
    // destructure parameters from object
    const { help, version: optionVersion, input, output } = options;
    // print list of possible commands
    if (help) {
        console.log(chalk.magenta.bold("Help"));
        console.log(
            chalk.magenta.dim(
                "-i, --input <input-file>",
                "file or folder to parse"
            )
        );
        console.log(
            chalk.magenta.dim("-o, --output <output-folder>", "output folder")
        );
        console.log(chalk.magenta.dim("-v, --version", "version"));
        console.log(chalk.magenta.dim("-h, --help", "display help for SSG"));
        return;
    }
    // print version of this tool
    if (optionVersion) {
        console.log(chalk.blue.bold(version));
        return;
    }
    // if user provides -o option we will use the provided folder
    if (output) {
        outputFolder = output;
    }
    // if user does not provided any input
    if (!input) {
        console.log(chalk.red.bold("Missing required parameter -i, --input"));
        return;
    }

    // check if output folder exist and is folder exists delete content or if it does not exist create output folder
    if (isExists(outputFolder) && isDir(outputFolder)) { 
            removeDir(outputFolder);
            makeDir(outputFolder);
    } else {
        makeDir(outputFolder);
    }

    // Display message to let user know html has been generated from input into the dist directory
    console.log(
        chalk.blue.bold(
            "Generate HTML from input:",
            input,
            " to folder ",
            outputFolder
        )
    );

    if (isDir(input)) {
        processDir(input, outputFolder);
    } else {
        processFile(input, "", outputFolder);
    }
    // Display success message to user
    console.log(chalk.green.bold("Generate HTML success"));
}

/**
 * Process file to generate HTML content
 * @param {string} fileName
 * @param {string} outputFolder
 */
function processFile(fileName, folderName, outputFolder) {
    const fileExtension = fileName?.split(".")[1];
    var data = fs.readFileSync(path.join(folderName, fileName), {encoding:'utf8', flag:'r'});
    if('md'.localeCompare(fileExtension, undefined, { sensitivity: 'accent' })){
        data = processMD(data, "__", "<strong>", "</strong>");
        data = processMD(data, "_", "<i>", "</i>");
        data = processMD(data, "**", "<strong>", "</strong>");
        data = processMD(data, "*", "<i>", "</i>");
    }
    const paragraph = data.split(/\r?\n\r?\n/)
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
    });
}

function processMD(mdText, pattern, openTag, closeTag) {
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
}

/**
 * Process folder to generate HTML content
 * @param {string} folderName
 */
function processDir(folderName, outputFolder) {
    fs.readdirSync(folderName).forEach((fileName) => {
        const fullPath = path.join(folderName, fileName);
        if (isFile(fullPath)) {
            processFile(fileName, folderName, outputFolder);
        }
        // else {
        //     processDir(fullPath, outputFolder);
        // }
    });
}

/**
 * Generate HTML File
 * @param {Object} fileContent { fileName: string, outputFolder; string, paragraphs: [] }
 */
function generateHtml(fileContent) {
    const { fileName, outputFolder, paragraph } = fileContent;
    const htmlFile = fileName?.split(".")[0] + ".html";
    let htmlContent = getStartHtml(fileName);
    paragraph.forEach((paragraph) => {
        if (paragraph) {
            htmlContent = htmlContent + "<p>" + paragraph + "</p>\n";
        }
    });
    htmlContent = htmlContent + HTML_END;
    fs.writeFile(
        path.join(outputFolder, htmlFile),
        htmlContent,
        function (err) {
            if (err) {
                console.log(chalk.red.bold(err));
                return;
            }
        }
    );
}

module.exports = runSsg;
