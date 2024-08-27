// gestion des mathématiques en Latex
export function convertLatexExpressions(string) {
	return string
		.replace(/\$\$(.*?)\$\$/g, function (match, equation) {
			equation = equation.replace(/\\?%/g, "\\%");
			equation = equation.replace(/€/g, "\\textrm{€}");
			equation = equation.replace(/,/g, "{,}");
			return "&#92;[" + equation + "&#92;]";
		})
		.replace(/\$(.*?)\$/g, function (match, equation) {
			equation = equation.replace(/\\?%/g, "\\%");
			equation = equation.replace(/€/g, "\\textrm{€}");
			return "&#92;(" + equation + "&#92;)";
		});
}
