"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preprocess = void 0;
const utils_1 = require("./utils");
const extractor_1 = require("./extractor");
const preprocess = (code, { filepath }) => {
    const aliases = (0, utils_1.getAliases)();
    const rawImports = (0, extractor_1.extractor)(code);
    if (rawImports) {
        const detalizedImports = (0, utils_1.splitImports)(rawImports, aliases);
        const importsToReplace = (0, utils_1.simplifyImports)(detalizedImports, filepath);
        return (0, utils_1.prepareFinalCode)(importsToReplace, code);
    }
    return code;
};
exports.preprocess = preprocess;
