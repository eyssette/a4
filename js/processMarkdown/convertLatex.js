// gestion des mathématiques en Latex
function convertSpecialExpressionsInLatex(string) {
	string = string
		.replace("&#92;[", "")
		.replace("&#92;]", "")
		.replace("&#92;(", "")
		.replace("&#92;)", "")
		.replaceAll("&lt;", "\\lt")
		.replaceAll("&gt;", "\\gt")
		.replaceAll("<em>", "_")
		.replaceAll("</em>", "_")
		.replaceAll("&amp;", "&")
		.replaceAll(" ", "\\ ")
		.replace(/,/g, "{,}")
		.replace(/€/g, "\\textrm{€}")
		.replace(/\\?%/g, "\\%");
	return string;
}

export function convertLatexExpressions(string) {
	return string
		.replace(/\$\$(.*?)\$\$/g, function (match, equation) {
			equation = convertSpecialExpressionsInLatex(equation);
			return "&#92;[" + equation + "&#92;]";
		})
		.replace(/\$(.*?)\$/g, function (match, equation) {
			equation = convertSpecialExpressionsInLatex(equation);
			return "&#92;(" + equation + "&#92;)";
		});
}
