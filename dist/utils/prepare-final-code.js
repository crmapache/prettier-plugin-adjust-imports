"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFinalCode = void 0;
const prepareFinalCode = (importsToReplace, code) => {
    let result = code;
    for (const importToReplace of importsToReplace) {
        result = result.replace(importToReplace.raw, importToReplace.updatedRaw);
    }
    return result;
};
exports.prepareFinalCode = prepareFinalCode;
