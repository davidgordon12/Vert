import { invoke } from "@tauri-apps/api/tauri";
import interact from "interactjs";

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

interact(explorer).resizable({
  edges: { top: false, left: true, bottom: false, right: false },
  listeners: {
    move: function (event) {
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

window.onresize = function (event) {
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
    invoke('get_workspace');
}