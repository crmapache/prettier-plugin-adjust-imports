"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTsConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const getUserTsConfig = (rootFolder) => {
    try {
        const tsConfigBuffer = fs_1.default.readFileSync(`${rootFolder}/tsconfig.json`);
        const tsConfigString = tsConfigBuffer.toString('utf8');
        const safeTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}');
        return JSON.parse(safeTsConfigString);
    }
    catch (e) { }
    return {};
};
exports.getUserTsConfig = getUserTsConfig;
