"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceRootFilePath = void 0;
const getSourceRootFilePath = (completeFilePath, projectRootFolderCompletePath) => {
    let path = completeFilePath.replace(projectRootFolderCompletePath, '');
};
exports.getSourceRootFilePath = getSourceRootFilePath;
