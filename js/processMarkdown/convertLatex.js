// gestion des mathématiques en Latex
function convertSpecialExpressionsInLatex(string) {
	string = string
		.replaceAll("&lt;", "\\lt")
		.replaceAll("&gt;", "\\gt")
		.replaceAll("<em>", "_")
		.replaceAll("</em>", "_")
		.replaceAll("&amp;", "&")
		.replaceAll("<br />", "\\")
		//.replace(/,/g, "{,}")
		//.replaceAll(" ", "\\ ")
		.replace(/€/g, "\\textrm{€}")
		.replace(/\\?%/g, "\\%");
	return string;
}

export function convertLatexExpressions(string) {
	return string
		.replace(/\$\$([\s\S]*?)\$\$/gm, function (match, equation) {
			equation = convertSpecialExpressionsInLatex(equation);
			return "&#92;[" + equation + "&#92;]";
		})
		.replace(/\$([\s\S]*?)\$/gm, function (match, equation) {
			equation = convertSpecialExpressionsInLatex(equation);
			return "&#92;(" + equation + "&#92;)";
		});
}
