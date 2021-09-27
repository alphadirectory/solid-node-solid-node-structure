const utils = require('../utils');
const terminal = require('../terminal');
const fileSystem = require('../file-system');

const contentTemplateRepository = (name) => {
    let template = `export class ${name}Repository {\n\n`;
    template += `}`;
    return template;
};

const IDTORepository = (name) => {
    return `//export interface I${name}DTO {}`;
};

const command = () => {
    const repository = terminal.getTerminalParameterWithValue('new-repository');
    if (!repository) return false;
    arguments = terminal.splitModuleArgs(repository);
    fileSystem.checkModuleFolder(arguments.module);
    return arguments;
};

const generate = (moduleName, name) => {
    name = utils.firstLetterUpper(name.toLowerCase().replace('repository', ''));
    const modulePath = fileSystem.resolvePath(moduleName, 'repositories', name.toLowerCase());
    const files = [
        {
            file: `${name}Repository.ts`,
            content: contentTemplateRepository(name)
        },
        {
            file: `I${name}Repository.ts`,
            content: IDTORepository()
        }
    ];
    fileSystem.createFolder(modulePath);
    const forceExist = terminal.forceParamenterExists();
    return files.map(file => {
        const exists = fileSystem.fileExists(modulePath + '/' + file.file);
        if (exists && !forceExist)
            throw new Error("The file already exists! add -f parameter if you want rewrite the current files");
        fileSystem.createFile(
            modulePath,
            file.file,
            file.content
        );
        return fileSystem.resolvePath(moduleName, file.file);
    });
};

module.exports = {
    command,
    generate,
};