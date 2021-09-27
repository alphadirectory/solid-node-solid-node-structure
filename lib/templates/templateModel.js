const utils = require('../utils');
const terminal = require('../terminal');
const fileSystem = require('../file-system');

const contentTemplateModel = (name) => {
    let template = `export class ${utils.firstLetterUpper(name)}Model {\n\n`;
    template += `}`;
    return template;
};

const command = () => {
    const model = terminal.getTerminalParameterWithValue('new-model');
    if (!model) return false;
    arguments = terminal.splitModuleArgs(model);
    fileSystem.checkModuleFolder(arguments.module);
    return arguments;
};

const generate = (moduleName, name) => {
    name = name.toLowerCase().replace('model', '');
    const modulePath = fileSystem.resolvePath(moduleName, 'models');
    const files = [
        {
            file: `${utils.firstLetterUpper(name)}Model.ts`,
            content: contentTemplateModel(name)
        }
    ];
    const forceExist = terminal.forceParamenterExists();
    return files.map(file => {
        const exists = fileSystem.fileExists(modulePath + '/' + file.file);
        if (exists && !forceExist)
            throw new Error("The file already exists! add -f parameter if you want rewrite the current files");
        fileSystem.createFile(modulePath, file.file, file.content);
        return fileSystem.resolvePath(moduleName, file.file);
    });
};

module.exports = {
    command,
    generate,
};