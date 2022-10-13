#! /usr/bin/env node
const { program } = require("commander");
const runSsg = require("./src/commands/runSsg");
const { envParserAction } = require("./src/utils/osUtils");

try {
    program
        .name("text-ssg-tool")
        .description("Static File Generator from text files")
        .option("-i, --input <input-file>", "file or folder to parse")
        .option(
            "-o, --output <output-folder>",
            "folder to generate html content into"
        )
        .option("-v, --version", "version")
        .option("-h, --help", "display help for SSG")
        .option("-l, --lang <laguage>", "language support")
        .option("-c, --config <config-file>", "json configuration file")
        .action(envParserAction(runSsg));

    program.parse();
} catch (e) {
    console.log(chalk.red.bold(e));
    process.exit(1);
}
