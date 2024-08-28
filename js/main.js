import "../css/styles.css";
import "../css/templateA4.css";
import { initializeEditor } from "./editor/initializeEditor";
import { getDataAndCreateDocument } from "./processMarkdown/getDataAndCreateDocument";
//import { textFit } from "./externals/textFit";

const editorElement = document.getElementById("editor");
initializeEditor(editorElement);

const srcTemplateA4 = "html/templateA4.hbs";

const convertButtonElement = document.querySelector("#convertButton");
convertButtonElement.addEventListener("click", function () {
	getDataAndCreateDocument(srcTemplateA4);
});

//const a4content = document.getElementById("modal");

//textFit(a4content, { multiLine: true, alignHoriz: true, alignVert: true });
