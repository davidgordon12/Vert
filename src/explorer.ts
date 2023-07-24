import interact from "interactjs";
import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';
import { openDirectory, readEntry } from "./ipc";
import { DirectoryContent } from "./types";
import { setEditorSize } from "./editor";

let selectedDir: string = "";

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

openFolderBtn.onclick = async () => {
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
            element.classList.add(selectedDir);
        }
        if(Object.entries(file)[0][0][0] == 'D') {
            element.innerText = '>' + Object.entries(file)[0][1][0];
        }
        else {
            element.innerText = Object.entries(file)[0][1][0];
        }
    
        element.onclick = async () => {
            if(element.classList.contains('D')) {
                selectedDir = element.innerText;
                if(element.classList.contains("expanded")) {
                    let elements = document.getElementsByClassName(selectedDir);
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
                    editorTextarea.innerText = res.toString();
                }
            }
            
        }
    
        explorerFileTree.appendChild(element);
      });
}