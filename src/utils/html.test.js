const fs = require("fs");
const { getStartHtml, generateHtml } = require("./os");

jest.mock("fs");

describe("Tests getStartHtml", () => {
  test("empty, null, undefined should return false", () => {
    [null, undefined, ""].forEach((p) => expect(getStartHtml(p)).toBe(false));
  });

  test("relative file path should return true", () => {
    const path = "abc";
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue({isDirectory(){
      return true;
    }})
    expect(getStartHtml(path)).toBe(true);
    });

  test("relative file path with a space should return true", () => {
    const path = "a bc";
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue({isDirectory(){
      return true;
    }})
    expect(getStartHtml(path)).toBe(true);
  });

  test("absolute Unix file path should return true", () => {
    const path = "/abc";
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue({isDirectory(){
      return true;
    }})
    expect(getStartHtml(path)).toBe(true);
    });

  test("absolute Windows file path should return true", () => {
    const path = "/abc";
    fs.lstatSync = jest.fn();
    fs.lstatSync.mockReturnValue({isDirectory(){
      return true;
    }})
    expect(getStartHtml(path)).toBe(true);
  });
})
