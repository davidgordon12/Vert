import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';
import { openWorkspace, openFile } from "../ipc";

export type Workspace = {
  dirs: Array<DirEntry> | undefined
  files: Array<FileEntry> | undefined
};

export type DirEntry = {
  key: string,
  path: string,
  children: Array<FileEntry> | undefined,
};

export type FileEntry = {
  key: string,
  path: string,
  content: string,
};

openFolderBtn.onclick = async () => {
  const selected = await open({
    directory: true,
    multiple: false,
    defaultPath: await homeDir(),
  }) as string;
}