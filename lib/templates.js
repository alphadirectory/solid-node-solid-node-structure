exports.controllerTemplate = (useCaseName) => {

    let template = `import { ${useCaseName}UseCase } from "./${useCaseName}UseCase";\n\n\n`;
    template += `export class ${useCaseName}Controller {\n\n`;
    template += `\tconstructor(private ${useCaseName}UseCase: ${useCaseName}UseCase) {}\n\n`;
    template += `\tasync handle(request: Request, response: Response) {\n\n`;
    template += `\t\ttry {\n\n`;
    template += `\t\t} catch (error) {\n\n`;
    template += `\t\t}\n`;
    template += `\t}\n`;
    template += `}`;

    return {
        file: `${useCaseName}Controller.ts`,
        content: template
    };


};

exports.useCase = (useCaseName) => {
    let template = `export class ${useCaseName}UseCase {\n\n`;
    template += `\tconstructor() {}\n\n`;
    template += `\tasync execute(data) {}\n`;
    template += `}`;

    return {
        'file': `${useCaseName}UseCase.ts`,
        'content': template
    };

};

exports.index = (useCaseName) => {

    let template = `import { ${useCaseName}Controller } from "./${useCaseName}Controller";\n`;
    template += `import {${useCaseName}UseCase} from "./${useCaseName}UseCase"; \n\n`;
    template += `const ${useCaseName.toLowerCase()}UseCase = new ${useCaseName}UseCase();\n`;
    template += `const ${useCaseName.toLowerCase()}Controler = new ${useCaseName}Controller(${useCaseName.toLowerCase()}UseCase);\n\n`;
    template += `export { ${useCaseName.toLowerCase()}UseCase, ${useCaseName.toLowerCase()}Controler };`;

    return {
        'file': `index.ts`,
        'content': template
    };
};

exports.InterfaceDTO = (useCaseName) => {
    let template = `//export interface I${useCaseName}DTO {}`;
    return {
        'file': `I${useCaseName}DTO.ts`,
        'content': template
    };
};