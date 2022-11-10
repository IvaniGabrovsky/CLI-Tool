const fs = require("fs");
const {
    processFile,
    processMDFile,
    processTextFile,
    processDir,
} = require("./process");

jest.mock("fs");

describe("Tests processFile", () => {
    test("empty, null, undefined should return false", () => {
        [null, undefined, ""].forEach((p) =>
            expect(processFile(p)).toBe(undefined)
        );
    });

    test("file name with md extension, and folder name should return undefined", () => {
        const fileName = "inputMd.md";
        const folderName = "input";
        const mock = processFile(fileName, folderName);
        expect(mock).toBe(undefined);
    });

    test("file name with md extension, folder name, output folder, and language should return undefined", () => {
        const fileName = "inputMd.md";
        const folderName = "input";
        const outputFolder = "output";
        const language = "fr";
        const mock = processFile(fileName, folderName, outputFolder, language);
        expect(mock).toBe(undefined);
    });

    test("file name with text extension, and folder name should return undefined", () => {
        const fileName = "test.txt";
        const folderName = "input";
        const mock = processFile(fileName, folderName);
        expect(mock).toBe(undefined);
    });

    test("file name with text extension, folder name, output folder, and language should return undefined", () => {
        const fileName = "test.txt";
        const folderName = "input";
        const outputFolder = "output";
        const language = "fr";
        const mock = processFile(fileName, folderName, outputFolder, language);
        expect(mock).toBe(undefined);
    });
});
