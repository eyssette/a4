import Showdown from "../externals/showdown.js";

// Extensions pour Showdown

// Gestion des attributs génériques du type {.classe1 .classe2}
function showdownExtensionGenericAttributes() {
	return [
		{
			type: "output",
			filter: (text) => {
				const regex = /<(\w+)>(.*?){\.(.*?)}/g;
				const matches = text.match(regex);
				if (matches) {
					let modifiedText = text;
					for (const match of matches) {
						const indexMatch = text.indexOf(match);
						const endIndeMatch = indexMatch + match.length;
						const isInCode =
							text.substring(endIndeMatch, endIndeMatch + 7) == "</code>"
								? true
								: false;
						if (!isInCode) {
							const matchInformations = regex.exec(match);
							const classes = matchInformations[3].replaceAll(".", "");
							const matchReplaced = match.replace(
								regex,
								`<$1 class="${classes}">$2`,
							);
							modifiedText = modifiedText.replaceAll(match, matchReplaced);
						}
					}
					return modifiedText;
				} else {
					return text;
				}
			},
		},
	];
}

// Gestion des admonitions
function showdownExtensionAdmonitions() {
	return [
		{
			type: "output",
			filter: (text) => {
				text = text.replaceAll(/<p>:::(.*?)<\/p>/g, ":::$1");
				const regex = /:::(.*?)\n(.*?):::/gs;
				const matches = text.match(regex);
				if (matches) {
					let modifiedText = text;
					for (const match of matches) {
						const regex2 = /:::(.*?)\s(.*?)\n(.*?):::/s;
						const matchInformations = regex2.exec(match);
						const indexMatch = text.indexOf(match);
						// Pas de transformation de l'admonition en html si l'admonition est dans un bloc code
						const isInCode =
							text.substring(indexMatch - 6, indexMatch) == "<code>"
								? true
								: false;
						if (!isInCode) {
							let type = matchInformations[1];
							let title = matchInformations[2];
							if (type.includes("<br")) {
								type = type.replace("<br", "");
								title = "";
							}
							const content = matchInformations[3];
							let matchReplaced;
							if (title.includes("collapsible")) {
								title = title.replace("collapsible", "");
								matchReplaced = `<div><div class="admonition ${type}"><details><summary class="admonitionTitle">${title}</summary><div class="admonitionContent">${content}</div></details></div></div>`;
							} else {
								matchReplaced = `<div><div class="admonition ${type}"><div class="admonitionTitle">${title}</div><div class="admonitionContent">${content}</div></div></div>`;
							}
							modifiedText = modifiedText.replaceAll(match, matchReplaced);
						}
					}
					return modifiedText;
				} else {
					return text;
				}
			},
		},
	];
}

// Gestion des éléments soulignés et surlignés
function showdownExtensionUnderline() {
	return [
		{
			type: "output",
			filter: (text) => {
				text = text.replaceAll(/\+\+(.*?)\+\+/g, "<u>$1</u>");
				return text;
			},
		},
	];
}
function showdownExtensionHighlight() {
	return [
		{
			type: "output",
			filter: (text) => {
				text = text.replaceAll(/==(.*?)==/g, "<mark>$1</mark>");
				return text;
			},
		},
	];
}

// Gestion des footnotes
function showdownExtensionFootnotes() {
	const footnotes = [];
	return [
		{
			type: "lang",
			regex: /\[\^(\d+)\]:\s*(.+)/g,
			replace: function (_, id, content) {
				// Stocker les notes de bas de page avec leur ID et contenu
				footnotes.push({ id, content });
				return ""; // Supprimer la définition de la note du texte principal
			},
		},
		{
			type: "lang",
			regex: /\[\^(\d+)\]/g,
			replace: function (_, id) {
				// Ajouter une ancre pour chaque référence
				return `<sup id="fnref-${id}"><a href="#fn-${id}" class="footnote-ref">${id}</a></sup>`;
			},
		},
		{
			type: "output",
			filter: function (text) {
				if (footnotes.length === 0) return text; // Pas de notes, retour direct

				// Construire la section des notes de bas de page
				const notesSection = footnotes
					.map((note) => {
						return `<li id="fn-${note.id}">
							${note.content} <a href="#fnref-${note.id}" class="footnote-backref">↩</a>
						 </li>`;
					})
					.join("\n");

				return (
					text +
					`\n<hr class="footnotes-sep">\n<ol class="footnotes">\n${notesSection}\n</ol>`
				);
			},
		},
	];
}

// Gestion de la conversion du markdown en HTML
const converter = new Showdown.Converter({
	emoji: true,
	parseImgDimensions: true,
	simplifiedAutoLink: true,
	simpleLineBreaks: true,
	tables: true,
	extensions: [
		showdownExtensionGenericAttributes,
		showdownExtensionAdmonitions,
		showdownExtensionUnderline,
		showdownExtensionHighlight,
		showdownExtensionFootnotes,
	],
});

function fixImageDimensionsCodiMD(md) {
	md = md.replace(/=x([0-9]*)\)/g, "=*x$1)");
	md = md.replace(/=([0-9]*)x\)/g, "=$1x*)");
	return md;
}

function markdownInDiv(md) {
	md = md.replace(/<div(.*)?>/g, "<div markdown$1>");
	return md;
}

function nestedLists(md) {
	md = md.replace(/(\n|^)\s{2}-\s/g, "$1    - ");
	md = md.replace(/(\n|^)(\d+)?\.\s$/g, "$1$2.  ");
	return md;
}

export function markdownToHTML(text) {
	text = text.replaceAll("\n\n|", "|");
	text = fixImageDimensionsCodiMD(text);
	text = markdownInDiv(text);
	text = nestedLists(text);
	let html = converter.makeHtml(text);
	return html;
}
