import { convertLatexExpressions } from "./convertLatex";
import { markdownToHTML } from "./markdownToHTML";
import { typographyNonBreakingSpaces } from "./typography";
import { processYAML } from "./yaml";
import { fetchTemplateAndCreateDocument } from "../convertToA4/fetchTemplateAndCreateDocument";
import templateCSS from "../../css/templateA4.min.css";

export function getDataAndCreateDocument(srcTemplateA4) {
	const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
	const inputValue = document.getElementById("input").value;
	const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
	const match = inputValue.match(yamlRegex);
	const yamlMatch = match ? match[1] : null;
	let yaml;
	if (yamlMatch) {
		yaml = processYAML(inputValue);
	}
	const mdWithoutYaml = inputValue.replace(yamlRegex, "");
	let htmlContent = markdownToHTML(mdWithoutYaml);
	htmlContent = typographyNonBreakingSpaces(htmlContent);
	if (yaml.maths) {
		htmlContent = convertLatexExpressions(htmlContent);
	}
	if (yaml.copies) {
		htmlContent = htmlContent.repeat(yaml.copies);
	}
	const mathsOrIsFirefox = yaml.maths || isFirefox;
	const configTemplate = {
		templateCSS: templateCSS,
		title: "",
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
	};
	fetchTemplateAndCreateDocument(srcTemplateA4, configTemplate);
}
