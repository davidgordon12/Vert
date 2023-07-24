import { setEditorSize } from "./editor";

toolboxExplorerBtn.onclick = () => {
  console.log("clicked");
  if (explorer.style.width == "0px") {
    explorer.style.width = "200px";
  } else {
    explorer.style.width = "0px";
  }

  setEditorSize()
};