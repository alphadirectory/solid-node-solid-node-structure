exports.getTerminalOption = () => {

    const isEmpt = val => !(val && val.length);

    const removeAtt = (ref, str) => str.replace(ref, '');

    const getModule = () => {
        const args = process.argv;
        const module = args.filter(item => item.match(/--module*/));
        if (isEmpt(module))
            throw new Error("Module is required! exemple --module=yourNewModule");
        return removeAtt('--module=', module[0]);
    };

    const getUseCase = () => {
        const args = process.argv;
        const usecase = args.filter(item => item.match(/--usecase*/));
        if (isEmpt(usecase))
            throw new Error("useCase name is required! exemple --usecase=yourNewUseCase");
        return removeAtt('--usecase=', usecase[0]);
    };

    const checkForceParameter = () => {
        const args = process.argv;
        const force = args.filter(item => item.match(/--force*/));
        return !isEmpt(force);
    };

    return {
        getModule,
        getUseCase,
        checkForceParameter
    };

};
