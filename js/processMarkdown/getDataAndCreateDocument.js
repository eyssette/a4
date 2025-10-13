import { convertLatexExpressions } from "./convertLatex";
import { markdownToHTML } from "./markdownToHTML";
import { typographyNonBreakingSpaces } from "./typography";
import { processYAML } from "./yaml";
import { getTemplateAndCreateDocument } from "../convertToA4/getTemplateAndCreateDocument";
import templateCSS from "../../css/templateA4.min.css";
import purify from "../externals/dompurify";

export function getDataAndCreateDocument(templateA4, md) {
	const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
	const openInNewWindow = md ? false : true;
	md = md ? md : document.getElementById("editor").textContent;
	const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
	const match = md.match(yamlRegex);
	const yamlMatch = match ? match[1] : null;
	let yaml;
	if (yamlMatch) {
		yaml = processYAML(md);
	}
	let mdWithoutYaml = md.replace(yamlRegex, "");
	// On permet l'interprétation du Markdown à l'intérieur des balises section
	mdWithoutYaml = mdWithoutYaml.replaceAll(
		/<section.*?>/g,
		'<section markdown="1">',
	);
	const titleMarkdownMatch = mdWithoutYaml.match(/(\n|$)# (.*)/g);
	const titleMarkdown = titleMarkdownMatch
		? titleMarkdownMatch[0].trim().replace("# ", "").replaceAll(" ", "_")
		: "";
	// On sanitize la source en Markdown
	let purified = purify.sanitize(mdWithoutYaml, {
		ADD_ATTR: ["markdown"],
	});

	// Mais s'il y a une balise style au début du document, DomPurify l'a fait sauté
	// On vérifie donc qu'il y a bien le même nombre de balises style dans la version sanitized du Markdown
	const countStyles = (str) =>
		(str.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || []).length;
	if (countStyles(purified) < countStyles(mdWithoutYaml)) {
		// Si la première balise style a été supprimée : on la rajoute.
		const firstStyle = mdWithoutYaml.match(/<style[^>]*>[\s\S]*?<\/style>/i);
		if (firstStyle) purified = firstStyle[0] + purified;
	}
	mdWithoutYaml = purified;

	// Le processus de sanitization a supprimé les blockquotes
	// On les rétablit en remplaçant les "&gt; " en début de ligne par "> "
	mdWithoutYaml = mdWithoutYaml.replace(/^(&gt;\s?)+/gm, (match) => {
		return match.replace(/&gt;/g, ">"); // chaque &gt; devient >
	});
	let htmlContent = markdownToHTML(mdWithoutYaml);
	htmlContent = htmlContent.replaceAll(" !important", "!important");
	htmlContent = typographyNonBreakingSpaces(htmlContent);
	if (yaml && yaml.maths) {
		htmlContent = convertLatexExpressions(htmlContent);
	}
	if (yaml && yaml.copies) {
		let repeatedContent = "";
		for (let i = 0; i < yaml.copies; i++) {
			repeatedContent += `<div class="initialContent">${htmlContent}</div>`;
		}
		htmlContent = repeatedContent;
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
	const customStyles = yaml && yaml.style ? yaml.style : "";
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
		openInNewWindow: openInNewWindow,
		customStyles: customStyles,
	};
	if (yaml && yaml.pages) {
		const heightPages = yaml.paysage ? 21 : 29.7;
		configTemplate.heightPages = heightPages * yaml.pages + "cm";
		configTemplate.adjustFontSizeHeightPages = "1em";
	}
	getTemplateAndCreateDocument(templateA4, configTemplate, openInNewWindow);
}
