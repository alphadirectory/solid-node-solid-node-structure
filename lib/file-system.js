const fs = require("fs");
const path = require('path');

const resolvePath = (...val) => {
    const configDefaultPath = require("../../../solid.config.json");
    const base = [configDefaultPath.defaultPaths];
    const paths = [...base, ...val];
    return path.resolve('../', paths.join("/"));
};

const createFolder = (directoryPath) => fs.mkdirSync(directoryPath, { recursive: true });

const fileExists = (filePath) => fs.existsSync(filePath);

const folderExists = (directoryPath) => fs.existsSync(directoryPath);

const createFile = (directoryPath, file, content) =>
    fs.writeFileSync(`${directoryPath}/${file}`, content, { encoding: "utf8" });

const checkModuleFolder = (moduleName, raise = true) => {
    const modulePath = resolvePath(moduleName);
    const exists = fs.existsSync(modulePath);
    if (!exists && raise)
        throw new Error("module do not exists");
    return exists;
};

module.exports = {
    fileExists,
    createFile,
    resolvePath,
    createFolder,
    folderExists,
    checkModuleFolder
};