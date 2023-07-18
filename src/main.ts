import interact from "interactjs";

var current_dir: string = "";

import { invoke } from "@tauri-apps/api/tauri";
import { FileEntry, readDir, readTextFile } from '@tauri-apps/api/fs';
import { dirname, homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';

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

    const entries = await readDir(selected, { dir: undefined, recursive: true });
    current_dir = selected;
    
    fileTree.innerHTML = "";
    processEntries(entries)
}

function processEntries(entries: Array<FileEntry>) {
      for (const entry of entries) {
        const element = document.createElement("li");
        element.id = "explorer-file-tree-element"
        element.classList.add('explorer-file-tree-element');
        if(entry.children) {
            element.innerText = "> " + entry.name as string;
            element.classList.add('folder');
        }
        else {
            element.innerText = entry.name as string;
            element.classList.add('file');
        }
        fileTree.appendChild(element);

        element.onclick = async () => {
            if(element.classList.contains('file')) {
                editor.innerText = await readTextFile(current_dir + '/' + element.innerText)
            }
            if(element.classList.contains('folder')) {
               console.log("folder clicked");
            }
        }
      }
    } 