import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';
import { openDirectory, openFile } from "../ipc";

export type DirEntry = {
  key: string,
  path: string,
  file_children: Array<FileEntry>,
  dir_children: Array<DirEntry>,
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