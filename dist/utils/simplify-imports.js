"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simplifyImports = void 0;
const getTargetFileFolderPath = (rootFolderPath, filepath) => {
    let path = filepath.replace(/\/([^/]+)$/, '');
    if (filepath.startsWith(rootFolderPath)) {
        path = path.replace(rootFolderPath, '');
    }
    return path.replace(/^\/?src\//, '');
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
    const pathFirstPart = splittedTargetFileFolderPath.slice(targetIndex).reduce((acc, cur) => `../${acc}`, '');
    const pathSecondPart = splittedRealPath.slice(targetIndex).join('/');
    return `${pathFirstPart}${pathSecondPart}`;
};
const simplifyImports = (detalizedImports, filepath) => {
    const result = [];
    const rootFolderPath = process.cwd();
    const targetFileFolderPath = getTargetFileFolderPath(rootFolderPath, filepath);
    for (const detalizedImport of detalizedImports) {
        if (!detalizedImport.aliasPath)
            continue;
        if (detalizedImport.realPath.includes(targetFileFolderPath)) {
            const newPath = getNestedPath(detalizedImport, targetFileFolderPath);
            const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath);
            result.push(Object.assign(Object.assign({}, detalizedImport), { updatedRaw: newRawImport }));
        }
        else if (targetFileFolderPath.startsWith(detalizedImport.aliasPath)) {
            const newPath = getOuterPath(detalizedImport, targetFileFolderPath);
            const newRawImport = detalizedImport.raw.replace(detalizedImport.path, newPath);
            result.push(Object.assign(Object.assign({}, detalizedImport), { updatedRaw: newRawImport }));
        }
    }
    return result;
};
exports.simplifyImports = simplifyImports;
