import { setEditorSize } from "./components/editor";

import "./components/toolbox"
import "./components/editor"
import "./components/explorer"

window.addEventListener("DOMContentLoaded", () => {
  setEditorSize();
});

window.onresize = function () {
  setEditorSize();
};