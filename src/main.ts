import interact from "interactjs";

import { invoke } from "@tauri-apps/api/tauri";
import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';

import { DirectoryEntry } from "./types";

let editor: HTMLTextAreaElement = document.getElementById(
  "editor-textarea"
) as HTMLTextAreaElement;
let explorer: HTMLTextAreaElement = document.getElementById(
  "explorer"
) as HTMLTextAreaElement;
let toolbar: HTMLTextAreaElement = document.getElementById(
  "toolbar"
) as HTMLTextAreaElement;

let toolbarExplorer: HTMLButtonElement = document.getElementById(
  "toolbar-explorer"
) as HTMLButtonElement;

let openFolder: HTMLButtonElement = document.getElementById(
  "read-dir"
) as HTMLButtonElement;

let fileTree: HTMLUListElement = document.getElementById(
  "explorer-file-tree"
) as HTMLUListElement

export interface DirectoryContent {
  [key: string]: [string, string]; // Key will be either "Directory" or "File"
}

interact(explorer).resizable({
  edges: { top: false, left: true, bottom: false, right: false },
  listeners: {
    move: function (event: any) {
      let { x, y } = event.target.dataset;

      x = (parseFloat(x) || 0) + event.deltaRect.left;
      y = (parseFloat(y) || 0) + event.deltaRect.top;

      explorer.style.maxWidth = "80%";

      Object.assign(event.target.style, {
        width: `${event.rect.width}px`,
      });

      Object.assign(event.target.dataset, { x, y });

      setEditorSize();
    },
  },
});

window.addEventListener("DOMContentLoaded", () => {
  setEditorSize();
});

window.onresize = function () {
  setEditorSize();
};

function setEditorSize(): void {
  let explorerWidth: number = explorer.offsetWidth;
  let toolbarWidth: number = toolbar.offsetWidth;

  let offset: number = explorerWidth + toolbarWidth;

  editor.style.width = `${document.body.clientWidth - offset}px`;
}

toolbarExplorer.onclick = () => {
  if (explorer.style.width == "0px") {
    explorer.style.width = "200px";
  } else {
    explorer.style.width = "0px";
  }

  setEditorSize();
};

openFolder.onclick = async () => {
  const selected = await open({
    directory: true,
    multiple: false,
    defaultPath: await homeDir(),
  }) as string;

  let files: Array<DirectoryContent> = await invoke('open_directory', { path: selected })

  processEntries(files);
}

function processEntries(files: Array<DirectoryEntry>) {
    files.forEach(file => {
        const element = document.createElement("li");
        element.id = Object.entries(file)[0][1][1];
        element.classList.add('explorer-file-tree-element');
        element.classList.add(Object.entries(file)[0][0][0]); // appends a D (directory) or F (file) to classList
        if(Object.entries(file)[0][0][0] == 'D') {
            element.innerText = '>' + Object.entries(file)[0][1][0];
        }
        else {
            element.innerText = Object.entries(file)[0][1][0];
        }
    
        element.onclick = async () => {
            if(element.classList.contains('D')) {
                if(element.classList.contains("processed")) { return; } // folder has already been opened, **WIP. this should collapse parent folder **
                else {
                    element.classList.add("processed");
                    let sub_files: Array<DirectoryEntry> = await invoke('open_directory', { path: element.id})
                    processEntries(sub_files);
                }
            }
            else {
                let res = await invoke('read_entry', { path: element.id } );
    
                if(res != null) {
                    editor.innerText = res.toString();
                }
            }
            
        }
    
        fileTree.appendChild(element);
      });
}