export type DirectoryEntry = {
    type: string,
    path: string,
    name: string,
    parent: DirectoryEntry | null
}