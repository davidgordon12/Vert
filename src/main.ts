import { setEditorSize } from "./editor";

import "./toolbox"
import "./editor"
import "./explorer"

window.addEventListener("DOMContentLoaded", () => {
  setEditorSize();
});

window.onresize = function () {
  setEditorSize();
};