import Handlebars from "../externals/handlebars.js";

export function getTemplateAndCreateDocument(
	srcTemplate,
	configTemplate,
	openInNewWindow,
) {
	//const tempSrc = "https://hebdo.framapad.org/p/5jt64q324p-a9nq/export/txt";
	const compileTemplate = Handlebars.compile(srcTemplate);
	const a4html = compileTemplate(configTemplate);

	// Créer un blob HTML et affiche ce contenu
	const blob = new Blob([a4html], { type: "text/html" });
	const url = URL.createObjectURL(blob);
	if (openInNewWindow) {
		window.open(url, "_blank");
	} else {
		window.location.href = url;
	}

	// Libére la mémoire après usage
	setTimeout(() => URL.revokeObjectURL(url), 10000);
}
