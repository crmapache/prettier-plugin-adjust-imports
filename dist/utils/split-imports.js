"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitImports = void 0;
const extract_import_path_1 = require("./extract-import-path");
const clearImportFromComments = (row) => row
    .replace(/\/\*[\s\S]*?\*\//gm, '')
    .replace(/\/\/.+$/gm, '')
    .replace(/^[ \t]*\n/gm, '');
const findAliasMathImport = (path, aliases) => {
    let largestAlias = null;
    for (const alias of aliases) {
        if (path.startsWith(alias.alias)) {
            if (!largestAlias || largestAlias.alias < alias.alias) {
                largestAlias = alias;
            }
        }
    }
    return largestAlias;
};
const detalizeImport = (rawImport, aliases) => {
    const path = (0, extract_import_path_1.extractImportPath)(rawImport);
    const alias = findAliasMathImport(path, aliases);
    const aliasPath = alias === null || alias === void 0 ? void 0 : alias.path;
    const realPath = alias ? path.replace(alias.alias, alias.path) : path;
    return { raw: rawImport, path, realPath, aliasPath };
};
const splitImports = (rawImports, aliases) => {
    let rawImportsData = rawImports;
    const singleLineRegExp = /^import.+['"`]$/gm;
    const singleLineImports = rawImports.match(singleLineRegExp);
    rawImportsData = rawImportsData.replace(singleLineRegExp, '');
    const multiLineRegExp = /^import\s*{(\s*[\w\s,/\n]*\s*)}\s*from\s*['"].+['"].*$/gm;
    const multiLineImports = rawImportsData.match(multiLineRegExp);
    const imports = [];
    if (singleLineImports && singleLineImports.length > 0) {
        for (const singleLineImport of singleLineImports) {
            imports.push(clearImportFromComments(singleLineImport));
        }
    }
    if (multiLineImports && multiLineImports.length > 0) {
        for (const multiLineImport of multiLineImports) {
            imports.push(clearImportFromComments(multiLineImport));
        }
    }
    return imports.map(rawImport => detalizeImport(rawImport, aliases));
};
exports.splitImports = splitImports;
