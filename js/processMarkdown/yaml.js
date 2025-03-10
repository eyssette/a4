import { load as loadYAML } from "../externals/js-yaml.js";

export function processYAML(markdownContent) {
	let yaml;
	try {
		if (
			markdownContent.split("---").length > 2 &&
			markdownContent.startsWith("---")
		) {
			yaml = loadYAML(markdownContent.split("---")[1]);
			if (yaml && yaml.mx) {
				yaml.margesX = yaml.mx;
			}
			if (yaml && yaml.my) {
				yaml.margesY = yaml.my;
			}
			return yaml;
		}
	} catch (e) {
		console.log("erreur processYAML : " + e);
	}
}
