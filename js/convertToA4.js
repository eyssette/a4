var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
function convert() {
	const input = document.getElementById("input").value;
	const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
	const match = input.match(yamlRegex);
	const yaml = match ? match[1] : null;
	var mdWithoutYaml = input.replace(yamlRegex, "");
	mdWithoutYaml = mdWithoutYaml.replaceAll(":::", "!!!");
	let params;
	if (yaml) {
		params = jsyaml.load(yaml);
	}
	let html = md.render(mdWithoutYaml);
	if (yaml && typeof params.maths !== "undefined" && params.maths === true) {
		/* Gestion des caractères "%" et "€" dans les équations Latex */
		html = html
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
	html = html
		.replaceAll(" !", "&nbsp;!")
		.replaceAll(" ?", "&nbsp;?")
		.replaceAll(" ;", "&nbsp;;")
		.replaceAll(" :", "&nbsp;:")
		.replaceAll(" »", "&nbsp;»")
		.replaceAll("« ", "«&nbsp;");
	let copies = "";
	if (yaml && typeof params.copies != "undefined") {
		for (let index = 0; index < params.copies; index++) {
			copies = copies + html;
		}
	}

	const template = `<!DOCTYPE html>
			<html>
			<head>
				<title>Markdown to HTML Result</title>
				<meta charset="utf-8">
				<style>h2,h3,h4,h5,h6{break-after:avoid}body{font-family:Garamond,Philosopher,"Times New Roman",Times,serif!important;text-align:justify;line-height:1.15;column-gap:25px;orphans:5}h1{font-size:1.2em;text-align:center;margin-bottom:1em}h2{font-size:1.05em;margin-top:1em!important;margin-bottom:.5em!important}body>h2:first-child, body>p:first-child, body>blockquote:first-child, body>blockquote:first-child>p:first-child{margin-top:0!important}h3,h4,h5,h6{font-size:1em;margin-top:.75em;margin-bottom:.5em;font-weight:400}h3{text-decoration:underline}code{color:#000!important;font-size:100%;font-variant:small-caps;font-family:inherit;background:0 0!important}ol,ul{padding-left:1em}p{margin-top:0.5em}
				*{margin:0;overflow-wrap: break-word;}body{font-size:100px;width:21cm;margin:10px;padding:0}@media print{@page{size:A4;margin:10px;}body{margin:auto}}
				div.danger,div.warning{color:#b94a48;background-color:#f2dede;border-color:#eed3d7;}div.note,div.info{color:#3a87ad;background-color:#d9edf7;border-color:#bce8f1;}div.success{color:#468847;background-color:#dff0d8;border-color:#d6e9c6;}
				div.admonition {padding:0.1em 0.2em}.admonition-title:not(:empty){margin-top:0em!important}.admonition-title:empty+p{margin-top:-0.5em}
				mark{background-color:#f9e387}
				blockquote {font-family: "ETBembo", "et-book", "Minion Pro", Garamond,Philosopher,"Times New Roman",Times,serif!important;}
				br {display: block!important;margin-top: 0.25em!important;content: ""!important;}
				${
					yaml && typeof params.mx !== "undefined"
						? "body{ margin-left:" +
							params.mx +
							"; margin-right:" +
							params.mx +
							";}@media print{@page{margin-right:" +
							params.mx +
							"!important}}"
						: ""
				}
				${
					yaml && typeof params.my !== "undefined"
						? "body{ margin-top:" +
							params.my +
							"; margin-bottom:" +
							params.my +
							";}@media print{@page{margin-bottom:" +
							params.my +
							"}}"
						: ""
				}
				${
					yaml && typeof params.columns !== "undefined"
						? "body{ columns:" + params.columns + "}"
						: ""
				}
				${
					yaml && typeof params.colonnes !== "undefined"
						? "body{ columns:" + params.colonnes + "}"
						: ""
				}
				${
					yaml && typeof params.espacementColonnes !== "undefined"
						? "body{ column-gap:" + params.espacementColonnes + "}"
						: ""
				}
				${
					yaml && typeof params.columnGap !== "undefined"
						? "body{ column-gap:" + params.columnGap + "}"
						: ""
				}
				${
					(yaml &&
						typeof params.paysage !== "undefined" &&
						params.paysage === true) ||
					(yaml &&
						typeof params.landscape !== "undefined" &&
						params.landscape === true)
						? "body{ width:29.7cm!important}@media print{@page{size:A4 landscape!important;}}"
						: ""
				}
				</style>
				${
					yaml && typeof params.maths !== "undefined" && params.maths === true
						? '<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js" type="text/javascript"></script>'
						: ""
				}
				<script>
				${
					yaml && typeof params.pages !== "undefined"
						? "let nPages = " + params.pages + "; "
						: "let nPages=1; "
				}	
			let fontSize = 100;
				${
					(yaml &&
						typeof params.paysage !== "undefined" &&
						params.paysage === true) ||
					(yaml &&
						typeof params.landscape !== "undefined" &&
						params.landscape === true)
						? "let maxHeight = 774*nPages"
						: "let maxHeight = 1025*nPages; "
				}
			let stepReduceFontSize = maxHeight * 2.5;
			let ratio;
			let trackReduction = 0;
			let animation;
			function adjustFontSize() {
				let newFontSize = fontSize;
				let start = null;
				function update(timestamp) {
					if (!start) start = timestamp;
					let newContentHeight = document.body.clientHeight;
					if (newContentHeight > maxHeight) {
						ratio = newContentHeight / stepReduceFontSize;
						newFontSize -= ratio;
						${(yaml && typeof params.maths !== "undefined" && params.maths === true) || isFirefox ? "" : "if (newFontSize > trackReduction) {"}
							document.body.style.fontSize = newFontSize + "px";
							${(yaml && typeof params.maths !== "undefined" && params.maths === true) || isFirefox ? "" : "}"}
						trackReduction = newFontSize;
						start = timestamp;
						animation = requestAnimationFrame(update);
					} else {
						if (newFontSize !== fontSize) {
							fontSize = newFontSize;
							document.body.style.fontSize = fontSize + "px";
						}						
						if (trackReduction == fontSize) {
							window.removeEventListener("load", adjustFontSize)
							window.removeEventListener("resize", adjustFontSize)
							cancelAnimationFrame(animation);
							window.print();
						}
					}
				}
				animation = requestAnimationFrame(update);
			}
			window.addEventListener("load", adjustFontSize);
			window.addEventListener("resize", adjustFontSize);
			<\/script>
			</head>
			<body>
				${yaml && typeof params.copies !== "undefined" ? copies : html}
			</body>
			</html>`;
	const result = window.open();
	result.document.write(template);
	result.document.close();
}

const convertButtonElement = document.querySelector("#convertButton");
convertButtonElement.addEventListener("click", function () {
	convert();
});
