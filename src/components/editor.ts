export function setEditorSize(): void {
  let explorerWidth: number = explorer.offsetWidth;
  let toolboxWidth: number = toolbox.offsetWidth;

  let offset: number = explorerWidth + toolboxWidth;

  editorTextarea.style.width = `${document.body.clientWidth - offset}px`;
}