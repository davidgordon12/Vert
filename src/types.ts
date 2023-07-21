export type DirectoryEntityType = "file" | "directory";
export type DirectoryContentType = "File" | "Directory";

export interface DirectoryContent {
    [key: string]: [string, string]; // Key will be either "Directory" or "File"
}