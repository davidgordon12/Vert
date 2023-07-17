import { invoke } from "@tauri-apps/api/tauri";

let editor: HTMLTextAreaElement = (document.getElementById('editor-textarea') as HTMLTextAreaElement)
let explorer: HTMLTextAreaElement = (document.getElementById('explorer') as HTMLTextAreaElement)
let toolbar: HTMLTextAreaElement = (document.getElementById('toolbar') as HTMLTextAreaElement)

let toolbarExplorer: HTMLButtonElement = (document.getElementById('toolbar-explorer') as HTMLButtonElement)

window.addEventListener("DOMContentLoaded", () => {
    setEditorSize()
});

window.onresize = function(event) {
    setEditorSize()
};

function resizeExplorer(): void {
    // resize explorer then reset the editor's size: WIP

    setEditorSize(); 
}


function setEditorSize(): void {
    let explorerWidth: Number = explorer.offsetWidth
    let toolbarWidth: Number = toolbar.offsetWidth

    let offset: Number = +explorerWidth + +toolbarWidth

    editor.style.width = (document.body.clientWidth - +offset).toString() + "px"
}

toolbarExplorer.onclick = () => {
    if(explorer.style.width == "0px") {
        explorer.style.width = "200px"
    }
    else {
        explorer.style.width = "0px"
    }

    setEditorSize()
}