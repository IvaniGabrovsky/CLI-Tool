const fs = require('fs')
const lineByLine = require('n-readlines');
const chalk = require('chalk')

const HTML_START = `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Filename</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>`

const HTML_END = `
    </body>
</html>
`
/**
 * Generate HTMLs
 * @param {object} options 
 * @returns 
 */
function runSsg (options) {
    let outputFolder = './dist'
    const { help, version, input, output } = options
    if (help) {
        console.log('Display help')
        return
    }
    if (version) {
        console.log('v1.0.0')
        return
    }
    if (output) {
        outputFolder = output
    }
    if (!input) {
        console.log(
            chalk.red.bold('Missing required parameter input')
        )
        return
    }
    if (outputFolder) {
        // check if exist delete content of not create it
    }
    
    console.log(
        chalk.green.bold('Generate HTML from input file:', input, ' to folder ', outputFolder)
    )
    processFile(input, outputFolder)
    console.log(
        chalk.green.bold('Generate HTML success')
    )
}

/**
 * Process file to generate HTML content
 * @param {string} fileName 
 * @param {string} outputFolder
 */
function processFile(fileName, outputFolder) { 
    // for each line write from text file one line and add it to paragraphs []
    const paragraph = []
    const liner = new lineByLine(fileName);
    let line;
    while (line = liner.next()) {
        paragraph.push(line.toString('ascii'));
    }
    generateHtml({ fileName, outputFolder, paragraph })
}

/**
 * Process folder to generate HTML content
 * @param {string} folderName 
 */
function processFolder(folderName) {
    // read all files/folders from the current folder
    // for each of content:
    // if file call: processFile(fileName)
    // if folder call: processFolder(folderName)
}

/**
 * Generate HTML File
 * @param {Object} fileContent { fileName: string, outputFolder; string, paragraphs: [] }
 */
function generateHtml(fileContent) {
    const { fileName, outputFolder, paragraph } = fileContent
    console.log(fileContent)
    // get html file name from text file name
    const htmlFile = fileName?.split('.')[0] + '.html'
    // generate html content
    let htmlContent = HTML_START
    paragraph.forEach((paragraph) => {
        if (paragraph) {
            htmlContent = htmlContent + '<p>' + paragraph + '</p>\n'
        }
    })
    htmlContent = htmlContent + HTML_END
    console.log(htmlContent)
    // write to file
    fs.writeFile('./' + outputFolder + '/' + htmlFile, htmlContent, function (err) {
        if (err) {
            console.log(
                chalk.red.bold(err)
            )
            return
        };
        console.log(
            chalk.green.bold('HTML file: ' + htmlFile + ' successfully generated.')
        )
    });
}

module.exports = runSsg