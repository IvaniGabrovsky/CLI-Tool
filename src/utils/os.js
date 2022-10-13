const fs = require("fs");

isDir = (pathItem) => {
    try {
        const stat = fs.lstatSync(pathItem);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        throw `Is directory error: ${e}`;
    }
};

isFile = (pathItem) => {
    try {
        const stat = fs.lstatSync(pathItem);
        return !stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        throw `Is file error: ${e}`;
    }
};

isExists = (pathItem) => {
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
    try {
        if (!fs.existsSync(pathItem)) {
            fs.mkdirSync(pathItem);
        }
    } catch {
        throw `Make directory error: ${e}`;
    }
};

removeDir = (pathItem) => {
    fs.rmSync(pathItem, { recursive: true }, (err) => {
        if (err) {
            `Remove directory error: ${err}`;
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
};
