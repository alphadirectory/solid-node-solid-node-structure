const fs = require("fs");
const path = require('path');
const templates = require('./templates');
const terminal = require('./terminal');


exports.loadFiles = () => {

    const resolveFiles = (moduleName, useCaseName) => {
        const configDefaultPath = require("../../../solid.config.json");
        const paths = [
            configDefaultPath.defaultPaths,
            moduleName,
            'useCases',
            useCaseName
        ];
        return path.resolve(paths.join("/"));
    };

    const loadOrCreate = (directoryPath) => {
        const exist = fs.existsSync(directoryPath);
        const forceExist = terminal.getTerminalOption().checkForceParameter();

        if (exist && !forceExist)
            throw new Error("The file already exists! add --force parameter if you want rewrite the current files");

        fs.mkdirSync(directoryPath, { recursive: true });
    };

    const createFiles = (useCaseName, directoryPath) => {

        const useCaseFormated = useCaseName[0].toUpperCase() + useCaseName.substr(1);

        const useCase = templates.useCase(useCaseFormated);
        const controllerFile = templates.controllerTemplate(useCaseFormated);
        const index = templates.index(useCaseFormated);
        const interfaceDTO = templates.InterfaceDTO(useCaseFormated);

        const files = [
            index,
            useCase,
            controllerFile,
            interfaceDTO
        ];

        return files.map(template => {
            const filePath = directoryPath + '/' + template.file;
            fs.writeFileSync(filePath,
                template.content
                , { encoding: "utf8" }
            );
            return filePath;
        });
    };
    
    const useCaseName = terminal.getTerminalOption().getUseCase();
    
    const moduleName = terminal.getTerminalOption().getModule();

    const directoryPath = resolveFiles(moduleName, useCaseName);

    loadOrCreate(directoryPath);
    
    return createFiles(useCaseName, directoryPath);
};