import { DirectoryContent } from "./types";
import { invoke } from "@tauri-apps/api/tauri"

export default async function openDirectory(path: string): Promise<Array<DirectoryContent>> {
    return await invoke('open_directory', { path: path })
}