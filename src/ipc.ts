import { invoke } from "@tauri-apps/api/tauri"
import { FileEntry, DirEntry } from "./components/explorer"

export async function openDirectory(path: string): Promise<DirEntry> {
  return await invoke('open_directory', { path: path })
}

export async function openFile(path: String): Promise<FileEntry> {
  return await invoke('open_file', { path: path } )
}