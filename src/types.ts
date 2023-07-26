/* 
 * Object.entries(<DirectoryContent>)[0][0][0] will unwrap Entity type, return F if file, D if dir
 * Object.entries(<DirectoryContent>)[0][1][0] will return the entity name with file extension (i.e. 'tsconfig.json')
 * Object.entries(<DirectoryContent>)[0][1][1] will return full path of the entity including file extension ('C:\Matcha\Vert\node_modules)
 */
export interface DirectoryContent {
    [key: string]: [string, string]; // Key will be either "Directory" or "File"
}