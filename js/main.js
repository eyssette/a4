import "../css/styles.css";
import "../css/templateA4.css";
import templateA4 from "../html/templateA4.hbs";
import { initializeEditor } from "./editor/initializeEditor";
import { getDataAndCreateDocument } from "./processMarkdown/getDataAndCreateDocument";
import { handleURL } from "./utils/url";

// Récupération du markdown externe
const hash = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #

if (hash) {
	const url = handleURL(hash);
	fetch(url)
		.then((response) => response.text())
		.then((md) => {
			getDataAndCreateDocument(templateA4, md);
		});
} else {
	const editorElement = document.getElementById("editor");
	initializeEditor(editorElement);

	const convertButtonElement = document.querySelector("#convertButton");
	convertButtonElement.addEventListener("click", function () {
		getDataAndCreateDocument(templateA4);
	});
}
