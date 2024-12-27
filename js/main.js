import "../css/styles.css";
import "../css/templateA4.css";
import templateA4 from "../html/templateA4.hbs";
import { initializeEditor } from "./editor/initializeEditor";
import { getDataAndCreateDocument } from "./processMarkdown/getDataAndCreateDocument";

const editorElement = document.getElementById("editor");
initializeEditor(editorElement);

const convertButtonElement = document.querySelector("#convertButton");
convertButtonElement.addEventListener("click", function () {
	getDataAndCreateDocument(templateA4);
});
