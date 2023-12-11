"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyImports = void 0;
const get_user_config_1 = require("./get-user-config");
const getTargetFileFolderPath = (completeFilePath, projectRootFolderCompletePath) => {
    let path = completeFilePath.replace(/\/([^/]+)$/, '');
    path = path.replace(projectRootFolderCompletePath, '');
    return path.replace(/^\.?\/?(src)?\/?/g, '');
};
const checkNestedPath = (path, depth) => {
    if (depth < 1)
        return true;
    return path.split('/').length - 1 <= depth;
};
const checkOuterPath = (path, depth) => {
    if (depth < 1)
        return true;
    return (path.match(/\.\.\//g) || []).length <= depth;
};
const getNestedPath = (detalizedImport, targetFileFolderPath) => {
    return detalizedImport.realPath.replace(targetFileFolderPath, '.');
};
const getOuterPath = (detalizedImport, targetFileFolderPath) => {
    const splittedRealPath = detalizedImport.realPath.split('/');
    const splittedTargetFileFolderPath = targetFileFolderPath.split('/');
    let targetIndex = splittedRealPath.length;
    for (let i = 0; i < splittedRealPath.length; i++) {
        if (splittedRealPath[i] !== splittedTargetFileFolderPath[i]) {
            targetIndex = i;
            break;
        }
    }
    const pathFirstPart = splittedTargetFileFolderPath
        .slice(targetIndex)
        .reduce((acc, cur) => `../${acc}`, '');
    const pathSecondPart = splittedRealPath.slice(targetIndex).join('/');
    return `${pathFirstPart}${pathSecondPart}`;
};
const simplifyImports = (detalizedImports, completeFilePath, projectRootFolderCompletePath) => {
    var _a, _b;
    const userConfig = (0, get_user_config_1.getUserConfig)(projectRootFolderCompletePath);
    const result = [];
    const targetFileFolderPath = getTargetFileFolderPath(completeFilePath, projectRootFolderCompletePath);
    for (const detalizedImport of detalizedImports) {
        if (!detalizedImport.aliasPath)
            continue;
        if (detalizedImport.realPath.includes(targetFileFolderPath)) {
            const newPath = getNestedPath(detalizedImport, targetFileFolderPath);
            if (!checkNestedPath(newPath, (_a = userConfig.descendingDepth) !== null && _a !== void 0 ? _a : 0))
                continue;
            const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath);
            result.push(Object.assign(Object.assign({}, detalizedImport), { updatedRaw: newRawImport }));
        }
        else if (targetFileFolderPath.startsWith(detalizedImport.aliasPath)) {
            const newPath = getOuterPath(detalizedImport, targetFileFolderPath);
            if (!checkOuterPath(newPath, (_b = userConfig.ascendingDepth) !== null && _b !== void 0 ? _b : 0))
                continue;
            const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath);
            result.push(Object.assign(Object.assign({}, detalizedImport), { updatedRaw: newRawImport }));
        }
    }
    return result;
};
exports.simplifyImports = simplifyImports;
