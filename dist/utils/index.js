"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./split-imports"), exports);
__exportStar(require("./prepare-final-code"), exports);
__exportStar(require("./simplify-imports"), exports);
__exportStar(require("./get-aliases"), exports);
__exportStar(require("./extract-import-path"), exports);
__exportStar(require("./get-complete-file-path"), exports);
__exportStar(require("./get-project-root-folder-complete-path"), exports);
__exportStar(require("./get-user-config"), exports);
__exportStar(require("./get-user-ts-config"), exports);
