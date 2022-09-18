#! /usr/bin/env node
const { program } = require("commander");
const runSsg = require("./commands/runSsg");

program
    .name("ssg-util")
    .description("Static File Generator for text files")
    .option("-i, --input <input-file>", "file or folder to parse")
    .option("-o, --output <output-folder>", "output folder")
    .option("-v, --version", "version")
    .option("-h, --help", "display help for SSG")
    .action(runSsg);

program.parse();

const options = program.opts();
