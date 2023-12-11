export type DetalizedImport = {
    raw: string;
    updatedRaw?: string;
    path: string;
    aliasPath: string | null;
    realPath: string;
};
export type Alias = {
    alias: string;
    path: string;
};
export type UserConfig = {
    aliases?: Record<string, string[]>;
    ascendingDepth?: number;
    descendingDepth?: number;
};
