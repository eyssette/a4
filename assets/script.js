var nPages = 1;
let fontSize = 200;
function adjustFontSize() {
	let contentHeight = document.body.offsetHeight;
	while (contentHeight > 1090 * nPages) {
		fontSize = fontSize - 0.5;
		document.body.style.fontSize = fontSize + "px";
		contentHeight = document.body.offsetHeight;
	}
}
window.addEventListener("load", adjustFontSize);
window.addEventListener("resize", adjustFontSize);