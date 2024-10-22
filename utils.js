const fs = require("fs");
const path = require("path");

/**
 * Loads constants from a JSON file and returns a dictionary. Logs errors and
 * forwards exceptions only if the file is not 'optional'.
 * @param {string} filename - file to load constants from
 * @param {boolean} optional - specify whether the file is optional. Default is
 * not optional. No exceptions are thrown if an optional file fails to load.
 * @return {object} Dictionary with constants loaded from filename.
 */
function loadJsonFile(filename, optional = 0) {
    let result = {};
    try {
    result = JSON.parse(fs.readFileSync(path.resolve(__dirname, `${filename}`)));
    } catch (err) {
    if (err.code === "ENOENT") {
        if (!optional) {
        console.log(`Error: ${filename} not found`);
        throw err;
        }
    } else {
        console.log(`Error loading ${filename}`);
        throw err;
    }
    }
    return result;
}

/**
 * Loads constants from a string input and returns a dictionary. Logs errors and
 * forwards exceptions.
 * @param {string} input - input string to load constants from
 * @return {object} Dictionary with constants loaded from input string.
 */
function loadString(input) {
    let result = {};
    try {
      if (input) {
        result = JSON.parse(input);
      }
    } catch (err) {
      console.log(`Error loading ${input}`);
      throw err;
    }
    return result;
  }

module.exports = {

    loadConfig(fileName, overrideInput = "") {
        const config = loadJsonFile(`./config/${fileName}`);
        const override = loadString(overrideInput);
        return Object.assign({}, config, override);
    },

    loadData(overrideInput = "") {
        const data = {};
        fs.readdirSync(path.resolve(__dirname, './data')).forEach((file) => {
            const name = `${file.replace(".json", "")}`;
            const content = loadJsonFile(`./data/${file}`);
            data[name] = content;
        });
        const override = loadString(overrideInput);
        return Object.assign({}, data, override);
    },
    
};
