var md = window
	.markdownit({ html: true, breaks: true })
	.use(window.markdownitEmoji)
	.use(window.markdownitMark);
/* https://github.com/docarys/markdown-it-admonition */
options = { html: true, breaks: true };
var minMarkers = 3,
	markerStr = options.marker || "!",
	markerChar = markerStr.charCodeAt(0),
	markerLen = markerStr.length,
	validate = validateDefault,
	render = renderDefault,
	type = "",
	title = null,
	types = options.types || [
		"note",
		"abstract",
		"info",
		"tip",
		"success",
		"question",
		"warning",
		"failure",
		"danger",
		"bug",
		"example",
		"quote",
	];
function renderDefault(e, r, n, t, i) {
	var a = e[r];
	return (
		"admonition_open" === a.type
			? e[r].attrPush(["class", "admonition " + a.info])
			: "admonition_title_open" === a.type &&
				e[r].attrPush(["class", "admonition-title"]),
		i.renderToken(e, r, n, t, i)
	);
}
function validateDefault(e) {
	var r = e.trim().split(" ", 2);
	return (
		(title = ""),
		(type = r[0]),
		r.length > 1 && (title = e.substring(type.length + 2)),
		types.includes(type)
	);
}
function admonition(e, r, n, t) {
	var i,
		a,
		o,
		l,
		s,
		d,
		m,
		p,
		u = !1,
		k = e.bMarks[r] + e.tShift[r],
		c = e.eMarks[r];
	if (markerChar !== e.src.charCodeAt(k)) return !1;
	for (i = k + 1; i <= c && markerStr[(i - k) % markerLen] === e.src[i]; i++);
	if ((o = Math.floor((i - k) / markerLen)) < minMarkers) return !1;
	if (
		((i -= (i - k) % markerLen),
		(l = e.src.slice(k, i)),
		(s = e.src.slice(i, c)),
		!validate(s))
	)
		return !1;
	if (t) return !0;
	for (
		a = r;
		!(++a >= n) &&
		!(
			(k = e.bMarks[a] + e.tShift[a]) < (c = e.eMarks[a]) &&
			e.sCount[a] < e.blkIndent
		);

	)
		if (
			markerChar === e.src.charCodeAt(k) &&
			!(e.sCount[a] - e.blkIndent >= 4)
		) {
			for (
				i = k + 1;
				i <= c && markerStr[(i - k) % markerLen] === e.src[i];
				i++
			);
			if (
				!(
					Math.floor((i - k) / markerLen) < o ||
					((i -= (i - k) % markerLen), (i = e.skipSpaces(i)) < c)
				)
			) {
				u = !0;
				break;
			}
		}
	return (
		(m = e.parentType),
		(p = e.lineMax),
		(e.parentType = "admonition"),
		(e.lineMax = a),
		((d = e.push("admonition_open", "div", 1)).markup = l),
		(d.block = !0),
		(d.info = type),
		(d.map = [r, a]),
		((d = e.push("admonition_title_open", "p", 1)).markup = l + " " + type),
		(d.map = [r, a]),
		((d = e.push("inline", "", 0)).content = title),
		(d.map = [r, e.line - 1]),
		(d.children = []),
		((d = e.push("admonition_title_close", "p", -1)).markup = l + " " + type),
		e.md.block.tokenize(e, r + 1, a),
		((d = e.push("admonition_close", "div", -1)).markup = e.src.slice(k, i)),
		(d.block = !0),
		(e.parentType = m),
		(e.lineMax = p),
		(e.line = a + (u ? 1 : 0)),
		!0
	);
}
md.block.ruler.before("code", "admonition", admonition, {
	alt: ["paragraph", "reference", "blockquote", "list"],
}),
	(md.renderer.rules.admonition_open = render),
	(md.renderer.rules.admonition_title_open = render),
	(md.renderer.rules.admonition_title_close = render),
	(md.renderer.rules.admonition_close = render);
