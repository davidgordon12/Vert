import interact from "interactjs";
import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/api/dialog';
import { openDirectory, readEntry } from "../ipc";
import { DirectoryContent } from "../types";
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

  processEntries(files);
}

function processEntries(files: Array<DirectoryContent>) {
}