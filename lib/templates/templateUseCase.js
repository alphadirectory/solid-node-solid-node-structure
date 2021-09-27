const fileSystem = require('../file-system');
const terminal = require('../terminal');
const utils = require('../utils');

const controllerTemplate = (name) => {
    let template = `import { ${name}UseCase } from "./${name}UseCase";\n\n\n`;
    template += `export class ${name}Controller {\n\n`;
    template += `\tconstructor(private ${name.toLowerCase()}UseCase: ${name}UseCase) {}\n\n`;
    template += `\tasync handle(request: Request, response: Response) {\n\n`;
    template += `\t\ttry {\n\n`;
    template += `\t\t} catch (error) {\n\n`;
    template += `\t\t}\n`;
    template += `\t}\n`;
    template += `}`;
    return template;
};

const useCase = (name) => {
    let template = `export class ${name}UseCase {\n\n`;
    template += `\tconstructor() {}\n\n`;
    template += `\tasync execute(data) {}\n`;
    template += `}`;
    return template;
};

const index = (name) => {
    const lowerName = name.toLowerCase();
    let template = `import { ${name}Controller } from "./${name}Controller";\n`;
    template += `import {${name}UseCase} from "./${name}UseCase"; \n\n`;
    template += `const ${lowerName}UseCase = new ${name}UseCase();\n`;
    template += `const ${lowerName}Controler = new ${name}Controller(${lowerName}UseCase);\n\n`;
    template += `export { ${lowerName}UseCase, ${lowerName}Controler };`;
    return template;
};

const interfaceDTO = (name) => `//export interface I${name}DTO {}`;

const command = () => {
    const useCase = terminal.getTerminalParameterWithValue('new-usecase');
    if (!useCase) return false;
    arguments = terminal.splitModuleArgs(useCase);
    fileSystem.checkModuleFolder(arguments.module);
    return arguments;
};

const generate = (moduleName, name) => {
    name = utils.firstLetterUpper(name);
    const modulePath = fileSystem.resolvePath(moduleName, 'useCases', `${name}UseCase`);
    const files = [
        {
            file: 'index.ts',
            content: index(name)
        },
        {
            file: `I${name}DTO.ts`,
            content: interfaceDTO(name)
        },
        {
            file: `${name}UseCase.ts`,
            content: useCase(name)
        },
        {
            file: `${name}Controller.ts`,
            content: controllerTemplate(name)
        }
    ];
    const forceExist = terminal.forceParamenterExists();
    fileSystem.createFolder(modulePath);
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
    generate
};