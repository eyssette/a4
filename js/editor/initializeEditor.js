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
		/\*\*(.*?)\*\*/g,
		'<span class="markdownBold">**$1**</span>',
	);
	code = code.replace(/__(.*?)__/g, '<span class="markdownBold">__$1__</span>');

	// Coloration syntaxique pour le texte en italique
	code = code.replace(
		/(?<!\*)\*(\w.*?)\*(?!\*)/g,
		'<span class="markdownItalic">*$1*</span>',
	);
	code = code.replace(
		/(?<!_)_(\w.*?)_(?!_)/g,
		'<span class="markdownItalic">_$1_</span>',
	);

	// Coloration syntaxique pour le texte souligné
	code = code.replace(
		/\+\+(.*?)\+\+/g,
		'<span class="markdownUnderline">++$1++</span>',
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
		/(&lt;([A-Za-z0-9:-]+)(?:\s[^&]*?)?&gt;)([\s\S]*?)(&lt;\/\2&gt;)/gm,
		function (match, openTag, tagName, inner, closeTag) {
			const tag = tagName.toLowerCase();

			if (tag === "style") {
				// Mise en évidence des sélecteurs CSS
				const styledInner = inner.replace(
					/^([^{]+)(?=\s*\{)/gm,
					(match, selector) =>
						`<span class="markdownHTMLcssSelector">${selector}</span>`,
				);
				return (
					'<span class="markdownHTMLtag">' +
					openTag +
					"</span>" +
					styledInner +
					'<span class="markdownHTMLtag">' +
					closeTag +
					"</span>"
				);
			}

			// Cas général
			return (
				'<span class="markdownHTMLtag">' +
				openTag +
				"</span>" +
				'<span class="markdownHTMLtagContent">' +
				inner +
				"</span>" +
				'<span class="markdownHTMLtag">' +
				closeTag +
				"</span>"
			);
		},
	);

	// Coloration syntaxique pour les admonitions
	code = code.replace(
		/:::(\s*[\s\S]*?):::/gm,
		'<span class="markdownHTMLadmonition">:::$1:::</span>',
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
		/(pages:|colonnes:|espacementColonnes:|copies:|paysage:|margesX:|mx:|margesY:|my:|maths:|css:|style:|print:)/g,
		'<span class="markdownYAML">$1</span>',
	);

	editor.innerHTML = code;
};

const options = {
	addClosing: false,
	spellCheck: true,
	preserveIdent: true,
	tab: "   ",
};

export let editor;

export function initializeEditor(editorElement) {
	editor = CodeJar(editorElement, highlightCode, options);
	editor.updateCode(initialContent + "\n\n");
	const resetButtonElement = document.querySelector("#resetButton");
	resetButtonElement.addEventListener("click", function () {
		editor.updateCode(initialContent + "\n\n");
	});
}
