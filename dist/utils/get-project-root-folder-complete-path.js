"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectRootFolderCompletePath = void 0;
const fs_1 = __importDefault(require("fs"));
const getProjectRootFolderCompletePath = (completeFilePath) => {
    const splittedPath = completeFilePath.split('/');
    for (let i = splittedPath.length - 1; i > 0; i--) {
        const pathToCheck = splittedPath.slice(0, i).join('/');
        if (!pathToCheck)
            continue;
        if (fs_1.default.existsSync(`${pathToCheck}/package.json`)) {
            return pathToCheck;
        }
    }
    return null;
};
exports.getProjectRootFolderCompletePath = getProjectRootFolderCompletePath;
