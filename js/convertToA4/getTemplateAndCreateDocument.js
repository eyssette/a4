import Handlebars from "../externals/handlebars.js";

export function getTemplateAndCreateDocument(srcTemplate, configTemplate) {
	//const tempSrc = "https://hebdo.framapad.org/p/5jt64q324p-a9nq/export/txt";
	const compileTemplate = Handlebars.compile(srcTemplate);
	const a4html = compileTemplate(configTemplate);
	const result = window.open("", "_blank");
	result.document.write(a4html);
	result.document.close();
}
