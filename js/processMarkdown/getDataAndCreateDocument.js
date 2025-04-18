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
	if (yaml && yaml.maths) {
		htmlContent = convertLatexExpressions(htmlContent);
	}
	if (yaml && yaml.copies) {
		htmlContent = htmlContent.repeat(yaml.copies);
	}
	const externalCSS = yaml && yaml.css ? yaml.css : "";
	const title = yaml && yaml.titre ? yaml.titre : titleMarkdown;
	const pages = yaml && yaml.pages ? yaml.pages : 1;
	const isLandscape = yaml ? yaml.paysage : true;
	const useMaths = yaml && yaml.maths ? yaml.maths : false;
	const mathsOrIsFirefox = useMaths || isFirefox;
	const copies = yaml && yaml.copies ? yaml.copies : 1;
	const marginsX = yaml && yaml.margesX ? yaml.margesX : "10px";
	const marginsY = yaml && yaml.margesY ? yaml.margesY : "10px";
	const columns = yaml && yaml.colonnes ? yaml.colonnes : 3;
	const spaceBetweenColumns =
		yaml && yaml.espacementColonnes ? yaml.espacementColonnes : "30px";
	let configTemplate = {
		templateCSS: templateCSS,
		title: title,
		pages: pages,
		landscape: isLandscape,
		maths: useMaths,
		mathsOrIsFirefox: mathsOrIsFirefox,
		copies: copies,
		htmlContent: htmlContent,
		margesX: marginsX,
		margesY: marginsY,
		columns: columns,
		spaceBetweenColumns: spaceBetweenColumns,
		css: externalCSS,
	};
	if (yaml && yaml.pages) {
		const heightPages = yaml.paysage ? 21 : 29.7;
		configTemplate.heightPages = heightPages * yaml.pages + "cm";
		configTemplate.adjustFontSizeHeightPages = isFirefox ? "1em" : "0.99em";
	}
	getTemplateAndCreateDocument(templateA4, configTemplate);
}
