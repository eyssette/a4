import { CodeJar } from "../externals/codejar.js";
import initialContent from "./initialContent.md";

const highlightCode = (editor) => {
	let code = editor.textContent;

	// On autorise l'utilisation de balises HTML
	code = code
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

	// Coloration syntaxique pour les titres
	code = code.replace(/^(#{1,6}) +(.*)/gm, (match, p1, p2) => {
		let level = p1.length;
		return `<span class="markdownTitles h${level}">${p1} ${p2}</span>`;
	});

	// Coloration syntaxique pour le texte en gras
	code = code.replace(
		/\*\*(\w.*?)\*\*/g,
		'<span class="markdownBold">**$1**</span>',
	);
	code = code.replace(
		/__(\w.*?)__/g,
		'<span class="markdownBold">__$1__</span>',
	);
	// Coloration syntaxique pour le texte en italique
	code = code.replace(
		/(?<!\*)\*(\w.*?)\*(?!\*)/g,
		'<span class="markdownItalic">*$1*</span>',
	);
	code = code.replace(
		/(?<!_)_(\w.*?)_(?!_)/g,
		'<span class="markdownItalic">_$1_</span>',
	);
	// Coloration syntaxique pour les listes
	code = code.replace(
		/^(\s*)([-*]|\d+\.)(\s)/gm,
		'<span class="markdownLists">$1$2</span>$3',
	);
	// Coloration syntaxique pour les liens
	code = code.replace(
		/(\[.*?\])\((.*?)\)/g,
		'<span class="markdownLinksText">$1</span><span class="markdownLinksURL">($2)</span>',
	);

	// Coloration syntaxique pour les tags html
	code = code.replace(
		/(&lt;.*?&gt;)(.*?)(&lt;.*?&gt;)/g,
		'<span class="markdownHTMLtag">$1</span><span class="markdownHTMLtagContent">$2</span><span class="markdownHTMLtag">$3</span>',
	);

	// Coloration syntaxique pour les commentaires html
	code = code.replace(
		/(&lt;!--.*?--&gt;)/g,
		'<span class="markdownHTMLcomment">$1</span>',
	);

	// Coloration syntaxique pour les séparations
	code = code.replaceAll("---", '<span class="markdownSeparator">---</span>');

	// Coloration syntaxique pour le yaml
	code = code.replace(
		/(pages:|colonnes:|espacementColonnes:|copies:|paysage:|margesX:|mx:|margesY:|my:|maths:|css:)/g,
		'<span class="markdownYAML">$1</span>',
	);

	editor.innerHTML = code;
};

const options = {
	addClosing: false,
	spellCheck: true,
	preserveIdent: false,
	tab: "\t",
};

export let editor;

export function initializeEditor(editorElement) {
	editor = CodeJar(editorElement, highlightCode, options);
	editor.updateCode(initialContent + "\n\n");
	const resetButtonElement = document.querySelector("#resetButton");
	resetButtonElement.addEventListener("click", function () {
		editor.updateCode(initialContent);
	});
}
