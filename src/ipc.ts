import { DirectoryContent } from "./types";
import { invoke } from "@tauri-apps/api/tauri"

export async function openDirectory(path: string): Promise<Array<DirectoryContent>> {
    return await invoke('open_directory', { path: path })
}

export async function readEntry(path: String): Promise<string> {
    return await invoke('read_entry', { path: path } )
}