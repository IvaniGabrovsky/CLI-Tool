const fs = require("fs");
const path = require("path");

isDir = (pathItem) => {
    if (!pathItem) {
        return false;
    }
    try {
        const stat = fs.lstatSync(pathItem);
        return !!stat?.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        throw `Is directory error: ${e}`;
    }
};

isFile = (pathItem) => {
    if (!pathItem) {
        return false;
    }
    try {
        const stat = fs.lstatSync(pathItem);
        return !!stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        throw `Is file error: ${e}`;
    }
};

isExists = (pathItem) => {
    if (!pathItem) {
        return false;
    }
    try {
        if (fs.existsSync(pathItem)) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        throw `Is file exist error: ${e}`;
    }
};

makeDir = (pathItem) => {
    if (!pathItem) {
        return false;
    }
    console.log(pathItem);
    const dirsArray = pathItem.split(path.sep);
    let p = ".";
    dirsArray
        .map((dir) => {
            p = path.join(p, dir);
            return p;
        })
        .forEach((dir) => {
            try {
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
            } catch (e) {
                throw `Make directory error: ${e}`;
            }
        });
};

removeDir = (pathItem) => {
    if (!pathItem) {
        return false;
    }
    fs.rmSync(pathItem, { recursive: true }, (err) => {
        if (err) {
            `Remove directory error: ${err}`;
        }
    });
};

readFromFile = (fileName) => {
    const data = fs.readFileSync(fileName, {
        encoding: "utf8",
        flag: "r",
    });
    return data;
};

writeToFile = (outputFileName, htmlText) => {
    const pathParts = outputFileName.split(path.sep);
    const dirPath = pathParts.slice(0, pathParts.length - 1);
    makeDir(dirPath.join(path.sep));
    fs.writeFile(outputFileName, htmlText, (err) => {
        if (err) {
            console.log(chalk.red.bold(err));
            return;
        }
    });
};

envParserAction = (ssg) => {
    // Curried function, would look like (callback) => (options, command) => {} on es6
    return (options, command) => {
        // No config file specified, let's continue (early return)
        if (!options.config) return ssg(command);

        // Try to read, parse and set config values
        try {
            // check if file exists
            if (!isFile(options.config))
                throw new Error("Config file not found");

            // Try to read and parse file
            const content = fs.readFileSync(options.config);
            const parsedConfig = JSON.parse(content);

            // Loop through all the keys, and set each option in Commander
            Object.keys(parsedConfig).forEach((key) => {
                command.setOptionValue(key, parsedConfig[key]);
            });
        } catch (err) {
            throw `Config file parse error: ${err}`;
        }

        // The new options has been set, let's contiue
        return ssg(command);
    };
};

module.exports = {
    isDir,
    isFile,
    isExists,
    makeDir,
    removeDir,
    envParserAction,
    writeToFile,
    readFromFile,
};
