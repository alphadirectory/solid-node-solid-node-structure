const utils = require('./utils');
const commands = require('./commands');

const removeAtt = (str, ref) => str ? str
    .replace(ref, '')
    .replace('=', '')
    .replace('--', '') : '';

const sanitise = (val, ref) => removeAtt(val, ref);

const getArgument = (ref) => {
    const regex = new RegExp(ref, "g");
    const args = process.argv.filter(item => item.match(regex));
    return (!utils.isEmpt(args)) ? args[0] : null;
};

const forceParamenterExists = () => {
    const cmdForce = commands.getCommandByAlias('force');
    return !!getArgument(cmdForce.arg);
};

const getParameterNew = () => {
    const cmdNew = commands.getCommandByAlias('new');
    return getArgument(cmdNew.arg);
};

const getTerminalParameterWithValue = (alias) => {
    const cmd = commands.getCommandByAlias(alias);
    return sanitise(getArgument(`${cmd.arg}=`), cmd.arg);
};

const splitModuleArgs = (val) => {
    const arr = val.split(':');
    if (arr.length !== 2)
        throw new Error("invalid argument");
    return {
        module: arr[0],
        value: arr[1]
    };
};

module.exports = {
    getArgument,
    forceParamenterExists,
    sanitise,
    getParameterNew,
    getTerminalParameterWithValue,
    splitModuleArgs
};