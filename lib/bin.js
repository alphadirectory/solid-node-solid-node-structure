#!/usr/bin/env node
"use strict";
try {
    const commands = require('./commands');
    const libModule = require('./templates/templateModule');
    const infoCreated = (val) => { console.info("@FILES CREATED", val); };
    const cmdModule = libModule.command();
    if (cmdModule)
        return infoCreated(libModule.generate(cmdModule));
    const templates = [
        require('./templates/templateRepository'),
        require('./templates/templateModel'),
        require('./templates/templateUseCase')
    ];
    for (let i in templates) {
        const template = templates[i];
        const cmd = template.command();
        if (cmd) return infoCreated(template.generate(cmd.module, cmd.value));
    }
    console.info(commands.loafArguments());
} catch (e) {
    console.error("@error ", e.message);
}