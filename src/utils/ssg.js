const chalk = require("chalk");
const { version } = require("../../package.json");
const { isDir, isFile, isExists, makeDir, removeDir } = require("./os");
const { processFile, processMD, processDir } = require("./process");
const { generateHtml } = require("./html");

/**
 * Generate HTMLs
 * @param {object} options
 * @returns
 */
ssg = (command) => {
    const options = command.opts();
    let outputFolder = "./dist";
    let language = "en-CA";
    // destructure parameters from object
    const { help, version: optionVersion, input, output, lang } = options;
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
        console.log(chalk.magenta.dim("-l, --lang", "language support"));
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
    // if user provides -l option we will use the provided folder
    if (lang) {
        language = lang;
    }
    try {
        // if user does not provided any input
        if (!input) {
            console.log(
                chalk.red.bold("Missing required parameter -i, --input")
            );
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
                outputFolder,
                " in",
                language
            )
        );

        if (isDir(input)) {
            processDir(input, outputFolder, language);
        } else {
            processFile(input, "", outputFolder, language);
        }
        // Display success message to user
        console.log(chalk.green.bold("Generate HTML success"));
    } catch (e) {
        console.log(chalk.red.bold(e));
        process.exit(1);
    }
};

module.exports = ssg;
