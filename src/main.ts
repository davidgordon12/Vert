import interact from "interactjs";

import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';
import { openDirectory, readEntry } from "./ipc";
import { DirectoryContent } from "./types";
import { E } from "@tauri-apps/api/path-c062430b";

let pxa: string = "";

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

  let oldWorkspace = document.getElementsByTagName('li');
  for(let i = oldWorkspace.length-1; i >= 0; --i) {
    oldWorkspace[i].remove()
  }

  let files: Array<DirectoryContent> = await openDirectory(selected);

  processEntries(files, false);
}

function processEntries(files: Array<DirectoryContent>, expanded: boolean) {
    let tree: Array<DirectoryContent> = []
    files.forEach(file => {
        if(Object.entries(file)[0][0][0] == 'D') {
            tree.push(file)
        }
    })

    files.forEach(file => {
        if(Object.entries(file)[0][0][0] == 'F') {
            tree.push(file)
        }
    })

    tree.forEach(file => {
        const element = document.createElement("li");
        element.id = Object.entries(file)[0][1][1];
        element.classList.add('explorer-file-tree-element');
        element.classList.add(Object.entries(file)[0][0][0]); // appends a D (directory) or F (file) to classList
        if(expanded) {
            element.classList.add(pxa);
        }
        if(Object.entries(file)[0][0][0] == 'D') {
            element.innerText = '>' + Object.entries(file)[0][1][0];
        }
        else {
            element.innerText = Object.entries(file)[0][1][0];
        }
    
        element.onclick = async () => {
            if(element.classList.contains('D')) {
                pxa = element.innerText;
                if(element.classList.contains("expanded")) {
                    let elements = document.getElementsByClassName(pxa);
                    for(let i = elements.length - 1; i >= 0; i--) {
                      elements[i].remove()
                    }
                    element.classList.remove("expanded");
                } 
                else {
                    element.classList.add("expanded");
                    let sub_files: Array<DirectoryContent> = await openDirectory(element.id);
                    console.log(element.innerText)
                    processEntries(sub_files, true);
                }
            }
            else {
                let res: string = await readEntry(element.id);
    
                if(res != null) {
                    editor.innerText = res.toString();
                }
            }
            
        }
    
        fileTree.appendChild(element);
      });
}