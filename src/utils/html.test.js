const fs = require("fs");
const { getStartHtml, generateHtml } = require("./html");

jest.mock("fs");

describe("Tests getStartHtml", () => {
    test("empty, null, undefined should return emptry string", () => {
        [null, undefined, ""].forEach((p) => expect(getStartHtml(p)).toBe(""));
    });

    test("relative file path should html", () => {
        const path = "html";
        const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path)).toBe(expectedHtml);
    });

    test("relative file path should return html", () => {
        const path = "html";
        const language = "fr";
        const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path, language)).toBe(expectedHtml);
    });

    test("relative file path with a space should return html", () => {
        const path = "this is html";
        const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path)).toBe(expectedHtml);
    });

    test("relative file path with a space should return html", () => {
        const path = "this is html";
        const language = "fr";
        const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path, language)).toBe(expectedHtml);
    });

    test("absolute Unix file path should return html", () => {
        const path = "/abc";
        const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path)).toBe(expectedHtml);
    });

    test("absolute Unix file path should return html", () => {
        const path = "/abc";
        const language = "fr";
        const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path, language)).toBe(expectedHtml);
    });

    test("absolute Windows file path should return html", () => {
        const path = "abc";
        const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path)).toBe(expectedHtml);
    });

    test("absolute Windows file path should return html", () => {
        const path = "abc";
        const language = "fr";
        const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`;
        fs.lstatSync = jest.fn();
        fs.lstatSync.mockReturnValue(path);
        expect(getStartHtml(path, language)).toBe(expectedHtml);
    });
});

describe("Tests generateHtml", () => {
    test("empty, null, undefined should return undefined", () => {
        [null, undefined, ""].forEach((p) =>
            expect(generateHtml(p)).toBe(undefined)
        );
    });

    test("fileContent with expected output, and with paragraphs should return expectedOutput", () => {
        const expectedOutput = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>inputMD</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body><p>Lorem ipsum dolor sit amet</p>

  </body>
</html>
`;
        const fileContent = {
            fileName: "inputMD",
            outputFolder: "dist",
            paragraphs: ["Lorem ipsum dolor sit amet"],
            language: "en",
        };
        expect(generateHtml(fileContent)).toBe(expectedOutput);
    });

    test("fileContent with expected output, and with no paragraphs should return expectedOutput", () => {
        const expectedOutput = `<!doctype html>
        <html lang=en>
          <head>
            <meta charset=\"utf-8\">
            <title>Hello world</title>
            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
          </head>
          <body>
  </body>
</html>
`;
        const fileContent = {
            fileName: "",
            outputFolder: "dist",
            paragraphs: [],
            language: "en",
            htmlBody: `<!doctype html>
        <html lang=en>
          <head>
            <meta charset="utf-8">
            <title>Hello world</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>`,
        };
        expect(generateHtml(fileContent)).toBe(expectedOutput);
    });

    test("fileContent with no expected output, and with no paragraphs should return expectedOutput", () => {
        const fileContent = {
            fileName: "inputMD",
            outputFolder: "dist",
            paragraphs: [],
            language: "en",
            htmlBody: `<div>dsdbcvvc</div>`,
        };
        expect(generateHtml(fileContent)).toBe(`<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>inputMD</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body><div>dsdbcvvc</div>
  </body>
</html>
`);
    });

    test("fileContent with no expected output, and with paragraphs should return expectedOutput", () => {
        const fileContent = {
            fileName: "ext.txt",
            outputFolder: "dist",
            paragraphs: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            ],
            language: "en",
        };
        expect(generateHtml(fileContent)).toBe(`<!doctype html>
<html lang="en">
  <head>
    <meta charset=\"utf-8\">
    <title>ext.txt</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>

  </body>
</html>
`);
    });
});
