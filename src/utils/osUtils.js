const fs = require("fs");

isDir = (pathItem) => {
    try {
        var stat = fs.lstatSync(pathItem);
        return stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
};

isFile = (pathItem) => {
    try {
        var stat = fs.lstatSync(pathItem);
        return !stat.isDirectory();
    } catch (e) {
        // lstatSync throws an error if path doesn't exist
        return false;
    }
};

isExists = (pathItem) => {
    try {
        if (fs.existsSync(pathItem)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};

makeDir = (pathItem) => {
    try {
        if (!fs.existsSync(pathItem)) {
            fs.mkdirSync(pathItem);
        }
    } catch (err) {
        console.error(err);
    }
};

removeDir = (pathItem) => {
    fs.rmSync(pathItem, { recursive: true }, (err) => {
        if (err) {
            throw err;
        }
    });
};

envParserAction = (runSsg) => {
    // Curried function, would look like (callback) => (options, command) => {} on es6
    return () => (options, command) => {
        // No config file specified, let's continue (early return)
        if (!options.config) return runSsg(command);

        // Try to read, parse and set config values
        try {
            // check if file exists
            if (!isFile(options.config))
                throw new Error("Config file not found");

            // Try to read and parse file
            const content = fs.readFileSync(options.config);
            const parsedConfig = JSON.parse(content);

            // Loop through all the keys, and set each option in Commander
            Object.keys(parsedConfig).forEach(() => (key) => {
                command.setOptionValue(key, parsedConfig[key]);
            });
        } catch (err) {
            console.error(err);
            process.exit(1);
        }

        // The new options has been set, let's contiue
        return runSsg(command);
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
