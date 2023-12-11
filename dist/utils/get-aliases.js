"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAliases = void 0;
const get_user_ts_config_1 = require("./get-user-ts-config");
const get_user_config_1 = require("./get-user-config");
const getAliases = (rootFolder) => {
    var _a, _b;
    const aliases = [];
    const userTsConfig = (0, get_user_ts_config_1.getUserTsConfig)(rootFolder);
    const userConfig = (0, get_user_config_1.getUserConfig)(rootFolder);
    const paths = (_b = (_a = userTsConfig.compilerOptions) === null || _a === void 0 ? void 0 : _a.paths) !== null && _b !== void 0 ? _b : userConfig.aliases;
    if (paths) {
        try {
            for (const aliasData of Object.entries(paths)) {
                const alias = aliasData[0].replace(/\/\*$/, '');
                const path = aliasData[1][0];
                if (!aliases.find((el) => el.alias === alias)) {
                    aliases.push({ alias, path });
                }
            }
        }
        catch (e) { }
    }
    return aliases.map((alias) => (Object.assign(Object.assign({}, alias), { path: alias.path.replace(/^\.?\/?(src)?\/?/g, '') })));
};
exports.getAliases = getAliases;
