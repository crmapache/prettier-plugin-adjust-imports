"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const utils_1 = require("./utils");
const extractor_1 = require("./extractor");
const preprocess = (code, { filepath }) => {
    const completeFilePath = (0, utils_1.getCompleteFilePath)(filepath);
    const projectRootFolderCompletePath = (0, utils_1.getProjectRootFolderCompletePath)(completeFilePath);
    if (!projectRootFolderCompletePath)
        return code;
    const aliases = (0, utils_1.getAliases)(projectRootFolderCompletePath);
    const rawImports = (0, extractor_1.extractor)(code);
    if (rawImports) {
        const detalizedImports = (0, utils_1.splitImports)(rawImports, aliases);
        const importsToReplace = (0, utils_1.simplifyImports)(detalizedImports, completeFilePath, projectRootFolderCompletePath);
        return (0, utils_1.prepareFinalCode)(importsToReplace, code);
    }
    return code;
};
exports.preprocess = preprocess;
