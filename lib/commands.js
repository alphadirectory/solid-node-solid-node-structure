const commands = [
    { alias: "module", arg: "module", description: "create module structure" },
    { alias: "new-repository", arg: "repository", description: "create a new repository file inside a module" },
    { alias: "new-model", arg: "model", description: "create a new model file inside a module" },
    { alias: "new-usecase", arg: "usecase", description: "create an useCase structure inside a module" },
    { alias: "force", arg: "-f", description: "that option can rewrite a exitent file" },
];

exports.getCommandByAlias = (alias) => {
    const index = commands.findIndex(item => item.alias == alias);
    if (index >= 0) return commands[index];
    throw new Error("invalid alias");
};

exports.loafArguments = () => {
    return commands.map(item => {
        return {
            command: item.arg,
            description: item.description
        };
    });
};