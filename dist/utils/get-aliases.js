"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAliases = void 0;
const fs_1 = __importDefault(require("fs"));
const getUserTsConfig = () => {
    try {
        const tsConfigBuffer = fs_1.default.readFileSync(`${process.cwd()}/tsconfig.json`);
        const tsConfigString = tsConfigBuffer.toString('utf8');
        const safeTsConfigString = tsConfigString.replace(/[\s\n]/gm, '').replace(',}', '}');
        return JSON.parse(safeTsConfigString);
    }
    catch (e) { }
    return {};
};
const getAliases = () => {
    const aliases = [];
    const userTsConfig = getUserTsConfig();
    const paths = userTsConfig.compilerOptions.paths;
    if (paths) {
        for (const aliasData of Object.entries(paths)) {
            const alias = aliasData[0].replace(/\/\*$/, '');
            const path = aliasData[1][0];
            if (!aliases.find((el) => el.alias === alias)) {
                aliases.push({ alias, path });
            }
        }
    }
    return aliases;
};
exports.getAliases = getAliases;
