"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteFilePath = void 0;
const getCompleteFilePath = (filepath) => {
    const processPath = process.cwd();
    if (filepath.startsWith(processPath))
        return filepath;
    return `${processPath}/${filepath}`;
};
exports.getCompleteFilePath = getCompleteFilePath;
