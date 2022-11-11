// return the string start part of html
const getStartHtml = (fileName, language = "en") => {
    if (!fileName) {
        return ``;
    }
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
 * @param {Object} fileContent { fileName: string, outputFolder; string, paragraphss: [] }
 */
generateHtml = (fileContent) => {
    if (!fileContent) {
        return;
    }
    const { fileName, paragraphs, language, htmlBody } = fileContent;
    if (!paragraphs && !htmlBody) {
        return undefined;
    }

    const htmlContent = [];
    htmlContent.push(getStartHtml(fileName, language).toString());
    // Only if paragraphs available
    if (htmlBody) {
        // Only if htmlBody available
        htmlContent.push(htmlBody);
    } else if (paragraphs && paragraphs.length > 0) {
        paragraphs.forEach((paragraphs) => {
            if (paragraphs) {
                htmlContent.push(`<p>${paragraphs}</p>\n`);
            }
        });
    }
    htmlContent.push(HTML_END);
    return htmlContent.join("");
};

module.exports = {
    getStartHtml,
    generateHtml,
};
