import { invoke } from "@tauri-apps/api/tauri"

export async function openWorkspace(path: string): Promise<Array<String>> {
    return await invoke('open_workspace', { path: path })
}

export async function readFile(path: String): Promise<string> {
    return await invoke('read_file', { path: path } )
}