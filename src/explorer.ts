import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';
import { openWorkspace, readFile } from "./ipc";

type Workspace = {
  dirs: Array<DirEntry> | undefined
  files: Array<FileEntry> | undefined
};

type DirEntry = {
  key: string,
  path: string,
  children: Array<FileEntry>,
};

type FileEntry = {
  key: string,
  path: string,
  content: string,
};

openFolderBtn.onclick = async () => {
  console.log("dasdas ")
  const selected = await open({
    directory: true,
    multiple: false,
    defaultPath: await homeDir(),
  }) as string;

  let oldWorkspace = document.getElementsByTagName('li');
  for(let i = oldWorkspace.length-1; i >= 0; --i) {
    oldWorkspace[i].remove()
  }
 
  console.log(await openWorkspace(selected));
}