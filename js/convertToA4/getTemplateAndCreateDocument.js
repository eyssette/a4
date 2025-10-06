import Handlebars from "../externals/handlebars.js";

export function getTemplateAndCreateDocument(srcTemplate, configTemplate) {
	//const tempSrc = "https://hebdo.framapad.org/p/5jt64q324p-a9nq/export/txt";
	const compileTemplate = Handlebars.compile(srcTemplate);
	const a4html = compileTemplate(configTemplate);

	// Créer un blob HTML et ouvre une nouvelle fenêtre avec ce contenu
	const blob = new Blob([a4html], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	window.open(url, "_blank");

	// Libére la mémoire après usage
	setTimeout(() => URL.revokeObjectURL(url), 10000);
}
