import { invoke } from "@tauri-apps/api/tauri"
import { Workspace, FileEntry, DirEntry } from "./components/explorer"

export async function openWorkspace(path: string): Promise<Workspace> {
    return await invoke('open_workspace', { path: path })
}

export async function openFile(path: String): Promise<FileEntry> {
    return await invoke('open_file', { path: path } )
}