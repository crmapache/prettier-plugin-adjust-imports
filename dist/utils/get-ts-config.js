"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const getUserConfig = (rootFolder) => {
    try {
        const tsConfigBuffer = fs_1.default.readFileSync(`${rootFolder}/adjust-imports-plugin.config.json`);
        const tsConfigString = tsConfigBuffer.toString('utf8');
        const safeTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}');
        return JSON.parse(safeTsConfigString);
    }
    catch (e) { }
    return {
        ascendingDepth: 0,
        descendingDepth: 0
    };
};
exports.getUserConfig = getUserConfig;
