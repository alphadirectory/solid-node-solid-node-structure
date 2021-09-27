const terminal = require('../terminal');
const fileSystem = require('../file-system');

const command = () => {
    const module = terminal.getTerminalParameterWithValue('module');;
    return module ? module : false;
};

const generate = (moduleName) => {
    const actions = [
        fileSystem.resolvePath(moduleName),
        fileSystem.resolvePath(moduleName, 'useCases'),
        fileSystem.resolvePath(moduleName, 'models'),
        fileSystem.resolvePath(moduleName, 'repositories')
    ];
    const forceExist = terminal.forceParamenterExists();
    return actions.map(path => {
        const exists = fileSystem.folderExists(path);
        if (exists && !forceExist)
            throw new Error("The file already exists! add -f parameter if you want rewrite the current files");
        fileSystem.createFolder(path);
        return path;
    });
};

module.exports = {
    command,
    generate,
};