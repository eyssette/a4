import { convertLatexExpressions } from "./convertLatex";
import { markdownToHTML } from "./markdownToHTML";
import { typographyNonBreakingSpaces } from "./typography";
import { processYAML } from "./yaml";
import { getTemplateAndCreateDocument } from "../convertToA4/getTemplateAndCreateDocument";
import templateCSS from "../../css/templateA4.min.css";

export function getDataAndCreateDocument(templateA4) {
	const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
	const inputValue = document.getElementById("editor").textContent;
	const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
	const match = inputValue.match(yamlRegex);
	const yamlMatch = match ? match[1] : null;
	let yaml;
	if (yamlMatch) {
		yaml = processYAML(inputValue);
	}
	let mdWithoutYaml = inputValue.replace(yamlRegex, "");
	// On permet l'interprétation du Markdown à l'intérieur des balises section
	mdWithoutYaml = mdWithoutYaml.replaceAll(
		/<section.*?>/g,
		'<section markdown="1">',
	);
	const titleMarkdownMatch = mdWithoutYaml.match(/(\n|$)# (.*)/g);
	const titleMarkdown = titleMarkdownMatch
		? titleMarkdownMatch[0].trim().replace("# ", "").replaceAll(" ", "_")
		: "";
	let htmlContent = markdownToHTML(mdWithoutYaml);
	htmlContent = htmlContent.replaceAll(" !important", "!important");
	htmlContent = typographyNonBreakingSpaces(htmlContent);
	if (yaml.maths) {
		htmlContent = convertLatexExpressions(htmlContent);
	}
	if (yaml.copies) {
		htmlContent = htmlContent.repeat(yaml.copies);
	}
	const mathsOrIsFirefox = yaml.maths || isFirefox;
	const externalCSS = yaml.css || "";
	let configTemplate = {
		templateCSS: templateCSS,
		title: yaml.titre || titleMarkdown || "",
		pages: yaml.pages,
		landscape: yaml.paysage,
		maths: yaml.maths,
		mathsOrIsFirefox: mathsOrIsFirefox,
		copies: yaml.copies,
		htmlContent: htmlContent,
		margesX: yaml.margesX,
		margesY: yaml.margesY,
		columns: yaml.colonnes,
		spaceBetweenColumns: yaml.espacementColonnes,
		css: externalCSS,
	};
	if (yaml.pages) {
		const heightPages = yaml.paysage ? 21 : 29.7;
		configTemplate.heightPages = heightPages * yaml.pages + "cm";
		configTemplate.adjustFontSizeHeightPages = isFirefox ? "1em" : "0.99em";
	}
	getTemplateAndCreateDocument(templateA4, configTemplate);
}
