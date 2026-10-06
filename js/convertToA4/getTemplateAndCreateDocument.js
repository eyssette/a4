import Handlebars from "../externals/handlebars.js";

export function getTemplateAndCreateDocument(srcTemplate, configTemplate) {
	//const tempSrc = "https://hebdo.framapad.org/p/5jt64q324p-a9nq/export/txt";
	const compileTemplate = Handlebars.compile(srcTemplate);
	const a4html = compileTemplate(configTemplate);

	// On remplace le document courant par le document généré
	const parsedDocument = new DOMParser().parseFromString(a4html, "text/html");
	document.replaceChild(parsedDocument.documentElement, document.documentElement);

	// Les scripts du template compilé ne sont pas exécutés automatiquement. Il faut les réinsérer dans le DOM pour qu'ils s'exécutent.
	const scripts = document.querySelectorAll("script");
	scripts.forEach((oldScript) => {
		const newScript = document.createElement("script");
		Array.from(oldScript.attributes).forEach((attr) =>
			newScript.setAttribute(attr.name, attr.value),
		);
		newScript.textContent = oldScript.textContent;
		oldScript.parentNode.replaceChild(newScript, oldScript);
	});
}
