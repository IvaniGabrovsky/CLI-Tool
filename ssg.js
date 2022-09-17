#! /usr/bin/env node
const { program } = require('commander')
const runSsg = require('./commands/runSsg')

program
    .name('ssg-util')
    .description('Static File Generator for text files')
    // .version('1.0.0')
    .option('-i, --input <input-file>', 'file or folder to parse')
    .option('-o, --output <output-file>', 'output folder')
    .option('-v, --version', 'version')
    .option('-h, --help', 'display help for SSG')
    // .option('-t, --tasks <tasks...>', 'The tasks to mark done. If not specified, all tasks will be marked done.')
    .action(runSsg)

program.parse()

const options = program.opts()