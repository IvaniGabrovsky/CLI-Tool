#! /usr/bin/env node
const { program } = require("commander");
const runSsg = require("./commands/runSsg");

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
    .action(runSsg);

program.parse();

const options = program.opts();
