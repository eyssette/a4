import "../css/styles.css";
import "../css/templateA4.css";
import templateA4 from "../html/templateA4.hbs";
import { initializeEditor } from "./editor/initializeEditor";
import { getDataAndCreateDocument } from "./processMarkdown/getDataAndCreateDocument";
import { decodeString, encodeString } from "./utils/strings";
import { handleURL } from "./utils/url";

// Récupération du markdown externe
const hash = window.location.hash.substring(1); // Récupère l'URL du hashtag sans le #

if (hash) {
	const params = new URLSearchParams(window.location.search);
	// Si le paramètre "raw" est présent dans l'URL, alors le hash contient du markdown encodé en base64, sinon le hash est l'URL de la source en Markdown
	const isRaw = params.has("raw");
	if (!isRaw) {
		const url = handleURL(hash);
		fetch(url)
			.then((response) => response.text())
			.then((md) => {
				getDataAndCreateDocument(templateA4, md);
			});
	} else {
		const decodedMarkdown = decodeString(hash);
		getDataAndCreateDocument(templateA4, decodedMarkdown);
	}
} else {
	document.body.style.visibility = "visible";
	const editorElement = document.getElementById("editor");
	initializeEditor(editorElement);

	const convertButtonElement = document.querySelector("#convertButton");
	convertButtonElement.addEventListener("click", function () {
		// On récupère le markdown depuis l'éditeur
		const md = editorElement.textContent;
		// On encode le markdown
		const encodedMarkdown = encodeString(md);
		// On ouvre une nouvelle fenêtre avec le markdown encodé dans le hash de l'URL
		window.open(window.location.pathname + "?raw#" + encodedMarkdown, "_blank");
	});
}
