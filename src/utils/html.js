const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { isExists, makeDir } = require("./os");

// return the string start part of html
const getStartHtml = (fileName, language) => {
    return `<!doctype html>
<html lang="${language}">
  <head>
      <meta charset="utf-8">
      <title>${fileName}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>`;
};

// contain the end of html
const HTML_END = `
  </body>
</html>
`;

/**
 * Generate HTML File
 * @param {Object} fileContent { fileName: string, outputFolder; string, paragraphs: [] }
 */
generateHtml = (fileContent) => {
    const { fileName, outputFolder, paragraph, language } = fileContent;
    const htmlFile = fileName?.split(".")[0] + ".html";
    const htmlContent = [];
    htmlContent.push(getStartHtml(fileName, language).toString());
    paragraph.forEach((paragraph) => {
        if (paragraph) {
            htmlContent.push(`<p>${paragraph}</p>\n`);
        }
    });
    htmlContent.push(HTML_END);
    const fullPath = path.join(outputFolder, htmlFile);
    const dirPath = path.dirname(fullPath);
    if (!isExists(dirPath)) {
        makeDir(dirPath);
    }
    fs.writeFile(
        path.join(outputFolder, htmlFile),
        htmlContent.join(" "),
        (err) => {
            if (err) {
                console.log(chalk.red.bold(err));
                return;
            }
        }
    );
};

module.exports = {
    generateHtml,
};
