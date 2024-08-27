import Handlebars from "../externals/handlebars.js";

export function fetchTemplateAndCreateDocument(srcTemplate, configTemplate) {
	//const tempSrc = "https://hebdo.framapad.org/p/5jt64q324p-a9nq/export/txt";
	fetch(srcTemplate)
		.then((response) => response.text())
		.then((data) => {
			const compileTemplate = Handlebars.compile(data);
			const a4html = compileTemplate(configTemplate);
			const result = window.open("", "_blank");
			result.document.write(a4html);
			result.document.close();
		})
		.catch((error) => {
			console.log(error);
		});
}
