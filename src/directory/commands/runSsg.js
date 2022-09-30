const fs = require("fs");
const path = require("path");
const lineByLine = require("n-readlines");
const chalk = require("chalk");

const HTML_START = `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>${fileName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>`;

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
    const { help, version, input, output } = options;
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
    if (version) {
        console.log(chalk.blue.bold("v1.0.0"));
        return;
    }
    if (output) {
        outputFolder = output;
    }
    if (!input) {
        console.log(chalk.red.bold("Missing required parameter -i, --input"));
        return;
    }

    // check if exist delete content or if not create it
    if (isExists(outputFolder)) {
        if (isDir(outputFolder)) {
            removeDir(outputFolder);
            makeDir(outputFolder);
        } else {
            console.log(chalk.red.bold("Output must be folder"));
            return;
        }
    } else {
        makeDir(outputFolder);
    }

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
    console.log(chalk.green.bold("Generate HTML success"));
}

/**
 * Process file to generate HTML content
 * @param {string} fileName
 * @param {string} outputFolder
 */
function processFile(fileName, folderName, outputFolder) {
    // for each line write from text file one line and add it to paragraphs []
    const paragraph = [];
    const liner = new lineByLine(path.join(folderName, fileName));
    let line;
    while ((line = liner.next())) {
        paragraph.push(line.toString("ascii"));
    }
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
    // get html file name from text file name
    const htmlFile = fileName?.split(".")[0] + ".html";
    // generate html content
    let htmlContent = HTML_START;
    paragraph.forEach((paragraph) => {
        if (paragraph) {
            htmlContent = htmlContent + "<p>" + paragraph + "</p>\n";
        }
    });
    htmlContent = htmlContent + HTML_END;
    // write to file
    fs.writeFile(
        "./" + outputFolder + "/" + htmlFile,
        htmlContent,
        function (err) {
            if (err) {
                console.log(chalk.red.bold(err));
                return;
            }
        }
    );
}

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
    fs.rm(pathItem, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    });
}

module.exports = runSsg;
