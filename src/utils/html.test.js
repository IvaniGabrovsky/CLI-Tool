const fs = require("fs");
const { getStartHtml, generateHtml } = require("./html");

jest.mock("fs");

describe("Tests getStartHtml", () => {
  test("empty, null, undefined should return html", () => {
    [null, undefined, ""].forEach((p) => expect(getStartHtml(p)).toBe(""));
  });

  test("relative file path should return true", () => {
    const path = "html";
    const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue(path)
    expect(getStartHtml(path)).toBe(expectedHtml);
    });

  test("relative file path should return true", () => {
    const path = "html";
    const language = "fr";
    const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue(path)
    expect(getStartHtml(path, language)).toBe(expectedHtml);
    });

    test("relative file path with a space should return true", () => {
      const path = "this is html";
      const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue(path)
    expect(getStartHtml(path)).toBe(expectedHtml);
    });

  test("relative file path with a space should return true", () => {
    const path = "this is html";
    const language = "fr";
    const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue(path)
    expect(getStartHtml(path, language)).toBe(expectedHtml);
  });

  test("absolute Unix file path should return true", () => {
    const path = "/abc";
    const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue(path)
    expect(getStartHtml(path)).toBe(expectedHtml);
    });

    test("absolute Unix file path should return true", () => {
      const path = "/abc";
      const language = "fr";
      const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
      fs.lstatSync = jest.fn();
      fs.lstatSync.mockReturnValue(path)
      expect(getStartHtml(path, language)).toBe(expectedHtml);
      });

  test("absolute Windows file path should return true", () => {
    const path = "\abc";
      const expectedHtml = `<!doctype html>
<html lang=\"en\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
      fs.lstatSync = jest.fn();
      fs.lstatSync.mockReturnValue(path)
      expect(getStartHtml(path)).toBe(expectedHtml);
  });

  test("absolute Windows file path should return true", () => {
    const path = "\abc";
      const language = "fr";
      const expectedHtml = `<!doctype html>
<html lang=\"fr\">
  <head>
    <meta charset=\"utf-8\">
    <title>${path}</title>
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  </head>
  <body>`
      fs.lstatSync = jest.fn();
      fs.lstatSync.mockReturnValue(path)
      expect(getStartHtml(path, language)).toBe(expectedHtml);
  });

})

describe("Tests generateHtml", () => {
  
  test("empty, null, undefined should return html", () => {
    [null, undefined, ""].forEach((p) => expect(generateHtml(p)).toBe(undefined));
  });
})
