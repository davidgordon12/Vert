import { setEditorSize } from "./editor";

window.addEventListener("DOMContentLoaded", () => {
  setEditorSize();
});

window.onresize = function () {
  setEditorSize();
};