/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module
		? t(exports)
		: "function" == typeof define && define.amd
			? define(["exports"], t)
			: t(
					((e =
						"undefined" != typeof globalThis ? globalThis : e || self).jsyaml =
						{}),
				);
})(this, function (e) {
	"use strict";
	function t(e) {
		return null == e;
	}
	var n = {
		isNothing: t,
		isObject: function (e) {
			return "object" == typeof e && null !== e;
		},
		toArray: function (e) {
			return Array.isArray(e) ? e : t(e) ? [] : [e];
		},
		repeat: function (e, t) {
			var n,
				i = "";
			for (n = 0; n < t; n += 1) i += e;
			return i;
		},
		isNegativeZero: function (e) {
			return 0 === e && Number.NEGATIVE_INFINITY === 1 / e;
		},
		extend: function (e, t) {
			var n, i, r, o;
			if (t)
				for (n = 0, i = (o = Object.keys(t)).length; n < i; n += 1)
					e[(r = o[n])] = t[r];
			return e;
		},
	};
	function i(e, t) {
		var n = "",
			i = e.reason || "(unknown reason)";
		return e.mark
			? (e.mark.name && (n += 'in "' + e.mark.name + '" '),
				(n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
				!t && e.mark.snippet && (n += "\n\n" + e.mark.snippet),
				i + " " + n)
			: i;
	}
	function r(e, t) {
		Error.call(this),
			(this.name = "YAMLException"),
			(this.reason = e),
			(this.mark = t),
			(this.message = i(this, !1)),
			Error.captureStackTrace
				? Error.captureStackTrace(this, this.constructor)
				: (this.stack = new Error().stack || "");
	}
	(r.prototype = Object.create(Error.prototype)),
		(r.prototype.constructor = r),
		(r.prototype.toString = function (e) {
			return this.name + ": " + i(this, e);
		});
	var o = r;
	function a(e, t, n, i, r) {
		var o = "",
			a = "",
			l = Math.floor(r / 2) - 1;
		return (
			i - t > l && (t = i - l + (o = " ... ").length),
			n - i > l && (n = i + l - (a = " ...").length),
			{ str: o + e.slice(t, n).replace(/\t/g, "→") + a, pos: i - t + o.length }
		);
	}
	function l(e, t) {
		return n.repeat(" ", t - e.length) + e;
	}
	var c = function (e, t) {
			if (((t = Object.create(t || null)), !e.buffer)) return null;
			t.maxLength || (t.maxLength = 79),
				"number" != typeof t.indent && (t.indent = 1),
				"number" != typeof t.linesBefore && (t.linesBefore = 3),
				"number" != typeof t.linesAfter && (t.linesAfter = 2);
			for (
				var i, r = /\r?\n|\r|\0/g, o = [0], c = [], s = -1;
				(i = r.exec(e.buffer));

			)
				c.push(i.index),
					o.push(i.index + i[0].length),
					e.position <= i.index && s < 0 && (s = o.length - 2);
			s < 0 && (s = o.length - 1);
			var u,
				p,
				f = "",
				d = Math.min(e.line + t.linesAfter, c.length).toString().length,
				h = t.maxLength - (t.indent + d + 3);
			for (u = 1; u <= t.linesBefore && !(s - u < 0); u++)
				(p = a(
					e.buffer,
					o[s - u],
					c[s - u],
					e.position - (o[s] - o[s - u]),
					h,
				)),
					(f =
						n.repeat(" ", t.indent) +
						l((e.line - u + 1).toString(), d) +
						" | " +
						p.str +
						"\n" +
						f);
			for (
				p = a(e.buffer, o[s], c[s], e.position, h),
					f +=
						n.repeat(" ", t.indent) +
						l((e.line + 1).toString(), d) +
						" | " +
						p.str +
						"\n",
					f += n.repeat("-", t.indent + d + 3 + p.pos) + "^\n",
					u = 1;
				u <= t.linesAfter && !(s + u >= c.length);
				u++
			)
				(p = a(
					e.buffer,
					o[s + u],
					c[s + u],
					e.position - (o[s] - o[s + u]),
					h,
				)),
					(f +=
						n.repeat(" ", t.indent) +
						l((e.line + u + 1).toString(), d) +
						" | " +
						p.str +
						"\n");
			return f.replace(/\n$/, "");
		},
		s = [
			"kind",
			"multi",
			"resolve",
			"construct",
			"instanceOf",
			"predicate",
			"represent",
			"representName",
			"defaultStyle",
			"styleAliases",
		],
		u = ["scalar", "sequence", "mapping"];
	var p = function (e, t) {
		if (
			((t = t || {}),
			Object.keys(t).forEach(function (t) {
				if (-1 === s.indexOf(t))
					throw new o(
						'Unknown option "' +
							t +
							'" is met in definition of "' +
							e +
							'" YAML type.',
					);
			}),
			(this.options = t),
			(this.tag = e),
			(this.kind = t.kind || null),
			(this.resolve =
				t.resolve ||
				function () {
					return !0;
				}),
			(this.construct =
				t.construct ||
				function (e) {
					return e;
				}),
			(this.instanceOf = t.instanceOf || null),
			(this.predicate = t.predicate || null),
			(this.represent = t.represent || null),
			(this.representName = t.representName || null),
			(this.defaultStyle = t.defaultStyle || null),
			(this.multi = t.multi || !1),
			(this.styleAliases = (function (e) {
				var t = {};
				return (
					null !== e &&
						Object.keys(e).forEach(function (n) {
							e[n].forEach(function (e) {
								t[String(e)] = n;
							});
						}),
					t
				);
			})(t.styleAliases || null)),
			-1 === u.indexOf(this.kind))
		)
			throw new o(
				'Unknown kind "' +
					this.kind +
					'" is specified for "' +
					e +
					'" YAML type.',
			);
	};
	function f(e, t) {
		var n = [];
		return (
			e[t].forEach(function (e) {
				var t = n.length;
				n.forEach(function (n, i) {
					n.tag === e.tag &&
						n.kind === e.kind &&
						n.multi === e.multi &&
						(t = i);
				}),
					(n[t] = e);
			}),
			n
		);
	}
	function d(e) {
		return this.extend(e);
	}
	d.prototype.extend = function (e) {
		var t = [],
			n = [];
		if (e instanceof p) n.push(e);
		else if (Array.isArray(e)) n = n.concat(e);
		else {
			if (!e || (!Array.isArray(e.implicit) && !Array.isArray(e.explicit)))
				throw new o(
					"Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })",
				);
			e.implicit && (t = t.concat(e.implicit)),
				e.explicit && (n = n.concat(e.explicit));
		}
		t.forEach(function (e) {
			if (!(e instanceof p))
				throw new o(
					"Specified list of YAML types (or a single Type object) contains a non-Type object.",
				);
			if (e.loadKind && "scalar" !== e.loadKind)
				throw new o(
					"There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.",
				);
			if (e.multi)
				throw new o(
					"There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.",
				);
		}),
			n.forEach(function (e) {
				if (!(e instanceof p))
					throw new o(
						"Specified list of YAML types (or a single Type object) contains a non-Type object.",
					);
			});
		var i = Object.create(d.prototype);
		return (
			(i.implicit = (this.implicit || []).concat(t)),
			(i.explicit = (this.explicit || []).concat(n)),
			(i.compiledImplicit = f(i, "implicit")),
			(i.compiledExplicit = f(i, "explicit")),
			(i.compiledTypeMap = (function () {
				var e,
					t,
					n = {
						scalar: {},
						sequence: {},
						mapping: {},
						fallback: {},
						multi: { scalar: [], sequence: [], mapping: [], fallback: [] },
					};
				function i(e) {
					e.multi
						? (n.multi[e.kind].push(e), n.multi.fallback.push(e))
						: (n[e.kind][e.tag] = n.fallback[e.tag] = e);
				}
				for (e = 0, t = arguments.length; e < t; e += 1)
					arguments[e].forEach(i);
				return n;
			})(i.compiledImplicit, i.compiledExplicit)),
			i
		);
	};
	var h = d,
		g = new p("tag:yaml.org,2002:str", {
			kind: "scalar",
			construct: function (e) {
				return null !== e ? e : "";
			},
		}),
		m = new p("tag:yaml.org,2002:seq", {
			kind: "sequence",
			construct: function (e) {
				return null !== e ? e : [];
			},
		}),
		y = new p("tag:yaml.org,2002:map", {
			kind: "mapping",
			construct: function (e) {
				return null !== e ? e : {};
			},
		}),
		b = new h({ explicit: [g, m, y] });
	var A = new p("tag:yaml.org,2002:null", {
		kind: "scalar",
		resolve: function (e) {
			if (null === e) return !0;
			var t = e.length;
			return (
				(1 === t && "~" === e) ||
				(4 === t && ("null" === e || "Null" === e || "NULL" === e))
			);
		},
		construct: function () {
			return null;
		},
		predicate: function (e) {
			return null === e;
		},
		represent: {
			canonical: function () {
				return "~";
			},
			lowercase: function () {
				return "null";
			},
			uppercase: function () {
				return "NULL";
			},
			camelcase: function () {
				return "Null";
			},
			empty: function () {
				return "";
			},
		},
		defaultStyle: "lowercase",
	});
	var v = new p("tag:yaml.org,2002:bool", {
		kind: "scalar",
		resolve: function (e) {
			if (null === e) return !1;
			var t = e.length;
			return (
				(4 === t && ("true" === e || "True" === e || "TRUE" === e)) ||
				(5 === t && ("false" === e || "False" === e || "FALSE" === e))
			);
		},
		construct: function (e) {
			return "true" === e || "True" === e || "TRUE" === e;
		},
		predicate: function (e) {
			return "[object Boolean]" === Object.prototype.toString.call(e);
		},
		represent: {
			lowercase: function (e) {
				return e ? "true" : "false";
			},
			uppercase: function (e) {
				return e ? "TRUE" : "FALSE";
			},
			camelcase: function (e) {
				return e ? "True" : "False";
			},
		},
		defaultStyle: "lowercase",
	});
	function w(e) {
		return 48 <= e && e <= 55;
	}
	function k(e) {
		return 48 <= e && e <= 57;
	}
	var C = new p("tag:yaml.org,2002:int", {
			kind: "scalar",
			resolve: function (e) {
				if (null === e) return !1;
				var t,
					n,
					i = e.length,
					r = 0,
					o = !1;
				if (!i) return !1;
				if ((("-" !== (t = e[r]) && "+" !== t) || (t = e[++r]), "0" === t)) {
					if (r + 1 === i) return !0;
					if ("b" === (t = e[++r])) {
						for (r++; r < i; r++)
							if ("_" !== (t = e[r])) {
								if ("0" !== t && "1" !== t) return !1;
								o = !0;
							}
						return o && "_" !== t;
					}
					if ("x" === t) {
						for (r++; r < i; r++)
							if ("_" !== (t = e[r])) {
								if (
									!(
										(48 <= (n = e.charCodeAt(r)) && n <= 57) ||
										(65 <= n && n <= 70) ||
										(97 <= n && n <= 102)
									)
								)
									return !1;
								o = !0;
							}
						return o && "_" !== t;
					}
					if ("o" === t) {
						for (r++; r < i; r++)
							if ("_" !== (t = e[r])) {
								if (!w(e.charCodeAt(r))) return !1;
								o = !0;
							}
						return o && "_" !== t;
					}
				}
				if ("_" === t) return !1;
				for (; r < i; r++)
					if ("_" !== (t = e[r])) {
						if (!k(e.charCodeAt(r))) return !1;
						o = !0;
					}
				return !(!o || "_" === t);
			},
			construct: function (e) {
				var t,
					n = e,
					i = 1;
				if (
					(-1 !== n.indexOf("_") && (n = n.replace(/_/g, "")),
					("-" !== (t = n[0]) && "+" !== t) ||
						("-" === t && (i = -1), (t = (n = n.slice(1))[0])),
					"0" === n)
				)
					return 0;
				if ("0" === t) {
					if ("b" === n[1]) return i * parseInt(n.slice(2), 2);
					if ("x" === n[1]) return i * parseInt(n.slice(2), 16);
					if ("o" === n[1]) return i * parseInt(n.slice(2), 8);
				}
				return i * parseInt(n, 10);
			},
			predicate: function (e) {
				return (
					"[object Number]" === Object.prototype.toString.call(e) &&
					e % 1 == 0 &&
					!n.isNegativeZero(e)
				);
			},
			represent: {
				binary: function (e) {
					return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
				},
				octal: function (e) {
					return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
				},
				decimal: function (e) {
					return e.toString(10);
				},
				hexadecimal: function (e) {
					return e >= 0
						? "0x" + e.toString(16).toUpperCase()
						: "-0x" + e.toString(16).toUpperCase().slice(1);
				},
			},
			defaultStyle: "decimal",
			styleAliases: {
				binary: [2, "bin"],
				octal: [8, "oct"],
				decimal: [10, "dec"],
				hexadecimal: [16, "hex"],
			},
		}),
		x = new RegExp(
			"^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$",
		);
	var I = /^[-+]?[0-9]+e/;
	var S = new p("tag:yaml.org,2002:float", {
			kind: "scalar",
			resolve: function (e) {
				return null !== e && !(!x.test(e) || "_" === e[e.length - 1]);
			},
			construct: function (e) {
				var t, n;
				return (
					(n = "-" === (t = e.replace(/_/g, "").toLowerCase())[0] ? -1 : 1),
					"+-".indexOf(t[0]) >= 0 && (t = t.slice(1)),
					".inf" === t
						? 1 === n
							? Number.POSITIVE_INFINITY
							: Number.NEGATIVE_INFINITY
						: ".nan" === t
							? NaN
							: n * parseFloat(t, 10)
				);
			},
			predicate: function (e) {
				return (
					"[object Number]" === Object.prototype.toString.call(e) &&
					(e % 1 != 0 || n.isNegativeZero(e))
				);
			},
			represent: function (e, t) {
				var i;
				if (isNaN(e))
					switch (t) {
						case "lowercase":
							return ".nan";
						case "uppercase":
							return ".NAN";
						case "camelcase":
							return ".NaN";
					}
				else if (Number.POSITIVE_INFINITY === e)
					switch (t) {
						case "lowercase":
							return ".inf";
						case "uppercase":
							return ".INF";
						case "camelcase":
							return ".Inf";
					}
				else if (Number.NEGATIVE_INFINITY === e)
					switch (t) {
						case "lowercase":
							return "-.inf";
						case "uppercase":
							return "-.INF";
						case "camelcase":
							return "-.Inf";
					}
				else if (n.isNegativeZero(e)) return "-0.0";
				return (i = e.toString(10)), I.test(i) ? i.replace("e", ".e") : i;
			},
			defaultStyle: "lowercase",
		}),
		O = b.extend({ implicit: [A, v, C, S] }),
		j = O,
		T = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
		N = new RegExp(
			"^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$",
		);
	var F = new p("tag:yaml.org,2002:timestamp", {
		kind: "scalar",
		resolve: function (e) {
			return null !== e && (null !== T.exec(e) || null !== N.exec(e));
		},
		construct: function (e) {
			var t,
				n,
				i,
				r,
				o,
				a,
				l,
				c,
				s = 0,
				u = null;
			if ((null === (t = T.exec(e)) && (t = N.exec(e)), null === t))
				throw new Error("Date resolve error");
			if (((n = +t[1]), (i = +t[2] - 1), (r = +t[3]), !t[4]))
				return new Date(Date.UTC(n, i, r));
			if (((o = +t[4]), (a = +t[5]), (l = +t[6]), t[7])) {
				for (s = t[7].slice(0, 3); s.length < 3; ) s += "0";
				s = +s;
			}
			return (
				t[9] &&
					((u = 6e4 * (60 * +t[10] + +(t[11] || 0))), "-" === t[9] && (u = -u)),
				(c = new Date(Date.UTC(n, i, r, o, a, l, s))),
				u && c.setTime(c.getTime() - u),
				c
			);
		},
		instanceOf: Date,
		represent: function (e) {
			return e.toISOString();
		},
	});
	var E = new p("tag:yaml.org,2002:merge", {
			kind: "scalar",
			resolve: function (e) {
				return "<<" === e || null === e;
			},
		}),
		M = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
	var L = new p("tag:yaml.org,2002:binary", {
			kind: "scalar",
			resolve: function (e) {
				if (null === e) return !1;
				var t,
					n,
					i = 0,
					r = e.length,
					o = M;
				for (n = 0; n < r; n++)
					if (!((t = o.indexOf(e.charAt(n))) > 64)) {
						if (t < 0) return !1;
						i += 6;
					}
				return i % 8 == 0;
			},
			construct: function (e) {
				var t,
					n,
					i = e.replace(/[\r\n=]/g, ""),
					r = i.length,
					o = M,
					a = 0,
					l = [];
				for (t = 0; t < r; t++)
					t % 4 == 0 &&
						t &&
						(l.push((a >> 16) & 255), l.push((a >> 8) & 255), l.push(255 & a)),
						(a = (a << 6) | o.indexOf(i.charAt(t)));
				return (
					0 === (n = (r % 4) * 6)
						? (l.push((a >> 16) & 255), l.push((a >> 8) & 255), l.push(255 & a))
						: 18 === n
							? (l.push((a >> 10) & 255), l.push((a >> 2) & 255))
							: 12 === n && l.push((a >> 4) & 255),
					new Uint8Array(l)
				);
			},
			predicate: function (e) {
				return "[object Uint8Array]" === Object.prototype.toString.call(e);
			},
			represent: function (e) {
				var t,
					n,
					i = "",
					r = 0,
					o = e.length,
					a = M;
				for (t = 0; t < o; t++)
					t % 3 == 0 &&
						t &&
						((i += a[(r >> 18) & 63]),
						(i += a[(r >> 12) & 63]),
						(i += a[(r >> 6) & 63]),
						(i += a[63 & r])),
						(r = (r << 8) + e[t]);
				return (
					0 === (n = o % 3)
						? ((i += a[(r >> 18) & 63]),
							(i += a[(r >> 12) & 63]),
							(i += a[(r >> 6) & 63]),
							(i += a[63 & r]))
						: 2 === n
							? ((i += a[(r >> 10) & 63]),
								(i += a[(r >> 4) & 63]),
								(i += a[(r << 2) & 63]),
								(i += a[64]))
							: 1 === n &&
								((i += a[(r >> 2) & 63]),
								(i += a[(r << 4) & 63]),
								(i += a[64]),
								(i += a[64])),
					i
				);
			},
		}),
		_ = Object.prototype.hasOwnProperty,
		D = Object.prototype.toString;
	var U = new p("tag:yaml.org,2002:omap", {
			kind: "sequence",
			resolve: function (e) {
				if (null === e) return !0;
				var t,
					n,
					i,
					r,
					o,
					a = [],
					l = e;
				for (t = 0, n = l.length; t < n; t += 1) {
					if (((i = l[t]), (o = !1), "[object Object]" !== D.call(i)))
						return !1;
					for (r in i)
						if (_.call(i, r)) {
							if (o) return !1;
							o = !0;
						}
					if (!o) return !1;
					if (-1 !== a.indexOf(r)) return !1;
					a.push(r);
				}
				return !0;
			},
			construct: function (e) {
				return null !== e ? e : [];
			},
		}),
		q = Object.prototype.toString;
	var Y = new p("tag:yaml.org,2002:pairs", {
			kind: "sequence",
			resolve: function (e) {
				if (null === e) return !0;
				var t,
					n,
					i,
					r,
					o,
					a = e;
				for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1) {
					if (((i = a[t]), "[object Object]" !== q.call(i))) return !1;
					if (1 !== (r = Object.keys(i)).length) return !1;
					o[t] = [r[0], i[r[0]]];
				}
				return !0;
			},
			construct: function (e) {
				if (null === e) return [];
				var t,
					n,
					i,
					r,
					o,
					a = e;
				for (o = new Array(a.length), t = 0, n = a.length; t < n; t += 1)
					(i = a[t]), (r = Object.keys(i)), (o[t] = [r[0], i[r[0]]]);
				return o;
			},
		}),
		R = Object.prototype.hasOwnProperty;
	var B = new p("tag:yaml.org,2002:set", {
			kind: "mapping",
			resolve: function (e) {
				if (null === e) return !0;
				var t,
					n = e;
				for (t in n) if (R.call(n, t) && null !== n[t]) return !1;
				return !0;
			},
			construct: function (e) {
				return null !== e ? e : {};
			},
		}),
		K = j.extend({ implicit: [F, E], explicit: [L, U, Y, B] }),
		P = Object.prototype.hasOwnProperty,
		W =
			/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
		H = /[\x85\u2028\u2029]/,
		$ = /[,\[\]\{\}]/,
		G = /^(?:!|!!|![a-z\-]+!)$/i,
		V =
			/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
	function Z(e) {
		return Object.prototype.toString.call(e);
	}
	function J(e) {
		return 10 === e || 13 === e;
	}
	function Q(e) {
		return 9 === e || 32 === e;
	}
	function z(e) {
		return 9 === e || 32 === e || 10 === e || 13 === e;
	}
	function X(e) {
		return 44 === e || 91 === e || 93 === e || 123 === e || 125 === e;
	}
	function ee(e) {
		var t;
		return 48 <= e && e <= 57
			? e - 48
			: 97 <= (t = 32 | e) && t <= 102
				? t - 97 + 10
				: -1;
	}
	function te(e) {
		return 48 === e
			? "\0"
			: 97 === e
				? ""
				: 98 === e
					? "\b"
					: 116 === e || 9 === e
						? "\t"
						: 110 === e
							? "\n"
							: 118 === e
								? "\v"
								: 102 === e
									? "\f"
									: 114 === e
										? "\r"
										: 101 === e
											? ""
											: 32 === e
												? " "
												: 34 === e
													? '"'
													: 47 === e
														? "/"
														: 92 === e
															? "\\"
															: 78 === e
																? ""
																: 95 === e
																	? " "
																	: 76 === e
																		? "\u2028"
																		: 80 === e
																			? "\u2029"
																			: "";
	}
	function ne(e) {
		return e <= 65535
			? String.fromCharCode(e)
			: String.fromCharCode(
					55296 + ((e - 65536) >> 10),
					56320 + ((e - 65536) & 1023),
				);
	}
	for (var ie = new Array(256), re = new Array(256), oe = 0; oe < 256; oe++)
		(ie[oe] = te(oe) ? 1 : 0), (re[oe] = te(oe));
	function ae(e, t) {
		(this.input = e),
			(this.filename = t.filename || null),
			(this.schema = t.schema || K),
			(this.onWarning = t.onWarning || null),
			(this.legacy = t.legacy || !1),
			(this.json = t.json || !1),
			(this.listener = t.listener || null),
			(this.implicitTypes = this.schema.compiledImplicit),
			(this.typeMap = this.schema.compiledTypeMap),
			(this.length = e.length),
			(this.position = 0),
			(this.line = 0),
			(this.lineStart = 0),
			(this.lineIndent = 0),
			(this.firstTabInLine = -1),
			(this.documents = []);
	}
	function le(e, t) {
		var n = {
			name: e.filename,
			buffer: e.input.slice(0, -1),
			position: e.position,
			line: e.line,
			column: e.position - e.lineStart,
		};
		return (n.snippet = c(n)), new o(t, n);
	}
	function ce(e, t) {
		throw le(e, t);
	}
	function se(e, t) {
		e.onWarning && e.onWarning.call(null, le(e, t));
	}
	var ue = {
		YAML: function (e, t, n) {
			var i, r, o;
			null !== e.version && ce(e, "duplication of %YAML directive"),
				1 !== n.length && ce(e, "YAML directive accepts exactly one argument"),
				null === (i = /^([0-9]+)\.([0-9]+)$/.exec(n[0])) &&
					ce(e, "ill-formed argument of the YAML directive"),
				(r = parseInt(i[1], 10)),
				(o = parseInt(i[2], 10)),
				1 !== r && ce(e, "unacceptable YAML version of the document"),
				(e.version = n[0]),
				(e.checkLineBreaks = o < 2),
				1 !== o && 2 !== o && se(e, "unsupported YAML version of the document");
		},
		TAG: function (e, t, n) {
			var i, r;
			2 !== n.length && ce(e, "TAG directive accepts exactly two arguments"),
				(i = n[0]),
				(r = n[1]),
				G.test(i) ||
					ce(e, "ill-formed tag handle (first argument) of the TAG directive"),
				P.call(e.tagMap, i) &&
					ce(
						e,
						'there is a previously declared suffix for "' + i + '" tag handle',
					),
				V.test(r) ||
					ce(e, "ill-formed tag prefix (second argument) of the TAG directive");
			try {
				r = decodeURIComponent(r);
			} catch (t) {
				ce(e, "tag prefix is malformed: " + r);
			}
			e.tagMap[i] = r;
		},
	};
	function pe(e, t, n, i) {
		var r, o, a, l;
		if (t < n) {
			if (((l = e.input.slice(t, n)), i))
				for (r = 0, o = l.length; r < o; r += 1)
					9 === (a = l.charCodeAt(r)) ||
						(32 <= a && a <= 1114111) ||
						ce(e, "expected valid JSON character");
			else W.test(l) && ce(e, "the stream contains non-printable characters");
			e.result += l;
		}
	}
	function fe(e, t, i, r) {
		var o, a, l, c;
		for (
			n.isObject(i) ||
				ce(
					e,
					"cannot merge mappings; the provided source object is unacceptable",
				),
				l = 0,
				c = (o = Object.keys(i)).length;
			l < c;
			l += 1
		)
			(a = o[l]), P.call(t, a) || ((t[a] = i[a]), (r[a] = !0));
	}
	function de(e, t, n, i, r, o, a, l, c) {
		var s, u;
		if (Array.isArray(r))
			for (s = 0, u = (r = Array.prototype.slice.call(r)).length; s < u; s += 1)
				Array.isArray(r[s]) &&
					ce(e, "nested arrays are not supported inside keys"),
					"object" == typeof r &&
						"[object Object]" === Z(r[s]) &&
						(r[s] = "[object Object]");
		if (
			("object" == typeof r &&
				"[object Object]" === Z(r) &&
				(r = "[object Object]"),
			(r = String(r)),
			null === t && (t = {}),
			"tag:yaml.org,2002:merge" === i)
		)
			if (Array.isArray(o))
				for (s = 0, u = o.length; s < u; s += 1) fe(e, t, o[s], n);
			else fe(e, t, o, n);
		else
			e.json ||
				P.call(n, r) ||
				!P.call(t, r) ||
				((e.line = a || e.line),
				(e.lineStart = l || e.lineStart),
				(e.position = c || e.position),
				ce(e, "duplicated mapping key")),
				"__proto__" === r
					? Object.defineProperty(t, r, {
							configurable: !0,
							enumerable: !0,
							writable: !0,
							value: o,
						})
					: (t[r] = o),
				delete n[r];
		return t;
	}
	function he(e) {
		var t;
		10 === (t = e.input.charCodeAt(e.position))
			? e.position++
			: 13 === t
				? (e.position++, 10 === e.input.charCodeAt(e.position) && e.position++)
				: ce(e, "a line break is expected"),
			(e.line += 1),
			(e.lineStart = e.position),
			(e.firstTabInLine = -1);
	}
	function ge(e, t, n) {
		for (var i = 0, r = e.input.charCodeAt(e.position); 0 !== r; ) {
			for (; Q(r); )
				9 === r && -1 === e.firstTabInLine && (e.firstTabInLine = e.position),
					(r = e.input.charCodeAt(++e.position));
			if (t && 35 === r)
				do {
					r = e.input.charCodeAt(++e.position);
				} while (10 !== r && 13 !== r && 0 !== r);
			if (!J(r)) break;
			for (
				he(e), r = e.input.charCodeAt(e.position), i++, e.lineIndent = 0;
				32 === r;

			)
				e.lineIndent++, (r = e.input.charCodeAt(++e.position));
		}
		return (
			-1 !== n && 0 !== i && e.lineIndent < n && se(e, "deficient indentation"),
			i
		);
	}
	function me(e) {
		var t,
			n = e.position;
		return !(
			(45 !== (t = e.input.charCodeAt(n)) && 46 !== t) ||
			t !== e.input.charCodeAt(n + 1) ||
			t !== e.input.charCodeAt(n + 2) ||
			((n += 3), 0 !== (t = e.input.charCodeAt(n)) && !z(t))
		);
	}
	function ye(e, t) {
		1 === t ? (e.result += " ") : t > 1 && (e.result += n.repeat("\n", t - 1));
	}
	function be(e, t) {
		var n,
			i,
			r = e.tag,
			o = e.anchor,
			a = [],
			l = !1;
		if (-1 !== e.firstTabInLine) return !1;
		for (
			null !== e.anchor && (e.anchorMap[e.anchor] = a),
				i = e.input.charCodeAt(e.position);
			0 !== i &&
			(-1 !== e.firstTabInLine &&
				((e.position = e.firstTabInLine),
				ce(e, "tab characters must not be used in indentation")),
			45 === i) &&
			z(e.input.charCodeAt(e.position + 1));

		)
			if (((l = !0), e.position++, ge(e, !0, -1) && e.lineIndent <= t))
				a.push(null), (i = e.input.charCodeAt(e.position));
			else if (
				((n = e.line),
				we(e, t, 3, !1, !0),
				a.push(e.result),
				ge(e, !0, -1),
				(i = e.input.charCodeAt(e.position)),
				(e.line === n || e.lineIndent > t) && 0 !== i)
			)
				ce(e, "bad indentation of a sequence entry");
			else if (e.lineIndent < t) break;
		return (
			!!l &&
			((e.tag = r), (e.anchor = o), (e.kind = "sequence"), (e.result = a), !0)
		);
	}
	function Ae(e) {
		var t,
			n,
			i,
			r,
			o = !1,
			a = !1;
		if (33 !== (r = e.input.charCodeAt(e.position))) return !1;
		if (
			(null !== e.tag && ce(e, "duplication of a tag property"),
			60 === (r = e.input.charCodeAt(++e.position))
				? ((o = !0), (r = e.input.charCodeAt(++e.position)))
				: 33 === r
					? ((a = !0), (n = "!!"), (r = e.input.charCodeAt(++e.position)))
					: (n = "!"),
			(t = e.position),
			o)
		) {
			do {
				r = e.input.charCodeAt(++e.position);
			} while (0 !== r && 62 !== r);
			e.position < e.length
				? ((i = e.input.slice(t, e.position)),
					(r = e.input.charCodeAt(++e.position)))
				: ce(e, "unexpected end of the stream within a verbatim tag");
		} else {
			for (; 0 !== r && !z(r); )
				33 === r &&
					(a
						? ce(e, "tag suffix cannot contain exclamation marks")
						: ((n = e.input.slice(t - 1, e.position + 1)),
							G.test(n) ||
								ce(e, "named tag handle cannot contain such characters"),
							(a = !0),
							(t = e.position + 1))),
					(r = e.input.charCodeAt(++e.position));
			(i = e.input.slice(t, e.position)),
				$.test(i) &&
					ce(e, "tag suffix cannot contain flow indicator characters");
		}
		i && !V.test(i) && ce(e, "tag name cannot contain such characters: " + i);
		try {
			i = decodeURIComponent(i);
		} catch (t) {
			ce(e, "tag name is malformed: " + i);
		}
		return (
			o
				? (e.tag = i)
				: P.call(e.tagMap, n)
					? (e.tag = e.tagMap[n] + i)
					: "!" === n
						? (e.tag = "!" + i)
						: "!!" === n
							? (e.tag = "tag:yaml.org,2002:" + i)
							: ce(e, 'undeclared tag handle "' + n + '"'),
			!0
		);
	}
	function ve(e) {
		var t, n;
		if (38 !== (n = e.input.charCodeAt(e.position))) return !1;
		for (
			null !== e.anchor && ce(e, "duplication of an anchor property"),
				n = e.input.charCodeAt(++e.position),
				t = e.position;
			0 !== n && !z(n) && !X(n);

		)
			n = e.input.charCodeAt(++e.position);
		return (
			e.position === t &&
				ce(e, "name of an anchor node must contain at least one character"),
			(e.anchor = e.input.slice(t, e.position)),
			!0
		);
	}
	function we(e, t, i, r, o) {
		var a,
			l,
			c,
			s,
			u,
			p,
			f,
			d,
			h,
			g = 1,
			m = !1,
			y = !1;
		if (
			(null !== e.listener && e.listener("open", e),
			(e.tag = null),
			(e.anchor = null),
			(e.kind = null),
			(e.result = null),
			(a = l = c = 4 === i || 3 === i),
			r &&
				ge(e, !0, -1) &&
				((m = !0),
				e.lineIndent > t
					? (g = 1)
					: e.lineIndent === t
						? (g = 0)
						: e.lineIndent < t && (g = -1)),
			1 === g)
		)
			for (; Ae(e) || ve(e); )
				ge(e, !0, -1)
					? ((m = !0),
						(c = a),
						e.lineIndent > t
							? (g = 1)
							: e.lineIndent === t
								? (g = 0)
								: e.lineIndent < t && (g = -1))
					: (c = !1);
		if (
			(c && (c = m || o),
			(1 !== g && 4 !== i) ||
				((d = 1 === i || 2 === i ? t : t + 1),
				(h = e.position - e.lineStart),
				1 === g
					? (c &&
							(be(e, h) ||
								(function (e, t, n) {
									var i,
										r,
										o,
										a,
										l,
										c,
										s,
										u = e.tag,
										p = e.anchor,
										f = {},
										d = Object.create(null),
										h = null,
										g = null,
										m = null,
										y = !1,
										b = !1;
									if (-1 !== e.firstTabInLine) return !1;
									for (
										null !== e.anchor && (e.anchorMap[e.anchor] = f),
											s = e.input.charCodeAt(e.position);
										0 !== s;

									) {
										if (
											(y ||
												-1 === e.firstTabInLine ||
												((e.position = e.firstTabInLine),
												ce(
													e,
													"tab characters must not be used in indentation",
												)),
											(i = e.input.charCodeAt(e.position + 1)),
											(o = e.line),
											(63 !== s && 58 !== s) || !z(i))
										) {
											if (
												((a = e.line),
												(l = e.lineStart),
												(c = e.position),
												!we(e, n, 2, !1, !0))
											)
												break;
											if (e.line === o) {
												for (s = e.input.charCodeAt(e.position); Q(s); )
													s = e.input.charCodeAt(++e.position);
												if (58 === s)
													z((s = e.input.charCodeAt(++e.position))) ||
														ce(
															e,
															"a whitespace character is expected after the key-value separator within a block mapping",
														),
														y &&
															(de(e, f, d, h, g, null, a, l, c),
															(h = g = m = null)),
														(b = !0),
														(y = !1),
														(r = !1),
														(h = e.tag),
														(g = e.result);
												else {
													if (!b) return (e.tag = u), (e.anchor = p), !0;
													ce(
														e,
														"can not read an implicit mapping pair; a colon is missed",
													);
												}
											} else {
												if (!b) return (e.tag = u), (e.anchor = p), !0;
												ce(
													e,
													"can not read a block mapping entry; a multiline key may not be an implicit key",
												);
											}
										} else
											63 === s
												? (y &&
														(de(e, f, d, h, g, null, a, l, c),
														(h = g = m = null)),
													(b = !0),
													(y = !0),
													(r = !0))
												: y
													? ((y = !1), (r = !0))
													: ce(
															e,
															"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line",
														),
												(e.position += 1),
												(s = i);
										if (
											((e.line === o || e.lineIndent > t) &&
												(y &&
													((a = e.line), (l = e.lineStart), (c = e.position)),
												we(e, t, 4, !0, r) &&
													(y ? (g = e.result) : (m = e.result)),
												y ||
													(de(e, f, d, h, g, m, a, l, c), (h = g = m = null)),
												ge(e, !0, -1),
												(s = e.input.charCodeAt(e.position))),
											(e.line === o || e.lineIndent > t) && 0 !== s)
										)
											ce(e, "bad indentation of a mapping entry");
										else if (e.lineIndent < t) break;
									}
									return (
										y && de(e, f, d, h, g, null, a, l, c),
										b &&
											((e.tag = u),
											(e.anchor = p),
											(e.kind = "mapping"),
											(e.result = f)),
										b
									);
								})(e, h, d))) ||
						(function (e, t) {
							var n,
								i,
								r,
								o,
								a,
								l,
								c,
								s,
								u,
								p,
								f,
								d,
								h = !0,
								g = e.tag,
								m = e.anchor,
								y = Object.create(null);
							if (91 === (d = e.input.charCodeAt(e.position)))
								(a = 93), (s = !1), (o = []);
							else {
								if (123 !== d) return !1;
								(a = 125), (s = !0), (o = {});
							}
							for (
								null !== e.anchor && (e.anchorMap[e.anchor] = o),
									d = e.input.charCodeAt(++e.position);
								0 !== d;

							) {
								if ((ge(e, !0, t), (d = e.input.charCodeAt(e.position)) === a))
									return (
										e.position++,
										(e.tag = g),
										(e.anchor = m),
										(e.kind = s ? "mapping" : "sequence"),
										(e.result = o),
										!0
									);
								h
									? 44 === d &&
										ce(e, "expected the node content, but found ','")
									: ce(e, "missed comma between flow collection entries"),
									(f = null),
									(l = c = !1),
									63 === d &&
										z(e.input.charCodeAt(e.position + 1)) &&
										((l = c = !0), e.position++, ge(e, !0, t)),
									(n = e.line),
									(i = e.lineStart),
									(r = e.position),
									we(e, t, 1, !1, !0),
									(p = e.tag),
									(u = e.result),
									ge(e, !0, t),
									(d = e.input.charCodeAt(e.position)),
									(!c && e.line !== n) ||
										58 !== d ||
										((l = !0),
										(d = e.input.charCodeAt(++e.position)),
										ge(e, !0, t),
										we(e, t, 1, !1, !0),
										(f = e.result)),
									s
										? de(e, o, y, p, u, f, n, i, r)
										: l
											? o.push(de(e, null, y, p, u, f, n, i, r))
											: o.push(u),
									ge(e, !0, t),
									44 === (d = e.input.charCodeAt(e.position))
										? ((h = !0), (d = e.input.charCodeAt(++e.position)))
										: (h = !1);
							}
							ce(e, "unexpected end of the stream within a flow collection");
						})(e, d)
						? (y = !0)
						: ((l &&
								(function (e, t) {
									var i,
										r,
										o,
										a,
										l,
										c = 1,
										s = !1,
										u = !1,
										p = t,
										f = 0,
										d = !1;
									if (124 === (a = e.input.charCodeAt(e.position))) r = !1;
									else {
										if (62 !== a) return !1;
										r = !0;
									}
									for (e.kind = "scalar", e.result = ""; 0 !== a; )
										if (
											43 === (a = e.input.charCodeAt(++e.position)) ||
											45 === a
										)
											1 === c
												? (c = 43 === a ? 3 : 2)
												: ce(e, "repeat of a chomping mode identifier");
										else {
											if (!((o = 48 <= (l = a) && l <= 57 ? l - 48 : -1) >= 0))
												break;
											0 === o
												? ce(
														e,
														"bad explicit indentation width of a block scalar; it cannot be less than one",
													)
												: u
													? ce(e, "repeat of an indentation width identifier")
													: ((p = t + o - 1), (u = !0));
										}
									if (Q(a)) {
										do {
											a = e.input.charCodeAt(++e.position);
										} while (Q(a));
										if (35 === a)
											do {
												a = e.input.charCodeAt(++e.position);
											} while (!J(a) && 0 !== a);
									}
									for (; 0 !== a; ) {
										for (
											he(e),
												e.lineIndent = 0,
												a = e.input.charCodeAt(e.position);
											(!u || e.lineIndent < p) && 32 === a;

										)
											e.lineIndent++, (a = e.input.charCodeAt(++e.position));
										if ((!u && e.lineIndent > p && (p = e.lineIndent), J(a)))
											f++;
										else {
											if (e.lineIndent < p) {
												3 === c
													? (e.result += n.repeat("\n", s ? 1 + f : f))
													: 1 === c && s && (e.result += "\n");
												break;
											}
											for (
												r
													? Q(a)
														? ((d = !0),
															(e.result += n.repeat("\n", s ? 1 + f : f)))
														: d
															? ((d = !1), (e.result += n.repeat("\n", f + 1)))
															: 0 === f
																? s && (e.result += " ")
																: (e.result += n.repeat("\n", f))
													: (e.result += n.repeat("\n", s ? 1 + f : f)),
													s = !0,
													u = !0,
													f = 0,
													i = e.position;
												!J(a) && 0 !== a;

											)
												a = e.input.charCodeAt(++e.position);
											pe(e, i, e.position, !1);
										}
									}
									return !0;
								})(e, d)) ||
							(function (e, t) {
								var n, i, r;
								if (39 !== (n = e.input.charCodeAt(e.position))) return !1;
								for (
									e.kind = "scalar",
										e.result = "",
										e.position++,
										i = r = e.position;
									0 !== (n = e.input.charCodeAt(e.position));

								)
									if (39 === n) {
										if (
											(pe(e, i, e.position, !0),
											39 !== (n = e.input.charCodeAt(++e.position)))
										)
											return !0;
										(i = e.position), e.position++, (r = e.position);
									} else
										J(n)
											? (pe(e, i, r, !0),
												ye(e, ge(e, !1, t)),
												(i = r = e.position))
											: e.position === e.lineStart && me(e)
												? ce(
														e,
														"unexpected end of the document within a single quoted scalar",
													)
												: (e.position++, (r = e.position));
								ce(
									e,
									"unexpected end of the stream within a single quoted scalar",
								);
							})(e, d) ||
							(function (e, t) {
								var n, i, r, o, a, l, c;
								if (34 !== (l = e.input.charCodeAt(e.position))) return !1;
								for (
									e.kind = "scalar",
										e.result = "",
										e.position++,
										n = i = e.position;
									0 !== (l = e.input.charCodeAt(e.position));

								) {
									if (34 === l)
										return pe(e, n, e.position, !0), e.position++, !0;
									if (92 === l) {
										if (
											(pe(e, n, e.position, !0),
											J((l = e.input.charCodeAt(++e.position))))
										)
											ge(e, !1, t);
										else if (l < 256 && ie[l])
											(e.result += re[l]), e.position++;
										else if (
											(a =
												120 === (c = l)
													? 2
													: 117 === c
														? 4
														: 85 === c
															? 8
															: 0) > 0
										) {
											for (r = a, o = 0; r > 0; r--)
												(a = ee((l = e.input.charCodeAt(++e.position)))) >= 0
													? (o = (o << 4) + a)
													: ce(e, "expected hexadecimal character");
											(e.result += ne(o)), e.position++;
										} else ce(e, "unknown escape sequence");
										n = i = e.position;
									} else
										J(l)
											? (pe(e, n, i, !0),
												ye(e, ge(e, !1, t)),
												(n = i = e.position))
											: e.position === e.lineStart && me(e)
												? ce(
														e,
														"unexpected end of the document within a double quoted scalar",
													)
												: (e.position++, (i = e.position));
								}
								ce(
									e,
									"unexpected end of the stream within a double quoted scalar",
								);
							})(e, d)
								? (y = !0)
								: !(function (e) {
											var t, n, i;
											if (42 !== (i = e.input.charCodeAt(e.position)))
												return !1;
											for (
												i = e.input.charCodeAt(++e.position), t = e.position;
												0 !== i && !z(i) && !X(i);

											)
												i = e.input.charCodeAt(++e.position);
											return (
												e.position === t &&
													ce(
														e,
														"name of an alias node must contain at least one character",
													),
												(n = e.input.slice(t, e.position)),
												P.call(e.anchorMap, n) ||
													ce(e, 'unidentified alias "' + n + '"'),
												(e.result = e.anchorMap[n]),
												ge(e, !0, -1),
												!0
											);
									  })(e)
									? (function (e, t, n) {
											var i,
												r,
												o,
												a,
												l,
												c,
												s,
												u,
												p = e.kind,
												f = e.result;
											if (
												z((u = e.input.charCodeAt(e.position))) ||
												X(u) ||
												35 === u ||
												38 === u ||
												42 === u ||
												33 === u ||
												124 === u ||
												62 === u ||
												39 === u ||
												34 === u ||
												37 === u ||
												64 === u ||
												96 === u
											)
												return !1;
											if (
												(63 === u || 45 === u) &&
												(z((i = e.input.charCodeAt(e.position + 1))) ||
													(n && X(i)))
											)
												return !1;
											for (
												e.kind = "scalar",
													e.result = "",
													r = o = e.position,
													a = !1;
												0 !== u;

											) {
												if (58 === u) {
													if (
														z((i = e.input.charCodeAt(e.position + 1))) ||
														(n && X(i))
													)
														break;
												} else if (35 === u) {
													if (z(e.input.charCodeAt(e.position - 1))) break;
												} else {
													if (
														(e.position === e.lineStart && me(e)) ||
														(n && X(u))
													)
														break;
													if (J(u)) {
														if (
															((l = e.line),
															(c = e.lineStart),
															(s = e.lineIndent),
															ge(e, !1, -1),
															e.lineIndent >= t)
														) {
															(a = !0), (u = e.input.charCodeAt(e.position));
															continue;
														}
														(e.position = o),
															(e.line = l),
															(e.lineStart = c),
															(e.lineIndent = s);
														break;
													}
												}
												a &&
													(pe(e, r, o, !1),
													ye(e, e.line - l),
													(r = o = e.position),
													(a = !1)),
													Q(u) || (o = e.position + 1),
													(u = e.input.charCodeAt(++e.position));
											}
											return (
												pe(e, r, o, !1),
												!!e.result || ((e.kind = p), (e.result = f), !1)
											);
										})(e, d, 1 === i) &&
										((y = !0), null === e.tag && (e.tag = "?"))
									: ((y = !0),
										(null === e.tag && null === e.anchor) ||
											ce(e, "alias node should not have any properties")),
							null !== e.anchor && (e.anchorMap[e.anchor] = e.result))
					: 0 === g && (y = c && be(e, h))),
			null === e.tag)
		)
			null !== e.anchor && (e.anchorMap[e.anchor] = e.result);
		else if ("?" === e.tag) {
			for (
				null !== e.result &&
					"scalar" !== e.kind &&
					ce(
						e,
						'unacceptable node kind for !<?> tag; it should be "scalar", not "' +
							e.kind +
							'"',
					),
					s = 0,
					u = e.implicitTypes.length;
				s < u;
				s += 1
			)
				if ((f = e.implicitTypes[s]).resolve(e.result)) {
					(e.result = f.construct(e.result)),
						(e.tag = f.tag),
						null !== e.anchor && (e.anchorMap[e.anchor] = e.result);
					break;
				}
		} else if ("!" !== e.tag) {
			if (P.call(e.typeMap[e.kind || "fallback"], e.tag))
				f = e.typeMap[e.kind || "fallback"][e.tag];
			else
				for (
					f = null,
						s = 0,
						u = (p = e.typeMap.multi[e.kind || "fallback"]).length;
					s < u;
					s += 1
				)
					if (e.tag.slice(0, p[s].tag.length) === p[s].tag) {
						f = p[s];
						break;
					}
			f || ce(e, "unknown tag !<" + e.tag + ">"),
				null !== e.result &&
					f.kind !== e.kind &&
					ce(
						e,
						"unacceptable node kind for !<" +
							e.tag +
							'> tag; it should be "' +
							f.kind +
							'", not "' +
							e.kind +
							'"',
					),
				f.resolve(e.result, e.tag)
					? ((e.result = f.construct(e.result, e.tag)),
						null !== e.anchor && (e.anchorMap[e.anchor] = e.result))
					: ce(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
		}
		return (
			null !== e.listener && e.listener("close", e),
			null !== e.tag || null !== e.anchor || y
		);
	}
	function ke(e) {
		var t,
			n,
			i,
			r,
			o = e.position,
			a = !1;
		for (
			e.version = null,
				e.checkLineBreaks = e.legacy,
				e.tagMap = Object.create(null),
				e.anchorMap = Object.create(null);
			0 !== (r = e.input.charCodeAt(e.position)) &&
			(ge(e, !0, -1),
			(r = e.input.charCodeAt(e.position)),
			!(e.lineIndent > 0 || 37 !== r));

		) {
			for (
				a = !0, r = e.input.charCodeAt(++e.position), t = e.position;
				0 !== r && !z(r);

			)
				r = e.input.charCodeAt(++e.position);
			for (
				i = [],
					(n = e.input.slice(t, e.position)).length < 1 &&
						ce(
							e,
							"directive name must not be less than one character in length",
						);
				0 !== r;

			) {
				for (; Q(r); ) r = e.input.charCodeAt(++e.position);
				if (35 === r) {
					do {
						r = e.input.charCodeAt(++e.position);
					} while (0 !== r && !J(r));
					break;
				}
				if (J(r)) break;
				for (t = e.position; 0 !== r && !z(r); )
					r = e.input.charCodeAt(++e.position);
				i.push(e.input.slice(t, e.position));
			}
			0 !== r && he(e),
				P.call(ue, n)
					? ue[n](e, n, i)
					: se(e, 'unknown document directive "' + n + '"');
		}
		ge(e, !0, -1),
			0 === e.lineIndent &&
			45 === e.input.charCodeAt(e.position) &&
			45 === e.input.charCodeAt(e.position + 1) &&
			45 === e.input.charCodeAt(e.position + 2)
				? ((e.position += 3), ge(e, !0, -1))
				: a && ce(e, "directives end mark is expected"),
			we(e, e.lineIndent - 1, 4, !1, !0),
			ge(e, !0, -1),
			e.checkLineBreaks &&
				H.test(e.input.slice(o, e.position)) &&
				se(e, "non-ASCII line breaks are interpreted as content"),
			e.documents.push(e.result),
			e.position === e.lineStart && me(e)
				? 46 === e.input.charCodeAt(e.position) &&
					((e.position += 3), ge(e, !0, -1))
				: e.position < e.length - 1 &&
					ce(e, "end of the stream or a document separator is expected");
	}
	function Ce(e, t) {
		(t = t || {}),
			0 !== (e = String(e)).length &&
				(10 !== e.charCodeAt(e.length - 1) &&
					13 !== e.charCodeAt(e.length - 1) &&
					(e += "\n"),
				65279 === e.charCodeAt(0) && (e = e.slice(1)));
		var n = new ae(e, t),
			i = e.indexOf("\0");
		for (
			-1 !== i &&
				((n.position = i), ce(n, "null byte is not allowed in input")),
				n.input += "\0";
			32 === n.input.charCodeAt(n.position);

		)
			(n.lineIndent += 1), (n.position += 1);
		for (; n.position < n.length - 1; ) ke(n);
		return n.documents;
	}
	var xe = {
			loadAll: function (e, t, n) {
				null !== t &&
					"object" == typeof t &&
					void 0 === n &&
					((n = t), (t = null));
				var i = Ce(e, n);
				if ("function" != typeof t) return i;
				for (var r = 0, o = i.length; r < o; r += 1) t(i[r]);
			},
			load: function (e, t) {
				var n = Ce(e, t);
				if (0 !== n.length) {
					if (1 === n.length) return n[0];
					throw new o(
						"expected a single document in the stream, but found more",
					);
				}
			},
		},
		Ie = Object.prototype.toString,
		Se = Object.prototype.hasOwnProperty,
		Oe = 65279,
		je = {
			0: "\\0",
			7: "\\a",
			8: "\\b",
			9: "\\t",
			10: "\\n",
			11: "\\v",
			12: "\\f",
			13: "\\r",
			27: "\\e",
			34: '\\"',
			92: "\\\\",
			133: "\\N",
			160: "\\_",
			8232: "\\L",
			8233: "\\P",
		},
		Te = [
			"y",
			"Y",
			"yes",
			"Yes",
			"YES",
			"on",
			"On",
			"ON",
			"n",
			"N",
			"no",
			"No",
			"NO",
			"off",
			"Off",
			"OFF",
		],
		Ne = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
	function Fe(e) {
		var t, i, r;
		if (((t = e.toString(16).toUpperCase()), e <= 255)) (i = "x"), (r = 2);
		else if (e <= 65535) (i = "u"), (r = 4);
		else {
			if (!(e <= 4294967295))
				throw new o(
					"code point within a string may not be greater than 0xFFFFFFFF",
				);
			(i = "U"), (r = 8);
		}
		return "\\" + i + n.repeat("0", r - t.length) + t;
	}
	function Ee(e) {
		(this.schema = e.schema || K),
			(this.indent = Math.max(1, e.indent || 2)),
			(this.noArrayIndent = e.noArrayIndent || !1),
			(this.skipInvalid = e.skipInvalid || !1),
			(this.flowLevel = n.isNothing(e.flowLevel) ? -1 : e.flowLevel),
			(this.styleMap = (function (e, t) {
				var n, i, r, o, a, l, c;
				if (null === t) return {};
				for (n = {}, r = 0, o = (i = Object.keys(t)).length; r < o; r += 1)
					(a = i[r]),
						(l = String(t[a])),
						"!!" === a.slice(0, 2) && (a = "tag:yaml.org,2002:" + a.slice(2)),
						(c = e.compiledTypeMap.fallback[a]) &&
							Se.call(c.styleAliases, l) &&
							(l = c.styleAliases[l]),
						(n[a] = l);
				return n;
			})(this.schema, e.styles || null)),
			(this.sortKeys = e.sortKeys || !1),
			(this.lineWidth = e.lineWidth || 80),
			(this.noRefs = e.noRefs || !1),
			(this.noCompatMode = e.noCompatMode || !1),
			(this.condenseFlow = e.condenseFlow || !1),
			(this.quotingType = '"' === e.quotingType ? 2 : 1),
			(this.forceQuotes = e.forceQuotes || !1),
			(this.replacer = "function" == typeof e.replacer ? e.replacer : null),
			(this.implicitTypes = this.schema.compiledImplicit),
			(this.explicitTypes = this.schema.compiledExplicit),
			(this.tag = null),
			(this.result = ""),
			(this.duplicates = []),
			(this.usedDuplicates = null);
	}
	function Me(e, t) {
		for (
			var i, r = n.repeat(" ", t), o = 0, a = -1, l = "", c = e.length;
			o < c;

		)
			-1 === (a = e.indexOf("\n", o))
				? ((i = e.slice(o)), (o = c))
				: ((i = e.slice(o, a + 1)), (o = a + 1)),
				i.length && "\n" !== i && (l += r),
				(l += i);
		return l;
	}
	function Le(e, t) {
		return "\n" + n.repeat(" ", e.indent * t);
	}
	function _e(e) {
		return 32 === e || 9 === e;
	}
	function De(e) {
		return (
			(32 <= e && e <= 126) ||
			(161 <= e && e <= 55295 && 8232 !== e && 8233 !== e) ||
			(57344 <= e && e <= 65533 && e !== Oe) ||
			(65536 <= e && e <= 1114111)
		);
	}
	function Ue(e) {
		return De(e) && e !== Oe && 13 !== e && 10 !== e;
	}
	function qe(e, t, n) {
		var i = Ue(e),
			r = i && !_e(e);
		return (
			((n
				? i
				: i && 44 !== e && 91 !== e && 93 !== e && 123 !== e && 125 !== e) &&
				35 !== e &&
				!(58 === t && !r)) ||
			(Ue(t) && !_e(t) && 35 === e) ||
			(58 === t && r)
		);
	}
	function Ye(e, t) {
		var n,
			i = e.charCodeAt(t);
		return i >= 55296 &&
			i <= 56319 &&
			t + 1 < e.length &&
			(n = e.charCodeAt(t + 1)) >= 56320 &&
			n <= 57343
			? 1024 * (i - 55296) + n - 56320 + 65536
			: i;
	}
	function Re(e) {
		return /^\n* /.test(e);
	}
	function Be(e, t, n, i, r, o, a, l) {
		var c,
			s,
			u = 0,
			p = null,
			f = !1,
			d = !1,
			h = -1 !== i,
			g = -1,
			m =
				De((s = Ye(e, 0))) &&
				s !== Oe &&
				!_e(s) &&
				45 !== s &&
				63 !== s &&
				58 !== s &&
				44 !== s &&
				91 !== s &&
				93 !== s &&
				123 !== s &&
				125 !== s &&
				35 !== s &&
				38 !== s &&
				42 !== s &&
				33 !== s &&
				124 !== s &&
				61 !== s &&
				62 !== s &&
				39 !== s &&
				34 !== s &&
				37 !== s &&
				64 !== s &&
				96 !== s &&
				(function (e) {
					return !_e(e) && 58 !== e;
				})(Ye(e, e.length - 1));
		if (t || a)
			for (c = 0; c < e.length; u >= 65536 ? (c += 2) : c++) {
				if (!De((u = Ye(e, c)))) return 5;
				(m = m && qe(u, p, l)), (p = u);
			}
		else {
			for (c = 0; c < e.length; u >= 65536 ? (c += 2) : c++) {
				if (10 === (u = Ye(e, c)))
					(f = !0),
						h && ((d = d || (c - g - 1 > i && " " !== e[g + 1])), (g = c));
				else if (!De(u)) return 5;
				(m = m && qe(u, p, l)), (p = u);
			}
			d = d || (h && c - g - 1 > i && " " !== e[g + 1]);
		}
		return f || d
			? n > 9 && Re(e)
				? 5
				: a
					? 2 === o
						? 5
						: 2
					: d
						? 4
						: 3
			: !m || a || r(e)
				? 2 === o
					? 5
					: 2
				: 1;
	}
	function Ke(e, t, n, i, r) {
		e.dump = (function () {
			if (0 === t.length) return 2 === e.quotingType ? '""' : "''";
			if (!e.noCompatMode && (-1 !== Te.indexOf(t) || Ne.test(t)))
				return 2 === e.quotingType ? '"' + t + '"' : "'" + t + "'";
			var a = e.indent * Math.max(1, n),
				l =
					-1 === e.lineWidth
						? -1
						: Math.max(Math.min(e.lineWidth, 40), e.lineWidth - a),
				c = i || (e.flowLevel > -1 && n >= e.flowLevel);
			switch (
				Be(
					t,
					c,
					e.indent,
					l,
					function (t) {
						return (function (e, t) {
							var n, i;
							for (n = 0, i = e.implicitTypes.length; n < i; n += 1)
								if (e.implicitTypes[n].resolve(t)) return !0;
							return !1;
						})(e, t);
					},
					e.quotingType,
					e.forceQuotes && !i,
					r,
				)
			) {
				case 1:
					return t;
				case 2:
					return "'" + t.replace(/'/g, "''") + "'";
				case 3:
					return "|" + Pe(t, e.indent) + We(Me(t, a));
				case 4:
					return (
						">" +
						Pe(t, e.indent) +
						We(
							Me(
								(function (e, t) {
									var n,
										i,
										r = /(\n+)([^\n]*)/g,
										o =
											((l = e.indexOf("\n")),
											(l = -1 !== l ? l : e.length),
											(r.lastIndex = l),
											He(e.slice(0, l), t)),
										a = "\n" === e[0] || " " === e[0];
									var l;
									for (; (i = r.exec(e)); ) {
										var c = i[1],
											s = i[2];
										(n = " " === s[0]),
											(o += c + (a || n || "" === s ? "" : "\n") + He(s, t)),
											(a = n);
									}
									return o;
								})(t, l),
								a,
							),
						)
					);
				case 5:
					return (
						'"' +
						(function (e) {
							for (
								var t, n = "", i = 0, r = 0;
								r < e.length;
								i >= 65536 ? (r += 2) : r++
							)
								(i = Ye(e, r)),
									!(t = je[i]) && De(i)
										? ((n += e[r]), i >= 65536 && (n += e[r + 1]))
										: (n += t || Fe(i));
							return n;
						})(t) +
						'"'
					);
				default:
					throw new o("impossible error: invalid scalar style");
			}
		})();
	}
	function Pe(e, t) {
		var n = Re(e) ? String(t) : "",
			i = "\n" === e[e.length - 1];
		return (
			n +
			(i && ("\n" === e[e.length - 2] || "\n" === e) ? "+" : i ? "" : "-") +
			"\n"
		);
	}
	function We(e) {
		return "\n" === e[e.length - 1] ? e.slice(0, -1) : e;
	}
	function He(e, t) {
		if ("" === e || " " === e[0]) return e;
		for (var n, i, r = / [^ ]/g, o = 0, a = 0, l = 0, c = ""; (n = r.exec(e)); )
			(l = n.index) - o > t &&
				((i = a > o ? a : l), (c += "\n" + e.slice(o, i)), (o = i + 1)),
				(a = l);
		return (
			(c += "\n"),
			e.length - o > t && a > o
				? (c += e.slice(o, a) + "\n" + e.slice(a + 1))
				: (c += e.slice(o)),
			c.slice(1)
		);
	}
	function $e(e, t, n, i) {
		var r,
			o,
			a,
			l = "",
			c = e.tag;
		for (r = 0, o = n.length; r < o; r += 1)
			(a = n[r]),
				e.replacer && (a = e.replacer.call(n, String(r), a)),
				(Ve(e, t + 1, a, !0, !0, !1, !0) ||
					(void 0 === a && Ve(e, t + 1, null, !0, !0, !1, !0))) &&
					((i && "" === l) || (l += Le(e, t)),
					e.dump && 10 === e.dump.charCodeAt(0) ? (l += "-") : (l += "- "),
					(l += e.dump));
		(e.tag = c), (e.dump = l || "[]");
	}
	function Ge(e, t, n) {
		var i, r, a, l, c, s;
		for (
			a = 0, l = (r = n ? e.explicitTypes : e.implicitTypes).length;
			a < l;
			a += 1
		)
			if (
				((c = r[a]).instanceOf || c.predicate) &&
				(!c.instanceOf ||
					("object" == typeof t && t instanceof c.instanceOf)) &&
				(!c.predicate || c.predicate(t))
			) {
				if (
					(n
						? c.multi && c.representName
							? (e.tag = c.representName(t))
							: (e.tag = c.tag)
						: (e.tag = "?"),
					c.represent)
				) {
					if (
						((s = e.styleMap[c.tag] || c.defaultStyle),
						"[object Function]" === Ie.call(c.represent))
					)
						i = c.represent(t, s);
					else {
						if (!Se.call(c.represent, s))
							throw new o(
								"!<" + c.tag + '> tag resolver accepts not "' + s + '" style',
							);
						i = c.represent[s](t, s);
					}
					e.dump = i;
				}
				return !0;
			}
		return !1;
	}
	function Ve(e, t, n, i, r, a, l) {
		(e.tag = null), (e.dump = n), Ge(e, n, !1) || Ge(e, n, !0);
		var c,
			s = Ie.call(e.dump),
			u = i;
		i && (i = e.flowLevel < 0 || e.flowLevel > t);
		var p,
			f,
			d = "[object Object]" === s || "[object Array]" === s;
		if (
			(d && (f = -1 !== (p = e.duplicates.indexOf(n))),
			((null !== e.tag && "?" !== e.tag) || f || (2 !== e.indent && t > 0)) &&
				(r = !1),
			f && e.usedDuplicates[p])
		)
			e.dump = "*ref_" + p;
		else {
			if (
				(d && f && !e.usedDuplicates[p] && (e.usedDuplicates[p] = !0),
				"[object Object]" === s)
			)
				i && 0 !== Object.keys(e.dump).length
					? (!(function (e, t, n, i) {
							var r,
								a,
								l,
								c,
								s,
								u,
								p = "",
								f = e.tag,
								d = Object.keys(n);
							if (!0 === e.sortKeys) d.sort();
							else if ("function" == typeof e.sortKeys) d.sort(e.sortKeys);
							else if (e.sortKeys)
								throw new o("sortKeys must be a boolean or a function");
							for (r = 0, a = d.length; r < a; r += 1)
								(u = ""),
									(i && "" === p) || (u += Le(e, t)),
									(c = n[(l = d[r])]),
									e.replacer && (c = e.replacer.call(n, l, c)),
									Ve(e, t + 1, l, !0, !0, !0) &&
										((s =
											(null !== e.tag && "?" !== e.tag) ||
											(e.dump && e.dump.length > 1024)) &&
											(e.dump && 10 === e.dump.charCodeAt(0)
												? (u += "?")
												: (u += "? ")),
										(u += e.dump),
										s && (u += Le(e, t)),
										Ve(e, t + 1, c, !0, s) &&
											(e.dump && 10 === e.dump.charCodeAt(0)
												? (u += ":")
												: (u += ": "),
											(p += u += e.dump)));
							(e.tag = f), (e.dump = p || "{}");
						})(e, t, e.dump, r),
						f && (e.dump = "&ref_" + p + e.dump))
					: (!(function (e, t, n) {
							var i,
								r,
								o,
								a,
								l,
								c = "",
								s = e.tag,
								u = Object.keys(n);
							for (i = 0, r = u.length; i < r; i += 1)
								(l = ""),
									"" !== c && (l += ", "),
									e.condenseFlow && (l += '"'),
									(a = n[(o = u[i])]),
									e.replacer && (a = e.replacer.call(n, o, a)),
									Ve(e, t, o, !1, !1) &&
										(e.dump.length > 1024 && (l += "? "),
										(l +=
											e.dump +
											(e.condenseFlow ? '"' : "") +
											":" +
											(e.condenseFlow ? "" : " ")),
										Ve(e, t, a, !1, !1) && (c += l += e.dump));
							(e.tag = s), (e.dump = "{" + c + "}");
						})(e, t, e.dump),
						f && (e.dump = "&ref_" + p + " " + e.dump));
			else if ("[object Array]" === s)
				i && 0 !== e.dump.length
					? (e.noArrayIndent && !l && t > 0
							? $e(e, t - 1, e.dump, r)
							: $e(e, t, e.dump, r),
						f && (e.dump = "&ref_" + p + e.dump))
					: (!(function (e, t, n) {
							var i,
								r,
								o,
								a = "",
								l = e.tag;
							for (i = 0, r = n.length; i < r; i += 1)
								(o = n[i]),
									e.replacer && (o = e.replacer.call(n, String(i), o)),
									(Ve(e, t, o, !1, !1) ||
										(void 0 === o && Ve(e, t, null, !1, !1))) &&
										("" !== a && (a += "," + (e.condenseFlow ? "" : " ")),
										(a += e.dump));
							(e.tag = l), (e.dump = "[" + a + "]");
						})(e, t, e.dump),
						f && (e.dump = "&ref_" + p + " " + e.dump));
			else {
				if ("[object String]" !== s) {
					if ("[object Undefined]" === s) return !1;
					if (e.skipInvalid) return !1;
					throw new o("unacceptable kind of an object to dump " + s);
				}
				"?" !== e.tag && Ke(e, e.dump, t, a, u);
			}
			null !== e.tag &&
				"?" !== e.tag &&
				((c = encodeURI("!" === e.tag[0] ? e.tag.slice(1) : e.tag).replace(
					/!/g,
					"%21",
				)),
				(c =
					"!" === e.tag[0]
						? "!" + c
						: "tag:yaml.org,2002:" === c.slice(0, 18)
							? "!!" + c.slice(18)
							: "!<" + c + ">"),
				(e.dump = c + " " + e.dump));
		}
		return !0;
	}
	function Ze(e, t) {
		var n,
			i,
			r = [],
			o = [];
		for (Je(e, r, o), n = 0, i = o.length; n < i; n += 1)
			t.duplicates.push(r[o[n]]);
		t.usedDuplicates = new Array(i);
	}
	function Je(e, t, n) {
		var i, r, o;
		if (null !== e && "object" == typeof e)
			if (-1 !== (r = t.indexOf(e))) -1 === n.indexOf(r) && n.push(r);
			else if ((t.push(e), Array.isArray(e)))
				for (r = 0, o = e.length; r < o; r += 1) Je(e[r], t, n);
			else
				for (r = 0, o = (i = Object.keys(e)).length; r < o; r += 1)
					Je(e[i[r]], t, n);
	}
	function Qe(e, t) {
		return function () {
			throw new Error(
				"Function yaml." +
					e +
					" is removed in js-yaml 4. Use yaml." +
					t +
					" instead, which is now safe by default.",
			);
		};
	}
	var ze = p,
		Xe = h,
		et = b,
		tt = O,
		nt = j,
		it = K,
		rt = xe.load,
		ot = xe.loadAll,
		at = {
			dump: function (e, t) {
				var n = new Ee((t = t || {}));
				n.noRefs || Ze(e, n);
				var i = e;
				return (
					n.replacer && (i = n.replacer.call({ "": i }, "", i)),
					Ve(n, 0, i, !0, !0) ? n.dump + "\n" : ""
				);
			},
		}.dump,
		lt = o,
		ct = {
			binary: L,
			float: S,
			map: y,
			null: A,
			pairs: Y,
			set: B,
			timestamp: F,
			bool: v,
			int: C,
			merge: E,
			omap: U,
			seq: m,
			str: g,
		},
		st = Qe("safeLoad", "load"),
		ut = Qe("safeLoadAll", "loadAll"),
		pt = Qe("safeDump", "dump"),
		ft = {
			Type: ze,
			Schema: Xe,
			FAILSAFE_SCHEMA: et,
			JSON_SCHEMA: tt,
			CORE_SCHEMA: nt,
			DEFAULT_SCHEMA: it,
			load: rt,
			loadAll: ot,
			dump: at,
			YAMLException: lt,
			types: ct,
			safeLoad: st,
			safeLoadAll: ut,
			safeDump: pt,
		};
	(e.CORE_SCHEMA = nt),
		(e.DEFAULT_SCHEMA = it),
		(e.FAILSAFE_SCHEMA = et),
		(e.JSON_SCHEMA = tt),
		(e.Schema = Xe),
		(e.Type = ze),
		(e.YAMLException = lt),
		(e.default = ft),
		(e.dump = at),
		(e.load = rt),
		(e.loadAll = ot),
		(e.safeDump = pt),
		(e.safeLoad = st),
		(e.safeLoadAll = ut),
		(e.types = ct),
		Object.defineProperty(e, "__esModule", { value: !0 });
});

/*! markdown-it 13.0.1 https://github.com/markdown-it/markdown-it @license MIT */
!(function (e, r) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = r())
		: "function" == typeof define && define.amd
			? define(r)
			: ((e =
					"undefined" != typeof globalThis
						? globalThis
						: e || self).markdownit = r());
})(this, function () {
	"use strict";
	function e(e) {
		if (e.__esModule) return e;
		var r = Object.defineProperty({}, "__esModule", { value: !0 });
		return (
			Object.keys(e).forEach(function (t) {
				var n = Object.getOwnPropertyDescriptor(e, t);
				Object.defineProperty(
					r,
					t,
					n.get
						? n
						: {
								enumerable: !0,
								get: function () {
									return e[t];
								},
							},
				);
			}),
			r
		);
	}
	var r = {
			Aacute: "\xc1",
			aacute: "\xe1",
			Abreve: "\u0102",
			abreve: "\u0103",
			ac: "\u223e",
			acd: "\u223f",
			acE: "\u223e\u0333",
			Acirc: "\xc2",
			acirc: "\xe2",
			acute: "\xb4",
			Acy: "\u0410",
			acy: "\u0430",
			AElig: "\xc6",
			aelig: "\xe6",
			af: "\u2061",
			Afr: "\ud835\udd04",
			afr: "\ud835\udd1e",
			Agrave: "\xc0",
			agrave: "\xe0",
			alefsym: "\u2135",
			aleph: "\u2135",
			Alpha: "\u0391",
			alpha: "\u03b1",
			Amacr: "\u0100",
			amacr: "\u0101",
			amalg: "\u2a3f",
			amp: "&",
			AMP: "&",
			andand: "\u2a55",
			And: "\u2a53",
			and: "\u2227",
			andd: "\u2a5c",
			andslope: "\u2a58",
			andv: "\u2a5a",
			ang: "\u2220",
			ange: "\u29a4",
			angle: "\u2220",
			angmsdaa: "\u29a8",
			angmsdab: "\u29a9",
			angmsdac: "\u29aa",
			angmsdad: "\u29ab",
			angmsdae: "\u29ac",
			angmsdaf: "\u29ad",
			angmsdag: "\u29ae",
			angmsdah: "\u29af",
			angmsd: "\u2221",
			angrt: "\u221f",
			angrtvb: "\u22be",
			angrtvbd: "\u299d",
			angsph: "\u2222",
			angst: "\xc5",
			angzarr: "\u237c",
			Aogon: "\u0104",
			aogon: "\u0105",
			Aopf: "\ud835\udd38",
			aopf: "\ud835\udd52",
			apacir: "\u2a6f",
			ap: "\u2248",
			apE: "\u2a70",
			ape: "\u224a",
			apid: "\u224b",
			apos: "'",
			ApplyFunction: "\u2061",
			approx: "\u2248",
			approxeq: "\u224a",
			Aring: "\xc5",
			aring: "\xe5",
			Ascr: "\ud835\udc9c",
			ascr: "\ud835\udcb6",
			Assign: "\u2254",
			ast: "*",
			asymp: "\u2248",
			asympeq: "\u224d",
			Atilde: "\xc3",
			atilde: "\xe3",
			Auml: "\xc4",
			auml: "\xe4",
			awconint: "\u2233",
			awint: "\u2a11",
			backcong: "\u224c",
			backepsilon: "\u03f6",
			backprime: "\u2035",
			backsim: "\u223d",
			backsimeq: "\u22cd",
			Backslash: "\u2216",
			Barv: "\u2ae7",
			barvee: "\u22bd",
			barwed: "\u2305",
			Barwed: "\u2306",
			barwedge: "\u2305",
			bbrk: "\u23b5",
			bbrktbrk: "\u23b6",
			bcong: "\u224c",
			Bcy: "\u0411",
			bcy: "\u0431",
			bdquo: "\u201e",
			becaus: "\u2235",
			because: "\u2235",
			Because: "\u2235",
			bemptyv: "\u29b0",
			bepsi: "\u03f6",
			bernou: "\u212c",
			Bernoullis: "\u212c",
			Beta: "\u0392",
			beta: "\u03b2",
			beth: "\u2136",
			between: "\u226c",
			Bfr: "\ud835\udd05",
			bfr: "\ud835\udd1f",
			bigcap: "\u22c2",
			bigcirc: "\u25ef",
			bigcup: "\u22c3",
			bigodot: "\u2a00",
			bigoplus: "\u2a01",
			bigotimes: "\u2a02",
			bigsqcup: "\u2a06",
			bigstar: "\u2605",
			bigtriangledown: "\u25bd",
			bigtriangleup: "\u25b3",
			biguplus: "\u2a04",
			bigvee: "\u22c1",
			bigwedge: "\u22c0",
			bkarow: "\u290d",
			blacklozenge: "\u29eb",
			blacksquare: "\u25aa",
			blacktriangle: "\u25b4",
			blacktriangledown: "\u25be",
			blacktriangleleft: "\u25c2",
			blacktriangleright: "\u25b8",
			blank: "\u2423",
			blk12: "\u2592",
			blk14: "\u2591",
			blk34: "\u2593",
			block: "\u2588",
			bne: "=\u20e5",
			bnequiv: "\u2261\u20e5",
			bNot: "\u2aed",
			bnot: "\u2310",
			Bopf: "\ud835\udd39",
			bopf: "\ud835\udd53",
			bot: "\u22a5",
			bottom: "\u22a5",
			bowtie: "\u22c8",
			boxbox: "\u29c9",
			boxdl: "\u2510",
			boxdL: "\u2555",
			boxDl: "\u2556",
			boxDL: "\u2557",
			boxdr: "\u250c",
			boxdR: "\u2552",
			boxDr: "\u2553",
			boxDR: "\u2554",
			boxh: "\u2500",
			boxH: "\u2550",
			boxhd: "\u252c",
			boxHd: "\u2564",
			boxhD: "\u2565",
			boxHD: "\u2566",
			boxhu: "\u2534",
			boxHu: "\u2567",
			boxhU: "\u2568",
			boxHU: "\u2569",
			boxminus: "\u229f",
			boxplus: "\u229e",
			boxtimes: "\u22a0",
			boxul: "\u2518",
			boxuL: "\u255b",
			boxUl: "\u255c",
			boxUL: "\u255d",
			boxur: "\u2514",
			boxuR: "\u2558",
			boxUr: "\u2559",
			boxUR: "\u255a",
			boxv: "\u2502",
			boxV: "\u2551",
			boxvh: "\u253c",
			boxvH: "\u256a",
			boxVh: "\u256b",
			boxVH: "\u256c",
			boxvl: "\u2524",
			boxvL: "\u2561",
			boxVl: "\u2562",
			boxVL: "\u2563",
			boxvr: "\u251c",
			boxvR: "\u255e",
			boxVr: "\u255f",
			boxVR: "\u2560",
			bprime: "\u2035",
			breve: "\u02d8",
			Breve: "\u02d8",
			brvbar: "\xa6",
			bscr: "\ud835\udcb7",
			Bscr: "\u212c",
			bsemi: "\u204f",
			bsim: "\u223d",
			bsime: "\u22cd",
			bsolb: "\u29c5",
			bsol: "\\",
			bsolhsub: "\u27c8",
			bull: "\u2022",
			bullet: "\u2022",
			bump: "\u224e",
			bumpE: "\u2aae",
			bumpe: "\u224f",
			Bumpeq: "\u224e",
			bumpeq: "\u224f",
			Cacute: "\u0106",
			cacute: "\u0107",
			capand: "\u2a44",
			capbrcup: "\u2a49",
			capcap: "\u2a4b",
			cap: "\u2229",
			Cap: "\u22d2",
			capcup: "\u2a47",
			capdot: "\u2a40",
			CapitalDifferentialD: "\u2145",
			caps: "\u2229\ufe00",
			caret: "\u2041",
			caron: "\u02c7",
			Cayleys: "\u212d",
			ccaps: "\u2a4d",
			Ccaron: "\u010c",
			ccaron: "\u010d",
			Ccedil: "\xc7",
			ccedil: "\xe7",
			Ccirc: "\u0108",
			ccirc: "\u0109",
			Cconint: "\u2230",
			ccups: "\u2a4c",
			ccupssm: "\u2a50",
			Cdot: "\u010a",
			cdot: "\u010b",
			cedil: "\xb8",
			Cedilla: "\xb8",
			cemptyv: "\u29b2",
			cent: "\xa2",
			centerdot: "\xb7",
			CenterDot: "\xb7",
			cfr: "\ud835\udd20",
			Cfr: "\u212d",
			CHcy: "\u0427",
			chcy: "\u0447",
			check: "\u2713",
			checkmark: "\u2713",
			Chi: "\u03a7",
			chi: "\u03c7",
			circ: "\u02c6",
			circeq: "\u2257",
			circlearrowleft: "\u21ba",
			circlearrowright: "\u21bb",
			circledast: "\u229b",
			circledcirc: "\u229a",
			circleddash: "\u229d",
			CircleDot: "\u2299",
			circledR: "\xae",
			circledS: "\u24c8",
			CircleMinus: "\u2296",
			CirclePlus: "\u2295",
			CircleTimes: "\u2297",
			cir: "\u25cb",
			cirE: "\u29c3",
			cire: "\u2257",
			cirfnint: "\u2a10",
			cirmid: "\u2aef",
			cirscir: "\u29c2",
			ClockwiseContourIntegral: "\u2232",
			CloseCurlyDoubleQuote: "\u201d",
			CloseCurlyQuote: "\u2019",
			clubs: "\u2663",
			clubsuit: "\u2663",
			colon: ":",
			Colon: "\u2237",
			Colone: "\u2a74",
			colone: "\u2254",
			coloneq: "\u2254",
			comma: ",",
			commat: "@",
			comp: "\u2201",
			compfn: "\u2218",
			complement: "\u2201",
			complexes: "\u2102",
			cong: "\u2245",
			congdot: "\u2a6d",
			Congruent: "\u2261",
			conint: "\u222e",
			Conint: "\u222f",
			ContourIntegral: "\u222e",
			copf: "\ud835\udd54",
			Copf: "\u2102",
			coprod: "\u2210",
			Coproduct: "\u2210",
			copy: "\xa9",
			COPY: "\xa9",
			copysr: "\u2117",
			CounterClockwiseContourIntegral: "\u2233",
			crarr: "\u21b5",
			cross: "\u2717",
			Cross: "\u2a2f",
			Cscr: "\ud835\udc9e",
			cscr: "\ud835\udcb8",
			csub: "\u2acf",
			csube: "\u2ad1",
			csup: "\u2ad0",
			csupe: "\u2ad2",
			ctdot: "\u22ef",
			cudarrl: "\u2938",
			cudarrr: "\u2935",
			cuepr: "\u22de",
			cuesc: "\u22df",
			cularr: "\u21b6",
			cularrp: "\u293d",
			cupbrcap: "\u2a48",
			cupcap: "\u2a46",
			CupCap: "\u224d",
			cup: "\u222a",
			Cup: "\u22d3",
			cupcup: "\u2a4a",
			cupdot: "\u228d",
			cupor: "\u2a45",
			cups: "\u222a\ufe00",
			curarr: "\u21b7",
			curarrm: "\u293c",
			curlyeqprec: "\u22de",
			curlyeqsucc: "\u22df",
			curlyvee: "\u22ce",
			curlywedge: "\u22cf",
			curren: "\xa4",
			curvearrowleft: "\u21b6",
			curvearrowright: "\u21b7",
			cuvee: "\u22ce",
			cuwed: "\u22cf",
			cwconint: "\u2232",
			cwint: "\u2231",
			cylcty: "\u232d",
			dagger: "\u2020",
			Dagger: "\u2021",
			daleth: "\u2138",
			darr: "\u2193",
			Darr: "\u21a1",
			dArr: "\u21d3",
			dash: "\u2010",
			Dashv: "\u2ae4",
			dashv: "\u22a3",
			dbkarow: "\u290f",
			dblac: "\u02dd",
			Dcaron: "\u010e",
			dcaron: "\u010f",
			Dcy: "\u0414",
			dcy: "\u0434",
			ddagger: "\u2021",
			ddarr: "\u21ca",
			DD: "\u2145",
			dd: "\u2146",
			DDotrahd: "\u2911",
			ddotseq: "\u2a77",
			deg: "\xb0",
			Del: "\u2207",
			Delta: "\u0394",
			delta: "\u03b4",
			demptyv: "\u29b1",
			dfisht: "\u297f",
			Dfr: "\ud835\udd07",
			dfr: "\ud835\udd21",
			dHar: "\u2965",
			dharl: "\u21c3",
			dharr: "\u21c2",
			DiacriticalAcute: "\xb4",
			DiacriticalDot: "\u02d9",
			DiacriticalDoubleAcute: "\u02dd",
			DiacriticalGrave: "`",
			DiacriticalTilde: "\u02dc",
			diam: "\u22c4",
			diamond: "\u22c4",
			Diamond: "\u22c4",
			diamondsuit: "\u2666",
			diams: "\u2666",
			die: "\xa8",
			DifferentialD: "\u2146",
			digamma: "\u03dd",
			disin: "\u22f2",
			div: "\xf7",
			divide: "\xf7",
			divideontimes: "\u22c7",
			divonx: "\u22c7",
			DJcy: "\u0402",
			djcy: "\u0452",
			dlcorn: "\u231e",
			dlcrop: "\u230d",
			dollar: "$",
			Dopf: "\ud835\udd3b",
			dopf: "\ud835\udd55",
			Dot: "\xa8",
			dot: "\u02d9",
			DotDot: "\u20dc",
			doteq: "\u2250",
			doteqdot: "\u2251",
			DotEqual: "\u2250",
			dotminus: "\u2238",
			dotplus: "\u2214",
			dotsquare: "\u22a1",
			doublebarwedge: "\u2306",
			DoubleContourIntegral: "\u222f",
			DoubleDot: "\xa8",
			DoubleDownArrow: "\u21d3",
			DoubleLeftArrow: "\u21d0",
			DoubleLeftRightArrow: "\u21d4",
			DoubleLeftTee: "\u2ae4",
			DoubleLongLeftArrow: "\u27f8",
			DoubleLongLeftRightArrow: "\u27fa",
			DoubleLongRightArrow: "\u27f9",
			DoubleRightArrow: "\u21d2",
			DoubleRightTee: "\u22a8",
			DoubleUpArrow: "\u21d1",
			DoubleUpDownArrow: "\u21d5",
			DoubleVerticalBar: "\u2225",
			DownArrowBar: "\u2913",
			downarrow: "\u2193",
			DownArrow: "\u2193",
			Downarrow: "\u21d3",
			DownArrowUpArrow: "\u21f5",
			DownBreve: "\u0311",
			downdownarrows: "\u21ca",
			downharpoonleft: "\u21c3",
			downharpoonright: "\u21c2",
			DownLeftRightVector: "\u2950",
			DownLeftTeeVector: "\u295e",
			DownLeftVectorBar: "\u2956",
			DownLeftVector: "\u21bd",
			DownRightTeeVector: "\u295f",
			DownRightVectorBar: "\u2957",
			DownRightVector: "\u21c1",
			DownTeeArrow: "\u21a7",
			DownTee: "\u22a4",
			drbkarow: "\u2910",
			drcorn: "\u231f",
			drcrop: "\u230c",
			Dscr: "\ud835\udc9f",
			dscr: "\ud835\udcb9",
			DScy: "\u0405",
			dscy: "\u0455",
			dsol: "\u29f6",
			Dstrok: "\u0110",
			dstrok: "\u0111",
			dtdot: "\u22f1",
			dtri: "\u25bf",
			dtrif: "\u25be",
			duarr: "\u21f5",
			duhar: "\u296f",
			dwangle: "\u29a6",
			DZcy: "\u040f",
			dzcy: "\u045f",
			dzigrarr: "\u27ff",
			Eacute: "\xc9",
			eacute: "\xe9",
			easter: "\u2a6e",
			Ecaron: "\u011a",
			ecaron: "\u011b",
			Ecirc: "\xca",
			ecirc: "\xea",
			ecir: "\u2256",
			ecolon: "\u2255",
			Ecy: "\u042d",
			ecy: "\u044d",
			eDDot: "\u2a77",
			Edot: "\u0116",
			edot: "\u0117",
			eDot: "\u2251",
			ee: "\u2147",
			efDot: "\u2252",
			Efr: "\ud835\udd08",
			efr: "\ud835\udd22",
			eg: "\u2a9a",
			Egrave: "\xc8",
			egrave: "\xe8",
			egs: "\u2a96",
			egsdot: "\u2a98",
			el: "\u2a99",
			Element: "\u2208",
			elinters: "\u23e7",
			ell: "\u2113",
			els: "\u2a95",
			elsdot: "\u2a97",
			Emacr: "\u0112",
			emacr: "\u0113",
			empty: "\u2205",
			emptyset: "\u2205",
			EmptySmallSquare: "\u25fb",
			emptyv: "\u2205",
			EmptyVerySmallSquare: "\u25ab",
			emsp13: "\u2004",
			emsp14: "\u2005",
			emsp: "\u2003",
			ENG: "\u014a",
			eng: "\u014b",
			ensp: "\u2002",
			Eogon: "\u0118",
			eogon: "\u0119",
			Eopf: "\ud835\udd3c",
			eopf: "\ud835\udd56",
			epar: "\u22d5",
			eparsl: "\u29e3",
			eplus: "\u2a71",
			epsi: "\u03b5",
			Epsilon: "\u0395",
			epsilon: "\u03b5",
			epsiv: "\u03f5",
			eqcirc: "\u2256",
			eqcolon: "\u2255",
			eqsim: "\u2242",
			eqslantgtr: "\u2a96",
			eqslantless: "\u2a95",
			Equal: "\u2a75",
			equals: "=",
			EqualTilde: "\u2242",
			equest: "\u225f",
			Equilibrium: "\u21cc",
			equiv: "\u2261",
			equivDD: "\u2a78",
			eqvparsl: "\u29e5",
			erarr: "\u2971",
			erDot: "\u2253",
			escr: "\u212f",
			Escr: "\u2130",
			esdot: "\u2250",
			Esim: "\u2a73",
			esim: "\u2242",
			Eta: "\u0397",
			eta: "\u03b7",
			ETH: "\xd0",
			eth: "\xf0",
			Euml: "\xcb",
			euml: "\xeb",
			euro: "\u20ac",
			excl: "!",
			exist: "\u2203",
			Exists: "\u2203",
			expectation: "\u2130",
			exponentiale: "\u2147",
			ExponentialE: "\u2147",
			fallingdotseq: "\u2252",
			Fcy: "\u0424",
			fcy: "\u0444",
			female: "\u2640",
			ffilig: "\ufb03",
			fflig: "\ufb00",
			ffllig: "\ufb04",
			Ffr: "\ud835\udd09",
			ffr: "\ud835\udd23",
			filig: "\ufb01",
			FilledSmallSquare: "\u25fc",
			FilledVerySmallSquare: "\u25aa",
			fjlig: "fj",
			flat: "\u266d",
			fllig: "\ufb02",
			fltns: "\u25b1",
			fnof: "\u0192",
			Fopf: "\ud835\udd3d",
			fopf: "\ud835\udd57",
			forall: "\u2200",
			ForAll: "\u2200",
			fork: "\u22d4",
			forkv: "\u2ad9",
			Fouriertrf: "\u2131",
			fpartint: "\u2a0d",
			frac12: "\xbd",
			frac13: "\u2153",
			frac14: "\xbc",
			frac15: "\u2155",
			frac16: "\u2159",
			frac18: "\u215b",
			frac23: "\u2154",
			frac25: "\u2156",
			frac34: "\xbe",
			frac35: "\u2157",
			frac38: "\u215c",
			frac45: "\u2158",
			frac56: "\u215a",
			frac58: "\u215d",
			frac78: "\u215e",
			frasl: "\u2044",
			frown: "\u2322",
			fscr: "\ud835\udcbb",
			Fscr: "\u2131",
			gacute: "\u01f5",
			Gamma: "\u0393",
			gamma: "\u03b3",
			Gammad: "\u03dc",
			gammad: "\u03dd",
			gap: "\u2a86",
			Gbreve: "\u011e",
			gbreve: "\u011f",
			Gcedil: "\u0122",
			Gcirc: "\u011c",
			gcirc: "\u011d",
			Gcy: "\u0413",
			gcy: "\u0433",
			Gdot: "\u0120",
			gdot: "\u0121",
			ge: "\u2265",
			gE: "\u2267",
			gEl: "\u2a8c",
			gel: "\u22db",
			geq: "\u2265",
			geqq: "\u2267",
			geqslant: "\u2a7e",
			gescc: "\u2aa9",
			ges: "\u2a7e",
			gesdot: "\u2a80",
			gesdoto: "\u2a82",
			gesdotol: "\u2a84",
			gesl: "\u22db\ufe00",
			gesles: "\u2a94",
			Gfr: "\ud835\udd0a",
			gfr: "\ud835\udd24",
			gg: "\u226b",
			Gg: "\u22d9",
			ggg: "\u22d9",
			gimel: "\u2137",
			GJcy: "\u0403",
			gjcy: "\u0453",
			gla: "\u2aa5",
			gl: "\u2277",
			glE: "\u2a92",
			glj: "\u2aa4",
			gnap: "\u2a8a",
			gnapprox: "\u2a8a",
			gne: "\u2a88",
			gnE: "\u2269",
			gneq: "\u2a88",
			gneqq: "\u2269",
			gnsim: "\u22e7",
			Gopf: "\ud835\udd3e",
			gopf: "\ud835\udd58",
			grave: "`",
			GreaterEqual: "\u2265",
			GreaterEqualLess: "\u22db",
			GreaterFullEqual: "\u2267",
			GreaterGreater: "\u2aa2",
			GreaterLess: "\u2277",
			GreaterSlantEqual: "\u2a7e",
			GreaterTilde: "\u2273",
			Gscr: "\ud835\udca2",
			gscr: "\u210a",
			gsim: "\u2273",
			gsime: "\u2a8e",
			gsiml: "\u2a90",
			gtcc: "\u2aa7",
			gtcir: "\u2a7a",
			gt: ">",
			GT: ">",
			Gt: "\u226b",
			gtdot: "\u22d7",
			gtlPar: "\u2995",
			gtquest: "\u2a7c",
			gtrapprox: "\u2a86",
			gtrarr: "\u2978",
			gtrdot: "\u22d7",
			gtreqless: "\u22db",
			gtreqqless: "\u2a8c",
			gtrless: "\u2277",
			gtrsim: "\u2273",
			gvertneqq: "\u2269\ufe00",
			gvnE: "\u2269\ufe00",
			Hacek: "\u02c7",
			hairsp: "\u200a",
			half: "\xbd",
			hamilt: "\u210b",
			HARDcy: "\u042a",
			hardcy: "\u044a",
			harrcir: "\u2948",
			harr: "\u2194",
			hArr: "\u21d4",
			harrw: "\u21ad",
			Hat: "^",
			hbar: "\u210f",
			Hcirc: "\u0124",
			hcirc: "\u0125",
			hearts: "\u2665",
			heartsuit: "\u2665",
			hellip: "\u2026",
			hercon: "\u22b9",
			hfr: "\ud835\udd25",
			Hfr: "\u210c",
			HilbertSpace: "\u210b",
			hksearow: "\u2925",
			hkswarow: "\u2926",
			hoarr: "\u21ff",
			homtht: "\u223b",
			hookleftarrow: "\u21a9",
			hookrightarrow: "\u21aa",
			hopf: "\ud835\udd59",
			Hopf: "\u210d",
			horbar: "\u2015",
			HorizontalLine: "\u2500",
			hscr: "\ud835\udcbd",
			Hscr: "\u210b",
			hslash: "\u210f",
			Hstrok: "\u0126",
			hstrok: "\u0127",
			HumpDownHump: "\u224e",
			HumpEqual: "\u224f",
			hybull: "\u2043",
			hyphen: "\u2010",
			Iacute: "\xcd",
			iacute: "\xed",
			ic: "\u2063",
			Icirc: "\xce",
			icirc: "\xee",
			Icy: "\u0418",
			icy: "\u0438",
			Idot: "\u0130",
			IEcy: "\u0415",
			iecy: "\u0435",
			iexcl: "\xa1",
			iff: "\u21d4",
			ifr: "\ud835\udd26",
			Ifr: "\u2111",
			Igrave: "\xcc",
			igrave: "\xec",
			ii: "\u2148",
			iiiint: "\u2a0c",
			iiint: "\u222d",
			iinfin: "\u29dc",
			iiota: "\u2129",
			IJlig: "\u0132",
			ijlig: "\u0133",
			Imacr: "\u012a",
			imacr: "\u012b",
			image: "\u2111",
			ImaginaryI: "\u2148",
			imagline: "\u2110",
			imagpart: "\u2111",
			imath: "\u0131",
			Im: "\u2111",
			imof: "\u22b7",
			imped: "\u01b5",
			Implies: "\u21d2",
			incare: "\u2105",
			in: "\u2208",
			infin: "\u221e",
			infintie: "\u29dd",
			inodot: "\u0131",
			intcal: "\u22ba",
			int: "\u222b",
			Int: "\u222c",
			integers: "\u2124",
			Integral: "\u222b",
			intercal: "\u22ba",
			Intersection: "\u22c2",
			intlarhk: "\u2a17",
			intprod: "\u2a3c",
			InvisibleComma: "\u2063",
			InvisibleTimes: "\u2062",
			IOcy: "\u0401",
			iocy: "\u0451",
			Iogon: "\u012e",
			iogon: "\u012f",
			Iopf: "\ud835\udd40",
			iopf: "\ud835\udd5a",
			Iota: "\u0399",
			iota: "\u03b9",
			iprod: "\u2a3c",
			iquest: "\xbf",
			iscr: "\ud835\udcbe",
			Iscr: "\u2110",
			isin: "\u2208",
			isindot: "\u22f5",
			isinE: "\u22f9",
			isins: "\u22f4",
			isinsv: "\u22f3",
			isinv: "\u2208",
			it: "\u2062",
			Itilde: "\u0128",
			itilde: "\u0129",
			Iukcy: "\u0406",
			iukcy: "\u0456",
			Iuml: "\xcf",
			iuml: "\xef",
			Jcirc: "\u0134",
			jcirc: "\u0135",
			Jcy: "\u0419",
			jcy: "\u0439",
			Jfr: "\ud835\udd0d",
			jfr: "\ud835\udd27",
			jmath: "\u0237",
			Jopf: "\ud835\udd41",
			jopf: "\ud835\udd5b",
			Jscr: "\ud835\udca5",
			jscr: "\ud835\udcbf",
			Jsercy: "\u0408",
			jsercy: "\u0458",
			Jukcy: "\u0404",
			jukcy: "\u0454",
			Kappa: "\u039a",
			kappa: "\u03ba",
			kappav: "\u03f0",
			Kcedil: "\u0136",
			kcedil: "\u0137",
			Kcy: "\u041a",
			kcy: "\u043a",
			Kfr: "\ud835\udd0e",
			kfr: "\ud835\udd28",
			kgreen: "\u0138",
			KHcy: "\u0425",
			khcy: "\u0445",
			KJcy: "\u040c",
			kjcy: "\u045c",
			Kopf: "\ud835\udd42",
			kopf: "\ud835\udd5c",
			Kscr: "\ud835\udca6",
			kscr: "\ud835\udcc0",
			lAarr: "\u21da",
			Lacute: "\u0139",
			lacute: "\u013a",
			laemptyv: "\u29b4",
			lagran: "\u2112",
			Lambda: "\u039b",
			lambda: "\u03bb",
			lang: "\u27e8",
			Lang: "\u27ea",
			langd: "\u2991",
			langle: "\u27e8",
			lap: "\u2a85",
			Laplacetrf: "\u2112",
			laquo: "\xab",
			larrb: "\u21e4",
			larrbfs: "\u291f",
			larr: "\u2190",
			Larr: "\u219e",
			lArr: "\u21d0",
			larrfs: "\u291d",
			larrhk: "\u21a9",
			larrlp: "\u21ab",
			larrpl: "\u2939",
			larrsim: "\u2973",
			larrtl: "\u21a2",
			latail: "\u2919",
			lAtail: "\u291b",
			lat: "\u2aab",
			late: "\u2aad",
			lates: "\u2aad\ufe00",
			lbarr: "\u290c",
			lBarr: "\u290e",
			lbbrk: "\u2772",
			lbrace: "{",
			lbrack: "[",
			lbrke: "\u298b",
			lbrksld: "\u298f",
			lbrkslu: "\u298d",
			Lcaron: "\u013d",
			lcaron: "\u013e",
			Lcedil: "\u013b",
			lcedil: "\u013c",
			lceil: "\u2308",
			lcub: "{",
			Lcy: "\u041b",
			lcy: "\u043b",
			ldca: "\u2936",
			ldquo: "\u201c",
			ldquor: "\u201e",
			ldrdhar: "\u2967",
			ldrushar: "\u294b",
			ldsh: "\u21b2",
			le: "\u2264",
			lE: "\u2266",
			LeftAngleBracket: "\u27e8",
			LeftArrowBar: "\u21e4",
			leftarrow: "\u2190",
			LeftArrow: "\u2190",
			Leftarrow: "\u21d0",
			LeftArrowRightArrow: "\u21c6",
			leftarrowtail: "\u21a2",
			LeftCeiling: "\u2308",
			LeftDoubleBracket: "\u27e6",
			LeftDownTeeVector: "\u2961",
			LeftDownVectorBar: "\u2959",
			LeftDownVector: "\u21c3",
			LeftFloor: "\u230a",
			leftharpoondown: "\u21bd",
			leftharpoonup: "\u21bc",
			leftleftarrows: "\u21c7",
			leftrightarrow: "\u2194",
			LeftRightArrow: "\u2194",
			Leftrightarrow: "\u21d4",
			leftrightarrows: "\u21c6",
			leftrightharpoons: "\u21cb",
			leftrightsquigarrow: "\u21ad",
			LeftRightVector: "\u294e",
			LeftTeeArrow: "\u21a4",
			LeftTee: "\u22a3",
			LeftTeeVector: "\u295a",
			leftthreetimes: "\u22cb",
			LeftTriangleBar: "\u29cf",
			LeftTriangle: "\u22b2",
			LeftTriangleEqual: "\u22b4",
			LeftUpDownVector: "\u2951",
			LeftUpTeeVector: "\u2960",
			LeftUpVectorBar: "\u2958",
			LeftUpVector: "\u21bf",
			LeftVectorBar: "\u2952",
			LeftVector: "\u21bc",
			lEg: "\u2a8b",
			leg: "\u22da",
			leq: "\u2264",
			leqq: "\u2266",
			leqslant: "\u2a7d",
			lescc: "\u2aa8",
			les: "\u2a7d",
			lesdot: "\u2a7f",
			lesdoto: "\u2a81",
			lesdotor: "\u2a83",
			lesg: "\u22da\ufe00",
			lesges: "\u2a93",
			lessapprox: "\u2a85",
			lessdot: "\u22d6",
			lesseqgtr: "\u22da",
			lesseqqgtr: "\u2a8b",
			LessEqualGreater: "\u22da",
			LessFullEqual: "\u2266",
			LessGreater: "\u2276",
			lessgtr: "\u2276",
			LessLess: "\u2aa1",
			lesssim: "\u2272",
			LessSlantEqual: "\u2a7d",
			LessTilde: "\u2272",
			lfisht: "\u297c",
			lfloor: "\u230a",
			Lfr: "\ud835\udd0f",
			lfr: "\ud835\udd29",
			lg: "\u2276",
			lgE: "\u2a91",
			lHar: "\u2962",
			lhard: "\u21bd",
			lharu: "\u21bc",
			lharul: "\u296a",
			lhblk: "\u2584",
			LJcy: "\u0409",
			ljcy: "\u0459",
			llarr: "\u21c7",
			ll: "\u226a",
			Ll: "\u22d8",
			llcorner: "\u231e",
			Lleftarrow: "\u21da",
			llhard: "\u296b",
			lltri: "\u25fa",
			Lmidot: "\u013f",
			lmidot: "\u0140",
			lmoustache: "\u23b0",
			lmoust: "\u23b0",
			lnap: "\u2a89",
			lnapprox: "\u2a89",
			lne: "\u2a87",
			lnE: "\u2268",
			lneq: "\u2a87",
			lneqq: "\u2268",
			lnsim: "\u22e6",
			loang: "\u27ec",
			loarr: "\u21fd",
			lobrk: "\u27e6",
			longleftarrow: "\u27f5",
			LongLeftArrow: "\u27f5",
			Longleftarrow: "\u27f8",
			longleftrightarrow: "\u27f7",
			LongLeftRightArrow: "\u27f7",
			Longleftrightarrow: "\u27fa",
			longmapsto: "\u27fc",
			longrightarrow: "\u27f6",
			LongRightArrow: "\u27f6",
			Longrightarrow: "\u27f9",
			looparrowleft: "\u21ab",
			looparrowright: "\u21ac",
			lopar: "\u2985",
			Lopf: "\ud835\udd43",
			lopf: "\ud835\udd5d",
			loplus: "\u2a2d",
			lotimes: "\u2a34",
			lowast: "\u2217",
			lowbar: "_",
			LowerLeftArrow: "\u2199",
			LowerRightArrow: "\u2198",
			loz: "\u25ca",
			lozenge: "\u25ca",
			lozf: "\u29eb",
			lpar: "(",
			lparlt: "\u2993",
			lrarr: "\u21c6",
			lrcorner: "\u231f",
			lrhar: "\u21cb",
			lrhard: "\u296d",
			lrm: "\u200e",
			lrtri: "\u22bf",
			lsaquo: "\u2039",
			lscr: "\ud835\udcc1",
			Lscr: "\u2112",
			lsh: "\u21b0",
			Lsh: "\u21b0",
			lsim: "\u2272",
			lsime: "\u2a8d",
			lsimg: "\u2a8f",
			lsqb: "[",
			lsquo: "\u2018",
			lsquor: "\u201a",
			Lstrok: "\u0141",
			lstrok: "\u0142",
			ltcc: "\u2aa6",
			ltcir: "\u2a79",
			lt: "<",
			LT: "<",
			Lt: "\u226a",
			ltdot: "\u22d6",
			lthree: "\u22cb",
			ltimes: "\u22c9",
			ltlarr: "\u2976",
			ltquest: "\u2a7b",
			ltri: "\u25c3",
			ltrie: "\u22b4",
			ltrif: "\u25c2",
			ltrPar: "\u2996",
			lurdshar: "\u294a",
			luruhar: "\u2966",
			lvertneqq: "\u2268\ufe00",
			lvnE: "\u2268\ufe00",
			macr: "\xaf",
			male: "\u2642",
			malt: "\u2720",
			maltese: "\u2720",
			Map: "\u2905",
			map: "\u21a6",
			mapsto: "\u21a6",
			mapstodown: "\u21a7",
			mapstoleft: "\u21a4",
			mapstoup: "\u21a5",
			marker: "\u25ae",
			mcomma: "\u2a29",
			Mcy: "\u041c",
			mcy: "\u043c",
			mdash: "\u2014",
			mDDot: "\u223a",
			measuredangle: "\u2221",
			MediumSpace: "\u205f",
			Mellintrf: "\u2133",
			Mfr: "\ud835\udd10",
			mfr: "\ud835\udd2a",
			mho: "\u2127",
			micro: "\xb5",
			midast: "*",
			midcir: "\u2af0",
			mid: "\u2223",
			middot: "\xb7",
			minusb: "\u229f",
			minus: "\u2212",
			minusd: "\u2238",
			minusdu: "\u2a2a",
			MinusPlus: "\u2213",
			mlcp: "\u2adb",
			mldr: "\u2026",
			mnplus: "\u2213",
			models: "\u22a7",
			Mopf: "\ud835\udd44",
			mopf: "\ud835\udd5e",
			mp: "\u2213",
			mscr: "\ud835\udcc2",
			Mscr: "\u2133",
			mstpos: "\u223e",
			Mu: "\u039c",
			mu: "\u03bc",
			multimap: "\u22b8",
			mumap: "\u22b8",
			nabla: "\u2207",
			Nacute: "\u0143",
			nacute: "\u0144",
			nang: "\u2220\u20d2",
			nap: "\u2249",
			napE: "\u2a70\u0338",
			napid: "\u224b\u0338",
			napos: "\u0149",
			napprox: "\u2249",
			natural: "\u266e",
			naturals: "\u2115",
			natur: "\u266e",
			nbsp: "\xa0",
			nbump: "\u224e\u0338",
			nbumpe: "\u224f\u0338",
			ncap: "\u2a43",
			Ncaron: "\u0147",
			ncaron: "\u0148",
			Ncedil: "\u0145",
			ncedil: "\u0146",
			ncong: "\u2247",
			ncongdot: "\u2a6d\u0338",
			ncup: "\u2a42",
			Ncy: "\u041d",
			ncy: "\u043d",
			ndash: "\u2013",
			nearhk: "\u2924",
			nearr: "\u2197",
			neArr: "\u21d7",
			nearrow: "\u2197",
			ne: "\u2260",
			nedot: "\u2250\u0338",
			NegativeMediumSpace: "\u200b",
			NegativeThickSpace: "\u200b",
			NegativeThinSpace: "\u200b",
			NegativeVeryThinSpace: "\u200b",
			nequiv: "\u2262",
			nesear: "\u2928",
			nesim: "\u2242\u0338",
			NestedGreaterGreater: "\u226b",
			NestedLessLess: "\u226a",
			NewLine: "\n",
			nexist: "\u2204",
			nexists: "\u2204",
			Nfr: "\ud835\udd11",
			nfr: "\ud835\udd2b",
			ngE: "\u2267\u0338",
			nge: "\u2271",
			ngeq: "\u2271",
			ngeqq: "\u2267\u0338",
			ngeqslant: "\u2a7e\u0338",
			nges: "\u2a7e\u0338",
			nGg: "\u22d9\u0338",
			ngsim: "\u2275",
			nGt: "\u226b\u20d2",
			ngt: "\u226f",
			ngtr: "\u226f",
			nGtv: "\u226b\u0338",
			nharr: "\u21ae",
			nhArr: "\u21ce",
			nhpar: "\u2af2",
			ni: "\u220b",
			nis: "\u22fc",
			nisd: "\u22fa",
			niv: "\u220b",
			NJcy: "\u040a",
			njcy: "\u045a",
			nlarr: "\u219a",
			nlArr: "\u21cd",
			nldr: "\u2025",
			nlE: "\u2266\u0338",
			nle: "\u2270",
			nleftarrow: "\u219a",
			nLeftarrow: "\u21cd",
			nleftrightarrow: "\u21ae",
			nLeftrightarrow: "\u21ce",
			nleq: "\u2270",
			nleqq: "\u2266\u0338",
			nleqslant: "\u2a7d\u0338",
			nles: "\u2a7d\u0338",
			nless: "\u226e",
			nLl: "\u22d8\u0338",
			nlsim: "\u2274",
			nLt: "\u226a\u20d2",
			nlt: "\u226e",
			nltri: "\u22ea",
			nltrie: "\u22ec",
			nLtv: "\u226a\u0338",
			nmid: "\u2224",
			NoBreak: "\u2060",
			NonBreakingSpace: "\xa0",
			nopf: "\ud835\udd5f",
			Nopf: "\u2115",
			Not: "\u2aec",
			not: "\xac",
			NotCongruent: "\u2262",
			NotCupCap: "\u226d",
			NotDoubleVerticalBar: "\u2226",
			NotElement: "\u2209",
			NotEqual: "\u2260",
			NotEqualTilde: "\u2242\u0338",
			NotExists: "\u2204",
			NotGreater: "\u226f",
			NotGreaterEqual: "\u2271",
			NotGreaterFullEqual: "\u2267\u0338",
			NotGreaterGreater: "\u226b\u0338",
			NotGreaterLess: "\u2279",
			NotGreaterSlantEqual: "\u2a7e\u0338",
			NotGreaterTilde: "\u2275",
			NotHumpDownHump: "\u224e\u0338",
			NotHumpEqual: "\u224f\u0338",
			notin: "\u2209",
			notindot: "\u22f5\u0338",
			notinE: "\u22f9\u0338",
			notinva: "\u2209",
			notinvb: "\u22f7",
			notinvc: "\u22f6",
			NotLeftTriangleBar: "\u29cf\u0338",
			NotLeftTriangle: "\u22ea",
			NotLeftTriangleEqual: "\u22ec",
			NotLess: "\u226e",
			NotLessEqual: "\u2270",
			NotLessGreater: "\u2278",
			NotLessLess: "\u226a\u0338",
			NotLessSlantEqual: "\u2a7d\u0338",
			NotLessTilde: "\u2274",
			NotNestedGreaterGreater: "\u2aa2\u0338",
			NotNestedLessLess: "\u2aa1\u0338",
			notni: "\u220c",
			notniva: "\u220c",
			notnivb: "\u22fe",
			notnivc: "\u22fd",
			NotPrecedes: "\u2280",
			NotPrecedesEqual: "\u2aaf\u0338",
			NotPrecedesSlantEqual: "\u22e0",
			NotReverseElement: "\u220c",
			NotRightTriangleBar: "\u29d0\u0338",
			NotRightTriangle: "\u22eb",
			NotRightTriangleEqual: "\u22ed",
			NotSquareSubset: "\u228f\u0338",
			NotSquareSubsetEqual: "\u22e2",
			NotSquareSuperset: "\u2290\u0338",
			NotSquareSupersetEqual: "\u22e3",
			NotSubset: "\u2282\u20d2",
			NotSubsetEqual: "\u2288",
			NotSucceeds: "\u2281",
			NotSucceedsEqual: "\u2ab0\u0338",
			NotSucceedsSlantEqual: "\u22e1",
			NotSucceedsTilde: "\u227f\u0338",
			NotSuperset: "\u2283\u20d2",
			NotSupersetEqual: "\u2289",
			NotTilde: "\u2241",
			NotTildeEqual: "\u2244",
			NotTildeFullEqual: "\u2247",
			NotTildeTilde: "\u2249",
			NotVerticalBar: "\u2224",
			nparallel: "\u2226",
			npar: "\u2226",
			nparsl: "\u2afd\u20e5",
			npart: "\u2202\u0338",
			npolint: "\u2a14",
			npr: "\u2280",
			nprcue: "\u22e0",
			nprec: "\u2280",
			npreceq: "\u2aaf\u0338",
			npre: "\u2aaf\u0338",
			nrarrc: "\u2933\u0338",
			nrarr: "\u219b",
			nrArr: "\u21cf",
			nrarrw: "\u219d\u0338",
			nrightarrow: "\u219b",
			nRightarrow: "\u21cf",
			nrtri: "\u22eb",
			nrtrie: "\u22ed",
			nsc: "\u2281",
			nsccue: "\u22e1",
			nsce: "\u2ab0\u0338",
			Nscr: "\ud835\udca9",
			nscr: "\ud835\udcc3",
			nshortmid: "\u2224",
			nshortparallel: "\u2226",
			nsim: "\u2241",
			nsime: "\u2244",
			nsimeq: "\u2244",
			nsmid: "\u2224",
			nspar: "\u2226",
			nsqsube: "\u22e2",
			nsqsupe: "\u22e3",
			nsub: "\u2284",
			nsubE: "\u2ac5\u0338",
			nsube: "\u2288",
			nsubset: "\u2282\u20d2",
			nsubseteq: "\u2288",
			nsubseteqq: "\u2ac5\u0338",
			nsucc: "\u2281",
			nsucceq: "\u2ab0\u0338",
			nsup: "\u2285",
			nsupE: "\u2ac6\u0338",
			nsupe: "\u2289",
			nsupset: "\u2283\u20d2",
			nsupseteq: "\u2289",
			nsupseteqq: "\u2ac6\u0338",
			ntgl: "\u2279",
			Ntilde: "\xd1",
			ntilde: "\xf1",
			ntlg: "\u2278",
			ntriangleleft: "\u22ea",
			ntrianglelefteq: "\u22ec",
			ntriangleright: "\u22eb",
			ntrianglerighteq: "\u22ed",
			Nu: "\u039d",
			nu: "\u03bd",
			num: "#",
			numero: "\u2116",
			numsp: "\u2007",
			nvap: "\u224d\u20d2",
			nvdash: "\u22ac",
			nvDash: "\u22ad",
			nVdash: "\u22ae",
			nVDash: "\u22af",
			nvge: "\u2265\u20d2",
			nvgt: ">\u20d2",
			nvHarr: "\u2904",
			nvinfin: "\u29de",
			nvlArr: "\u2902",
			nvle: "\u2264\u20d2",
			nvlt: "<\u20d2",
			nvltrie: "\u22b4\u20d2",
			nvrArr: "\u2903",
			nvrtrie: "\u22b5\u20d2",
			nvsim: "\u223c\u20d2",
			nwarhk: "\u2923",
			nwarr: "\u2196",
			nwArr: "\u21d6",
			nwarrow: "\u2196",
			nwnear: "\u2927",
			Oacute: "\xd3",
			oacute: "\xf3",
			oast: "\u229b",
			Ocirc: "\xd4",
			ocirc: "\xf4",
			ocir: "\u229a",
			Ocy: "\u041e",
			ocy: "\u043e",
			odash: "\u229d",
			Odblac: "\u0150",
			odblac: "\u0151",
			odiv: "\u2a38",
			odot: "\u2299",
			odsold: "\u29bc",
			OElig: "\u0152",
			oelig: "\u0153",
			ofcir: "\u29bf",
			Ofr: "\ud835\udd12",
			ofr: "\ud835\udd2c",
			ogon: "\u02db",
			Ograve: "\xd2",
			ograve: "\xf2",
			ogt: "\u29c1",
			ohbar: "\u29b5",
			ohm: "\u03a9",
			oint: "\u222e",
			olarr: "\u21ba",
			olcir: "\u29be",
			olcross: "\u29bb",
			oline: "\u203e",
			olt: "\u29c0",
			Omacr: "\u014c",
			omacr: "\u014d",
			Omega: "\u03a9",
			omega: "\u03c9",
			Omicron: "\u039f",
			omicron: "\u03bf",
			omid: "\u29b6",
			ominus: "\u2296",
			Oopf: "\ud835\udd46",
			oopf: "\ud835\udd60",
			opar: "\u29b7",
			OpenCurlyDoubleQuote: "\u201c",
			OpenCurlyQuote: "\u2018",
			operp: "\u29b9",
			oplus: "\u2295",
			orarr: "\u21bb",
			Or: "\u2a54",
			or: "\u2228",
			ord: "\u2a5d",
			order: "\u2134",
			orderof: "\u2134",
			ordf: "\xaa",
			ordm: "\xba",
			origof: "\u22b6",
			oror: "\u2a56",
			orslope: "\u2a57",
			orv: "\u2a5b",
			oS: "\u24c8",
			Oscr: "\ud835\udcaa",
			oscr: "\u2134",
			Oslash: "\xd8",
			oslash: "\xf8",
			osol: "\u2298",
			Otilde: "\xd5",
			otilde: "\xf5",
			otimesas: "\u2a36",
			Otimes: "\u2a37",
			otimes: "\u2297",
			Ouml: "\xd6",
			ouml: "\xf6",
			ovbar: "\u233d",
			OverBar: "\u203e",
			OverBrace: "\u23de",
			OverBracket: "\u23b4",
			OverParenthesis: "\u23dc",
			para: "\xb6",
			parallel: "\u2225",
			par: "\u2225",
			parsim: "\u2af3",
			parsl: "\u2afd",
			part: "\u2202",
			PartialD: "\u2202",
			Pcy: "\u041f",
			pcy: "\u043f",
			percnt: "%",
			period: ".",
			permil: "\u2030",
			perp: "\u22a5",
			pertenk: "\u2031",
			Pfr: "\ud835\udd13",
			pfr: "\ud835\udd2d",
			Phi: "\u03a6",
			phi: "\u03c6",
			phiv: "\u03d5",
			phmmat: "\u2133",
			phone: "\u260e",
			Pi: "\u03a0",
			pi: "\u03c0",
			pitchfork: "\u22d4",
			piv: "\u03d6",
			planck: "\u210f",
			planckh: "\u210e",
			plankv: "\u210f",
			plusacir: "\u2a23",
			plusb: "\u229e",
			pluscir: "\u2a22",
			plus: "+",
			plusdo: "\u2214",
			plusdu: "\u2a25",
			pluse: "\u2a72",
			PlusMinus: "\xb1",
			plusmn: "\xb1",
			plussim: "\u2a26",
			plustwo: "\u2a27",
			pm: "\xb1",
			Poincareplane: "\u210c",
			pointint: "\u2a15",
			popf: "\ud835\udd61",
			Popf: "\u2119",
			pound: "\xa3",
			prap: "\u2ab7",
			Pr: "\u2abb",
			pr: "\u227a",
			prcue: "\u227c",
			precapprox: "\u2ab7",
			prec: "\u227a",
			preccurlyeq: "\u227c",
			Precedes: "\u227a",
			PrecedesEqual: "\u2aaf",
			PrecedesSlantEqual: "\u227c",
			PrecedesTilde: "\u227e",
			preceq: "\u2aaf",
			precnapprox: "\u2ab9",
			precneqq: "\u2ab5",
			precnsim: "\u22e8",
			pre: "\u2aaf",
			prE: "\u2ab3",
			precsim: "\u227e",
			prime: "\u2032",
			Prime: "\u2033",
			primes: "\u2119",
			prnap: "\u2ab9",
			prnE: "\u2ab5",
			prnsim: "\u22e8",
			prod: "\u220f",
			Product: "\u220f",
			profalar: "\u232e",
			profline: "\u2312",
			profsurf: "\u2313",
			prop: "\u221d",
			Proportional: "\u221d",
			Proportion: "\u2237",
			propto: "\u221d",
			prsim: "\u227e",
			prurel: "\u22b0",
			Pscr: "\ud835\udcab",
			pscr: "\ud835\udcc5",
			Psi: "\u03a8",
			psi: "\u03c8",
			puncsp: "\u2008",
			Qfr: "\ud835\udd14",
			qfr: "\ud835\udd2e",
			qint: "\u2a0c",
			qopf: "\ud835\udd62",
			Qopf: "\u211a",
			qprime: "\u2057",
			Qscr: "\ud835\udcac",
			qscr: "\ud835\udcc6",
			quaternions: "\u210d",
			quatint: "\u2a16",
			quest: "?",
			questeq: "\u225f",
			quot: '"',
			QUOT: '"',
			rAarr: "\u21db",
			race: "\u223d\u0331",
			Racute: "\u0154",
			racute: "\u0155",
			radic: "\u221a",
			raemptyv: "\u29b3",
			rang: "\u27e9",
			Rang: "\u27eb",
			rangd: "\u2992",
			range: "\u29a5",
			rangle: "\u27e9",
			raquo: "\xbb",
			rarrap: "\u2975",
			rarrb: "\u21e5",
			rarrbfs: "\u2920",
			rarrc: "\u2933",
			rarr: "\u2192",
			Rarr: "\u21a0",
			rArr: "\u21d2",
			rarrfs: "\u291e",
			rarrhk: "\u21aa",
			rarrlp: "\u21ac",
			rarrpl: "\u2945",
			rarrsim: "\u2974",
			Rarrtl: "\u2916",
			rarrtl: "\u21a3",
			rarrw: "\u219d",
			ratail: "\u291a",
			rAtail: "\u291c",
			ratio: "\u2236",
			rationals: "\u211a",
			rbarr: "\u290d",
			rBarr: "\u290f",
			RBarr: "\u2910",
			rbbrk: "\u2773",
			rbrace: "}",
			rbrack: "]",
			rbrke: "\u298c",
			rbrksld: "\u298e",
			rbrkslu: "\u2990",
			Rcaron: "\u0158",
			rcaron: "\u0159",
			Rcedil: "\u0156",
			rcedil: "\u0157",
			rceil: "\u2309",
			rcub: "}",
			Rcy: "\u0420",
			rcy: "\u0440",
			rdca: "\u2937",
			rdldhar: "\u2969",
			rdquo: "\u201d",
			rdquor: "\u201d",
			rdsh: "\u21b3",
			real: "\u211c",
			realine: "\u211b",
			realpart: "\u211c",
			reals: "\u211d",
			Re: "\u211c",
			rect: "\u25ad",
			reg: "\xae",
			REG: "\xae",
			ReverseElement: "\u220b",
			ReverseEquilibrium: "\u21cb",
			ReverseUpEquilibrium: "\u296f",
			rfisht: "\u297d",
			rfloor: "\u230b",
			rfr: "\ud835\udd2f",
			Rfr: "\u211c",
			rHar: "\u2964",
			rhard: "\u21c1",
			rharu: "\u21c0",
			rharul: "\u296c",
			Rho: "\u03a1",
			rho: "\u03c1",
			rhov: "\u03f1",
			RightAngleBracket: "\u27e9",
			RightArrowBar: "\u21e5",
			rightarrow: "\u2192",
			RightArrow: "\u2192",
			Rightarrow: "\u21d2",
			RightArrowLeftArrow: "\u21c4",
			rightarrowtail: "\u21a3",
			RightCeiling: "\u2309",
			RightDoubleBracket: "\u27e7",
			RightDownTeeVector: "\u295d",
			RightDownVectorBar: "\u2955",
			RightDownVector: "\u21c2",
			RightFloor: "\u230b",
			rightharpoondown: "\u21c1",
			rightharpoonup: "\u21c0",
			rightleftarrows: "\u21c4",
			rightleftharpoons: "\u21cc",
			rightrightarrows: "\u21c9",
			rightsquigarrow: "\u219d",
			RightTeeArrow: "\u21a6",
			RightTee: "\u22a2",
			RightTeeVector: "\u295b",
			rightthreetimes: "\u22cc",
			RightTriangleBar: "\u29d0",
			RightTriangle: "\u22b3",
			RightTriangleEqual: "\u22b5",
			RightUpDownVector: "\u294f",
			RightUpTeeVector: "\u295c",
			RightUpVectorBar: "\u2954",
			RightUpVector: "\u21be",
			RightVectorBar: "\u2953",
			RightVector: "\u21c0",
			ring: "\u02da",
			risingdotseq: "\u2253",
			rlarr: "\u21c4",
			rlhar: "\u21cc",
			rlm: "\u200f",
			rmoustache: "\u23b1",
			rmoust: "\u23b1",
			rnmid: "\u2aee",
			roang: "\u27ed",
			roarr: "\u21fe",
			robrk: "\u27e7",
			ropar: "\u2986",
			ropf: "\ud835\udd63",
			Ropf: "\u211d",
			roplus: "\u2a2e",
			rotimes: "\u2a35",
			RoundImplies: "\u2970",
			rpar: ")",
			rpargt: "\u2994",
			rppolint: "\u2a12",
			rrarr: "\u21c9",
			Rrightarrow: "\u21db",
			rsaquo: "\u203a",
			rscr: "\ud835\udcc7",
			Rscr: "\u211b",
			rsh: "\u21b1",
			Rsh: "\u21b1",
			rsqb: "]",
			rsquo: "\u2019",
			rsquor: "\u2019",
			rthree: "\u22cc",
			rtimes: "\u22ca",
			rtri: "\u25b9",
			rtrie: "\u22b5",
			rtrif: "\u25b8",
			rtriltri: "\u29ce",
			RuleDelayed: "\u29f4",
			ruluhar: "\u2968",
			rx: "\u211e",
			Sacute: "\u015a",
			sacute: "\u015b",
			sbquo: "\u201a",
			scap: "\u2ab8",
			Scaron: "\u0160",
			scaron: "\u0161",
			Sc: "\u2abc",
			sc: "\u227b",
			sccue: "\u227d",
			sce: "\u2ab0",
			scE: "\u2ab4",
			Scedil: "\u015e",
			scedil: "\u015f",
			Scirc: "\u015c",
			scirc: "\u015d",
			scnap: "\u2aba",
			scnE: "\u2ab6",
			scnsim: "\u22e9",
			scpolint: "\u2a13",
			scsim: "\u227f",
			Scy: "\u0421",
			scy: "\u0441",
			sdotb: "\u22a1",
			sdot: "\u22c5",
			sdote: "\u2a66",
			searhk: "\u2925",
			searr: "\u2198",
			seArr: "\u21d8",
			searrow: "\u2198",
			sect: "\xa7",
			semi: ";",
			seswar: "\u2929",
			setminus: "\u2216",
			setmn: "\u2216",
			sext: "\u2736",
			Sfr: "\ud835\udd16",
			sfr: "\ud835\udd30",
			sfrown: "\u2322",
			sharp: "\u266f",
			SHCHcy: "\u0429",
			shchcy: "\u0449",
			SHcy: "\u0428",
			shcy: "\u0448",
			ShortDownArrow: "\u2193",
			ShortLeftArrow: "\u2190",
			shortmid: "\u2223",
			shortparallel: "\u2225",
			ShortRightArrow: "\u2192",
			ShortUpArrow: "\u2191",
			shy: "\xad",
			Sigma: "\u03a3",
			sigma: "\u03c3",
			sigmaf: "\u03c2",
			sigmav: "\u03c2",
			sim: "\u223c",
			simdot: "\u2a6a",
			sime: "\u2243",
			simeq: "\u2243",
			simg: "\u2a9e",
			simgE: "\u2aa0",
			siml: "\u2a9d",
			simlE: "\u2a9f",
			simne: "\u2246",
			simplus: "\u2a24",
			simrarr: "\u2972",
			slarr: "\u2190",
			SmallCircle: "\u2218",
			smallsetminus: "\u2216",
			smashp: "\u2a33",
			smeparsl: "\u29e4",
			smid: "\u2223",
			smile: "\u2323",
			smt: "\u2aaa",
			smte: "\u2aac",
			smtes: "\u2aac\ufe00",
			SOFTcy: "\u042c",
			softcy: "\u044c",
			solbar: "\u233f",
			solb: "\u29c4",
			sol: "/",
			Sopf: "\ud835\udd4a",
			sopf: "\ud835\udd64",
			spades: "\u2660",
			spadesuit: "\u2660",
			spar: "\u2225",
			sqcap: "\u2293",
			sqcaps: "\u2293\ufe00",
			sqcup: "\u2294",
			sqcups: "\u2294\ufe00",
			Sqrt: "\u221a",
			sqsub: "\u228f",
			sqsube: "\u2291",
			sqsubset: "\u228f",
			sqsubseteq: "\u2291",
			sqsup: "\u2290",
			sqsupe: "\u2292",
			sqsupset: "\u2290",
			sqsupseteq: "\u2292",
			square: "\u25a1",
			Square: "\u25a1",
			SquareIntersection: "\u2293",
			SquareSubset: "\u228f",
			SquareSubsetEqual: "\u2291",
			SquareSuperset: "\u2290",
			SquareSupersetEqual: "\u2292",
			SquareUnion: "\u2294",
			squarf: "\u25aa",
			squ: "\u25a1",
			squf: "\u25aa",
			srarr: "\u2192",
			Sscr: "\ud835\udcae",
			sscr: "\ud835\udcc8",
			ssetmn: "\u2216",
			ssmile: "\u2323",
			sstarf: "\u22c6",
			Star: "\u22c6",
			star: "\u2606",
			starf: "\u2605",
			straightepsilon: "\u03f5",
			straightphi: "\u03d5",
			strns: "\xaf",
			sub: "\u2282",
			Sub: "\u22d0",
			subdot: "\u2abd",
			subE: "\u2ac5",
			sube: "\u2286",
			subedot: "\u2ac3",
			submult: "\u2ac1",
			subnE: "\u2acb",
			subne: "\u228a",
			subplus: "\u2abf",
			subrarr: "\u2979",
			subset: "\u2282",
			Subset: "\u22d0",
			subseteq: "\u2286",
			subseteqq: "\u2ac5",
			SubsetEqual: "\u2286",
			subsetneq: "\u228a",
			subsetneqq: "\u2acb",
			subsim: "\u2ac7",
			subsub: "\u2ad5",
			subsup: "\u2ad3",
			succapprox: "\u2ab8",
			succ: "\u227b",
			succcurlyeq: "\u227d",
			Succeeds: "\u227b",
			SucceedsEqual: "\u2ab0",
			SucceedsSlantEqual: "\u227d",
			SucceedsTilde: "\u227f",
			succeq: "\u2ab0",
			succnapprox: "\u2aba",
			succneqq: "\u2ab6",
			succnsim: "\u22e9",
			succsim: "\u227f",
			SuchThat: "\u220b",
			sum: "\u2211",
			Sum: "\u2211",
			sung: "\u266a",
			sup1: "\xb9",
			sup2: "\xb2",
			sup3: "\xb3",
			sup: "\u2283",
			Sup: "\u22d1",
			supdot: "\u2abe",
			supdsub: "\u2ad8",
			supE: "\u2ac6",
			supe: "\u2287",
			supedot: "\u2ac4",
			Superset: "\u2283",
			SupersetEqual: "\u2287",
			suphsol: "\u27c9",
			suphsub: "\u2ad7",
			suplarr: "\u297b",
			supmult: "\u2ac2",
			supnE: "\u2acc",
			supne: "\u228b",
			supplus: "\u2ac0",
			supset: "\u2283",
			Supset: "\u22d1",
			supseteq: "\u2287",
			supseteqq: "\u2ac6",
			supsetneq: "\u228b",
			supsetneqq: "\u2acc",
			supsim: "\u2ac8",
			supsub: "\u2ad4",
			supsup: "\u2ad6",
			swarhk: "\u2926",
			swarr: "\u2199",
			swArr: "\u21d9",
			swarrow: "\u2199",
			swnwar: "\u292a",
			szlig: "\xdf",
			Tab: "\t",
			target: "\u2316",
			Tau: "\u03a4",
			tau: "\u03c4",
			tbrk: "\u23b4",
			Tcaron: "\u0164",
			tcaron: "\u0165",
			Tcedil: "\u0162",
			tcedil: "\u0163",
			Tcy: "\u0422",
			tcy: "\u0442",
			tdot: "\u20db",
			telrec: "\u2315",
			Tfr: "\ud835\udd17",
			tfr: "\ud835\udd31",
			there4: "\u2234",
			therefore: "\u2234",
			Therefore: "\u2234",
			Theta: "\u0398",
			theta: "\u03b8",
			thetasym: "\u03d1",
			thetav: "\u03d1",
			thickapprox: "\u2248",
			thicksim: "\u223c",
			ThickSpace: "\u205f\u200a",
			ThinSpace: "\u2009",
			thinsp: "\u2009",
			thkap: "\u2248",
			thksim: "\u223c",
			THORN: "\xde",
			thorn: "\xfe",
			tilde: "\u02dc",
			Tilde: "\u223c",
			TildeEqual: "\u2243",
			TildeFullEqual: "\u2245",
			TildeTilde: "\u2248",
			timesbar: "\u2a31",
			timesb: "\u22a0",
			times: "\xd7",
			timesd: "\u2a30",
			tint: "\u222d",
			toea: "\u2928",
			topbot: "\u2336",
			topcir: "\u2af1",
			top: "\u22a4",
			Topf: "\ud835\udd4b",
			topf: "\ud835\udd65",
			topfork: "\u2ada",
			tosa: "\u2929",
			tprime: "\u2034",
			trade: "\u2122",
			TRADE: "\u2122",
			triangle: "\u25b5",
			triangledown: "\u25bf",
			triangleleft: "\u25c3",
			trianglelefteq: "\u22b4",
			triangleq: "\u225c",
			triangleright: "\u25b9",
			trianglerighteq: "\u22b5",
			tridot: "\u25ec",
			trie: "\u225c",
			triminus: "\u2a3a",
			TripleDot: "\u20db",
			triplus: "\u2a39",
			trisb: "\u29cd",
			tritime: "\u2a3b",
			trpezium: "\u23e2",
			Tscr: "\ud835\udcaf",
			tscr: "\ud835\udcc9",
			TScy: "\u0426",
			tscy: "\u0446",
			TSHcy: "\u040b",
			tshcy: "\u045b",
			Tstrok: "\u0166",
			tstrok: "\u0167",
			twixt: "\u226c",
			twoheadleftarrow: "\u219e",
			twoheadrightarrow: "\u21a0",
			Uacute: "\xda",
			uacute: "\xfa",
			uarr: "\u2191",
			Uarr: "\u219f",
			uArr: "\u21d1",
			Uarrocir: "\u2949",
			Ubrcy: "\u040e",
			ubrcy: "\u045e",
			Ubreve: "\u016c",
			ubreve: "\u016d",
			Ucirc: "\xdb",
			ucirc: "\xfb",
			Ucy: "\u0423",
			ucy: "\u0443",
			udarr: "\u21c5",
			Udblac: "\u0170",
			udblac: "\u0171",
			udhar: "\u296e",
			ufisht: "\u297e",
			Ufr: "\ud835\udd18",
			ufr: "\ud835\udd32",
			Ugrave: "\xd9",
			ugrave: "\xf9",
			uHar: "\u2963",
			uharl: "\u21bf",
			uharr: "\u21be",
			uhblk: "\u2580",
			ulcorn: "\u231c",
			ulcorner: "\u231c",
			ulcrop: "\u230f",
			ultri: "\u25f8",
			Umacr: "\u016a",
			umacr: "\u016b",
			uml: "\xa8",
			UnderBar: "_",
			UnderBrace: "\u23df",
			UnderBracket: "\u23b5",
			UnderParenthesis: "\u23dd",
			Union: "\u22c3",
			UnionPlus: "\u228e",
			Uogon: "\u0172",
			uogon: "\u0173",
			Uopf: "\ud835\udd4c",
			uopf: "\ud835\udd66",
			UpArrowBar: "\u2912",
			uparrow: "\u2191",
			UpArrow: "\u2191",
			Uparrow: "\u21d1",
			UpArrowDownArrow: "\u21c5",
			updownarrow: "\u2195",
			UpDownArrow: "\u2195",
			Updownarrow: "\u21d5",
			UpEquilibrium: "\u296e",
			upharpoonleft: "\u21bf",
			upharpoonright: "\u21be",
			uplus: "\u228e",
			UpperLeftArrow: "\u2196",
			UpperRightArrow: "\u2197",
			upsi: "\u03c5",
			Upsi: "\u03d2",
			upsih: "\u03d2",
			Upsilon: "\u03a5",
			upsilon: "\u03c5",
			UpTeeArrow: "\u21a5",
			UpTee: "\u22a5",
			upuparrows: "\u21c8",
			urcorn: "\u231d",
			urcorner: "\u231d",
			urcrop: "\u230e",
			Uring: "\u016e",
			uring: "\u016f",
			urtri: "\u25f9",
			Uscr: "\ud835\udcb0",
			uscr: "\ud835\udcca",
			utdot: "\u22f0",
			Utilde: "\u0168",
			utilde: "\u0169",
			utri: "\u25b5",
			utrif: "\u25b4",
			uuarr: "\u21c8",
			Uuml: "\xdc",
			uuml: "\xfc",
			uwangle: "\u29a7",
			vangrt: "\u299c",
			varepsilon: "\u03f5",
			varkappa: "\u03f0",
			varnothing: "\u2205",
			varphi: "\u03d5",
			varpi: "\u03d6",
			varpropto: "\u221d",
			varr: "\u2195",
			vArr: "\u21d5",
			varrho: "\u03f1",
			varsigma: "\u03c2",
			varsubsetneq: "\u228a\ufe00",
			varsubsetneqq: "\u2acb\ufe00",
			varsupsetneq: "\u228b\ufe00",
			varsupsetneqq: "\u2acc\ufe00",
			vartheta: "\u03d1",
			vartriangleleft: "\u22b2",
			vartriangleright: "\u22b3",
			vBar: "\u2ae8",
			Vbar: "\u2aeb",
			vBarv: "\u2ae9",
			Vcy: "\u0412",
			vcy: "\u0432",
			vdash: "\u22a2",
			vDash: "\u22a8",
			Vdash: "\u22a9",
			VDash: "\u22ab",
			Vdashl: "\u2ae6",
			veebar: "\u22bb",
			vee: "\u2228",
			Vee: "\u22c1",
			veeeq: "\u225a",
			vellip: "\u22ee",
			verbar: "|",
			Verbar: "\u2016",
			vert: "|",
			Vert: "\u2016",
			VerticalBar: "\u2223",
			VerticalLine: "|",
			VerticalSeparator: "\u2758",
			VerticalTilde: "\u2240",
			VeryThinSpace: "\u200a",
			Vfr: "\ud835\udd19",
			vfr: "\ud835\udd33",
			vltri: "\u22b2",
			vnsub: "\u2282\u20d2",
			vnsup: "\u2283\u20d2",
			Vopf: "\ud835\udd4d",
			vopf: "\ud835\udd67",
			vprop: "\u221d",
			vrtri: "\u22b3",
			Vscr: "\ud835\udcb1",
			vscr: "\ud835\udccb",
			vsubnE: "\u2acb\ufe00",
			vsubne: "\u228a\ufe00",
			vsupnE: "\u2acc\ufe00",
			vsupne: "\u228b\ufe00",
			Vvdash: "\u22aa",
			vzigzag: "\u299a",
			Wcirc: "\u0174",
			wcirc: "\u0175",
			wedbar: "\u2a5f",
			wedge: "\u2227",
			Wedge: "\u22c0",
			wedgeq: "\u2259",
			weierp: "\u2118",
			Wfr: "\ud835\udd1a",
			wfr: "\ud835\udd34",
			Wopf: "\ud835\udd4e",
			wopf: "\ud835\udd68",
			wp: "\u2118",
			wr: "\u2240",
			wreath: "\u2240",
			Wscr: "\ud835\udcb2",
			wscr: "\ud835\udccc",
			xcap: "\u22c2",
			xcirc: "\u25ef",
			xcup: "\u22c3",
			xdtri: "\u25bd",
			Xfr: "\ud835\udd1b",
			xfr: "\ud835\udd35",
			xharr: "\u27f7",
			xhArr: "\u27fa",
			Xi: "\u039e",
			xi: "\u03be",
			xlarr: "\u27f5",
			xlArr: "\u27f8",
			xmap: "\u27fc",
			xnis: "\u22fb",
			xodot: "\u2a00",
			Xopf: "\ud835\udd4f",
			xopf: "\ud835\udd69",
			xoplus: "\u2a01",
			xotime: "\u2a02",
			xrarr: "\u27f6",
			xrArr: "\u27f9",
			Xscr: "\ud835\udcb3",
			xscr: "\ud835\udccd",
			xsqcup: "\u2a06",
			xuplus: "\u2a04",
			xutri: "\u25b3",
			xvee: "\u22c1",
			xwedge: "\u22c0",
			Yacute: "\xdd",
			yacute: "\xfd",
			YAcy: "\u042f",
			yacy: "\u044f",
			Ycirc: "\u0176",
			ycirc: "\u0177",
			Ycy: "\u042b",
			ycy: "\u044b",
			yen: "\xa5",
			Yfr: "\ud835\udd1c",
			yfr: "\ud835\udd36",
			YIcy: "\u0407",
			yicy: "\u0457",
			Yopf: "\ud835\udd50",
			yopf: "\ud835\udd6a",
			Yscr: "\ud835\udcb4",
			yscr: "\ud835\udcce",
			YUcy: "\u042e",
			yucy: "\u044e",
			yuml: "\xff",
			Yuml: "\u0178",
			Zacute: "\u0179",
			zacute: "\u017a",
			Zcaron: "\u017d",
			zcaron: "\u017e",
			Zcy: "\u0417",
			zcy: "\u0437",
			Zdot: "\u017b",
			zdot: "\u017c",
			zeetrf: "\u2128",
			ZeroWidthSpace: "\u200b",
			Zeta: "\u0396",
			zeta: "\u03b6",
			zfr: "\ud835\udd37",
			Zfr: "\u2128",
			ZHcy: "\u0416",
			zhcy: "\u0436",
			zigrarr: "\u21dd",
			zopf: "\ud835\udd6b",
			Zopf: "\u2124",
			Zscr: "\ud835\udcb5",
			zscr: "\ud835\udccf",
			zwj: "\u200d",
			zwnj: "\u200c",
		},
		t =
			/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,
		n = {};
	function s(e, r, t) {
		var o,
			i,
			a,
			c,
			l,
			u = "";
		for (
			"string" != typeof r && ((t = r), (r = s.defaultChars)),
				void 0 === t && (t = !0),
				l = (function (e) {
					var r,
						t,
						s = n[e];
					if (s) return s;
					for (s = n[e] = [], r = 0; r < 128; r++)
						(t = String.fromCharCode(r)),
							/^[0-9a-z]$/i.test(t)
								? s.push(t)
								: s.push("%" + ("0" + r.toString(16).toUpperCase()).slice(-2));
					for (r = 0; r < e.length; r++) s[e.charCodeAt(r)] = e[r];
					return s;
				})(r),
				o = 0,
				i = e.length;
			o < i;
			o++
		)
			if (
				((a = e.charCodeAt(o)),
				t &&
					37 === a &&
					o + 2 < i &&
					/^[0-9a-f]{2}$/i.test(e.slice(o + 1, o + 3)))
			)
				(u += e.slice(o, o + 3)), (o += 2);
			else if (a < 128) u += l[a];
			else if (a >= 55296 && a <= 57343) {
				if (
					a >= 55296 &&
					a <= 56319 &&
					o + 1 < i &&
					(c = e.charCodeAt(o + 1)) >= 56320 &&
					c <= 57343
				) {
					(u += encodeURIComponent(e[o] + e[o + 1])), o++;
					continue;
				}
				u += "%EF%BF%BD";
			} else u += encodeURIComponent(e[o]);
		return u;
	}
	(s.defaultChars = ";/?:@&=+$,-_.!~*'()#"), (s.componentChars = "-_.!~*'()");
	var o = s,
		i = {};
	function a(e, r) {
		var t;
		return (
			"string" != typeof r && (r = a.defaultChars),
			(t = (function (e) {
				var r,
					t,
					n = i[e];
				if (n) return n;
				for (n = i[e] = [], r = 0; r < 128; r++)
					(t = String.fromCharCode(r)), n.push(t);
				for (r = 0; r < e.length; r++)
					n[(t = e.charCodeAt(r))] =
						"%" + ("0" + t.toString(16).toUpperCase()).slice(-2);
				return n;
			})(r)),
			e.replace(/(%[a-f0-9]{2})+/gi, function (e) {
				var r,
					n,
					s,
					o,
					i,
					a,
					c,
					l = "";
				for (r = 0, n = e.length; r < n; r += 3)
					(s = parseInt(e.slice(r + 1, r + 3), 16)) < 128
						? (l += t[s])
						: 192 == (224 & s) &&
							  r + 3 < n &&
							  128 == (192 & (o = parseInt(e.slice(r + 4, r + 6), 16)))
							? ((l +=
									(c = ((s << 6) & 1984) | (63 & o)) < 128
										? "\ufffd\ufffd"
										: String.fromCharCode(c)),
								(r += 3))
							: 224 == (240 & s) &&
								  r + 6 < n &&
								  ((o = parseInt(e.slice(r + 4, r + 6), 16)),
								  (i = parseInt(e.slice(r + 7, r + 9), 16)),
								  128 == (192 & o) && 128 == (192 & i))
								? ((l +=
										(c = ((s << 12) & 61440) | ((o << 6) & 4032) | (63 & i)) <
											2048 ||
										(c >= 55296 && c <= 57343)
											? "\ufffd\ufffd\ufffd"
											: String.fromCharCode(c)),
									(r += 6))
								: 240 == (248 & s) &&
									  r + 9 < n &&
									  ((o = parseInt(e.slice(r + 4, r + 6), 16)),
									  (i = parseInt(e.slice(r + 7, r + 9), 16)),
									  (a = parseInt(e.slice(r + 10, r + 12), 16)),
									  128 == (192 & o) && 128 == (192 & i) && 128 == (192 & a))
									? ((c =
											((s << 18) & 1835008) |
											((o << 12) & 258048) |
											((i << 6) & 4032) |
											(63 & a)) < 65536 || c > 1114111
											? (l += "\ufffd\ufffd\ufffd\ufffd")
											: ((c -= 65536),
												(l += String.fromCharCode(
													55296 + (c >> 10),
													56320 + (1023 & c),
												))),
										(r += 9))
									: (l += "\ufffd");
				return l;
			})
		);
	}
	(a.defaultChars = ";/?:@&=+$,#"), (a.componentChars = "");
	var c = a;
	function l() {
		(this.protocol = null),
			(this.slashes = null),
			(this.auth = null),
			(this.port = null),
			(this.hostname = null),
			(this.hash = null),
			(this.search = null),
			(this.pathname = null);
	}
	var u = /^([a-z0-9.+-]+:)/i,
		p = /:[0-9]*$/,
		h = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
		f = ["{", "}", "|", "\\", "^", "`"].concat([
			"<",
			">",
			'"',
			"`",
			" ",
			"\r",
			"\n",
			"\t",
		]),
		d = ["'"].concat(f),
		m = ["%", "/", "?", ";", "#"].concat(d),
		g = ["/", "?", "#"],
		_ = /^[+a-z0-9A-Z_-]{0,63}$/,
		k = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
		b = { javascript: !0, "javascript:": !0 },
		v = {
			http: !0,
			https: !0,
			ftp: !0,
			gopher: !0,
			file: !0,
			"http:": !0,
			"https:": !0,
			"ftp:": !0,
			"gopher:": !0,
			"file:": !0,
		};
	(l.prototype.parse = function (e, r) {
		var t,
			n,
			s,
			o,
			i,
			a = e;
		if (((a = a.trim()), !r && 1 === e.split("#").length)) {
			var c = h.exec(a);
			if (c) return (this.pathname = c[1]), c[2] && (this.search = c[2]), this;
		}
		var l = u.exec(a);
		if (
			(l &&
				((s = (l = l[0]).toLowerCase()),
				(this.protocol = l),
				(a = a.substr(l.length))),
			(r || l || a.match(/^\/\/[^@\/]+@[^@\/]+/)) &&
				(!(i = "//" === a.substr(0, 2)) ||
					(l && b[l]) ||
					((a = a.substr(2)), (this.slashes = !0))),
			!b[l] && (i || (l && !v[l])))
		) {
			var p,
				f,
				d = -1;
			for (t = 0; t < g.length; t++)
				-1 !== (o = a.indexOf(g[t])) && (-1 === d || o < d) && (d = o);
			for (
				-1 !== (f = -1 === d ? a.lastIndexOf("@") : a.lastIndexOf("@", d)) &&
					((p = a.slice(0, f)), (a = a.slice(f + 1)), (this.auth = p)),
					d = -1,
					t = 0;
				t < m.length;
				t++
			)
				-1 !== (o = a.indexOf(m[t])) && (-1 === d || o < d) && (d = o);
			-1 === d && (d = a.length), ":" === a[d - 1] && d--;
			var C = a.slice(0, d);
			(a = a.slice(d)),
				this.parseHost(C),
				(this.hostname = this.hostname || "");
			var y =
				"[" === this.hostname[0] &&
				"]" === this.hostname[this.hostname.length - 1];
			if (!y) {
				var A = this.hostname.split(/\./);
				for (t = 0, n = A.length; t < n; t++) {
					var x = A[t];
					if (x && !x.match(_)) {
						for (var D = "", w = 0, E = x.length; w < E; w++)
							x.charCodeAt(w) > 127 ? (D += "x") : (D += x[w]);
						if (!D.match(_)) {
							var q = A.slice(0, t),
								S = A.slice(t + 1),
								F = x.match(k);
							F && (q.push(F[1]), S.unshift(F[2])),
								S.length && (a = S.join(".") + a),
								(this.hostname = q.join("."));
							break;
						}
					}
				}
			}
			this.hostname.length > 255 && (this.hostname = ""),
				y &&
					(this.hostname = this.hostname.substr(1, this.hostname.length - 2));
		}
		var L = a.indexOf("#");
		-1 !== L && ((this.hash = a.substr(L)), (a = a.slice(0, L)));
		var z = a.indexOf("?");
		return (
			-1 !== z && ((this.search = a.substr(z)), (a = a.slice(0, z))),
			a && (this.pathname = a),
			v[s] && this.hostname && !this.pathname && (this.pathname = ""),
			this
		);
	}),
		(l.prototype.parseHost = function (e) {
			var r = p.exec(e);
			r &&
				(":" !== (r = r[0]) && (this.port = r.substr(1)),
				(e = e.substr(0, e.length - r.length))),
				e && (this.hostname = e);
		});
	var C = {
			encode: o,
			decode: c,
			format: function (e) {
				var r = "";
				return (
					(r += e.protocol || ""),
					(r += e.slashes ? "//" : ""),
					(r += e.auth ? e.auth + "@" : ""),
					e.hostname && -1 !== e.hostname.indexOf(":")
						? (r += "[" + e.hostname + "]")
						: (r += e.hostname || ""),
					(r += e.port ? ":" + e.port : ""),
					(r += e.pathname || ""),
					(r += e.search || ""),
					(r += e.hash || "")
				);
			},
			parse: function (e, r) {
				if (e && e instanceof l) return e;
				var t = new l();
				return t.parse(e, r), t;
			},
		},
		y =
			/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
		A = /[\0-\x1F\x7F-\x9F]/,
		x = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
		D = {
			Any: y,
			Cc: A,
			Cf: /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,
			P: t,
			Z: x,
		},
		w = (function (e, r, t) {
			return (
				(t = {
					path: r,
					exports: {},
					require: function (e, r) {
						return (function () {
							throw new Error(
								"Dynamic requires are not currently supported by @rollup/plugin-commonjs",
							);
						})(null == r && t.path);
					},
				}),
				e(t, t.exports),
				t.exports
			);
		})(function (e, n) {
			var s = Object.prototype.hasOwnProperty;
			function o(e, r) {
				return s.call(e, r);
			}
			function i(e) {
				return (
					!(e >= 55296 && e <= 57343) &&
					!(e >= 64976 && e <= 65007) &&
					65535 != (65535 & e) &&
					65534 != (65535 & e) &&
					!(e >= 0 && e <= 8) &&
					11 !== e &&
					!(e >= 14 && e <= 31) &&
					!(e >= 127 && e <= 159) &&
					!(e > 1114111)
				);
			}
			function a(e) {
				if (e > 65535) {
					var r = 55296 + ((e -= 65536) >> 10),
						t = 56320 + (1023 & e);
					return String.fromCharCode(r, t);
				}
				return String.fromCharCode(e);
			}
			var c = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,
				l = new RegExp(
					c.source + "|" + /&([a-z#][a-z0-9]{1,31});/gi.source,
					"gi",
				),
				u = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
			var p = /[&<>"]/,
				h = /[&<>"]/g,
				f = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
			function d(e) {
				return f[e];
			}
			var m = /[.?*+^$[\]\\(){}|-]/g;
			(n.lib = {}),
				(n.lib.mdurl = C),
				(n.lib.ucmicro = D),
				(n.assign = function (e) {
					var r = Array.prototype.slice.call(arguments, 1);
					return (
						r.forEach(function (r) {
							if (r) {
								if ("object" != typeof r)
									throw new TypeError(r + "must be object");
								Object.keys(r).forEach(function (t) {
									e[t] = r[t];
								});
							}
						}),
						e
					);
				}),
				(n.isString = function (e) {
					return (
						"[object String]" ===
						(function (e) {
							return Object.prototype.toString.call(e);
						})(e)
					);
				}),
				(n.has = o),
				(n.unescapeMd = function (e) {
					return e.indexOf("\\") < 0 ? e : e.replace(c, "$1");
				}),
				(n.unescapeAll = function (e) {
					return e.indexOf("\\") < 0 && e.indexOf("&") < 0
						? e
						: e.replace(l, function (e, t, n) {
								return (
									t ||
									(function (e, t) {
										var n = 0;
										return o(r, t)
											? r[t]
											: 35 === t.charCodeAt(0) &&
												  u.test(t) &&
												  i(
														(n =
															"x" === t[1].toLowerCase()
																? parseInt(t.slice(2), 16)
																: parseInt(t.slice(1), 10)),
												  )
												? a(n)
												: e;
									})(e, n)
								);
							});
				}),
				(n.isValidEntityCode = i),
				(n.fromCodePoint = a),
				(n.escapeHtml = function (e) {
					return p.test(e) ? e.replace(h, d) : e;
				}),
				(n.arrayReplaceAt = function (e, r, t) {
					return [].concat(e.slice(0, r), t, e.slice(r + 1));
				}),
				(n.isSpace = function (e) {
					switch (e) {
						case 9:
						case 32:
							return !0;
					}
					return !1;
				}),
				(n.isWhiteSpace = function (e) {
					if (e >= 8192 && e <= 8202) return !0;
					switch (e) {
						case 9:
						case 10:
						case 11:
						case 12:
						case 13:
						case 32:
						case 160:
						case 5760:
						case 8239:
						case 8287:
						case 12288:
							return !0;
					}
					return !1;
				}),
				(n.isMdAsciiPunct = function (e) {
					switch (e) {
						case 33:
						case 34:
						case 35:
						case 36:
						case 37:
						case 38:
						case 39:
						case 40:
						case 41:
						case 42:
						case 43:
						case 44:
						case 45:
						case 46:
						case 47:
						case 58:
						case 59:
						case 60:
						case 61:
						case 62:
						case 63:
						case 64:
						case 91:
						case 92:
						case 93:
						case 94:
						case 95:
						case 96:
						case 123:
						case 124:
						case 125:
						case 126:
							return !0;
						default:
							return !1;
					}
				}),
				(n.isPunctChar = function (e) {
					return t.test(e);
				}),
				(n.escapeRE = function (e) {
					return e.replace(m, "\\$&");
				}),
				(n.normalizeReference = function (e) {
					return (
						(e = e.trim().replace(/\s+/g, " ")),
						"\u1e7e" === "\u1e9e".toLowerCase() &&
							(e = e.replace(/\u1e9e/g, "\xdf")),
						e.toLowerCase().toUpperCase()
					);
				});
		}),
		E = w.unescapeAll,
		q = w.unescapeAll,
		S = function (e, r, t) {
			var n,
				s,
				o = r,
				i = { ok: !1, pos: 0, lines: 0, str: "" };
			if (60 === e.charCodeAt(r)) {
				for (r++; r < t; ) {
					if (10 === (n = e.charCodeAt(r))) return i;
					if (60 === n) return i;
					if (62 === n)
						return (
							(i.pos = r + 1), (i.str = E(e.slice(o + 1, r))), (i.ok = !0), i
						);
					92 === n && r + 1 < t ? (r += 2) : r++;
				}
				return i;
			}
			for (
				s = 0;
				r < t && 32 !== (n = e.charCodeAt(r)) && !(n < 32 || 127 === n);

			)
				if (92 === n && r + 1 < t) {
					if (32 === e.charCodeAt(r + 1)) break;
					r += 2;
				} else {
					if (40 === n && ++s > 32) return i;
					if (41 === n) {
						if (0 === s) break;
						s--;
					}
					r++;
				}
			return (
				o === r ||
					0 !== s ||
					((i.str = E(e.slice(o, r))), (i.lines = 0), (i.pos = r), (i.ok = !0)),
				i
			);
		},
		F = function (e, r, t) {
			var n,
				s,
				o = 0,
				i = r,
				a = { ok: !1, pos: 0, lines: 0, str: "" };
			if (r >= t) return a;
			if (34 !== (s = e.charCodeAt(r)) && 39 !== s && 40 !== s) return a;
			for (r++, 40 === s && (s = 41); r < t; ) {
				if ((n = e.charCodeAt(r)) === s)
					return (
						(a.pos = r + 1),
						(a.lines = o),
						(a.str = q(e.slice(i + 1, r))),
						(a.ok = !0),
						a
					);
				if (40 === n && 41 === s) return a;
				10 === n
					? o++
					: 92 === n && r + 1 < t && (r++, 10 === e.charCodeAt(r) && o++),
					r++;
			}
			return a;
		},
		L = {
			parseLinkLabel: function (e, r, t) {
				var n,
					s,
					o,
					i,
					a = -1,
					c = e.posMax,
					l = e.pos;
				for (e.pos = r + 1, n = 1; e.pos < c; ) {
					if (93 === (o = e.src.charCodeAt(e.pos)) && 0 === --n) {
						s = !0;
						break;
					}
					if (((i = e.pos), e.md.inline.skipToken(e), 91 === o))
						if (i === e.pos - 1) n++;
						else if (t) return (e.pos = l), -1;
				}
				return s && (a = e.pos), (e.pos = l), a;
			},
			parseLinkDestination: S,
			parseLinkTitle: F,
		},
		z = w.assign,
		T = w.unescapeAll,
		I = w.escapeHtml,
		M = {};
	function R() {
		this.rules = z({}, M);
	}
	(M.code_inline = function (e, r, t, n, s) {
		var o = e[r];
		return "<code" + s.renderAttrs(o) + ">" + I(e[r].content) + "</code>";
	}),
		(M.code_block = function (e, r, t, n, s) {
			var o = e[r];
			return (
				"<pre" +
				s.renderAttrs(o) +
				"><code>" +
				I(e[r].content) +
				"</code></pre>\n"
			);
		}),
		(M.fence = function (e, r, t, n, s) {
			var o,
				i,
				a,
				c,
				l,
				u = e[r],
				p = u.info ? T(u.info).trim() : "",
				h = "",
				f = "";
			return (
				p && ((h = (a = p.split(/(\s+)/g))[0]), (f = a.slice(2).join(""))),
				0 ===
				(o =
					(t.highlight && t.highlight(u.content, h, f)) ||
					I(u.content)).indexOf("<pre")
					? o + "\n"
					: p
						? ((i = u.attrIndex("class")),
							(c = u.attrs ? u.attrs.slice() : []),
							i < 0
								? c.push(["class", t.langPrefix + h])
								: ((c[i] = c[i].slice()), (c[i][1] += " " + t.langPrefix + h)),
							(l = { attrs: c }),
							"<pre><code" + s.renderAttrs(l) + ">" + o + "</code></pre>\n")
						: "<pre><code" + s.renderAttrs(u) + ">" + o + "</code></pre>\n"
			);
		}),
		(M.image = function (e, r, t, n, s) {
			var o = e[r];
			return (
				(o.attrs[o.attrIndex("alt")][1] = s.renderInlineAsText(
					o.children,
					t,
					n,
				)),
				s.renderToken(e, r, t)
			);
		}),
		(M.hardbreak = function (e, r, t) {
			return t.xhtmlOut ? "<br />\n" : "<br>\n";
		}),
		(M.softbreak = function (e, r, t) {
			return t.breaks ? (t.xhtmlOut ? "<br />\n" : "<br>\n") : "\n";
		}),
		(M.text = function (e, r) {
			return I(e[r].content);
		}),
		(M.html_block = function (e, r) {
			return e[r].content;
		}),
		(M.html_inline = function (e, r) {
			return e[r].content;
		}),
		(R.prototype.renderAttrs = function (e) {
			var r, t, n;
			if (!e.attrs) return "";
			for (n = "", r = 0, t = e.attrs.length; r < t; r++)
				n += " " + I(e.attrs[r][0]) + '="' + I(e.attrs[r][1]) + '"';
			return n;
		}),
		(R.prototype.renderToken = function (e, r, t) {
			var n,
				s = "",
				o = !1,
				i = e[r];
			return i.hidden
				? ""
				: (i.block && -1 !== i.nesting && r && e[r - 1].hidden && (s += "\n"),
					(s += (-1 === i.nesting ? "</" : "<") + i.tag),
					(s += this.renderAttrs(i)),
					0 === i.nesting && t.xhtmlOut && (s += " /"),
					i.block &&
						((o = !0),
						1 === i.nesting &&
							r + 1 < e.length &&
							("inline" === (n = e[r + 1]).type ||
								n.hidden ||
								(-1 === n.nesting && n.tag === i.tag)) &&
							(o = !1)),
					(s += o ? ">\n" : ">"));
		}),
		(R.prototype.renderInline = function (e, r, t) {
			for (var n, s = "", o = this.rules, i = 0, a = e.length; i < a; i++)
				void 0 !== o[(n = e[i].type)]
					? (s += o[n](e, i, r, t, this))
					: (s += this.renderToken(e, i, r));
			return s;
		}),
		(R.prototype.renderInlineAsText = function (e, r, t) {
			for (var n = "", s = 0, o = e.length; s < o; s++)
				"text" === e[s].type
					? (n += e[s].content)
					: "image" === e[s].type
						? (n += this.renderInlineAsText(e[s].children, r, t))
						: "softbreak" === e[s].type && (n += "\n");
			return n;
		}),
		(R.prototype.render = function (e, r, t) {
			var n,
				s,
				o,
				i = "",
				a = this.rules;
			for (n = 0, s = e.length; n < s; n++)
				"inline" === (o = e[n].type)
					? (i += this.renderInline(e[n].children, r, t))
					: void 0 !== a[o]
						? (i += a[e[n].type](e, n, r, t, this))
						: (i += this.renderToken(e, n, r, t));
			return i;
		});
	var B = R;
	function N() {
		(this.__rules__ = []), (this.__cache__ = null);
	}
	(N.prototype.__find__ = function (e) {
		for (var r = 0; r < this.__rules__.length; r++)
			if (this.__rules__[r].name === e) return r;
		return -1;
	}),
		(N.prototype.__compile__ = function () {
			var e = this,
				r = [""];
			e.__rules__.forEach(function (e) {
				e.enabled &&
					e.alt.forEach(function (e) {
						r.indexOf(e) < 0 && r.push(e);
					});
			}),
				(e.__cache__ = {}),
				r.forEach(function (r) {
					(e.__cache__[r] = []),
						e.__rules__.forEach(function (t) {
							t.enabled &&
								((r && t.alt.indexOf(r) < 0) || e.__cache__[r].push(t.fn));
						});
				});
		}),
		(N.prototype.at = function (e, r, t) {
			var n = this.__find__(e),
				s = t || {};
			if (-1 === n) throw new Error("Parser rule not found: " + e);
			(this.__rules__[n].fn = r),
				(this.__rules__[n].alt = s.alt || []),
				(this.__cache__ = null);
		}),
		(N.prototype.before = function (e, r, t, n) {
			var s = this.__find__(e),
				o = n || {};
			if (-1 === s) throw new Error("Parser rule not found: " + e);
			this.__rules__.splice(s, 0, {
				name: r,
				enabled: !0,
				fn: t,
				alt: o.alt || [],
			}),
				(this.__cache__ = null);
		}),
		(N.prototype.after = function (e, r, t, n) {
			var s = this.__find__(e),
				o = n || {};
			if (-1 === s) throw new Error("Parser rule not found: " + e);
			this.__rules__.splice(s + 1, 0, {
				name: r,
				enabled: !0,
				fn: t,
				alt: o.alt || [],
			}),
				(this.__cache__ = null);
		}),
		(N.prototype.push = function (e, r, t) {
			var n = t || {};
			this.__rules__.push({ name: e, enabled: !0, fn: r, alt: n.alt || [] }),
				(this.__cache__ = null);
		}),
		(N.prototype.enable = function (e, r) {
			Array.isArray(e) || (e = [e]);
			var t = [];
			return (
				e.forEach(function (e) {
					var n = this.__find__(e);
					if (n < 0) {
						if (r) return;
						throw new Error("Rules manager: invalid rule name " + e);
					}
					(this.__rules__[n].enabled = !0), t.push(e);
				}, this),
				(this.__cache__ = null),
				t
			);
		}),
		(N.prototype.enableOnly = function (e, r) {
			Array.isArray(e) || (e = [e]),
				this.__rules__.forEach(function (e) {
					e.enabled = !1;
				}),
				this.enable(e, r);
		}),
		(N.prototype.disable = function (e, r) {
			Array.isArray(e) || (e = [e]);
			var t = [];
			return (
				e.forEach(function (e) {
					var n = this.__find__(e);
					if (n < 0) {
						if (r) return;
						throw new Error("Rules manager: invalid rule name " + e);
					}
					(this.__rules__[n].enabled = !1), t.push(e);
				}, this),
				(this.__cache__ = null),
				t
			);
		}),
		(N.prototype.getRules = function (e) {
			return (
				null === this.__cache__ && this.__compile__(), this.__cache__[e] || []
			);
		});
	var O = N,
		P = /\r\n?|\n/g,
		j = /\0/g,
		U = w.arrayReplaceAt;
	function V(e) {
		return /^<\/a\s*>/i.test(e);
	}
	var Z = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
		$ = /\((c|tm|r)\)/i,
		G = /\((c|tm|r)\)/gi,
		H = { c: "\xa9", r: "\xae", tm: "\u2122" };
	function J(e, r) {
		return H[r.toLowerCase()];
	}
	function W(e) {
		var r,
			t,
			n = 0;
		for (r = e.length - 1; r >= 0; r--)
			"text" !== (t = e[r]).type || n || (t.content = t.content.replace(G, J)),
				"link_open" === t.type && "auto" === t.info && n--,
				"link_close" === t.type && "auto" === t.info && n++;
	}
	function Y(e) {
		var r,
			t,
			n = 0;
		for (r = e.length - 1; r >= 0; r--)
			"text" !== (t = e[r]).type ||
				n ||
				(Z.test(t.content) &&
					(t.content = t.content
						.replace(/\+-/g, "\xb1")
						.replace(/\.{2,}/g, "\u2026")
						.replace(/([?!])\u2026/g, "$1..")
						.replace(/([?!]){4,}/g, "$1$1$1")
						.replace(/,{2,}/g, ",")
						.replace(/(^|[^-])---(?=[^-]|$)/gm, "$1\u2014")
						.replace(/(^|\s)--(?=\s|$)/gm, "$1\u2013")
						.replace(/(^|[^-\s])--(?=[^-\s]|$)/gm, "$1\u2013"))),
				"link_open" === t.type && "auto" === t.info && n--,
				"link_close" === t.type && "auto" === t.info && n++;
	}
	var K = w.isWhiteSpace,
		Q = w.isPunctChar,
		X = w.isMdAsciiPunct,
		ee = /['"]/,
		re = /['"]/g;
	function te(e, r, t) {
		return e.slice(0, r) + t + e.slice(r + 1);
	}
	function ne(e, r) {
		var t, n, s, o, i, a, c, l, u, p, h, f, d, m, g, _, k, b, v, C, y;
		for (v = [], t = 0; t < e.length; t++) {
			for (
				n = e[t], c = e[t].level, k = v.length - 1;
				k >= 0 && !(v[k].level <= c);
				k--
			);
			if (((v.length = k + 1), "text" === n.type)) {
				(i = 0), (a = (s = n.content).length);
				e: for (; i < a && ((re.lastIndex = i), (o = re.exec(s))); ) {
					if (
						((g = _ = !0),
						(i = o.index + 1),
						(b = "'" === o[0]),
						(u = 32),
						o.index - 1 >= 0)
					)
						u = s.charCodeAt(o.index - 1);
					else
						for (
							k = t - 1;
							k >= 0 && "softbreak" !== e[k].type && "hardbreak" !== e[k].type;
							k--
						)
							if (e[k].content) {
								u = e[k].content.charCodeAt(e[k].content.length - 1);
								break;
							}
					if (((p = 32), i < a)) p = s.charCodeAt(i);
					else
						for (
							k = t + 1;
							k < e.length &&
							"softbreak" !== e[k].type &&
							"hardbreak" !== e[k].type;
							k++
						)
							if (e[k].content) {
								p = e[k].content.charCodeAt(0);
								break;
							}
					if (
						((h = X(u) || Q(String.fromCharCode(u))),
						(f = X(p) || Q(String.fromCharCode(p))),
						(d = K(u)),
						(m = K(p)) ? (g = !1) : f && (d || h || (g = !1)),
						d ? (_ = !1) : h && (m || f || (_ = !1)),
						34 === p && '"' === o[0] && u >= 48 && u <= 57 && (_ = g = !1),
						g && _ && ((g = h), (_ = f)),
						g || _)
					) {
						if (_)
							for (
								k = v.length - 1;
								k >= 0 && ((l = v[k]), !(v[k].level < c));
								k--
							)
								if (l.single === b && v[k].level === c) {
									(l = v[k]),
										b
											? ((C = r.md.options.quotes[2]),
												(y = r.md.options.quotes[3]))
											: ((C = r.md.options.quotes[0]),
												(y = r.md.options.quotes[1])),
										(n.content = te(n.content, o.index, y)),
										(e[l.token].content = te(e[l.token].content, l.pos, C)),
										(i += y.length - 1),
										l.token === t && (i += C.length - 1),
										(a = (s = n.content).length),
										(v.length = k);
									continue e;
								}
						g
							? v.push({ token: t, pos: o.index, single: b, level: c })
							: _ && b && (n.content = te(n.content, o.index, "\u2019"));
					} else b && (n.content = te(n.content, o.index, "\u2019"));
				}
			}
		}
	}
	function se(e, r, t) {
		(this.type = e),
			(this.tag = r),
			(this.attrs = null),
			(this.map = null),
			(this.nesting = t),
			(this.level = 0),
			(this.children = null),
			(this.content = ""),
			(this.markup = ""),
			(this.info = ""),
			(this.meta = null),
			(this.block = !1),
			(this.hidden = !1);
	}
	(se.prototype.attrIndex = function (e) {
		var r, t, n;
		if (!this.attrs) return -1;
		for (t = 0, n = (r = this.attrs).length; t < n; t++)
			if (r[t][0] === e) return t;
		return -1;
	}),
		(se.prototype.attrPush = function (e) {
			this.attrs ? this.attrs.push(e) : (this.attrs = [e]);
		}),
		(se.prototype.attrSet = function (e, r) {
			var t = this.attrIndex(e),
				n = [e, r];
			t < 0 ? this.attrPush(n) : (this.attrs[t] = n);
		}),
		(se.prototype.attrGet = function (e) {
			var r = this.attrIndex(e),
				t = null;
			return r >= 0 && (t = this.attrs[r][1]), t;
		}),
		(se.prototype.attrJoin = function (e, r) {
			var t = this.attrIndex(e);
			t < 0
				? this.attrPush([e, r])
				: (this.attrs[t][1] = this.attrs[t][1] + " " + r);
		});
	var oe = se;
	function ie(e, r, t) {
		(this.src = e),
			(this.env = t),
			(this.tokens = []),
			(this.inlineMode = !1),
			(this.md = r);
	}
	ie.prototype.Token = oe;
	var ae = ie,
		ce = [
			[
				"normalize",
				function (e) {
					var r;
					(r = (r = e.src.replace(P, "\n")).replace(j, "\ufffd")), (e.src = r);
				},
			],
			[
				"block",
				function (e) {
					var r;
					e.inlineMode
						? (((r = new e.Token("inline", "", 0)).content = e.src),
							(r.map = [0, 1]),
							(r.children = []),
							e.tokens.push(r))
						: e.md.block.parse(e.src, e.md, e.env, e.tokens);
				},
			],
			[
				"inline",
				function (e) {
					var r,
						t,
						n,
						s = e.tokens;
					for (t = 0, n = s.length; t < n; t++)
						"inline" === (r = s[t]).type &&
							e.md.inline.parse(r.content, e.md, e.env, r.children);
				},
			],
			[
				"linkify",
				function (e) {
					var r,
						t,
						n,
						s,
						o,
						i,
						a,
						c,
						l,
						u,
						p,
						h,
						f,
						d,
						m,
						g,
						_,
						k,
						b = e.tokens;
					if (e.md.options.linkify)
						for (t = 0, n = b.length; t < n; t++)
							if ("inline" === b[t].type && e.md.linkify.pretest(b[t].content))
								for (f = 0, r = (s = b[t].children).length - 1; r >= 0; r--)
									if ("link_close" !== (i = s[r]).type) {
										if (
											("html_inline" === i.type &&
												((k = i.content),
												/^<a[>\s]/i.test(k) && f > 0 && f--,
												V(i.content) && f++),
											!(f > 0) &&
												"text" === i.type &&
												e.md.linkify.test(i.content))
										) {
											for (
												l = i.content,
													_ = e.md.linkify.match(l),
													a = [],
													h = i.level,
													p = 0,
													_.length > 0 &&
														0 === _[0].index &&
														r > 0 &&
														"text_special" === s[r - 1].type &&
														(_ = _.slice(1)),
													c = 0;
												c < _.length;
												c++
											)
												(d = _[c].url),
													(m = e.md.normalizeLink(d)),
													e.md.validateLink(m) &&
														((g = _[c].text),
														(g = _[c].schema
															? "mailto:" !== _[c].schema || /^mailto:/i.test(g)
																? e.md.normalizeLinkText(g)
																: e.md
																		.normalizeLinkText("mailto:" + g)
																		.replace(/^mailto:/, "")
															: e.md
																	.normalizeLinkText("http://" + g)
																	.replace(/^http:\/\//, "")),
														(u = _[c].index) > p &&
															(((o = new e.Token("text", "", 0)).content =
																l.slice(p, u)),
															(o.level = h),
															a.push(o)),
														((o = new e.Token("link_open", "a", 1)).attrs = [
															["href", m],
														]),
														(o.level = h++),
														(o.markup = "linkify"),
														(o.info = "auto"),
														a.push(o),
														((o = new e.Token("text", "", 0)).content = g),
														(o.level = h),
														a.push(o),
														((o = new e.Token("link_close", "a", -1)).level =
															--h),
														(o.markup = "linkify"),
														(o.info = "auto"),
														a.push(o),
														(p = _[c].lastIndex));
											p < l.length &&
												(((o = new e.Token("text", "", 0)).content =
													l.slice(p)),
												(o.level = h),
												a.push(o)),
												(b[t].children = s = U(s, r, a));
										}
									} else
										for (
											r--;
											s[r].level !== i.level && "link_open" !== s[r].type;

										)
											r--;
				},
			],
			[
				"replacements",
				function (e) {
					var r;
					if (e.md.options.typographer)
						for (r = e.tokens.length - 1; r >= 0; r--)
							"inline" === e.tokens[r].type &&
								($.test(e.tokens[r].content) && W(e.tokens[r].children),
								Z.test(e.tokens[r].content) && Y(e.tokens[r].children));
				},
			],
			[
				"smartquotes",
				function (e) {
					var r;
					if (e.md.options.typographer)
						for (r = e.tokens.length - 1; r >= 0; r--)
							"inline" === e.tokens[r].type &&
								ee.test(e.tokens[r].content) &&
								ne(e.tokens[r].children, e);
				},
			],
			[
				"text_join",
				function (e) {
					var r,
						t,
						n,
						s,
						o,
						i,
						a = e.tokens;
					for (r = 0, t = a.length; r < t; r++)
						if ("inline" === a[r].type) {
							for (o = (n = a[r].children).length, s = 0; s < o; s++)
								"text_special" === n[s].type && (n[s].type = "text");
							for (s = i = 0; s < o; s++)
								"text" === n[s].type && s + 1 < o && "text" === n[s + 1].type
									? (n[s + 1].content = n[s].content + n[s + 1].content)
									: (s !== i && (n[i] = n[s]), i++);
							s !== i && (n.length = i);
						}
				},
			],
		];
	function le() {
		this.ruler = new O();
		for (var e = 0; e < ce.length; e++) this.ruler.push(ce[e][0], ce[e][1]);
	}
	(le.prototype.process = function (e) {
		var r, t, n;
		for (r = 0, t = (n = this.ruler.getRules("")).length; r < t; r++) n[r](e);
	}),
		(le.prototype.State = ae);
	var ue = le,
		pe = w.isSpace;
	function he(e, r) {
		var t = e.bMarks[r] + e.tShift[r],
			n = e.eMarks[r];
		return e.src.slice(t, n);
	}
	function fe(e) {
		var r,
			t = [],
			n = 0,
			s = e.length,
			o = !1,
			i = 0,
			a = "";
		for (r = e.charCodeAt(n); n < s; )
			124 === r &&
				(o
					? ((a += e.substring(i, n - 1)), (i = n))
					: (t.push(a + e.substring(i, n)), (a = ""), (i = n + 1))),
				(o = 92 === r),
				n++,
				(r = e.charCodeAt(n));
		return t.push(a + e.substring(i)), t;
	}
	var de = w.isSpace,
		me = w.isSpace,
		ge = w.isSpace;
	function _e(e, r) {
		var t, n, s, o;
		return (
			(n = e.bMarks[r] + e.tShift[r]),
			(s = e.eMarks[r]),
			(42 !== (t = e.src.charCodeAt(n++)) && 45 !== t && 43 !== t) ||
			(n < s && ((o = e.src.charCodeAt(n)), !ge(o)))
				? -1
				: n
		);
	}
	function ke(e, r) {
		var t,
			n = e.bMarks[r] + e.tShift[r],
			s = n,
			o = e.eMarks[r];
		if (s + 1 >= o) return -1;
		if ((t = e.src.charCodeAt(s++)) < 48 || t > 57) return -1;
		for (;;) {
			if (s >= o) return -1;
			if (!((t = e.src.charCodeAt(s++)) >= 48 && t <= 57)) {
				if (41 === t || 46 === t) break;
				return -1;
			}
			if (s - n >= 10) return -1;
		}
		return s < o && ((t = e.src.charCodeAt(s)), !ge(t)) ? -1 : s;
	}
	var be = w.normalizeReference,
		ve = w.isSpace,
		Ce =
			"<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>",
		ye = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",
		Ae = {
			HTML_TAG_RE: new RegExp(
				"^(?:" +
					Ce +
					"|" +
					ye +
					"|\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e|<[?][\\s\\S]*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)",
			),
			HTML_OPEN_CLOSE_TAG_RE: new RegExp("^(?:" + Ce + "|" + ye + ")"),
		},
		xe = Ae.HTML_OPEN_CLOSE_TAG_RE,
		De = [
			[
				/^<(script|pre|style|textarea)(?=(\s|>|$))/i,
				/<\/(script|pre|style|textarea)>/i,
				!0,
			],
			[/^<!--/, /-->/, !0],
			[/^<\?/, /\?>/, !0],
			[/^<![A-Z]/, />/, !0],
			[/^<!\[CDATA\[/, /\]\]>/, !0],
			[
				new RegExp(
					"^</?(" +
						[
							"address",
							"article",
							"aside",
							"base",
							"basefont",
							"blockquote",
							"body",
							"caption",
							"center",
							"col",
							"colgroup",
							"dd",
							"details",
							"dialog",
							"dir",
							"div",
							"dl",
							"dt",
							"fieldset",
							"figcaption",
							"figure",
							"footer",
							"form",
							"frame",
							"frameset",
							"h1",
							"h2",
							"h3",
							"h4",
							"h5",
							"h6",
							"head",
							"header",
							"hr",
							"html",
							"iframe",
							"legend",
							"li",
							"link",
							"main",
							"menu",
							"menuitem",
							"nav",
							"noframes",
							"ol",
							"optgroup",
							"option",
							"p",
							"param",
							"section",
							"source",
							"summary",
							"table",
							"tbody",
							"td",
							"tfoot",
							"th",
							"thead",
							"title",
							"tr",
							"track",
							"ul",
						].join("|") +
						")(?=(\\s|/?>|$))",
					"i",
				),
				/^$/,
				!0,
			],
			[new RegExp(xe.source + "\\s*$"), /^$/, !1],
		],
		we = w.isSpace,
		Ee = w.isSpace;
	function qe(e, r, t, n) {
		var s, o, i, a, c, l, u, p;
		for (
			this.src = e,
				this.md = r,
				this.env = t,
				this.tokens = n,
				this.bMarks = [],
				this.eMarks = [],
				this.tShift = [],
				this.sCount = [],
				this.bsCount = [],
				this.blkIndent = 0,
				this.line = 0,
				this.lineMax = 0,
				this.tight = !1,
				this.ddIndent = -1,
				this.listIndent = -1,
				this.parentType = "root",
				this.level = 0,
				this.result = "",
				p = !1,
				i = a = l = u = 0,
				c = (o = this.src).length;
			a < c;
			a++
		) {
			if (((s = o.charCodeAt(a)), !p)) {
				if (Ee(s)) {
					l++, 9 === s ? (u += 4 - (u % 4)) : u++;
					continue;
				}
				p = !0;
			}
			(10 !== s && a !== c - 1) ||
				(10 !== s && a++,
				this.bMarks.push(i),
				this.eMarks.push(a),
				this.tShift.push(l),
				this.sCount.push(u),
				this.bsCount.push(0),
				(p = !1),
				(l = 0),
				(u = 0),
				(i = a + 1));
		}
		this.bMarks.push(o.length),
			this.eMarks.push(o.length),
			this.tShift.push(0),
			this.sCount.push(0),
			this.bsCount.push(0),
			(this.lineMax = this.bMarks.length - 1);
	}
	(qe.prototype.push = function (e, r, t) {
		var n = new oe(e, r, t);
		return (
			(n.block = !0),
			t < 0 && this.level--,
			(n.level = this.level),
			t > 0 && this.level++,
			this.tokens.push(n),
			n
		);
	}),
		(qe.prototype.isEmpty = function (e) {
			return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
		}),
		(qe.prototype.skipEmptyLines = function (e) {
			for (
				var r = this.lineMax;
				e < r && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]);
				e++
			);
			return e;
		}),
		(qe.prototype.skipSpaces = function (e) {
			for (
				var r, t = this.src.length;
				e < t && ((r = this.src.charCodeAt(e)), Ee(r));
				e++
			);
			return e;
		}),
		(qe.prototype.skipSpacesBack = function (e, r) {
			if (e <= r) return e;
			for (; e > r; ) if (!Ee(this.src.charCodeAt(--e))) return e + 1;
			return e;
		}),
		(qe.prototype.skipChars = function (e, r) {
			for (var t = this.src.length; e < t && this.src.charCodeAt(e) === r; e++);
			return e;
		}),
		(qe.prototype.skipCharsBack = function (e, r, t) {
			if (e <= t) return e;
			for (; e > t; ) if (r !== this.src.charCodeAt(--e)) return e + 1;
			return e;
		}),
		(qe.prototype.getLines = function (e, r, t, n) {
			var s,
				o,
				i,
				a,
				c,
				l,
				u,
				p = e;
			if (e >= r) return "";
			for (l = new Array(r - e), s = 0; p < r; p++, s++) {
				for (
					o = 0,
						u = a = this.bMarks[p],
						c = p + 1 < r || n ? this.eMarks[p] + 1 : this.eMarks[p];
					a < c && o < t;

				) {
					if (((i = this.src.charCodeAt(a)), Ee(i)))
						9 === i ? (o += 4 - ((o + this.bsCount[p]) % 4)) : o++;
					else {
						if (!(a - u < this.tShift[p])) break;
						o++;
					}
					a++;
				}
				l[s] =
					o > t
						? new Array(o - t + 1).join(" ") + this.src.slice(a, c)
						: this.src.slice(a, c);
			}
			return l.join("");
		}),
		(qe.prototype.Token = oe);
	var Se = qe,
		Fe = [
			[
				"table",
				function (e, r, t, n) {
					var s, o, i, a, c, l, u, p, h, f, d, m, g, _, k, b, v, C;
					if (r + 2 > t) return !1;
					if (((l = r + 1), e.sCount[l] < e.blkIndent)) return !1;
					if (e.sCount[l] - e.blkIndent >= 4) return !1;
					if ((i = e.bMarks[l] + e.tShift[l]) >= e.eMarks[l]) return !1;
					if (124 !== (v = e.src.charCodeAt(i++)) && 45 !== v && 58 !== v)
						return !1;
					if (i >= e.eMarks[l]) return !1;
					if (
						124 !== (C = e.src.charCodeAt(i++)) &&
						45 !== C &&
						58 !== C &&
						!pe(C)
					)
						return !1;
					if (45 === v && pe(C)) return !1;
					for (; i < e.eMarks[l]; ) {
						if (
							124 !== (s = e.src.charCodeAt(i)) &&
							45 !== s &&
							58 !== s &&
							!pe(s)
						)
							return !1;
						i++;
					}
					for (
						u = (o = he(e, r + 1)).split("|"), f = [], a = 0;
						a < u.length;
						a++
					) {
						if (!(d = u[a].trim())) {
							if (0 === a || a === u.length - 1) continue;
							return !1;
						}
						if (!/^:?-+:?$/.test(d)) return !1;
						58 === d.charCodeAt(d.length - 1)
							? f.push(58 === d.charCodeAt(0) ? "center" : "right")
							: 58 === d.charCodeAt(0)
								? f.push("left")
								: f.push("");
					}
					if (-1 === (o = he(e, r).trim()).indexOf("|")) return !1;
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (
						((u = fe(o)).length && "" === u[0] && u.shift(),
						u.length && "" === u[u.length - 1] && u.pop(),
						0 === (p = u.length) || p !== f.length)
					)
						return !1;
					if (n) return !0;
					for (
						_ = e.parentType,
							e.parentType = "table",
							b = e.md.block.ruler.getRules("blockquote"),
							(h = e.push("table_open", "table", 1)).map = m = [r, 0],
							(h = e.push("thead_open", "thead", 1)).map = [r, r + 1],
							(h = e.push("tr_open", "tr", 1)).map = [r, r + 1],
							a = 0;
						a < u.length;
						a++
					)
						(h = e.push("th_open", "th", 1)),
							f[a] && (h.attrs = [["style", "text-align:" + f[a]]]),
							((h = e.push("inline", "", 0)).content = u[a].trim()),
							(h.children = []),
							(h = e.push("th_close", "th", -1));
					for (
						h = e.push("tr_close", "tr", -1),
							h = e.push("thead_close", "thead", -1),
							l = r + 2;
						l < t && !(e.sCount[l] < e.blkIndent);
						l++
					) {
						for (k = !1, a = 0, c = b.length; a < c; a++)
							if (b[a](e, l, t, !0)) {
								k = !0;
								break;
							}
						if (k) break;
						if (!(o = he(e, l).trim())) break;
						if (e.sCount[l] - e.blkIndent >= 4) break;
						for (
							(u = fe(o)).length && "" === u[0] && u.shift(),
								u.length && "" === u[u.length - 1] && u.pop(),
								l === r + 2 &&
									((h = e.push("tbody_open", "tbody", 1)).map = g = [r + 2, 0]),
								(h = e.push("tr_open", "tr", 1)).map = [l, l + 1],
								a = 0;
							a < p;
							a++
						)
							(h = e.push("td_open", "td", 1)),
								f[a] && (h.attrs = [["style", "text-align:" + f[a]]]),
								((h = e.push("inline", "", 0)).content = u[a]
									? u[a].trim()
									: ""),
								(h.children = []),
								(h = e.push("td_close", "td", -1));
						h = e.push("tr_close", "tr", -1);
					}
					return (
						g && ((h = e.push("tbody_close", "tbody", -1)), (g[1] = l)),
						(h = e.push("table_close", "table", -1)),
						(m[1] = l),
						(e.parentType = _),
						(e.line = l),
						!0
					);
				},
				["paragraph", "reference"],
			],
			[
				"code",
				function (e, r, t) {
					var n, s, o;
					if (e.sCount[r] - e.blkIndent < 4) return !1;
					for (s = n = r + 1; n < t; )
						if (e.isEmpty(n)) n++;
						else {
							if (!(e.sCount[n] - e.blkIndent >= 4)) break;
							s = ++n;
						}
					return (
						(e.line = s),
						((o = e.push("code_block", "code", 0)).content =
							e.getLines(r, s, 4 + e.blkIndent, !1) + "\n"),
						(o.map = [r, e.line]),
						!0
					);
				},
			],
			[
				"fence",
				function (e, r, t, n) {
					var s,
						o,
						i,
						a,
						c,
						l,
						u,
						p = !1,
						h = e.bMarks[r] + e.tShift[r],
						f = e.eMarks[r];
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (h + 3 > f) return !1;
					if (126 !== (s = e.src.charCodeAt(h)) && 96 !== s) return !1;
					if (((c = h), (o = (h = e.skipChars(h, s)) - c) < 3)) return !1;
					if (
						((u = e.src.slice(c, h)),
						(i = e.src.slice(h, f)),
						96 === s && i.indexOf(String.fromCharCode(s)) >= 0)
					)
						return !1;
					if (n) return !0;
					for (
						a = r;
						!(++a >= t) &&
						!(
							(h = c = e.bMarks[a] + e.tShift[a]) < (f = e.eMarks[a]) &&
							e.sCount[a] < e.blkIndent
						);

					)
						if (
							e.src.charCodeAt(h) === s &&
							!(
								e.sCount[a] - e.blkIndent >= 4 ||
								(h = e.skipChars(h, s)) - c < o ||
								(h = e.skipSpaces(h)) < f
							)
						) {
							p = !0;
							break;
						}
					return (
						(o = e.sCount[r]),
						(e.line = a + (p ? 1 : 0)),
						((l = e.push("fence", "code", 0)).info = i),
						(l.content = e.getLines(r + 1, a, o, !0)),
						(l.markup = u),
						(l.map = [r, e.line]),
						!0
					);
				},
				["paragraph", "reference", "blockquote", "list"],
			],
			[
				"blockquote",
				function (e, r, t, n) {
					var s,
						o,
						i,
						a,
						c,
						l,
						u,
						p,
						h,
						f,
						d,
						m,
						g,
						_,
						k,
						b,
						v,
						C,
						y,
						A,
						x = e.lineMax,
						D = e.bMarks[r] + e.tShift[r],
						w = e.eMarks[r];
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (62 !== e.src.charCodeAt(D++)) return !1;
					if (n) return !0;
					for (
						a = h = e.sCount[r] + 1,
							32 === e.src.charCodeAt(D)
								? (D++, a++, h++, (s = !1), (b = !0))
								: 9 === e.src.charCodeAt(D)
									? ((b = !0),
										(e.bsCount[r] + h) % 4 == 3
											? (D++, a++, h++, (s = !1))
											: (s = !0))
									: (b = !1),
							f = [e.bMarks[r]],
							e.bMarks[r] = D;
						D < w && ((o = e.src.charCodeAt(D)), de(o));

					)
						9 === o ? (h += 4 - ((h + e.bsCount[r] + (s ? 1 : 0)) % 4)) : h++,
							D++;
					for (
						d = [e.bsCount[r]],
							e.bsCount[r] = e.sCount[r] + 1 + (b ? 1 : 0),
							l = D >= w,
							_ = [e.sCount[r]],
							e.sCount[r] = h - a,
							k = [e.tShift[r]],
							e.tShift[r] = D - e.bMarks[r],
							C = e.md.block.ruler.getRules("blockquote"),
							g = e.parentType,
							e.parentType = "blockquote",
							p = r + 1;
						p < t &&
						((A = e.sCount[p] < e.blkIndent),
						!((D = e.bMarks[p] + e.tShift[p]) >= (w = e.eMarks[p])));
						p++
					)
						if (62 !== e.src.charCodeAt(D++) || A) {
							if (l) break;
							for (v = !1, i = 0, c = C.length; i < c; i++)
								if (C[i](e, p, t, !0)) {
									v = !0;
									break;
								}
							if (v) {
								(e.lineMax = p),
									0 !== e.blkIndent &&
										(f.push(e.bMarks[p]),
										d.push(e.bsCount[p]),
										k.push(e.tShift[p]),
										_.push(e.sCount[p]),
										(e.sCount[p] -= e.blkIndent));
								break;
							}
							f.push(e.bMarks[p]),
								d.push(e.bsCount[p]),
								k.push(e.tShift[p]),
								_.push(e.sCount[p]),
								(e.sCount[p] = -1);
						} else {
							for (
								a = h = e.sCount[p] + 1,
									32 === e.src.charCodeAt(D)
										? (D++, a++, h++, (s = !1), (b = !0))
										: 9 === e.src.charCodeAt(D)
											? ((b = !0),
												(e.bsCount[p] + h) % 4 == 3
													? (D++, a++, h++, (s = !1))
													: (s = !0))
											: (b = !1),
									f.push(e.bMarks[p]),
									e.bMarks[p] = D;
								D < w && ((o = e.src.charCodeAt(D)), de(o));

							)
								9 === o
									? (h += 4 - ((h + e.bsCount[p] + (s ? 1 : 0)) % 4))
									: h++,
									D++;
							(l = D >= w),
								d.push(e.bsCount[p]),
								(e.bsCount[p] = e.sCount[p] + 1 + (b ? 1 : 0)),
								_.push(e.sCount[p]),
								(e.sCount[p] = h - a),
								k.push(e.tShift[p]),
								(e.tShift[p] = D - e.bMarks[p]);
						}
					for (
						m = e.blkIndent,
							e.blkIndent = 0,
							(y = e.push("blockquote_open", "blockquote", 1)).markup = ">",
							y.map = u = [r, 0],
							e.md.block.tokenize(e, r, p),
							(y = e.push("blockquote_close", "blockquote", -1)).markup = ">",
							e.lineMax = x,
							e.parentType = g,
							u[1] = e.line,
							i = 0;
						i < k.length;
						i++
					)
						(e.bMarks[i + r] = f[i]),
							(e.tShift[i + r] = k[i]),
							(e.sCount[i + r] = _[i]),
							(e.bsCount[i + r] = d[i]);
					return (e.blkIndent = m), !0;
				},
				["paragraph", "reference", "blockquote", "list"],
			],
			[
				"hr",
				function (e, r, t, n) {
					var s,
						o,
						i,
						a,
						c = e.bMarks[r] + e.tShift[r],
						l = e.eMarks[r];
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (42 !== (s = e.src.charCodeAt(c++)) && 45 !== s && 95 !== s)
						return !1;
					for (o = 1; c < l; ) {
						if ((i = e.src.charCodeAt(c++)) !== s && !me(i)) return !1;
						i === s && o++;
					}
					return (
						!(o < 3) &&
						(n ||
							((e.line = r + 1),
							((a = e.push("hr", "hr", 0)).map = [r, e.line]),
							(a.markup = Array(o + 1).join(String.fromCharCode(s)))),
						!0)
					);
				},
				["paragraph", "reference", "blockquote", "list"],
			],
			[
				"list",
				function (e, r, t, n) {
					var s,
						o,
						i,
						a,
						c,
						l,
						u,
						p,
						h,
						f,
						d,
						m,
						g,
						_,
						k,
						b,
						v,
						C,
						y,
						A,
						x,
						D,
						w,
						E,
						q,
						S,
						F,
						L,
						z = !1,
						T = !0;
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (
						e.listIndent >= 0 &&
						e.sCount[r] - e.listIndent >= 4 &&
						e.sCount[r] < e.blkIndent
					)
						return !1;
					if (
						(n &&
							"paragraph" === e.parentType &&
							e.sCount[r] >= e.blkIndent &&
							(z = !0),
						(w = ke(e, r)) >= 0)
					) {
						if (
							((u = !0),
							(q = e.bMarks[r] + e.tShift[r]),
							(g = Number(e.src.slice(q, w - 1))),
							z && 1 !== g)
						)
							return !1;
					} else {
						if (!((w = _e(e, r)) >= 0)) return !1;
						u = !1;
					}
					if (z && e.skipSpaces(w) >= e.eMarks[r]) return !1;
					if (((m = e.src.charCodeAt(w - 1)), n)) return !0;
					for (
						d = e.tokens.length,
							u
								? ((L = e.push("ordered_list_open", "ol", 1)),
									1 !== g && (L.attrs = [["start", g]]))
								: (L = e.push("bullet_list_open", "ul", 1)),
							L.map = f = [r, 0],
							L.markup = String.fromCharCode(m),
							k = r,
							E = !1,
							F = e.md.block.ruler.getRules("list"),
							C = e.parentType,
							e.parentType = "list";
						k < t;

					) {
						for (
							D = w,
								_ = e.eMarks[k],
								l = b = e.sCount[k] + w - (e.bMarks[r] + e.tShift[r]);
							D < _;

						) {
							if (9 === (s = e.src.charCodeAt(D)))
								b += 4 - ((b + e.bsCount[k]) % 4);
							else {
								if (32 !== s) break;
								b++;
							}
							D++;
						}
						if (
							((c = (o = D) >= _ ? 1 : b - l) > 4 && (c = 1),
							(a = l + c),
							((L = e.push("list_item_open", "li", 1)).markup =
								String.fromCharCode(m)),
							(L.map = p = [r, 0]),
							u && (L.info = e.src.slice(q, w - 1)),
							(x = e.tight),
							(A = e.tShift[r]),
							(y = e.sCount[r]),
							(v = e.listIndent),
							(e.listIndent = e.blkIndent),
							(e.blkIndent = a),
							(e.tight = !0),
							(e.tShift[r] = o - e.bMarks[r]),
							(e.sCount[r] = b),
							o >= _ && e.isEmpty(r + 1)
								? (e.line = Math.min(e.line + 2, t))
								: e.md.block.tokenize(e, r, t, !0),
							(e.tight && !E) || (T = !1),
							(E = e.line - r > 1 && e.isEmpty(e.line - 1)),
							(e.blkIndent = e.listIndent),
							(e.listIndent = v),
							(e.tShift[r] = A),
							(e.sCount[r] = y),
							(e.tight = x),
							((L = e.push("list_item_close", "li", -1)).markup =
								String.fromCharCode(m)),
							(k = r = e.line),
							(p[1] = k),
							(o = e.bMarks[r]),
							k >= t)
						)
							break;
						if (e.sCount[k] < e.blkIndent) break;
						if (e.sCount[r] - e.blkIndent >= 4) break;
						for (S = !1, i = 0, h = F.length; i < h; i++)
							if (F[i](e, k, t, !0)) {
								S = !0;
								break;
							}
						if (S) break;
						if (u) {
							if ((w = ke(e, k)) < 0) break;
							q = e.bMarks[k] + e.tShift[k];
						} else if ((w = _e(e, k)) < 0) break;
						if (m !== e.src.charCodeAt(w - 1)) break;
					}
					return (
						((L = u
							? e.push("ordered_list_close", "ol", -1)
							: e.push("bullet_list_close", "ul", -1)).markup =
							String.fromCharCode(m)),
						(f[1] = k),
						(e.line = k),
						(e.parentType = C),
						T &&
							(function (e, r) {
								var t,
									n,
									s = e.level + 2;
								for (t = r + 2, n = e.tokens.length - 2; t < n; t++)
									e.tokens[t].level === s &&
										"paragraph_open" === e.tokens[t].type &&
										((e.tokens[t + 2].hidden = !0),
										(e.tokens[t].hidden = !0),
										(t += 2));
							})(e, d),
						!0
					);
				},
				["paragraph", "reference", "blockquote"],
			],
			[
				"reference",
				function (e, r, t, n) {
					var s,
						o,
						i,
						a,
						c,
						l,
						u,
						p,
						h,
						f,
						d,
						m,
						g,
						_,
						k,
						b,
						v = 0,
						C = e.bMarks[r] + e.tShift[r],
						y = e.eMarks[r],
						A = r + 1;
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (91 !== e.src.charCodeAt(C)) return !1;
					for (; ++C < y; )
						if (93 === e.src.charCodeAt(C) && 92 !== e.src.charCodeAt(C - 1)) {
							if (C + 1 === y) return !1;
							if (58 !== e.src.charCodeAt(C + 1)) return !1;
							break;
						}
					for (
						a = e.lineMax,
							k = e.md.block.ruler.getRules("reference"),
							f = e.parentType,
							e.parentType = "reference";
						A < a && !e.isEmpty(A);
						A++
					)
						if (!(e.sCount[A] - e.blkIndent > 3 || e.sCount[A] < 0)) {
							for (_ = !1, l = 0, u = k.length; l < u; l++)
								if (k[l](e, A, a, !0)) {
									_ = !0;
									break;
								}
							if (_) break;
						}
					for (
						y = (g = e.getLines(r, A, e.blkIndent, !1).trim()).length, C = 1;
						C < y;
						C++
					) {
						if (91 === (s = g.charCodeAt(C))) return !1;
						if (93 === s) {
							h = C;
							break;
						}
						(10 === s || (92 === s && ++C < y && 10 === g.charCodeAt(C))) &&
							v++;
					}
					if (h < 0 || 58 !== g.charCodeAt(h + 1)) return !1;
					for (C = h + 2; C < y; C++)
						if (10 === (s = g.charCodeAt(C))) v++;
						else if (!ve(s)) break;
					if (!(d = e.md.helpers.parseLinkDestination(g, C, y)).ok) return !1;
					if (((c = e.md.normalizeLink(d.str)), !e.md.validateLink(c)))
						return !1;
					for (o = C = d.pos, i = v += d.lines, m = C; C < y; C++)
						if (10 === (s = g.charCodeAt(C))) v++;
						else if (!ve(s)) break;
					for (
						d = e.md.helpers.parseLinkTitle(g, C, y),
							C < y && m !== C && d.ok
								? ((b = d.str), (C = d.pos), (v += d.lines))
								: ((b = ""), (C = o), (v = i));
						C < y && ((s = g.charCodeAt(C)), ve(s));

					)
						C++;
					if (C < y && 10 !== g.charCodeAt(C) && b)
						for (
							b = "", C = o, v = i;
							C < y && ((s = g.charCodeAt(C)), ve(s));

						)
							C++;
					return (
						!(C < y && 10 !== g.charCodeAt(C)) &&
						!!(p = be(g.slice(1, h))) &&
						(n ||
							(void 0 === e.env.references && (e.env.references = {}),
							void 0 === e.env.references[p] &&
								(e.env.references[p] = { title: b, href: c }),
							(e.parentType = f),
							(e.line = r + v + 1)),
						!0)
					);
				},
			],
			[
				"html_block",
				function (e, r, t, n) {
					var s,
						o,
						i,
						a,
						c = e.bMarks[r] + e.tShift[r],
						l = e.eMarks[r];
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (!e.md.options.html) return !1;
					if (60 !== e.src.charCodeAt(c)) return !1;
					for (
						a = e.src.slice(c, l), s = 0;
						s < De.length && !De[s][0].test(a);
						s++
					);
					if (s === De.length) return !1;
					if (n) return De[s][2];
					if (((o = r + 1), !De[s][1].test(a)))
						for (; o < t && !(e.sCount[o] < e.blkIndent); o++)
							if (
								((c = e.bMarks[o] + e.tShift[o]),
								(l = e.eMarks[o]),
								(a = e.src.slice(c, l)),
								De[s][1].test(a))
							) {
								0 !== a.length && o++;
								break;
							}
					return (
						(e.line = o),
						((i = e.push("html_block", "", 0)).map = [r, o]),
						(i.content = e.getLines(r, o, e.blkIndent, !0)),
						!0
					);
				},
				["paragraph", "reference", "blockquote"],
			],
			[
				"heading",
				function (e, r, t, n) {
					var s,
						o,
						i,
						a,
						c = e.bMarks[r] + e.tShift[r],
						l = e.eMarks[r];
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					if (35 !== (s = e.src.charCodeAt(c)) || c >= l) return !1;
					for (o = 1, s = e.src.charCodeAt(++c); 35 === s && c < l && o <= 6; )
						o++, (s = e.src.charCodeAt(++c));
					return (
						!(o > 6 || (c < l && !we(s))) &&
						(n ||
							((l = e.skipSpacesBack(l, c)),
							(i = e.skipCharsBack(l, 35, c)) > c &&
								we(e.src.charCodeAt(i - 1)) &&
								(l = i),
							(e.line = r + 1),
							((a = e.push("heading_open", "h" + String(o), 1)).markup =
								"########".slice(0, o)),
							(a.map = [r, e.line]),
							((a = e.push("inline", "", 0)).content = e.src
								.slice(c, l)
								.trim()),
							(a.map = [r, e.line]),
							(a.children = []),
							((a = e.push("heading_close", "h" + String(o), -1)).markup =
								"########".slice(0, o))),
						!0)
					);
				},
				["paragraph", "reference", "blockquote"],
			],
			[
				"lheading",
				function (e, r, t) {
					var n,
						s,
						o,
						i,
						a,
						c,
						l,
						u,
						p,
						h,
						f = r + 1,
						d = e.md.block.ruler.getRules("paragraph");
					if (e.sCount[r] - e.blkIndent >= 4) return !1;
					for (
						h = e.parentType, e.parentType = "paragraph";
						f < t && !e.isEmpty(f);
						f++
					)
						if (!(e.sCount[f] - e.blkIndent > 3)) {
							if (
								e.sCount[f] >= e.blkIndent &&
								(c = e.bMarks[f] + e.tShift[f]) < (l = e.eMarks[f]) &&
								(45 === (p = e.src.charCodeAt(c)) || 61 === p) &&
								((c = e.skipChars(c, p)), (c = e.skipSpaces(c)) >= l)
							) {
								u = 61 === p ? 1 : 2;
								break;
							}
							if (!(e.sCount[f] < 0)) {
								for (s = !1, o = 0, i = d.length; o < i; o++)
									if (d[o](e, f, t, !0)) {
										s = !0;
										break;
									}
								if (s) break;
							}
						}
					return (
						!!u &&
						((n = e.getLines(r, f, e.blkIndent, !1).trim()),
						(e.line = f + 1),
						((a = e.push("heading_open", "h" + String(u), 1)).markup =
							String.fromCharCode(p)),
						(a.map = [r, e.line]),
						((a = e.push("inline", "", 0)).content = n),
						(a.map = [r, e.line - 1]),
						(a.children = []),
						((a = e.push("heading_close", "h" + String(u), -1)).markup =
							String.fromCharCode(p)),
						(e.parentType = h),
						!0)
					);
				},
			],
			[
				"paragraph",
				function (e, r) {
					var t,
						n,
						s,
						o,
						i,
						a,
						c = r + 1,
						l = e.md.block.ruler.getRules("paragraph"),
						u = e.lineMax;
					for (
						a = e.parentType, e.parentType = "paragraph";
						c < u && !e.isEmpty(c);
						c++
					)
						if (!(e.sCount[c] - e.blkIndent > 3 || e.sCount[c] < 0)) {
							for (n = !1, s = 0, o = l.length; s < o; s++)
								if (l[s](e, c, u, !0)) {
									n = !0;
									break;
								}
							if (n) break;
						}
					return (
						(t = e.getLines(r, c, e.blkIndent, !1).trim()),
						(e.line = c),
						((i = e.push("paragraph_open", "p", 1)).map = [r, e.line]),
						((i = e.push("inline", "", 0)).content = t),
						(i.map = [r, e.line]),
						(i.children = []),
						(i = e.push("paragraph_close", "p", -1)),
						(e.parentType = a),
						!0
					);
				},
			],
		];
	function Le() {
		this.ruler = new O();
		for (var e = 0; e < Fe.length; e++)
			this.ruler.push(Fe[e][0], Fe[e][1], { alt: (Fe[e][2] || []).slice() });
	}
	(Le.prototype.tokenize = function (e, r, t) {
		for (
			var n,
				s = this.ruler.getRules(""),
				o = s.length,
				i = r,
				a = !1,
				c = e.md.options.maxNesting;
			i < t &&
			((e.line = i = e.skipEmptyLines(i)), !(i >= t)) &&
			!(e.sCount[i] < e.blkIndent);

		) {
			if (e.level >= c) {
				e.line = t;
				break;
			}
			for (n = 0; n < o && !s[n](e, i, t, !1); n++);
			(e.tight = !a),
				e.isEmpty(e.line - 1) && (a = !0),
				(i = e.line) < t && e.isEmpty(i) && ((a = !0), i++, (e.line = i));
		}
	}),
		(Le.prototype.parse = function (e, r, t, n) {
			var s;
			e &&
				((s = new this.State(e, r, t, n)), this.tokenize(s, s.line, s.lineMax));
		}),
		(Le.prototype.State = Se);
	var ze = Le;
	function Te(e) {
		switch (e) {
			case 10:
			case 33:
			case 35:
			case 36:
			case 37:
			case 38:
			case 42:
			case 43:
			case 45:
			case 58:
			case 60:
			case 61:
			case 62:
			case 64:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 123:
			case 125:
			case 126:
				return !0;
			default:
				return !1;
		}
	}
	for (
		var Ie = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i,
			Me = w.isSpace,
			Re = w.isSpace,
			Be = [],
			Ne = 0;
		Ne < 256;
		Ne++
	)
		Be.push(0);
	"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (e) {
		Be[e.charCodeAt(0)] = 1;
	});
	function Oe(e, r) {
		var t,
			n,
			s,
			o,
			i,
			a = [],
			c = r.length;
		for (t = 0; t < c; t++)
			126 === (s = r[t]).marker &&
				-1 !== s.end &&
				((o = r[s.end]),
				((i = e.tokens[s.token]).type = "s_open"),
				(i.tag = "s"),
				(i.nesting = 1),
				(i.markup = "~~"),
				(i.content = ""),
				((i = e.tokens[o.token]).type = "s_close"),
				(i.tag = "s"),
				(i.nesting = -1),
				(i.markup = "~~"),
				(i.content = ""),
				"text" === e.tokens[o.token - 1].type &&
					"~" === e.tokens[o.token - 1].content &&
					a.push(o.token - 1));
		for (; a.length; ) {
			for (
				n = (t = a.pop()) + 1;
				n < e.tokens.length && "s_close" === e.tokens[n].type;

			)
				n++;
			t !== --n &&
				((i = e.tokens[n]), (e.tokens[n] = e.tokens[t]), (e.tokens[t] = i));
		}
	}
	var Pe = {
		tokenize: function (e, r) {
			var t,
				n,
				s,
				o,
				i = e.pos,
				a = e.src.charCodeAt(i);
			if (r) return !1;
			if (126 !== a) return !1;
			if (
				((s = (n = e.scanDelims(e.pos, !0)).length),
				(o = String.fromCharCode(a)),
				s < 2)
			)
				return !1;
			for (
				s % 2 && ((e.push("text", "", 0).content = o), s--), t = 0;
				t < s;
				t += 2
			)
				(e.push("text", "", 0).content = o + o),
					e.delimiters.push({
						marker: a,
						length: 0,
						token: e.tokens.length - 1,
						end: -1,
						open: n.can_open,
						close: n.can_close,
					});
			return (e.pos += n.length), !0;
		},
		postProcess: function (e) {
			var r,
				t = e.tokens_meta,
				n = e.tokens_meta.length;
			for (Oe(e, e.delimiters), r = 0; r < n; r++)
				t[r] && t[r].delimiters && Oe(e, t[r].delimiters);
		},
	};
	function je(e, r) {
		var t, n, s, o, i, a;
		for (t = r.length - 1; t >= 0; t--)
			(95 !== (n = r[t]).marker && 42 !== n.marker) ||
				(-1 !== n.end &&
					((s = r[n.end]),
					(a =
						t > 0 &&
						r[t - 1].end === n.end + 1 &&
						r[t - 1].marker === n.marker &&
						r[t - 1].token === n.token - 1 &&
						r[n.end + 1].token === s.token + 1),
					(i = String.fromCharCode(n.marker)),
					((o = e.tokens[n.token]).type = a ? "strong_open" : "em_open"),
					(o.tag = a ? "strong" : "em"),
					(o.nesting = 1),
					(o.markup = a ? i + i : i),
					(o.content = ""),
					((o = e.tokens[s.token]).type = a ? "strong_close" : "em_close"),
					(o.tag = a ? "strong" : "em"),
					(o.nesting = -1),
					(o.markup = a ? i + i : i),
					(o.content = ""),
					a &&
						((e.tokens[r[t - 1].token].content = ""),
						(e.tokens[r[n.end + 1].token].content = ""),
						t--)));
	}
	var Ue = {
			tokenize: function (e, r) {
				var t,
					n,
					s = e.pos,
					o = e.src.charCodeAt(s);
				if (r) return !1;
				if (95 !== o && 42 !== o) return !1;
				for (n = e.scanDelims(e.pos, 42 === o), t = 0; t < n.length; t++)
					(e.push("text", "", 0).content = String.fromCharCode(o)),
						e.delimiters.push({
							marker: o,
							length: n.length,
							token: e.tokens.length - 1,
							end: -1,
							open: n.can_open,
							close: n.can_close,
						});
				return (e.pos += n.length), !0;
			},
			postProcess: function (e) {
				var r,
					t = e.tokens_meta,
					n = e.tokens_meta.length;
				for (je(e, e.delimiters), r = 0; r < n; r++)
					t[r] && t[r].delimiters && je(e, t[r].delimiters);
			},
		},
		Ve = w.normalizeReference,
		Ze = w.isSpace,
		$e = w.normalizeReference,
		Ge = w.isSpace,
		He =
			/^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,
		Je = /^([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)$/,
		We = Ae.HTML_TAG_RE;
	var Ye = w.has,
		Ke = w.isValidEntityCode,
		Qe = w.fromCodePoint,
		Xe = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,
		er = /^&([a-z][a-z0-9]{1,31});/i;
	function rr(e, r) {
		var t,
			n,
			s,
			o,
			i,
			a,
			c,
			l,
			u = {},
			p = r.length;
		if (p) {
			var h = 0,
				f = -2,
				d = [];
			for (t = 0; t < p; t++)
				if (
					((s = r[t]),
					d.push(0),
					(r[h].marker === s.marker && f === s.token - 1) || (h = t),
					(f = s.token),
					(s.length = s.length || 0),
					s.close)
				) {
					for (
						u.hasOwnProperty(s.marker) ||
							(u[s.marker] = [-1, -1, -1, -1, -1, -1]),
							i = u[s.marker][(s.open ? 3 : 0) + (s.length % 3)],
							a = n = h - d[h] - 1;
						n > i;
						n -= d[n] + 1
					)
						if (
							(o = r[n]).marker === s.marker &&
							o.open &&
							o.end < 0 &&
							((c = !1),
							(o.close || s.open) &&
								(o.length + s.length) % 3 == 0 &&
								((o.length % 3 == 0 && s.length % 3 == 0) || (c = !0)),
							!c)
						) {
							(l = n > 0 && !r[n - 1].open ? d[n - 1] + 1 : 0),
								(d[t] = t - n + l),
								(d[n] = l),
								(s.open = !1),
								(o.end = t),
								(o.close = !1),
								(a = -1),
								(f = -2);
							break;
						}
					-1 !== a &&
						(u[s.marker][(s.open ? 3 : 0) + ((s.length || 0) % 3)] = a);
				}
		}
	}
	var tr = w.isWhiteSpace,
		nr = w.isPunctChar,
		sr = w.isMdAsciiPunct;
	function or(e, r, t, n) {
		(this.src = e),
			(this.env = t),
			(this.md = r),
			(this.tokens = n),
			(this.tokens_meta = Array(n.length)),
			(this.pos = 0),
			(this.posMax = this.src.length),
			(this.level = 0),
			(this.pending = ""),
			(this.pendingLevel = 0),
			(this.cache = {}),
			(this.delimiters = []),
			(this._prev_delimiters = []),
			(this.backticks = {}),
			(this.backticksScanned = !1),
			(this.linkLevel = 0);
	}
	(or.prototype.pushPending = function () {
		var e = new oe("text", "", 0);
		return (
			(e.content = this.pending),
			(e.level = this.pendingLevel),
			this.tokens.push(e),
			(this.pending = ""),
			e
		);
	}),
		(or.prototype.push = function (e, r, t) {
			this.pending && this.pushPending();
			var n = new oe(e, r, t),
				s = null;
			return (
				t < 0 &&
					(this.level--, (this.delimiters = this._prev_delimiters.pop())),
				(n.level = this.level),
				t > 0 &&
					(this.level++,
					this._prev_delimiters.push(this.delimiters),
					(this.delimiters = []),
					(s = { delimiters: this.delimiters })),
				(this.pendingLevel = this.level),
				this.tokens.push(n),
				this.tokens_meta.push(s),
				n
			);
		}),
		(or.prototype.scanDelims = function (e, r) {
			var t,
				n,
				s,
				o,
				i,
				a,
				c,
				l,
				u,
				p = e,
				h = !0,
				f = !0,
				d = this.posMax,
				m = this.src.charCodeAt(e);
			for (
				t = e > 0 ? this.src.charCodeAt(e - 1) : 32;
				p < d && this.src.charCodeAt(p) === m;

			)
				p++;
			return (
				(s = p - e),
				(n = p < d ? this.src.charCodeAt(p) : 32),
				(c = sr(t) || nr(String.fromCharCode(t))),
				(u = sr(n) || nr(String.fromCharCode(n))),
				(a = tr(t)),
				(l = tr(n)) ? (h = !1) : u && (a || c || (h = !1)),
				a ? (f = !1) : c && (l || u || (f = !1)),
				r ? ((o = h), (i = f)) : ((o = h && (!f || c)), (i = f && (!h || u))),
				{ can_open: o, can_close: i, length: s }
			);
		}),
		(or.prototype.Token = oe);
	var ir = or,
		ar = [
			[
				"text",
				function (e, r) {
					for (var t = e.pos; t < e.posMax && !Te(e.src.charCodeAt(t)); ) t++;
					return (
						t !== e.pos &&
						(r || (e.pending += e.src.slice(e.pos, t)), (e.pos = t), !0)
					);
				},
			],
			[
				"linkify",
				function (e, r) {
					var t, n, s, o, i, a, c;
					return (
						!!e.md.options.linkify &&
						!(e.linkLevel > 0) &&
						!((t = e.pos) + 3 > e.posMax) &&
						58 === e.src.charCodeAt(t) &&
						47 === e.src.charCodeAt(t + 1) &&
						47 === e.src.charCodeAt(t + 2) &&
						!!(n = e.pending.match(Ie)) &&
						((s = n[1]),
						!!(o = e.md.linkify.matchAtStart(e.src.slice(t - s.length))) &&
							((i = (i = o.url).replace(/\*+$/, "")),
							(a = e.md.normalizeLink(i)),
							!!e.md.validateLink(a) &&
								(r ||
									((e.pending = e.pending.slice(0, -s.length)),
									((c = e.push("link_open", "a", 1)).attrs = [["href", a]]),
									(c.markup = "linkify"),
									(c.info = "auto"),
									((c = e.push("text", "", 0)).content =
										e.md.normalizeLinkText(i)),
									((c = e.push("link_close", "a", -1)).markup = "linkify"),
									(c.info = "auto")),
								(e.pos += i.length - s.length),
								!0)))
					);
				},
			],
			[
				"newline",
				function (e, r) {
					var t,
						n,
						s,
						o = e.pos;
					if (10 !== e.src.charCodeAt(o)) return !1;
					if (((t = e.pending.length - 1), (n = e.posMax), !r))
						if (t >= 0 && 32 === e.pending.charCodeAt(t))
							if (t >= 1 && 32 === e.pending.charCodeAt(t - 1)) {
								for (s = t - 1; s >= 1 && 32 === e.pending.charCodeAt(s - 1); )
									s--;
								(e.pending = e.pending.slice(0, s)),
									e.push("hardbreak", "br", 0);
							} else
								(e.pending = e.pending.slice(0, -1)),
									e.push("softbreak", "br", 0);
						else e.push("softbreak", "br", 0);
					for (o++; o < n && Me(e.src.charCodeAt(o)); ) o++;
					return (e.pos = o), !0;
				},
			],
			[
				"escape",
				function (e, r) {
					var t,
						n,
						s,
						o,
						i,
						a = e.pos,
						c = e.posMax;
					if (92 !== e.src.charCodeAt(a)) return !1;
					if (++a >= c) return !1;
					if (10 === (t = e.src.charCodeAt(a))) {
						for (
							r || e.push("hardbreak", "br", 0), a++;
							a < c && ((t = e.src.charCodeAt(a)), Re(t));

						)
							a++;
						return (e.pos = a), !0;
					}
					return (
						(o = e.src[a]),
						t >= 55296 &&
							t <= 56319 &&
							a + 1 < c &&
							(n = e.src.charCodeAt(a + 1)) >= 56320 &&
							n <= 57343 &&
							((o += e.src[a + 1]), a++),
						(s = "\\" + o),
						r ||
							((i = e.push("text_special", "", 0)),
							t < 256 && 0 !== Be[t] ? (i.content = o) : (i.content = s),
							(i.markup = s),
							(i.info = "escape")),
						(e.pos = a + 1),
						!0
					);
				},
			],
			[
				"backticks",
				function (e, r) {
					var t,
						n,
						s,
						o,
						i,
						a,
						c,
						l,
						u = e.pos;
					if (96 !== e.src.charCodeAt(u)) return !1;
					for (t = u, u++, n = e.posMax; u < n && 96 === e.src.charCodeAt(u); )
						u++;
					if (
						((c = (s = e.src.slice(t, u)).length),
						e.backticksScanned && (e.backticks[c] || 0) <= t)
					)
						return r || (e.pending += s), (e.pos += c), !0;
					for (i = a = u; -1 !== (i = e.src.indexOf("`", a)); ) {
						for (a = i + 1; a < n && 96 === e.src.charCodeAt(a); ) a++;
						if ((l = a - i) === c)
							return (
								r ||
									(((o = e.push("code_inline", "code", 0)).markup = s),
									(o.content = e.src
										.slice(u, i)
										.replace(/\n/g, " ")
										.replace(/^ (.+) $/, "$1"))),
								(e.pos = a),
								!0
							);
						e.backticks[l] = i;
					}
					return (
						(e.backticksScanned = !0), r || (e.pending += s), (e.pos += c), !0
					);
				},
			],
			["strikethrough", Pe.tokenize],
			["emphasis", Ue.tokenize],
			[
				"link",
				function (e, r) {
					var t,
						n,
						s,
						o,
						i,
						a,
						c,
						l,
						u = "",
						p = "",
						h = e.pos,
						f = e.posMax,
						d = e.pos,
						m = !0;
					if (91 !== e.src.charCodeAt(e.pos)) return !1;
					if (
						((i = e.pos + 1),
						(o = e.md.helpers.parseLinkLabel(e, e.pos, !0)) < 0)
					)
						return !1;
					if ((a = o + 1) < f && 40 === e.src.charCodeAt(a)) {
						for (
							m = !1, a++;
							a < f && ((n = e.src.charCodeAt(a)), Ze(n) || 10 === n);
							a++
						);
						if (a >= f) return !1;
						if (
							((d = a),
							(c = e.md.helpers.parseLinkDestination(e.src, a, e.posMax)).ok)
						) {
							for (
								u = e.md.normalizeLink(c.str),
									e.md.validateLink(u) ? (a = c.pos) : (u = ""),
									d = a;
								a < f && ((n = e.src.charCodeAt(a)), Ze(n) || 10 === n);
								a++
							);
							if (
								((c = e.md.helpers.parseLinkTitle(e.src, a, e.posMax)),
								a < f && d !== a && c.ok)
							)
								for (
									p = c.str, a = c.pos;
									a < f && ((n = e.src.charCodeAt(a)), Ze(n) || 10 === n);
									a++
								);
						}
						(a >= f || 41 !== e.src.charCodeAt(a)) && (m = !0), a++;
					}
					if (m) {
						if (void 0 === e.env.references) return !1;
						if (
							(a < f && 91 === e.src.charCodeAt(a)
								? ((d = a + 1),
									(a = e.md.helpers.parseLinkLabel(e, a)) >= 0
										? (s = e.src.slice(d, a++))
										: (a = o + 1))
								: (a = o + 1),
							s || (s = e.src.slice(i, o)),
							!(l = e.env.references[Ve(s)]))
						)
							return (e.pos = h), !1;
						(u = l.href), (p = l.title);
					}
					return (
						r ||
							((e.pos = i),
							(e.posMax = o),
							(e.push("link_open", "a", 1).attrs = t = [["href", u]]),
							p && t.push(["title", p]),
							e.linkLevel++,
							e.md.inline.tokenize(e),
							e.linkLevel--,
							e.push("link_close", "a", -1)),
						(e.pos = a),
						(e.posMax = f),
						!0
					);
				},
			],
			[
				"image",
				function (e, r) {
					var t,
						n,
						s,
						o,
						i,
						a,
						c,
						l,
						u,
						p,
						h,
						f,
						d,
						m = "",
						g = e.pos,
						_ = e.posMax;
					if (33 !== e.src.charCodeAt(e.pos)) return !1;
					if (91 !== e.src.charCodeAt(e.pos + 1)) return !1;
					if (
						((a = e.pos + 2),
						(i = e.md.helpers.parseLinkLabel(e, e.pos + 1, !1)) < 0)
					)
						return !1;
					if ((c = i + 1) < _ && 40 === e.src.charCodeAt(c)) {
						for (
							c++;
							c < _ && ((n = e.src.charCodeAt(c)), Ge(n) || 10 === n);
							c++
						);
						if (c >= _) return !1;
						for (
							d = c,
								(u = e.md.helpers.parseLinkDestination(e.src, c, e.posMax))
									.ok &&
									((m = e.md.normalizeLink(u.str)),
									e.md.validateLink(m) ? (c = u.pos) : (m = "")),
								d = c;
							c < _ && ((n = e.src.charCodeAt(c)), Ge(n) || 10 === n);
							c++
						);
						if (
							((u = e.md.helpers.parseLinkTitle(e.src, c, e.posMax)),
							c < _ && d !== c && u.ok)
						)
							for (
								p = u.str, c = u.pos;
								c < _ && ((n = e.src.charCodeAt(c)), Ge(n) || 10 === n);
								c++
							);
						else p = "";
						if (c >= _ || 41 !== e.src.charCodeAt(c)) return (e.pos = g), !1;
						c++;
					} else {
						if (void 0 === e.env.references) return !1;
						if (
							(c < _ && 91 === e.src.charCodeAt(c)
								? ((d = c + 1),
									(c = e.md.helpers.parseLinkLabel(e, c)) >= 0
										? (o = e.src.slice(d, c++))
										: (c = i + 1))
								: (c = i + 1),
							o || (o = e.src.slice(a, i)),
							!(l = e.env.references[$e(o)]))
						)
							return (e.pos = g), !1;
						(m = l.href), (p = l.title);
					}
					return (
						r ||
							((s = e.src.slice(a, i)),
							e.md.inline.parse(s, e.md, e.env, (f = [])),
							((h = e.push("image", "img", 0)).attrs = t =
								[
									["src", m],
									["alt", ""],
								]),
							(h.children = f),
							(h.content = s),
							p && t.push(["title", p])),
						(e.pos = c),
						(e.posMax = _),
						!0
					);
				},
			],
			[
				"autolink",
				function (e, r) {
					var t,
						n,
						s,
						o,
						i,
						a,
						c = e.pos;
					if (60 !== e.src.charCodeAt(c)) return !1;
					for (i = e.pos, a = e.posMax; ; ) {
						if (++c >= a) return !1;
						if (60 === (o = e.src.charCodeAt(c))) return !1;
						if (62 === o) break;
					}
					return (
						(t = e.src.slice(i + 1, c)),
						Je.test(t)
							? ((n = e.md.normalizeLink(t)),
								!!e.md.validateLink(n) &&
									(r ||
										(((s = e.push("link_open", "a", 1)).attrs = [["href", n]]),
										(s.markup = "autolink"),
										(s.info = "auto"),
										((s = e.push("text", "", 0)).content =
											e.md.normalizeLinkText(t)),
										((s = e.push("link_close", "a", -1)).markup = "autolink"),
										(s.info = "auto")),
									(e.pos += t.length + 2),
									!0))
							: !!He.test(t) &&
								((n = e.md.normalizeLink("mailto:" + t)),
								!!e.md.validateLink(n) &&
									(r ||
										(((s = e.push("link_open", "a", 1)).attrs = [["href", n]]),
										(s.markup = "autolink"),
										(s.info = "auto"),
										((s = e.push("text", "", 0)).content =
											e.md.normalizeLinkText(t)),
										((s = e.push("link_close", "a", -1)).markup = "autolink"),
										(s.info = "auto")),
									(e.pos += t.length + 2),
									!0))
					);
				},
			],
			[
				"html_inline",
				function (e, r) {
					var t,
						n,
						s,
						o,
						i,
						a = e.pos;
					return (
						!!e.md.options.html &&
						((s = e.posMax),
						!(60 !== e.src.charCodeAt(a) || a + 2 >= s) &&
							!(
								33 !== (t = e.src.charCodeAt(a + 1)) &&
								63 !== t &&
								47 !== t &&
								!(function (e) {
									var r = 32 | e;
									return r >= 97 && r <= 122;
								})(t)
							) &&
							!!(n = e.src.slice(a).match(We)) &&
							(r ||
								(((o = e.push("html_inline", "", 0)).content = e.src.slice(
									a,
									a + n[0].length,
								)),
								(i = o.content),
								/^<a[>\s]/i.test(i) && e.linkLevel++,
								(function (e) {
									return /^<\/a\s*>/i.test(e);
								})(o.content) && e.linkLevel--),
							(e.pos += n[0].length),
							!0))
					);
				},
			],
			[
				"entity",
				function (e, t) {
					var n,
						s,
						o,
						i = e.pos,
						a = e.posMax;
					if (38 !== e.src.charCodeAt(i)) return !1;
					if (i + 1 >= a) return !1;
					if (35 === e.src.charCodeAt(i + 1)) {
						if ((s = e.src.slice(i).match(Xe)))
							return (
								t ||
									((n =
										"x" === s[1][0].toLowerCase()
											? parseInt(s[1].slice(1), 16)
											: parseInt(s[1], 10)),
									((o = e.push("text_special", "", 0)).content = Ke(n)
										? Qe(n)
										: Qe(65533)),
									(o.markup = s[0]),
									(o.info = "entity")),
								(e.pos += s[0].length),
								!0
							);
					} else if ((s = e.src.slice(i).match(er)) && Ye(r, s[1]))
						return (
							t ||
								(((o = e.push("text_special", "", 0)).content = r[s[1]]),
								(o.markup = s[0]),
								(o.info = "entity")),
							(e.pos += s[0].length),
							!0
						);
					return !1;
				},
			],
		],
		cr = [
			[
				"balance_pairs",
				function (e) {
					var r,
						t = e.tokens_meta,
						n = e.tokens_meta.length;
					for (rr(0, e.delimiters), r = 0; r < n; r++)
						t[r] && t[r].delimiters && rr(0, t[r].delimiters);
				},
			],
			["strikethrough", Pe.postProcess],
			["emphasis", Ue.postProcess],
			[
				"fragments_join",
				function (e) {
					var r,
						t,
						n = 0,
						s = e.tokens,
						o = e.tokens.length;
					for (r = t = 0; r < o; r++)
						s[r].nesting < 0 && n--,
							(s[r].level = n),
							s[r].nesting > 0 && n++,
							"text" === s[r].type && r + 1 < o && "text" === s[r + 1].type
								? (s[r + 1].content = s[r].content + s[r + 1].content)
								: (r !== t && (s[t] = s[r]), t++);
					r !== t && (s.length = t);
				},
			],
		];
	function lr() {
		var e;
		for (this.ruler = new O(), e = 0; e < ar.length; e++)
			this.ruler.push(ar[e][0], ar[e][1]);
		for (this.ruler2 = new O(), e = 0; e < cr.length; e++)
			this.ruler2.push(cr[e][0], cr[e][1]);
	}
	(lr.prototype.skipToken = function (e) {
		var r,
			t,
			n = e.pos,
			s = this.ruler.getRules(""),
			o = s.length,
			i = e.md.options.maxNesting,
			a = e.cache;
		if (void 0 === a[n]) {
			if (e.level < i)
				for (
					t = 0;
					t < o && (e.level++, (r = s[t](e, !0)), e.level--, !r);
					t++
				);
			else e.pos = e.posMax;
			r || e.pos++, (a[n] = e.pos);
		} else e.pos = a[n];
	}),
		(lr.prototype.tokenize = function (e) {
			for (
				var r,
					t,
					n = this.ruler.getRules(""),
					s = n.length,
					o = e.posMax,
					i = e.md.options.maxNesting;
				e.pos < o;

			) {
				if (e.level < i) for (t = 0; t < s && !(r = n[t](e, !1)); t++);
				if (r) {
					if (e.pos >= o) break;
				} else e.pending += e.src[e.pos++];
			}
			e.pending && e.pushPending();
		}),
		(lr.prototype.parse = function (e, r, t, n) {
			var s,
				o,
				i,
				a = new this.State(e, r, t, n);
			for (
				this.tokenize(a), i = (o = this.ruler2.getRules("")).length, s = 0;
				s < i;
				s++
			)
				o[s](a);
		}),
		(lr.prototype.State = ir);
	var ur = lr;
	function pr(e) {
		var r = Array.prototype.slice.call(arguments, 1);
		return (
			r.forEach(function (r) {
				r &&
					Object.keys(r).forEach(function (t) {
						e[t] = r[t];
					});
			}),
			e
		);
	}
	function hr(e) {
		return Object.prototype.toString.call(e);
	}
	function fr(e) {
		return "[object Function]" === hr(e);
	}
	function dr(e) {
		return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
	}
	var mr = { fuzzyLink: !0, fuzzyEmail: !0, fuzzyIP: !1 };
	var gr = {
			"http:": {
				validate: function (e, r, t) {
					var n = e.slice(r);
					return (
						t.re.http ||
							(t.re.http = new RegExp(
								"^\\/\\/" +
									t.re.src_auth +
									t.re.src_host_port_strict +
									t.re.src_path,
								"i",
							)),
						t.re.http.test(n) ? n.match(t.re.http)[0].length : 0
					);
				},
			},
			"https:": "http:",
			"ftp:": "http:",
			"//": {
				validate: function (e, r, t) {
					var n = e.slice(r);
					return (
						t.re.no_http ||
							(t.re.no_http = new RegExp(
								"^" +
									t.re.src_auth +
									"(?:localhost|(?:(?:" +
									t.re.src_domain +
									")\\.)+" +
									t.re.src_domain_root +
									")" +
									t.re.src_port +
									t.re.src_host_terminator +
									t.re.src_path,
								"i",
							)),
						t.re.no_http.test(n)
							? (r >= 3 && ":" === e[r - 3]) || (r >= 3 && "/" === e[r - 3])
								? 0
								: n.match(t.re.no_http)[0].length
							: 0
					);
				},
			},
			"mailto:": {
				validate: function (e, r, t) {
					var n = e.slice(r);
					return (
						t.re.mailto ||
							(t.re.mailto = new RegExp(
								"^" + t.re.src_email_name + "@" + t.re.src_host_strict,
								"i",
							)),
						t.re.mailto.test(n) ? n.match(t.re.mailto)[0].length : 0
					);
				},
			},
		},
		_r =
			"biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split(
				"|",
			);
	function kr(e) {
		var r = (e.re = (function (e) {
				var r = {};
				return (
					(e = e || {}),
					(r.src_Any = y.source),
					(r.src_Cc = A.source),
					(r.src_Z = x.source),
					(r.src_P = t.source),
					(r.src_ZPCc = [r.src_Z, r.src_P, r.src_Cc].join("|")),
					(r.src_ZCc = [r.src_Z, r.src_Cc].join("|")),
					(r.src_pseudo_letter =
						"(?:(?![><\uff5c]|" + r.src_ZPCc + ")" + r.src_Any + ")"),
					(r.src_ip4 =
						"(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)"),
					(r.src_auth = "(?:(?:(?!" + r.src_ZCc + "|[@/\\[\\]()]).)+@)?"),
					(r.src_port =
						"(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?"),
					(r.src_host_terminator =
						"(?=$|[><\uff5c]|" +
						r.src_ZPCc +
						")(?!" +
						(e["---"] ? "-(?!--)|" : "-|") +
						"_|:\\d|\\.-|\\.(?!$|" +
						r.src_ZPCc +
						"))"),
					(r.src_path =
						"(?:[/?#](?:(?!" +
						r.src_ZCc +
						"|[><\uff5c]|[()[\\]{}.,\"'?!\\-;]).|\\[(?:(?!" +
						r.src_ZCc +
						"|\\]).)*\\]|\\((?:(?!" +
						r.src_ZCc +
						"|[)]).)*\\)|\\{(?:(?!" +
						r.src_ZCc +
						'|[}]).)*\\}|\\"(?:(?!' +
						r.src_ZCc +
						'|["]).)+\\"|\\\'(?:(?!' +
						r.src_ZCc +
						"|[']).)+\\'|\\'(?=" +
						r.src_pseudo_letter +
						"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" +
						r.src_ZCc +
						"|[.]|$)|" +
						(e["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") +
						",(?!" +
						r.src_ZCc +
						"|$)|;(?!" +
						r.src_ZCc +
						"|$)|\\!+(?!" +
						r.src_ZCc +
						"|[!]|$)|\\?(?!" +
						r.src_ZCc +
						"|[?]|$))+|\\/)?"),
					(r.src_email_name =
						'[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*'),
					(r.src_xn = "xn--[a-z0-9\\-]{1,59}"),
					(r.src_domain_root =
						"(?:" + r.src_xn + "|" + r.src_pseudo_letter + "{1,63})"),
					(r.src_domain =
						"(?:" +
						r.src_xn +
						"|(?:" +
						r.src_pseudo_letter +
						")|(?:" +
						r.src_pseudo_letter +
						"(?:-|" +
						r.src_pseudo_letter +
						"){0,61}" +
						r.src_pseudo_letter +
						"))"),
					(r.src_host =
						"(?:(?:(?:(?:" + r.src_domain + ")\\.)*" + r.src_domain + "))"),
					(r.tpl_host_fuzzy =
						"(?:" +
						r.src_ip4 +
						"|(?:(?:(?:" +
						r.src_domain +
						")\\.)+(?:%TLDS%)))"),
					(r.tpl_host_no_ip_fuzzy =
						"(?:(?:(?:" + r.src_domain + ")\\.)+(?:%TLDS%))"),
					(r.src_host_strict = r.src_host + r.src_host_terminator),
					(r.tpl_host_fuzzy_strict = r.tpl_host_fuzzy + r.src_host_terminator),
					(r.src_host_port_strict =
						r.src_host + r.src_port + r.src_host_terminator),
					(r.tpl_host_port_fuzzy_strict =
						r.tpl_host_fuzzy + r.src_port + r.src_host_terminator),
					(r.tpl_host_port_no_ip_fuzzy_strict =
						r.tpl_host_no_ip_fuzzy + r.src_port + r.src_host_terminator),
					(r.tpl_host_fuzzy_test =
						"localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" +
						r.src_ZPCc +
						"|>|$))"),
					(r.tpl_email_fuzzy =
						'(^|[><\uff5c]|"|\\(|' +
						r.src_ZCc +
						")(" +
						r.src_email_name +
						"@" +
						r.tpl_host_fuzzy_strict +
						")"),
					(r.tpl_link_fuzzy =
						"(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|" +
						r.src_ZPCc +
						"))((?![$+<=>^`|\uff5c])" +
						r.tpl_host_port_fuzzy_strict +
						r.src_path +
						")"),
					(r.tpl_link_no_ip_fuzzy =
						"(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|" +
						r.src_ZPCc +
						"))((?![$+<=>^`|\uff5c])" +
						r.tpl_host_port_no_ip_fuzzy_strict +
						r.src_path +
						")"),
					r
				);
			})(e.__opts__)),
			n = e.__tlds__.slice();
		function s(e) {
			return e.replace("%TLDS%", r.src_tlds);
		}
		e.onCompile(),
			e.__tlds_replaced__ ||
				n.push(
					"a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",
				),
			n.push(r.src_xn),
			(r.src_tlds = n.join("|")),
			(r.email_fuzzy = RegExp(s(r.tpl_email_fuzzy), "i")),
			(r.link_fuzzy = RegExp(s(r.tpl_link_fuzzy), "i")),
			(r.link_no_ip_fuzzy = RegExp(s(r.tpl_link_no_ip_fuzzy), "i")),
			(r.host_fuzzy_test = RegExp(s(r.tpl_host_fuzzy_test), "i"));
		var o = [];
		function i(e, r) {
			throw new Error('(LinkifyIt) Invalid schema "' + e + '": ' + r);
		}
		(e.__compiled__ = {}),
			Object.keys(e.__schemas__).forEach(function (r) {
				var t = e.__schemas__[r];
				if (null !== t) {
					var n = { validate: null, link: null };
					if (((e.__compiled__[r] = n), "[object Object]" === hr(t)))
						return (
							!(function (e) {
								return "[object RegExp]" === hr(e);
							})(t.validate)
								? fr(t.validate)
									? (n.validate = t.validate)
									: i(r, t)
								: (n.validate = (function (e) {
										return function (r, t) {
											var n = r.slice(t);
											return e.test(n) ? n.match(e)[0].length : 0;
										};
									})(t.validate)),
							void (fr(t.normalize)
								? (n.normalize = t.normalize)
								: t.normalize
									? i(r, t)
									: (n.normalize = function (e, r) {
											r.normalize(e);
										}))
						);
					!(function (e) {
						return "[object String]" === hr(e);
					})(t)
						? i(r, t)
						: o.push(r);
				}
			}),
			o.forEach(function (r) {
				e.__compiled__[e.__schemas__[r]] &&
					((e.__compiled__[r].validate =
						e.__compiled__[e.__schemas__[r]].validate),
					(e.__compiled__[r].normalize =
						e.__compiled__[e.__schemas__[r]].normalize));
			}),
			(e.__compiled__[""] = {
				validate: null,
				normalize: function (e, r) {
					r.normalize(e);
				},
			});
		var a = Object.keys(e.__compiled__)
			.filter(function (r) {
				return r.length > 0 && e.__compiled__[r];
			})
			.map(dr)
			.join("|");
		(e.re.schema_test = RegExp(
			"(^|(?!_)(?:[><\uff5c]|" + r.src_ZPCc + "))(" + a + ")",
			"i",
		)),
			(e.re.schema_search = RegExp(
				"(^|(?!_)(?:[><\uff5c]|" + r.src_ZPCc + "))(" + a + ")",
				"ig",
			)),
			(e.re.schema_at_start = RegExp("^" + e.re.schema_search.source, "i")),
			(e.re.pretest = RegExp(
				"(" +
					e.re.schema_test.source +
					")|(" +
					e.re.host_fuzzy_test.source +
					")|@",
				"i",
			)),
			(function (e) {
				(e.__index__ = -1), (e.__text_cache__ = "");
			})(e);
	}
	function br(e, r) {
		var t = e.__index__,
			n = e.__last_index__,
			s = e.__text_cache__.slice(t, n);
		(this.schema = e.__schema__.toLowerCase()),
			(this.index = t + r),
			(this.lastIndex = n + r),
			(this.raw = s),
			(this.text = s),
			(this.url = s);
	}
	function vr(e, r) {
		var t = new br(e, r);
		return e.__compiled__[t.schema].normalize(t, e), t;
	}
	function Cr(e, r) {
		if (!(this instanceof Cr)) return new Cr(e, r);
		var t;
		r ||
			((t = e),
			Object.keys(t || {}).reduce(function (e, r) {
				return e || mr.hasOwnProperty(r);
			}, !1) && ((r = e), (e = {}))),
			(this.__opts__ = pr({}, mr, r)),
			(this.__index__ = -1),
			(this.__last_index__ = -1),
			(this.__schema__ = ""),
			(this.__text_cache__ = ""),
			(this.__schemas__ = pr({}, gr, e)),
			(this.__compiled__ = {}),
			(this.__tlds__ = _r),
			(this.__tlds_replaced__ = !1),
			(this.re = {}),
			kr(this);
	}
	(Cr.prototype.add = function (e, r) {
		return (this.__schemas__[e] = r), kr(this), this;
	}),
		(Cr.prototype.set = function (e) {
			return (this.__opts__ = pr(this.__opts__, e)), this;
		}),
		(Cr.prototype.test = function (e) {
			if (((this.__text_cache__ = e), (this.__index__ = -1), !e.length))
				return !1;
			var r, t, n, s, o, i, a, c;
			if (this.re.schema_test.test(e))
				for (
					(a = this.re.schema_search).lastIndex = 0;
					null !== (r = a.exec(e));

				)
					if ((s = this.testSchemaAt(e, r[2], a.lastIndex))) {
						(this.__schema__ = r[2]),
							(this.__index__ = r.index + r[1].length),
							(this.__last_index__ = r.index + r[0].length + s);
						break;
					}
			return (
				this.__opts__.fuzzyLink &&
					this.__compiled__["http:"] &&
					(c = e.search(this.re.host_fuzzy_test)) >= 0 &&
					(this.__index__ < 0 || c < this.__index__) &&
					null !==
						(t = e.match(
							this.__opts__.fuzzyIP
								? this.re.link_fuzzy
								: this.re.link_no_ip_fuzzy,
						)) &&
					((o = t.index + t[1].length),
					(this.__index__ < 0 || o < this.__index__) &&
						((this.__schema__ = ""),
						(this.__index__ = o),
						(this.__last_index__ = t.index + t[0].length))),
				this.__opts__.fuzzyEmail &&
					this.__compiled__["mailto:"] &&
					e.indexOf("@") >= 0 &&
					null !== (n = e.match(this.re.email_fuzzy)) &&
					((o = n.index + n[1].length),
					(i = n.index + n[0].length),
					(this.__index__ < 0 ||
						o < this.__index__ ||
						(o === this.__index__ && i > this.__last_index__)) &&
						((this.__schema__ = "mailto:"),
						(this.__index__ = o),
						(this.__last_index__ = i))),
				this.__index__ >= 0
			);
		}),
		(Cr.prototype.pretest = function (e) {
			return this.re.pretest.test(e);
		}),
		(Cr.prototype.testSchemaAt = function (e, r, t) {
			return this.__compiled__[r.toLowerCase()]
				? this.__compiled__[r.toLowerCase()].validate(e, t, this)
				: 0;
		}),
		(Cr.prototype.match = function (e) {
			var r = 0,
				t = [];
			this.__index__ >= 0 &&
				this.__text_cache__ === e &&
				(t.push(vr(this, r)), (r = this.__last_index__));
			for (var n = r ? e.slice(r) : e; this.test(n); )
				t.push(vr(this, r)),
					(n = n.slice(this.__last_index__)),
					(r += this.__last_index__);
			return t.length ? t : null;
		}),
		(Cr.prototype.matchAtStart = function (e) {
			if (((this.__text_cache__ = e), (this.__index__ = -1), !e.length))
				return null;
			var r = this.re.schema_at_start.exec(e);
			if (!r) return null;
			var t = this.testSchemaAt(e, r[2], r[0].length);
			return t
				? ((this.__schema__ = r[2]),
					(this.__index__ = r.index + r[1].length),
					(this.__last_index__ = r.index + r[0].length + t),
					vr(this, 0))
				: null;
		}),
		(Cr.prototype.tlds = function (e, r) {
			return (
				(e = Array.isArray(e) ? e : [e]),
				r
					? ((this.__tlds__ = this.__tlds__
							.concat(e)
							.sort()
							.filter(function (e, r, t) {
								return e !== t[r - 1];
							})
							.reverse()),
						kr(this),
						this)
					: ((this.__tlds__ = e.slice()),
						(this.__tlds_replaced__ = !0),
						kr(this),
						this)
			);
		}),
		(Cr.prototype.normalize = function (e) {
			e.schema || (e.url = "http://" + e.url),
				"mailto:" !== e.schema ||
					/^mailto:/i.test(e.url) ||
					(e.url = "mailto:" + e.url);
		}),
		(Cr.prototype.onCompile = function () {});
	var yr = Cr,
		Ar = 2147483647,
		xr = 36,
		Dr = /^xn--/,
		wr = /[^\x20-\x7E]/,
		Er = /[\x2E\u3002\uFF0E\uFF61]/g,
		qr = {
			overflow: "Overflow: input needs wider integers to process",
			"not-basic": "Illegal input >= 0x80 (not a basic code point)",
			"invalid-input": "Invalid input",
		},
		Sr = Math.floor,
		Fr = String.fromCharCode;
	/*! https://mths.be/punycode v1.4.1 by @mathias */ function Lr(e) {
		throw new RangeError(qr[e]);
	}
	function zr(e, r) {
		for (var t = e.length, n = []; t--; ) n[t] = r(e[t]);
		return n;
	}
	function Tr(e, r) {
		var t = e.split("@"),
			n = "";
		return (
			t.length > 1 && ((n = t[0] + "@"), (e = t[1])),
			n + zr((e = e.replace(Er, ".")).split("."), r).join(".")
		);
	}
	function Ir(e) {
		for (var r, t, n = [], s = 0, o = e.length; s < o; )
			(r = e.charCodeAt(s++)) >= 55296 && r <= 56319 && s < o
				? 56320 == (64512 & (t = e.charCodeAt(s++)))
					? n.push(((1023 & r) << 10) + (1023 & t) + 65536)
					: (n.push(r), s--)
				: n.push(r);
		return n;
	}
	function Mr(e) {
		return zr(e, function (e) {
			var r = "";
			return (
				e > 65535 &&
					((r += Fr((((e -= 65536) >>> 10) & 1023) | 55296)),
					(e = 56320 | (1023 & e))),
				(r += Fr(e))
			);
		}).join("");
	}
	function Rr(e, r) {
		return e + 22 + 75 * (e < 26) - ((0 != r) << 5);
	}
	function Br(e, r, t) {
		var n = 0;
		for (e = t ? Sr(e / 700) : e >> 1, e += Sr(e / r); e > 455; n += xr)
			e = Sr(e / 35);
		return Sr(n + (36 * e) / (e + 38));
	}
	function Nr(e) {
		var r,
			t,
			n,
			s,
			o,
			i,
			a,
			c,
			l,
			u,
			p,
			h = [],
			f = e.length,
			d = 0,
			m = 128,
			g = 72;
		for ((t = e.lastIndexOf("-")) < 0 && (t = 0), n = 0; n < t; ++n)
			e.charCodeAt(n) >= 128 && Lr("not-basic"), h.push(e.charCodeAt(n));
		for (s = t > 0 ? t + 1 : 0; s < f; ) {
			for (
				o = d, i = 1, a = xr;
				s >= f && Lr("invalid-input"),
					((c =
						(p = e.charCodeAt(s++)) - 48 < 10
							? p - 22
							: p - 65 < 26
								? p - 65
								: p - 97 < 26
									? p - 97
									: xr) >= xr ||
						c > Sr((Ar - d) / i)) &&
						Lr("overflow"),
					(d += c * i),
					!(c < (l = a <= g ? 1 : a >= g + 26 ? 26 : a - g));
				a += xr
			)
				i > Sr(Ar / (u = xr - l)) && Lr("overflow"), (i *= u);
			(g = Br(d - o, (r = h.length + 1), 0 == o)),
				Sr(d / r) > Ar - m && Lr("overflow"),
				(m += Sr(d / r)),
				(d %= r),
				h.splice(d++, 0, m);
		}
		return Mr(h);
	}
	function Or(e) {
		var r,
			t,
			n,
			s,
			o,
			i,
			a,
			c,
			l,
			u,
			p,
			h,
			f,
			d,
			m,
			g = [];
		for (h = (e = Ir(e)).length, r = 128, t = 0, o = 72, i = 0; i < h; ++i)
			(p = e[i]) < 128 && g.push(Fr(p));
		for (n = s = g.length, s && g.push("-"); n < h; ) {
			for (a = Ar, i = 0; i < h; ++i) (p = e[i]) >= r && p < a && (a = p);
			for (
				a - r > Sr((Ar - t) / (f = n + 1)) && Lr("overflow"),
					t += (a - r) * f,
					r = a,
					i = 0;
				i < h;
				++i
			)
				if (((p = e[i]) < r && ++t > Ar && Lr("overflow"), p == r)) {
					for (
						c = t, l = xr;
						!(c < (u = l <= o ? 1 : l >= o + 26 ? 26 : l - o));
						l += xr
					)
						(m = c - u),
							(d = xr - u),
							g.push(Fr(Rr(u + (m % d), 0))),
							(c = Sr(m / d));
					g.push(Fr(Rr(c, 0))), (o = Br(t, f, n == s)), (t = 0), ++n;
				}
			++t, ++r;
		}
		return g.join("");
	}
	function Pr(e) {
		return Tr(e, function (e) {
			return Dr.test(e) ? Nr(e.slice(4).toLowerCase()) : e;
		});
	}
	function jr(e) {
		return Tr(e, function (e) {
			return wr.test(e) ? "xn--" + Or(e) : e;
		});
	}
	var Ur = "1.4.1",
		Vr = { decode: Ir, encode: Mr },
		Zr = {
			version: Ur,
			ucs2: Vr,
			toASCII: jr,
			toUnicode: Pr,
			encode: Or,
			decode: Nr,
		},
		$r = e(
			Object.freeze({
				__proto__: null,
				decode: Nr,
				encode: Or,
				toUnicode: Pr,
				toASCII: jr,
				version: Ur,
				ucs2: Vr,
				default: Zr,
			}),
		),
		Gr = {
			default: {
				options: {
					html: !1,
					xhtmlOut: !1,
					breaks: !1,
					langPrefix: "language-",
					linkify: !1,
					typographer: !1,
					quotes: "\u201c\u201d\u2018\u2019",
					highlight: null,
					maxNesting: 100,
				},
				components: { core: {}, block: {}, inline: {} },
			},
			zero: {
				options: {
					html: !1,
					xhtmlOut: !1,
					breaks: !1,
					langPrefix: "language-",
					linkify: !1,
					typographer: !1,
					quotes: "\u201c\u201d\u2018\u2019",
					highlight: null,
					maxNesting: 20,
				},
				components: {
					core: { rules: ["normalize", "block", "inline", "text_join"] },
					block: { rules: ["paragraph"] },
					inline: {
						rules: ["text"],
						rules2: ["balance_pairs", "fragments_join"],
					},
				},
			},
			commonmark: {
				options: {
					html: !0,
					xhtmlOut: !0,
					breaks: !1,
					langPrefix: "language-",
					linkify: !1,
					typographer: !1,
					quotes: "\u201c\u201d\u2018\u2019",
					highlight: null,
					maxNesting: 20,
				},
				components: {
					core: { rules: ["normalize", "block", "inline", "text_join"] },
					block: {
						rules: [
							"blockquote",
							"code",
							"fence",
							"heading",
							"hr",
							"html_block",
							"lheading",
							"list",
							"reference",
							"paragraph",
						],
					},
					inline: {
						rules: [
							"autolink",
							"backticks",
							"emphasis",
							"entity",
							"escape",
							"html_inline",
							"image",
							"link",
							"newline",
							"text",
						],
						rules2: ["balance_pairs", "emphasis", "fragments_join"],
					},
				},
			},
		},
		Hr = /^(vbscript|javascript|file|data):/,
		Jr = /^data:image\/(gif|png|jpeg|webp);/;
	function Wr(e) {
		var r = e.trim().toLowerCase();
		return !Hr.test(r) || !!Jr.test(r);
	}
	var Yr = ["http:", "https:", "mailto:"];
	function Kr(e) {
		var r = C.parse(e, !0);
		if (r.hostname && (!r.protocol || Yr.indexOf(r.protocol) >= 0))
			try {
				r.hostname = $r.toASCII(r.hostname);
			} catch (e) {}
		return C.encode(C.format(r));
	}
	function Qr(e) {
		var r = C.parse(e, !0);
		if (r.hostname && (!r.protocol || Yr.indexOf(r.protocol) >= 0))
			try {
				r.hostname = $r.toUnicode(r.hostname);
			} catch (e) {}
		return C.decode(C.format(r), C.decode.defaultChars + "%");
	}
	function Xr(e, r) {
		if (!(this instanceof Xr)) return new Xr(e, r);
		r || w.isString(e) || ((r = e || {}), (e = "default")),
			(this.inline = new ur()),
			(this.block = new ze()),
			(this.core = new ue()),
			(this.renderer = new B()),
			(this.linkify = new yr()),
			(this.validateLink = Wr),
			(this.normalizeLink = Kr),
			(this.normalizeLinkText = Qr),
			(this.utils = w),
			(this.helpers = w.assign({}, L)),
			(this.options = {}),
			this.configure(e),
			r && this.set(r);
	}
	return (
		(Xr.prototype.set = function (e) {
			return w.assign(this.options, e), this;
		}),
		(Xr.prototype.configure = function (e) {
			var r,
				t = this;
			if (w.isString(e) && !(e = Gr[(r = e)]))
				throw new Error('Wrong `markdown-it` preset "' + r + '", check name');
			if (!e) throw new Error("Wrong `markdown-it` preset, can't be empty");
			return (
				e.options && t.set(e.options),
				e.components &&
					Object.keys(e.components).forEach(function (r) {
						e.components[r].rules &&
							t[r].ruler.enableOnly(e.components[r].rules),
							e.components[r].rules2 &&
								t[r].ruler2.enableOnly(e.components[r].rules2);
					}),
				this
			);
		}),
		(Xr.prototype.enable = function (e, r) {
			var t = [];
			Array.isArray(e) || (e = [e]),
				["core", "block", "inline"].forEach(function (r) {
					t = t.concat(this[r].ruler.enable(e, !0));
				}, this),
				(t = t.concat(this.inline.ruler2.enable(e, !0)));
			var n = e.filter(function (e) {
				return t.indexOf(e) < 0;
			});
			if (n.length && !r)
				throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + n);
			return this;
		}),
		(Xr.prototype.disable = function (e, r) {
			var t = [];
			Array.isArray(e) || (e = [e]),
				["core", "block", "inline"].forEach(function (r) {
					t = t.concat(this[r].ruler.disable(e, !0));
				}, this),
				(t = t.concat(this.inline.ruler2.disable(e, !0)));
			var n = e.filter(function (e) {
				return t.indexOf(e) < 0;
			});
			if (n.length && !r)
				throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + n);
			return this;
		}),
		(Xr.prototype.use = function (e) {
			var r = [this].concat(Array.prototype.slice.call(arguments, 1));
			return e.apply(e, r), this;
		}),
		(Xr.prototype.parse = function (e, r) {
			if ("string" != typeof e)
				throw new Error("Input data should be a String");
			var t = new this.core.State(e, this, r);
			return this.core.process(t), t.tokens;
		}),
		(Xr.prototype.render = function (e, r) {
			return (
				(r = r || {}), this.renderer.render(this.parse(e, r), this.options, r)
			);
		}),
		(Xr.prototype.parseInline = function (e, r) {
			var t = new this.core.State(e, this, r);
			return (t.inlineMode = !0), this.core.process(t), t.tokens;
		}),
		(Xr.prototype.renderInline = function (e, r) {
			return (
				(r = r || {}),
				this.renderer.render(this.parseInline(e, r), this.options, r)
			);
		}),
		Xr
	);
});

/*! markdown-it-emoji 2.0.2 https://github.com/markdown-it/markdown-it-emoji @license MIT */
!(function (a, e) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = e())
		: "function" == typeof define && define.amd
			? define(e)
			: ((a =
					"undefined" != typeof globalThis
						? globalThis
						: a || self).markdownitEmoji = e());
})(this, function () {
	"use strict";
	var a = {
			100: "\ud83d\udcaf",
			1234: "\ud83d\udd22",
			grinning: "\ud83d\ude00",
			smiley: "\ud83d\ude03",
			smile: "\ud83d\ude04",
			grin: "\ud83d\ude01",
			laughing: "\ud83d\ude06",
			satisfied: "\ud83d\ude06",
			sweat_smile: "\ud83d\ude05",
			rofl: "\ud83e\udd23",
			joy: "\ud83d\ude02",
			slightly_smiling_face: "\ud83d\ude42",
			upside_down_face: "\ud83d\ude43",
			wink: "\ud83d\ude09",
			blush: "\ud83d\ude0a",
			innocent: "\ud83d\ude07",
			smiling_face_with_three_hearts: "\ud83e\udd70",
			heart_eyes: "\ud83d\ude0d",
			star_struck: "\ud83e\udd29",
			kissing_heart: "\ud83d\ude18",
			kissing: "\ud83d\ude17",
			relaxed: "\u263a\ufe0f",
			kissing_closed_eyes: "\ud83d\ude1a",
			kissing_smiling_eyes: "\ud83d\ude19",
			smiling_face_with_tear: "\ud83e\udd72",
			yum: "\ud83d\ude0b",
			stuck_out_tongue: "\ud83d\ude1b",
			stuck_out_tongue_winking_eye: "\ud83d\ude1c",
			zany_face: "\ud83e\udd2a",
			stuck_out_tongue_closed_eyes: "\ud83d\ude1d",
			money_mouth_face: "\ud83e\udd11",
			hugs: "\ud83e\udd17",
			hand_over_mouth: "\ud83e\udd2d",
			shushing_face: "\ud83e\udd2b",
			thinking: "\ud83e\udd14",
			zipper_mouth_face: "\ud83e\udd10",
			raised_eyebrow: "\ud83e\udd28",
			neutral_face: "\ud83d\ude10",
			expressionless: "\ud83d\ude11",
			no_mouth: "\ud83d\ude36",
			smirk: "\ud83d\ude0f",
			unamused: "\ud83d\ude12",
			roll_eyes: "\ud83d\ude44",
			grimacing: "\ud83d\ude2c",
			lying_face: "\ud83e\udd25",
			relieved: "\ud83d\ude0c",
			pensive: "\ud83d\ude14",
			sleepy: "\ud83d\ude2a",
			drooling_face: "\ud83e\udd24",
			sleeping: "\ud83d\ude34",
			mask: "\ud83d\ude37",
			face_with_thermometer: "\ud83e\udd12",
			face_with_head_bandage: "\ud83e\udd15",
			nauseated_face: "\ud83e\udd22",
			vomiting_face: "\ud83e\udd2e",
			sneezing_face: "\ud83e\udd27",
			hot_face: "\ud83e\udd75",
			cold_face: "\ud83e\udd76",
			woozy_face: "\ud83e\udd74",
			dizzy_face: "\ud83d\ude35",
			exploding_head: "\ud83e\udd2f",
			cowboy_hat_face: "\ud83e\udd20",
			partying_face: "\ud83e\udd73",
			disguised_face: "\ud83e\udd78",
			sunglasses: "\ud83d\ude0e",
			nerd_face: "\ud83e\udd13",
			monocle_face: "\ud83e\uddd0",
			confused: "\ud83d\ude15",
			worried: "\ud83d\ude1f",
			slightly_frowning_face: "\ud83d\ude41",
			frowning_face: "\u2639\ufe0f",
			open_mouth: "\ud83d\ude2e",
			hushed: "\ud83d\ude2f",
			astonished: "\ud83d\ude32",
			flushed: "\ud83d\ude33",
			pleading_face: "\ud83e\udd7a",
			frowning: "\ud83d\ude26",
			anguished: "\ud83d\ude27",
			fearful: "\ud83d\ude28",
			cold_sweat: "\ud83d\ude30",
			disappointed_relieved: "\ud83d\ude25",
			cry: "\ud83d\ude22",
			sob: "\ud83d\ude2d",
			scream: "\ud83d\ude31",
			confounded: "\ud83d\ude16",
			persevere: "\ud83d\ude23",
			disappointed: "\ud83d\ude1e",
			sweat: "\ud83d\ude13",
			weary: "\ud83d\ude29",
			tired_face: "\ud83d\ude2b",
			yawning_face: "\ud83e\udd71",
			triumph: "\ud83d\ude24",
			rage: "\ud83d\ude21",
			pout: "\ud83d\ude21",
			angry: "\ud83d\ude20",
			cursing_face: "\ud83e\udd2c",
			smiling_imp: "\ud83d\ude08",
			imp: "\ud83d\udc7f",
			skull: "\ud83d\udc80",
			skull_and_crossbones: "\u2620\ufe0f",
			hankey: "\ud83d\udca9",
			poop: "\ud83d\udca9",
			shit: "\ud83d\udca9",
			clown_face: "\ud83e\udd21",
			japanese_ogre: "\ud83d\udc79",
			japanese_goblin: "\ud83d\udc7a",
			ghost: "\ud83d\udc7b",
			alien: "\ud83d\udc7d",
			space_invader: "\ud83d\udc7e",
			robot: "\ud83e\udd16",
			smiley_cat: "\ud83d\ude3a",
			smile_cat: "\ud83d\ude38",
			joy_cat: "\ud83d\ude39",
			heart_eyes_cat: "\ud83d\ude3b",
			smirk_cat: "\ud83d\ude3c",
			kissing_cat: "\ud83d\ude3d",
			scream_cat: "\ud83d\ude40",
			crying_cat_face: "\ud83d\ude3f",
			pouting_cat: "\ud83d\ude3e",
			see_no_evil: "\ud83d\ude48",
			hear_no_evil: "\ud83d\ude49",
			speak_no_evil: "\ud83d\ude4a",
			kiss: "\ud83d\udc8b",
			love_letter: "\ud83d\udc8c",
			cupid: "\ud83d\udc98",
			gift_heart: "\ud83d\udc9d",
			sparkling_heart: "\ud83d\udc96",
			heartpulse: "\ud83d\udc97",
			heartbeat: "\ud83d\udc93",
			revolving_hearts: "\ud83d\udc9e",
			two_hearts: "\ud83d\udc95",
			heart_decoration: "\ud83d\udc9f",
			heavy_heart_exclamation: "\u2763\ufe0f",
			broken_heart: "\ud83d\udc94",
			heart: "\u2764\ufe0f",
			orange_heart: "\ud83e\udde1",
			yellow_heart: "\ud83d\udc9b",
			green_heart: "\ud83d\udc9a",
			blue_heart: "\ud83d\udc99",
			purple_heart: "\ud83d\udc9c",
			brown_heart: "\ud83e\udd0e",
			black_heart: "\ud83d\udda4",
			white_heart: "\ud83e\udd0d",
			anger: "\ud83d\udca2",
			boom: "\ud83d\udca5",
			collision: "\ud83d\udca5",
			dizzy: "\ud83d\udcab",
			sweat_drops: "\ud83d\udca6",
			dash: "\ud83d\udca8",
			hole: "\ud83d\udd73\ufe0f",
			bomb: "\ud83d\udca3",
			speech_balloon: "\ud83d\udcac",
			eye_speech_bubble: "\ud83d\udc41\ufe0f\u200d\ud83d\udde8\ufe0f",
			left_speech_bubble: "\ud83d\udde8\ufe0f",
			right_anger_bubble: "\ud83d\uddef\ufe0f",
			thought_balloon: "\ud83d\udcad",
			zzz: "\ud83d\udca4",
			wave: "\ud83d\udc4b",
			raised_back_of_hand: "\ud83e\udd1a",
			raised_hand_with_fingers_splayed: "\ud83d\udd90\ufe0f",
			hand: "\u270b",
			raised_hand: "\u270b",
			vulcan_salute: "\ud83d\udd96",
			ok_hand: "\ud83d\udc4c",
			pinched_fingers: "\ud83e\udd0c",
			pinching_hand: "\ud83e\udd0f",
			v: "\u270c\ufe0f",
			crossed_fingers: "\ud83e\udd1e",
			love_you_gesture: "\ud83e\udd1f",
			metal: "\ud83e\udd18",
			call_me_hand: "\ud83e\udd19",
			point_left: "\ud83d\udc48",
			point_right: "\ud83d\udc49",
			point_up_2: "\ud83d\udc46",
			middle_finger: "\ud83d\udd95",
			fu: "\ud83d\udd95",
			point_down: "\ud83d\udc47",
			point_up: "\u261d\ufe0f",
			"+1": "\ud83d\udc4d",
			thumbsup: "\ud83d\udc4d",
			"-1": "\ud83d\udc4e",
			thumbsdown: "\ud83d\udc4e",
			fist_raised: "\u270a",
			fist: "\u270a",
			fist_oncoming: "\ud83d\udc4a",
			facepunch: "\ud83d\udc4a",
			punch: "\ud83d\udc4a",
			fist_left: "\ud83e\udd1b",
			fist_right: "\ud83e\udd1c",
			clap: "\ud83d\udc4f",
			raised_hands: "\ud83d\ude4c",
			open_hands: "\ud83d\udc50",
			palms_up_together: "\ud83e\udd32",
			handshake: "\ud83e\udd1d",
			pray: "\ud83d\ude4f",
			writing_hand: "\u270d\ufe0f",
			nail_care: "\ud83d\udc85",
			selfie: "\ud83e\udd33",
			muscle: "\ud83d\udcaa",
			mechanical_arm: "\ud83e\uddbe",
			mechanical_leg: "\ud83e\uddbf",
			leg: "\ud83e\uddb5",
			foot: "\ud83e\uddb6",
			ear: "\ud83d\udc42",
			ear_with_hearing_aid: "\ud83e\uddbb",
			nose: "\ud83d\udc43",
			brain: "\ud83e\udde0",
			anatomical_heart: "\ud83e\udec0",
			lungs: "\ud83e\udec1",
			tooth: "\ud83e\uddb7",
			bone: "\ud83e\uddb4",
			eyes: "\ud83d\udc40",
			eye: "\ud83d\udc41\ufe0f",
			tongue: "\ud83d\udc45",
			lips: "\ud83d\udc44",
			baby: "\ud83d\udc76",
			child: "\ud83e\uddd2",
			boy: "\ud83d\udc66",
			girl: "\ud83d\udc67",
			adult: "\ud83e\uddd1",
			blond_haired_person: "\ud83d\udc71",
			man: "\ud83d\udc68",
			bearded_person: "\ud83e\uddd4",
			red_haired_man: "\ud83d\udc68\u200d\ud83e\uddb0",
			curly_haired_man: "\ud83d\udc68\u200d\ud83e\uddb1",
			white_haired_man: "\ud83d\udc68\u200d\ud83e\uddb3",
			bald_man: "\ud83d\udc68\u200d\ud83e\uddb2",
			woman: "\ud83d\udc69",
			red_haired_woman: "\ud83d\udc69\u200d\ud83e\uddb0",
			person_red_hair: "\ud83e\uddd1\u200d\ud83e\uddb0",
			curly_haired_woman: "\ud83d\udc69\u200d\ud83e\uddb1",
			person_curly_hair: "\ud83e\uddd1\u200d\ud83e\uddb1",
			white_haired_woman: "\ud83d\udc69\u200d\ud83e\uddb3",
			person_white_hair: "\ud83e\uddd1\u200d\ud83e\uddb3",
			bald_woman: "\ud83d\udc69\u200d\ud83e\uddb2",
			person_bald: "\ud83e\uddd1\u200d\ud83e\uddb2",
			blond_haired_woman: "\ud83d\udc71\u200d\u2640\ufe0f",
			blonde_woman: "\ud83d\udc71\u200d\u2640\ufe0f",
			blond_haired_man: "\ud83d\udc71\u200d\u2642\ufe0f",
			older_adult: "\ud83e\uddd3",
			older_man: "\ud83d\udc74",
			older_woman: "\ud83d\udc75",
			frowning_person: "\ud83d\ude4d",
			frowning_man: "\ud83d\ude4d\u200d\u2642\ufe0f",
			frowning_woman: "\ud83d\ude4d\u200d\u2640\ufe0f",
			pouting_face: "\ud83d\ude4e",
			pouting_man: "\ud83d\ude4e\u200d\u2642\ufe0f",
			pouting_woman: "\ud83d\ude4e\u200d\u2640\ufe0f",
			no_good: "\ud83d\ude45",
			no_good_man: "\ud83d\ude45\u200d\u2642\ufe0f",
			ng_man: "\ud83d\ude45\u200d\u2642\ufe0f",
			no_good_woman: "\ud83d\ude45\u200d\u2640\ufe0f",
			ng_woman: "\ud83d\ude45\u200d\u2640\ufe0f",
			ok_person: "\ud83d\ude46",
			ok_man: "\ud83d\ude46\u200d\u2642\ufe0f",
			ok_woman: "\ud83d\ude46\u200d\u2640\ufe0f",
			tipping_hand_person: "\ud83d\udc81",
			information_desk_person: "\ud83d\udc81",
			tipping_hand_man: "\ud83d\udc81\u200d\u2642\ufe0f",
			sassy_man: "\ud83d\udc81\u200d\u2642\ufe0f",
			tipping_hand_woman: "\ud83d\udc81\u200d\u2640\ufe0f",
			sassy_woman: "\ud83d\udc81\u200d\u2640\ufe0f",
			raising_hand: "\ud83d\ude4b",
			raising_hand_man: "\ud83d\ude4b\u200d\u2642\ufe0f",
			raising_hand_woman: "\ud83d\ude4b\u200d\u2640\ufe0f",
			deaf_person: "\ud83e\uddcf",
			deaf_man: "\ud83e\uddcf\u200d\u2642\ufe0f",
			deaf_woman: "\ud83e\uddcf\u200d\u2640\ufe0f",
			bow: "\ud83d\ude47",
			bowing_man: "\ud83d\ude47\u200d\u2642\ufe0f",
			bowing_woman: "\ud83d\ude47\u200d\u2640\ufe0f",
			facepalm: "\ud83e\udd26",
			man_facepalming: "\ud83e\udd26\u200d\u2642\ufe0f",
			woman_facepalming: "\ud83e\udd26\u200d\u2640\ufe0f",
			shrug: "\ud83e\udd37",
			man_shrugging: "\ud83e\udd37\u200d\u2642\ufe0f",
			woman_shrugging: "\ud83e\udd37\u200d\u2640\ufe0f",
			health_worker: "\ud83e\uddd1\u200d\u2695\ufe0f",
			man_health_worker: "\ud83d\udc68\u200d\u2695\ufe0f",
			woman_health_worker: "\ud83d\udc69\u200d\u2695\ufe0f",
			student: "\ud83e\uddd1\u200d\ud83c\udf93",
			man_student: "\ud83d\udc68\u200d\ud83c\udf93",
			woman_student: "\ud83d\udc69\u200d\ud83c\udf93",
			teacher: "\ud83e\uddd1\u200d\ud83c\udfeb",
			man_teacher: "\ud83d\udc68\u200d\ud83c\udfeb",
			woman_teacher: "\ud83d\udc69\u200d\ud83c\udfeb",
			judge: "\ud83e\uddd1\u200d\u2696\ufe0f",
			man_judge: "\ud83d\udc68\u200d\u2696\ufe0f",
			woman_judge: "\ud83d\udc69\u200d\u2696\ufe0f",
			farmer: "\ud83e\uddd1\u200d\ud83c\udf3e",
			man_farmer: "\ud83d\udc68\u200d\ud83c\udf3e",
			woman_farmer: "\ud83d\udc69\u200d\ud83c\udf3e",
			cook: "\ud83e\uddd1\u200d\ud83c\udf73",
			man_cook: "\ud83d\udc68\u200d\ud83c\udf73",
			woman_cook: "\ud83d\udc69\u200d\ud83c\udf73",
			mechanic: "\ud83e\uddd1\u200d\ud83d\udd27",
			man_mechanic: "\ud83d\udc68\u200d\ud83d\udd27",
			woman_mechanic: "\ud83d\udc69\u200d\ud83d\udd27",
			factory_worker: "\ud83e\uddd1\u200d\ud83c\udfed",
			man_factory_worker: "\ud83d\udc68\u200d\ud83c\udfed",
			woman_factory_worker: "\ud83d\udc69\u200d\ud83c\udfed",
			office_worker: "\ud83e\uddd1\u200d\ud83d\udcbc",
			man_office_worker: "\ud83d\udc68\u200d\ud83d\udcbc",
			woman_office_worker: "\ud83d\udc69\u200d\ud83d\udcbc",
			scientist: "\ud83e\uddd1\u200d\ud83d\udd2c",
			man_scientist: "\ud83d\udc68\u200d\ud83d\udd2c",
			woman_scientist: "\ud83d\udc69\u200d\ud83d\udd2c",
			technologist: "\ud83e\uddd1\u200d\ud83d\udcbb",
			man_technologist: "\ud83d\udc68\u200d\ud83d\udcbb",
			woman_technologist: "\ud83d\udc69\u200d\ud83d\udcbb",
			singer: "\ud83e\uddd1\u200d\ud83c\udfa4",
			man_singer: "\ud83d\udc68\u200d\ud83c\udfa4",
			woman_singer: "\ud83d\udc69\u200d\ud83c\udfa4",
			artist: "\ud83e\uddd1\u200d\ud83c\udfa8",
			man_artist: "\ud83d\udc68\u200d\ud83c\udfa8",
			woman_artist: "\ud83d\udc69\u200d\ud83c\udfa8",
			pilot: "\ud83e\uddd1\u200d\u2708\ufe0f",
			man_pilot: "\ud83d\udc68\u200d\u2708\ufe0f",
			woman_pilot: "\ud83d\udc69\u200d\u2708\ufe0f",
			astronaut: "\ud83e\uddd1\u200d\ud83d\ude80",
			man_astronaut: "\ud83d\udc68\u200d\ud83d\ude80",
			woman_astronaut: "\ud83d\udc69\u200d\ud83d\ude80",
			firefighter: "\ud83e\uddd1\u200d\ud83d\ude92",
			man_firefighter: "\ud83d\udc68\u200d\ud83d\ude92",
			woman_firefighter: "\ud83d\udc69\u200d\ud83d\ude92",
			police_officer: "\ud83d\udc6e",
			cop: "\ud83d\udc6e",
			policeman: "\ud83d\udc6e\u200d\u2642\ufe0f",
			policewoman: "\ud83d\udc6e\u200d\u2640\ufe0f",
			detective: "\ud83d\udd75\ufe0f",
			male_detective: "\ud83d\udd75\ufe0f\u200d\u2642\ufe0f",
			female_detective: "\ud83d\udd75\ufe0f\u200d\u2640\ufe0f",
			guard: "\ud83d\udc82",
			guardsman: "\ud83d\udc82\u200d\u2642\ufe0f",
			guardswoman: "\ud83d\udc82\u200d\u2640\ufe0f",
			ninja: "\ud83e\udd77",
			construction_worker: "\ud83d\udc77",
			construction_worker_man: "\ud83d\udc77\u200d\u2642\ufe0f",
			construction_worker_woman: "\ud83d\udc77\u200d\u2640\ufe0f",
			prince: "\ud83e\udd34",
			princess: "\ud83d\udc78",
			person_with_turban: "\ud83d\udc73",
			man_with_turban: "\ud83d\udc73\u200d\u2642\ufe0f",
			woman_with_turban: "\ud83d\udc73\u200d\u2640\ufe0f",
			man_with_gua_pi_mao: "\ud83d\udc72",
			woman_with_headscarf: "\ud83e\uddd5",
			person_in_tuxedo: "\ud83e\udd35",
			man_in_tuxedo: "\ud83e\udd35\u200d\u2642\ufe0f",
			woman_in_tuxedo: "\ud83e\udd35\u200d\u2640\ufe0f",
			person_with_veil: "\ud83d\udc70",
			man_with_veil: "\ud83d\udc70\u200d\u2642\ufe0f",
			woman_with_veil: "\ud83d\udc70\u200d\u2640\ufe0f",
			bride_with_veil: "\ud83d\udc70\u200d\u2640\ufe0f",
			pregnant_woman: "\ud83e\udd30",
			breast_feeding: "\ud83e\udd31",
			woman_feeding_baby: "\ud83d\udc69\u200d\ud83c\udf7c",
			man_feeding_baby: "\ud83d\udc68\u200d\ud83c\udf7c",
			person_feeding_baby: "\ud83e\uddd1\u200d\ud83c\udf7c",
			angel: "\ud83d\udc7c",
			santa: "\ud83c\udf85",
			mrs_claus: "\ud83e\udd36",
			mx_claus: "\ud83e\uddd1\u200d\ud83c\udf84",
			superhero: "\ud83e\uddb8",
			superhero_man: "\ud83e\uddb8\u200d\u2642\ufe0f",
			superhero_woman: "\ud83e\uddb8\u200d\u2640\ufe0f",
			supervillain: "\ud83e\uddb9",
			supervillain_man: "\ud83e\uddb9\u200d\u2642\ufe0f",
			supervillain_woman: "\ud83e\uddb9\u200d\u2640\ufe0f",
			mage: "\ud83e\uddd9",
			mage_man: "\ud83e\uddd9\u200d\u2642\ufe0f",
			mage_woman: "\ud83e\uddd9\u200d\u2640\ufe0f",
			fairy: "\ud83e\uddda",
			fairy_man: "\ud83e\uddda\u200d\u2642\ufe0f",
			fairy_woman: "\ud83e\uddda\u200d\u2640\ufe0f",
			vampire: "\ud83e\udddb",
			vampire_man: "\ud83e\udddb\u200d\u2642\ufe0f",
			vampire_woman: "\ud83e\udddb\u200d\u2640\ufe0f",
			merperson: "\ud83e\udddc",
			merman: "\ud83e\udddc\u200d\u2642\ufe0f",
			mermaid: "\ud83e\udddc\u200d\u2640\ufe0f",
			elf: "\ud83e\udddd",
			elf_man: "\ud83e\udddd\u200d\u2642\ufe0f",
			elf_woman: "\ud83e\udddd\u200d\u2640\ufe0f",
			genie: "\ud83e\uddde",
			genie_man: "\ud83e\uddde\u200d\u2642\ufe0f",
			genie_woman: "\ud83e\uddde\u200d\u2640\ufe0f",
			zombie: "\ud83e\udddf",
			zombie_man: "\ud83e\udddf\u200d\u2642\ufe0f",
			zombie_woman: "\ud83e\udddf\u200d\u2640\ufe0f",
			massage: "\ud83d\udc86",
			massage_man: "\ud83d\udc86\u200d\u2642\ufe0f",
			massage_woman: "\ud83d\udc86\u200d\u2640\ufe0f",
			haircut: "\ud83d\udc87",
			haircut_man: "\ud83d\udc87\u200d\u2642\ufe0f",
			haircut_woman: "\ud83d\udc87\u200d\u2640\ufe0f",
			walking: "\ud83d\udeb6",
			walking_man: "\ud83d\udeb6\u200d\u2642\ufe0f",
			walking_woman: "\ud83d\udeb6\u200d\u2640\ufe0f",
			standing_person: "\ud83e\uddcd",
			standing_man: "\ud83e\uddcd\u200d\u2642\ufe0f",
			standing_woman: "\ud83e\uddcd\u200d\u2640\ufe0f",
			kneeling_person: "\ud83e\uddce",
			kneeling_man: "\ud83e\uddce\u200d\u2642\ufe0f",
			kneeling_woman: "\ud83e\uddce\u200d\u2640\ufe0f",
			person_with_probing_cane: "\ud83e\uddd1\u200d\ud83e\uddaf",
			man_with_probing_cane: "\ud83d\udc68\u200d\ud83e\uddaf",
			woman_with_probing_cane: "\ud83d\udc69\u200d\ud83e\uddaf",
			person_in_motorized_wheelchair: "\ud83e\uddd1\u200d\ud83e\uddbc",
			man_in_motorized_wheelchair: "\ud83d\udc68\u200d\ud83e\uddbc",
			woman_in_motorized_wheelchair: "\ud83d\udc69\u200d\ud83e\uddbc",
			person_in_manual_wheelchair: "\ud83e\uddd1\u200d\ud83e\uddbd",
			man_in_manual_wheelchair: "\ud83d\udc68\u200d\ud83e\uddbd",
			woman_in_manual_wheelchair: "\ud83d\udc69\u200d\ud83e\uddbd",
			runner: "\ud83c\udfc3",
			running: "\ud83c\udfc3",
			running_man: "\ud83c\udfc3\u200d\u2642\ufe0f",
			running_woman: "\ud83c\udfc3\u200d\u2640\ufe0f",
			woman_dancing: "\ud83d\udc83",
			dancer: "\ud83d\udc83",
			man_dancing: "\ud83d\udd7a",
			business_suit_levitating: "\ud83d\udd74\ufe0f",
			dancers: "\ud83d\udc6f",
			dancing_men: "\ud83d\udc6f\u200d\u2642\ufe0f",
			dancing_women: "\ud83d\udc6f\u200d\u2640\ufe0f",
			sauna_person: "\ud83e\uddd6",
			sauna_man: "\ud83e\uddd6\u200d\u2642\ufe0f",
			sauna_woman: "\ud83e\uddd6\u200d\u2640\ufe0f",
			climbing: "\ud83e\uddd7",
			climbing_man: "\ud83e\uddd7\u200d\u2642\ufe0f",
			climbing_woman: "\ud83e\uddd7\u200d\u2640\ufe0f",
			person_fencing: "\ud83e\udd3a",
			horse_racing: "\ud83c\udfc7",
			skier: "\u26f7\ufe0f",
			snowboarder: "\ud83c\udfc2",
			golfing: "\ud83c\udfcc\ufe0f",
			golfing_man: "\ud83c\udfcc\ufe0f\u200d\u2642\ufe0f",
			golfing_woman: "\ud83c\udfcc\ufe0f\u200d\u2640\ufe0f",
			surfer: "\ud83c\udfc4",
			surfing_man: "\ud83c\udfc4\u200d\u2642\ufe0f",
			surfing_woman: "\ud83c\udfc4\u200d\u2640\ufe0f",
			rowboat: "\ud83d\udea3",
			rowing_man: "\ud83d\udea3\u200d\u2642\ufe0f",
			rowing_woman: "\ud83d\udea3\u200d\u2640\ufe0f",
			swimmer: "\ud83c\udfca",
			swimming_man: "\ud83c\udfca\u200d\u2642\ufe0f",
			swimming_woman: "\ud83c\udfca\u200d\u2640\ufe0f",
			bouncing_ball_person: "\u26f9\ufe0f",
			bouncing_ball_man: "\u26f9\ufe0f\u200d\u2642\ufe0f",
			basketball_man: "\u26f9\ufe0f\u200d\u2642\ufe0f",
			bouncing_ball_woman: "\u26f9\ufe0f\u200d\u2640\ufe0f",
			basketball_woman: "\u26f9\ufe0f\u200d\u2640\ufe0f",
			weight_lifting: "\ud83c\udfcb\ufe0f",
			weight_lifting_man: "\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f",
			weight_lifting_woman: "\ud83c\udfcb\ufe0f\u200d\u2640\ufe0f",
			bicyclist: "\ud83d\udeb4",
			biking_man: "\ud83d\udeb4\u200d\u2642\ufe0f",
			biking_woman: "\ud83d\udeb4\u200d\u2640\ufe0f",
			mountain_bicyclist: "\ud83d\udeb5",
			mountain_biking_man: "\ud83d\udeb5\u200d\u2642\ufe0f",
			mountain_biking_woman: "\ud83d\udeb5\u200d\u2640\ufe0f",
			cartwheeling: "\ud83e\udd38",
			man_cartwheeling: "\ud83e\udd38\u200d\u2642\ufe0f",
			woman_cartwheeling: "\ud83e\udd38\u200d\u2640\ufe0f",
			wrestling: "\ud83e\udd3c",
			men_wrestling: "\ud83e\udd3c\u200d\u2642\ufe0f",
			women_wrestling: "\ud83e\udd3c\u200d\u2640\ufe0f",
			water_polo: "\ud83e\udd3d",
			man_playing_water_polo: "\ud83e\udd3d\u200d\u2642\ufe0f",
			woman_playing_water_polo: "\ud83e\udd3d\u200d\u2640\ufe0f",
			handball_person: "\ud83e\udd3e",
			man_playing_handball: "\ud83e\udd3e\u200d\u2642\ufe0f",
			woman_playing_handball: "\ud83e\udd3e\u200d\u2640\ufe0f",
			juggling_person: "\ud83e\udd39",
			man_juggling: "\ud83e\udd39\u200d\u2642\ufe0f",
			woman_juggling: "\ud83e\udd39\u200d\u2640\ufe0f",
			lotus_position: "\ud83e\uddd8",
			lotus_position_man: "\ud83e\uddd8\u200d\u2642\ufe0f",
			lotus_position_woman: "\ud83e\uddd8\u200d\u2640\ufe0f",
			bath: "\ud83d\udec0",
			sleeping_bed: "\ud83d\udecc",
			people_holding_hands: "\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1",
			two_women_holding_hands: "\ud83d\udc6d",
			couple: "\ud83d\udc6b",
			two_men_holding_hands: "\ud83d\udc6c",
			couplekiss: "\ud83d\udc8f",
			couplekiss_man_woman:
				"\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68",
			couplekiss_man_man:
				"\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68",
			couplekiss_woman_woman:
				"\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69",
			couple_with_heart: "\ud83d\udc91",
			couple_with_heart_woman_man:
				"\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68",
			couple_with_heart_man_man:
				"\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68",
			couple_with_heart_woman_woman:
				"\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69",
			family: "\ud83d\udc6a",
			family_man_woman_boy: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66",
			family_man_woman_girl: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
			family_man_woman_girl_boy:
				"\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66",
			family_man_woman_boy_boy:
				"\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66",
			family_man_woman_girl_girl:
				"\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67",
			family_man_man_boy: "\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66",
			family_man_man_girl: "\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67",
			family_man_man_girl_boy:
				"\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66",
			family_man_man_boy_boy:
				"\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66",
			family_man_man_girl_girl:
				"\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67",
			family_woman_woman_boy:
				"\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66",
			family_woman_woman_girl:
				"\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67",
			family_woman_woman_girl_boy:
				"\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66",
			family_woman_woman_boy_boy:
				"\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66",
			family_woman_woman_girl_girl:
				"\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67",
			family_man_boy: "\ud83d\udc68\u200d\ud83d\udc66",
			family_man_boy_boy: "\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66",
			family_man_girl: "\ud83d\udc68\u200d\ud83d\udc67",
			family_man_girl_boy: "\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66",
			family_man_girl_girl: "\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67",
			family_woman_boy: "\ud83d\udc69\u200d\ud83d\udc66",
			family_woman_boy_boy: "\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66",
			family_woman_girl: "\ud83d\udc69\u200d\ud83d\udc67",
			family_woman_girl_boy: "\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66",
			family_woman_girl_girl:
				"\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67",
			speaking_head: "\ud83d\udde3\ufe0f",
			bust_in_silhouette: "\ud83d\udc64",
			busts_in_silhouette: "\ud83d\udc65",
			people_hugging: "\ud83e\udec2",
			footprints: "\ud83d\udc63",
			monkey_face: "\ud83d\udc35",
			monkey: "\ud83d\udc12",
			gorilla: "\ud83e\udd8d",
			orangutan: "\ud83e\udda7",
			dog: "\ud83d\udc36",
			dog2: "\ud83d\udc15",
			guide_dog: "\ud83e\uddae",
			service_dog: "\ud83d\udc15\u200d\ud83e\uddba",
			poodle: "\ud83d\udc29",
			wolf: "\ud83d\udc3a",
			fox_face: "\ud83e\udd8a",
			raccoon: "\ud83e\udd9d",
			cat: "\ud83d\udc31",
			cat2: "\ud83d\udc08",
			black_cat: "\ud83d\udc08\u200d\u2b1b",
			lion: "\ud83e\udd81",
			tiger: "\ud83d\udc2f",
			tiger2: "\ud83d\udc05",
			leopard: "\ud83d\udc06",
			horse: "\ud83d\udc34",
			racehorse: "\ud83d\udc0e",
			unicorn: "\ud83e\udd84",
			zebra: "\ud83e\udd93",
			deer: "\ud83e\udd8c",
			bison: "\ud83e\uddac",
			cow: "\ud83d\udc2e",
			ox: "\ud83d\udc02",
			water_buffalo: "\ud83d\udc03",
			cow2: "\ud83d\udc04",
			pig: "\ud83d\udc37",
			pig2: "\ud83d\udc16",
			boar: "\ud83d\udc17",
			pig_nose: "\ud83d\udc3d",
			ram: "\ud83d\udc0f",
			sheep: "\ud83d\udc11",
			goat: "\ud83d\udc10",
			dromedary_camel: "\ud83d\udc2a",
			camel: "\ud83d\udc2b",
			llama: "\ud83e\udd99",
			giraffe: "\ud83e\udd92",
			elephant: "\ud83d\udc18",
			mammoth: "\ud83e\udda3",
			rhinoceros: "\ud83e\udd8f",
			hippopotamus: "\ud83e\udd9b",
			mouse: "\ud83d\udc2d",
			mouse2: "\ud83d\udc01",
			rat: "\ud83d\udc00",
			hamster: "\ud83d\udc39",
			rabbit: "\ud83d\udc30",
			rabbit2: "\ud83d\udc07",
			chipmunk: "\ud83d\udc3f\ufe0f",
			beaver: "\ud83e\uddab",
			hedgehog: "\ud83e\udd94",
			bat: "\ud83e\udd87",
			bear: "\ud83d\udc3b",
			polar_bear: "\ud83d\udc3b\u200d\u2744\ufe0f",
			koala: "\ud83d\udc28",
			panda_face: "\ud83d\udc3c",
			sloth: "\ud83e\udda5",
			otter: "\ud83e\udda6",
			skunk: "\ud83e\udda8",
			kangaroo: "\ud83e\udd98",
			badger: "\ud83e\udda1",
			feet: "\ud83d\udc3e",
			paw_prints: "\ud83d\udc3e",
			turkey: "\ud83e\udd83",
			chicken: "\ud83d\udc14",
			rooster: "\ud83d\udc13",
			hatching_chick: "\ud83d\udc23",
			baby_chick: "\ud83d\udc24",
			hatched_chick: "\ud83d\udc25",
			bird: "\ud83d\udc26",
			penguin: "\ud83d\udc27",
			dove: "\ud83d\udd4a\ufe0f",
			eagle: "\ud83e\udd85",
			duck: "\ud83e\udd86",
			swan: "\ud83e\udda2",
			owl: "\ud83e\udd89",
			dodo: "\ud83e\udda4",
			feather: "\ud83e\udeb6",
			flamingo: "\ud83e\udda9",
			peacock: "\ud83e\udd9a",
			parrot: "\ud83e\udd9c",
			frog: "\ud83d\udc38",
			crocodile: "\ud83d\udc0a",
			turtle: "\ud83d\udc22",
			lizard: "\ud83e\udd8e",
			snake: "\ud83d\udc0d",
			dragon_face: "\ud83d\udc32",
			dragon: "\ud83d\udc09",
			sauropod: "\ud83e\udd95",
			"t-rex": "\ud83e\udd96",
			whale: "\ud83d\udc33",
			whale2: "\ud83d\udc0b",
			dolphin: "\ud83d\udc2c",
			flipper: "\ud83d\udc2c",
			seal: "\ud83e\uddad",
			fish: "\ud83d\udc1f",
			tropical_fish: "\ud83d\udc20",
			blowfish: "\ud83d\udc21",
			shark: "\ud83e\udd88",
			octopus: "\ud83d\udc19",
			shell: "\ud83d\udc1a",
			snail: "\ud83d\udc0c",
			butterfly: "\ud83e\udd8b",
			bug: "\ud83d\udc1b",
			ant: "\ud83d\udc1c",
			bee: "\ud83d\udc1d",
			honeybee: "\ud83d\udc1d",
			beetle: "\ud83e\udeb2",
			lady_beetle: "\ud83d\udc1e",
			cricket: "\ud83e\udd97",
			cockroach: "\ud83e\udeb3",
			spider: "\ud83d\udd77\ufe0f",
			spider_web: "\ud83d\udd78\ufe0f",
			scorpion: "\ud83e\udd82",
			mosquito: "\ud83e\udd9f",
			fly: "\ud83e\udeb0",
			worm: "\ud83e\udeb1",
			microbe: "\ud83e\udda0",
			bouquet: "\ud83d\udc90",
			cherry_blossom: "\ud83c\udf38",
			white_flower: "\ud83d\udcae",
			rosette: "\ud83c\udff5\ufe0f",
			rose: "\ud83c\udf39",
			wilted_flower: "\ud83e\udd40",
			hibiscus: "\ud83c\udf3a",
			sunflower: "\ud83c\udf3b",
			blossom: "\ud83c\udf3c",
			tulip: "\ud83c\udf37",
			seedling: "\ud83c\udf31",
			potted_plant: "\ud83e\udeb4",
			evergreen_tree: "\ud83c\udf32",
			deciduous_tree: "\ud83c\udf33",
			palm_tree: "\ud83c\udf34",
			cactus: "\ud83c\udf35",
			ear_of_rice: "\ud83c\udf3e",
			herb: "\ud83c\udf3f",
			shamrock: "\u2618\ufe0f",
			four_leaf_clover: "\ud83c\udf40",
			maple_leaf: "\ud83c\udf41",
			fallen_leaf: "\ud83c\udf42",
			leaves: "\ud83c\udf43",
			grapes: "\ud83c\udf47",
			melon: "\ud83c\udf48",
			watermelon: "\ud83c\udf49",
			tangerine: "\ud83c\udf4a",
			orange: "\ud83c\udf4a",
			mandarin: "\ud83c\udf4a",
			lemon: "\ud83c\udf4b",
			banana: "\ud83c\udf4c",
			pineapple: "\ud83c\udf4d",
			mango: "\ud83e\udd6d",
			apple: "\ud83c\udf4e",
			green_apple: "\ud83c\udf4f",
			pear: "\ud83c\udf50",
			peach: "\ud83c\udf51",
			cherries: "\ud83c\udf52",
			strawberry: "\ud83c\udf53",
			blueberries: "\ud83e\uded0",
			kiwi_fruit: "\ud83e\udd5d",
			tomato: "\ud83c\udf45",
			olive: "\ud83e\uded2",
			coconut: "\ud83e\udd65",
			avocado: "\ud83e\udd51",
			eggplant: "\ud83c\udf46",
			potato: "\ud83e\udd54",
			carrot: "\ud83e\udd55",
			corn: "\ud83c\udf3d",
			hot_pepper: "\ud83c\udf36\ufe0f",
			bell_pepper: "\ud83e\uded1",
			cucumber: "\ud83e\udd52",
			leafy_green: "\ud83e\udd6c",
			broccoli: "\ud83e\udd66",
			garlic: "\ud83e\uddc4",
			onion: "\ud83e\uddc5",
			mushroom: "\ud83c\udf44",
			peanuts: "\ud83e\udd5c",
			chestnut: "\ud83c\udf30",
			bread: "\ud83c\udf5e",
			croissant: "\ud83e\udd50",
			baguette_bread: "\ud83e\udd56",
			flatbread: "\ud83e\uded3",
			pretzel: "\ud83e\udd68",
			bagel: "\ud83e\udd6f",
			pancakes: "\ud83e\udd5e",
			waffle: "\ud83e\uddc7",
			cheese: "\ud83e\uddc0",
			meat_on_bone: "\ud83c\udf56",
			poultry_leg: "\ud83c\udf57",
			cut_of_meat: "\ud83e\udd69",
			bacon: "\ud83e\udd53",
			hamburger: "\ud83c\udf54",
			fries: "\ud83c\udf5f",
			pizza: "\ud83c\udf55",
			hotdog: "\ud83c\udf2d",
			sandwich: "\ud83e\udd6a",
			taco: "\ud83c\udf2e",
			burrito: "\ud83c\udf2f",
			tamale: "\ud83e\uded4",
			stuffed_flatbread: "\ud83e\udd59",
			falafel: "\ud83e\uddc6",
			egg: "\ud83e\udd5a",
			fried_egg: "\ud83c\udf73",
			shallow_pan_of_food: "\ud83e\udd58",
			stew: "\ud83c\udf72",
			fondue: "\ud83e\uded5",
			bowl_with_spoon: "\ud83e\udd63",
			green_salad: "\ud83e\udd57",
			popcorn: "\ud83c\udf7f",
			butter: "\ud83e\uddc8",
			salt: "\ud83e\uddc2",
			canned_food: "\ud83e\udd6b",
			bento: "\ud83c\udf71",
			rice_cracker: "\ud83c\udf58",
			rice_ball: "\ud83c\udf59",
			rice: "\ud83c\udf5a",
			curry: "\ud83c\udf5b",
			ramen: "\ud83c\udf5c",
			spaghetti: "\ud83c\udf5d",
			sweet_potato: "\ud83c\udf60",
			oden: "\ud83c\udf62",
			sushi: "\ud83c\udf63",
			fried_shrimp: "\ud83c\udf64",
			fish_cake: "\ud83c\udf65",
			moon_cake: "\ud83e\udd6e",
			dango: "\ud83c\udf61",
			dumpling: "\ud83e\udd5f",
			fortune_cookie: "\ud83e\udd60",
			takeout_box: "\ud83e\udd61",
			crab: "\ud83e\udd80",
			lobster: "\ud83e\udd9e",
			shrimp: "\ud83e\udd90",
			squid: "\ud83e\udd91",
			oyster: "\ud83e\uddaa",
			icecream: "\ud83c\udf66",
			shaved_ice: "\ud83c\udf67",
			ice_cream: "\ud83c\udf68",
			doughnut: "\ud83c\udf69",
			cookie: "\ud83c\udf6a",
			birthday: "\ud83c\udf82",
			cake: "\ud83c\udf70",
			cupcake: "\ud83e\uddc1",
			pie: "\ud83e\udd67",
			chocolate_bar: "\ud83c\udf6b",
			candy: "\ud83c\udf6c",
			lollipop: "\ud83c\udf6d",
			custard: "\ud83c\udf6e",
			honey_pot: "\ud83c\udf6f",
			baby_bottle: "\ud83c\udf7c",
			milk_glass: "\ud83e\udd5b",
			coffee: "\u2615",
			teapot: "\ud83e\uded6",
			tea: "\ud83c\udf75",
			sake: "\ud83c\udf76",
			champagne: "\ud83c\udf7e",
			wine_glass: "\ud83c\udf77",
			cocktail: "\ud83c\udf78",
			tropical_drink: "\ud83c\udf79",
			beer: "\ud83c\udf7a",
			beers: "\ud83c\udf7b",
			clinking_glasses: "\ud83e\udd42",
			tumbler_glass: "\ud83e\udd43",
			cup_with_straw: "\ud83e\udd64",
			bubble_tea: "\ud83e\uddcb",
			beverage_box: "\ud83e\uddc3",
			mate: "\ud83e\uddc9",
			ice_cube: "\ud83e\uddca",
			chopsticks: "\ud83e\udd62",
			plate_with_cutlery: "\ud83c\udf7d\ufe0f",
			fork_and_knife: "\ud83c\udf74",
			spoon: "\ud83e\udd44",
			hocho: "\ud83d\udd2a",
			knife: "\ud83d\udd2a",
			amphora: "\ud83c\udffa",
			earth_africa: "\ud83c\udf0d",
			earth_americas: "\ud83c\udf0e",
			earth_asia: "\ud83c\udf0f",
			globe_with_meridians: "\ud83c\udf10",
			world_map: "\ud83d\uddfa\ufe0f",
			japan: "\ud83d\uddfe",
			compass: "\ud83e\udded",
			mountain_snow: "\ud83c\udfd4\ufe0f",
			mountain: "\u26f0\ufe0f",
			volcano: "\ud83c\udf0b",
			mount_fuji: "\ud83d\uddfb",
			camping: "\ud83c\udfd5\ufe0f",
			beach_umbrella: "\ud83c\udfd6\ufe0f",
			desert: "\ud83c\udfdc\ufe0f",
			desert_island: "\ud83c\udfdd\ufe0f",
			national_park: "\ud83c\udfde\ufe0f",
			stadium: "\ud83c\udfdf\ufe0f",
			classical_building: "\ud83c\udfdb\ufe0f",
			building_construction: "\ud83c\udfd7\ufe0f",
			bricks: "\ud83e\uddf1",
			rock: "\ud83e\udea8",
			wood: "\ud83e\udeb5",
			hut: "\ud83d\uded6",
			houses: "\ud83c\udfd8\ufe0f",
			derelict_house: "\ud83c\udfda\ufe0f",
			house: "\ud83c\udfe0",
			house_with_garden: "\ud83c\udfe1",
			office: "\ud83c\udfe2",
			post_office: "\ud83c\udfe3",
			european_post_office: "\ud83c\udfe4",
			hospital: "\ud83c\udfe5",
			bank: "\ud83c\udfe6",
			hotel: "\ud83c\udfe8",
			love_hotel: "\ud83c\udfe9",
			convenience_store: "\ud83c\udfea",
			school: "\ud83c\udfeb",
			department_store: "\ud83c\udfec",
			factory: "\ud83c\udfed",
			japanese_castle: "\ud83c\udfef",
			european_castle: "\ud83c\udff0",
			wedding: "\ud83d\udc92",
			tokyo_tower: "\ud83d\uddfc",
			statue_of_liberty: "\ud83d\uddfd",
			church: "\u26ea",
			mosque: "\ud83d\udd4c",
			hindu_temple: "\ud83d\uded5",
			synagogue: "\ud83d\udd4d",
			shinto_shrine: "\u26e9\ufe0f",
			kaaba: "\ud83d\udd4b",
			fountain: "\u26f2",
			tent: "\u26fa",
			foggy: "\ud83c\udf01",
			night_with_stars: "\ud83c\udf03",
			cityscape: "\ud83c\udfd9\ufe0f",
			sunrise_over_mountains: "\ud83c\udf04",
			sunrise: "\ud83c\udf05",
			city_sunset: "\ud83c\udf06",
			city_sunrise: "\ud83c\udf07",
			bridge_at_night: "\ud83c\udf09",
			hotsprings: "\u2668\ufe0f",
			carousel_horse: "\ud83c\udfa0",
			ferris_wheel: "\ud83c\udfa1",
			roller_coaster: "\ud83c\udfa2",
			barber: "\ud83d\udc88",
			circus_tent: "\ud83c\udfaa",
			steam_locomotive: "\ud83d\ude82",
			railway_car: "\ud83d\ude83",
			bullettrain_side: "\ud83d\ude84",
			bullettrain_front: "\ud83d\ude85",
			train2: "\ud83d\ude86",
			metro: "\ud83d\ude87",
			light_rail: "\ud83d\ude88",
			station: "\ud83d\ude89",
			tram: "\ud83d\ude8a",
			monorail: "\ud83d\ude9d",
			mountain_railway: "\ud83d\ude9e",
			train: "\ud83d\ude8b",
			bus: "\ud83d\ude8c",
			oncoming_bus: "\ud83d\ude8d",
			trolleybus: "\ud83d\ude8e",
			minibus: "\ud83d\ude90",
			ambulance: "\ud83d\ude91",
			fire_engine: "\ud83d\ude92",
			police_car: "\ud83d\ude93",
			oncoming_police_car: "\ud83d\ude94",
			taxi: "\ud83d\ude95",
			oncoming_taxi: "\ud83d\ude96",
			car: "\ud83d\ude97",
			red_car: "\ud83d\ude97",
			oncoming_automobile: "\ud83d\ude98",
			blue_car: "\ud83d\ude99",
			pickup_truck: "\ud83d\udefb",
			truck: "\ud83d\ude9a",
			articulated_lorry: "\ud83d\ude9b",
			tractor: "\ud83d\ude9c",
			racing_car: "\ud83c\udfce\ufe0f",
			motorcycle: "\ud83c\udfcd\ufe0f",
			motor_scooter: "\ud83d\udef5",
			manual_wheelchair: "\ud83e\uddbd",
			motorized_wheelchair: "\ud83e\uddbc",
			auto_rickshaw: "\ud83d\udefa",
			bike: "\ud83d\udeb2",
			kick_scooter: "\ud83d\udef4",
			skateboard: "\ud83d\udef9",
			roller_skate: "\ud83d\udefc",
			busstop: "\ud83d\ude8f",
			motorway: "\ud83d\udee3\ufe0f",
			railway_track: "\ud83d\udee4\ufe0f",
			oil_drum: "\ud83d\udee2\ufe0f",
			fuelpump: "\u26fd",
			rotating_light: "\ud83d\udea8",
			traffic_light: "\ud83d\udea5",
			vertical_traffic_light: "\ud83d\udea6",
			stop_sign: "\ud83d\uded1",
			construction: "\ud83d\udea7",
			anchor: "\u2693",
			boat: "\u26f5",
			sailboat: "\u26f5",
			canoe: "\ud83d\udef6",
			speedboat: "\ud83d\udea4",
			passenger_ship: "\ud83d\udef3\ufe0f",
			ferry: "\u26f4\ufe0f",
			motor_boat: "\ud83d\udee5\ufe0f",
			ship: "\ud83d\udea2",
			airplane: "\u2708\ufe0f",
			small_airplane: "\ud83d\udee9\ufe0f",
			flight_departure: "\ud83d\udeeb",
			flight_arrival: "\ud83d\udeec",
			parachute: "\ud83e\ude82",
			seat: "\ud83d\udcba",
			helicopter: "\ud83d\ude81",
			suspension_railway: "\ud83d\ude9f",
			mountain_cableway: "\ud83d\udea0",
			aerial_tramway: "\ud83d\udea1",
			artificial_satellite: "\ud83d\udef0\ufe0f",
			rocket: "\ud83d\ude80",
			flying_saucer: "\ud83d\udef8",
			bellhop_bell: "\ud83d\udece\ufe0f",
			luggage: "\ud83e\uddf3",
			hourglass: "\u231b",
			hourglass_flowing_sand: "\u23f3",
			watch: "\u231a",
			alarm_clock: "\u23f0",
			stopwatch: "\u23f1\ufe0f",
			timer_clock: "\u23f2\ufe0f",
			mantelpiece_clock: "\ud83d\udd70\ufe0f",
			clock12: "\ud83d\udd5b",
			clock1230: "\ud83d\udd67",
			clock1: "\ud83d\udd50",
			clock130: "\ud83d\udd5c",
			clock2: "\ud83d\udd51",
			clock230: "\ud83d\udd5d",
			clock3: "\ud83d\udd52",
			clock330: "\ud83d\udd5e",
			clock4: "\ud83d\udd53",
			clock430: "\ud83d\udd5f",
			clock5: "\ud83d\udd54",
			clock530: "\ud83d\udd60",
			clock6: "\ud83d\udd55",
			clock630: "\ud83d\udd61",
			clock7: "\ud83d\udd56",
			clock730: "\ud83d\udd62",
			clock8: "\ud83d\udd57",
			clock830: "\ud83d\udd63",
			clock9: "\ud83d\udd58",
			clock930: "\ud83d\udd64",
			clock10: "\ud83d\udd59",
			clock1030: "\ud83d\udd65",
			clock11: "\ud83d\udd5a",
			clock1130: "\ud83d\udd66",
			new_moon: "\ud83c\udf11",
			waxing_crescent_moon: "\ud83c\udf12",
			first_quarter_moon: "\ud83c\udf13",
			moon: "\ud83c\udf14",
			waxing_gibbous_moon: "\ud83c\udf14",
			full_moon: "\ud83c\udf15",
			waning_gibbous_moon: "\ud83c\udf16",
			last_quarter_moon: "\ud83c\udf17",
			waning_crescent_moon: "\ud83c\udf18",
			crescent_moon: "\ud83c\udf19",
			new_moon_with_face: "\ud83c\udf1a",
			first_quarter_moon_with_face: "\ud83c\udf1b",
			last_quarter_moon_with_face: "\ud83c\udf1c",
			thermometer: "\ud83c\udf21\ufe0f",
			sunny: "\u2600\ufe0f",
			full_moon_with_face: "\ud83c\udf1d",
			sun_with_face: "\ud83c\udf1e",
			ringed_planet: "\ud83e\ude90",
			star: "\u2b50",
			star2: "\ud83c\udf1f",
			stars: "\ud83c\udf20",
			milky_way: "\ud83c\udf0c",
			cloud: "\u2601\ufe0f",
			partly_sunny: "\u26c5",
			cloud_with_lightning_and_rain: "\u26c8\ufe0f",
			sun_behind_small_cloud: "\ud83c\udf24\ufe0f",
			sun_behind_large_cloud: "\ud83c\udf25\ufe0f",
			sun_behind_rain_cloud: "\ud83c\udf26\ufe0f",
			cloud_with_rain: "\ud83c\udf27\ufe0f",
			cloud_with_snow: "\ud83c\udf28\ufe0f",
			cloud_with_lightning: "\ud83c\udf29\ufe0f",
			tornado: "\ud83c\udf2a\ufe0f",
			fog: "\ud83c\udf2b\ufe0f",
			wind_face: "\ud83c\udf2c\ufe0f",
			cyclone: "\ud83c\udf00",
			rainbow: "\ud83c\udf08",
			closed_umbrella: "\ud83c\udf02",
			open_umbrella: "\u2602\ufe0f",
			umbrella: "\u2614",
			parasol_on_ground: "\u26f1\ufe0f",
			zap: "\u26a1",
			snowflake: "\u2744\ufe0f",
			snowman_with_snow: "\u2603\ufe0f",
			snowman: "\u26c4",
			comet: "\u2604\ufe0f",
			fire: "\ud83d\udd25",
			droplet: "\ud83d\udca7",
			ocean: "\ud83c\udf0a",
			jack_o_lantern: "\ud83c\udf83",
			christmas_tree: "\ud83c\udf84",
			fireworks: "\ud83c\udf86",
			sparkler: "\ud83c\udf87",
			firecracker: "\ud83e\udde8",
			sparkles: "\u2728",
			balloon: "\ud83c\udf88",
			tada: "\ud83c\udf89",
			confetti_ball: "\ud83c\udf8a",
			tanabata_tree: "\ud83c\udf8b",
			bamboo: "\ud83c\udf8d",
			dolls: "\ud83c\udf8e",
			flags: "\ud83c\udf8f",
			wind_chime: "\ud83c\udf90",
			rice_scene: "\ud83c\udf91",
			red_envelope: "\ud83e\udde7",
			ribbon: "\ud83c\udf80",
			gift: "\ud83c\udf81",
			reminder_ribbon: "\ud83c\udf97\ufe0f",
			tickets: "\ud83c\udf9f\ufe0f",
			ticket: "\ud83c\udfab",
			medal_military: "\ud83c\udf96\ufe0f",
			trophy: "\ud83c\udfc6",
			medal_sports: "\ud83c\udfc5",
			"1st_place_medal": "\ud83e\udd47",
			"2nd_place_medal": "\ud83e\udd48",
			"3rd_place_medal": "\ud83e\udd49",
			soccer: "\u26bd",
			baseball: "\u26be",
			softball: "\ud83e\udd4e",
			basketball: "\ud83c\udfc0",
			volleyball: "\ud83c\udfd0",
			football: "\ud83c\udfc8",
			rugby_football: "\ud83c\udfc9",
			tennis: "\ud83c\udfbe",
			flying_disc: "\ud83e\udd4f",
			bowling: "\ud83c\udfb3",
			cricket_game: "\ud83c\udfcf",
			field_hockey: "\ud83c\udfd1",
			ice_hockey: "\ud83c\udfd2",
			lacrosse: "\ud83e\udd4d",
			ping_pong: "\ud83c\udfd3",
			badminton: "\ud83c\udff8",
			boxing_glove: "\ud83e\udd4a",
			martial_arts_uniform: "\ud83e\udd4b",
			goal_net: "\ud83e\udd45",
			golf: "\u26f3",
			ice_skate: "\u26f8\ufe0f",
			fishing_pole_and_fish: "\ud83c\udfa3",
			diving_mask: "\ud83e\udd3f",
			running_shirt_with_sash: "\ud83c\udfbd",
			ski: "\ud83c\udfbf",
			sled: "\ud83d\udef7",
			curling_stone: "\ud83e\udd4c",
			dart: "\ud83c\udfaf",
			yo_yo: "\ud83e\ude80",
			kite: "\ud83e\ude81",
			"8ball": "\ud83c\udfb1",
			crystal_ball: "\ud83d\udd2e",
			magic_wand: "\ud83e\ude84",
			nazar_amulet: "\ud83e\uddff",
			video_game: "\ud83c\udfae",
			joystick: "\ud83d\udd79\ufe0f",
			slot_machine: "\ud83c\udfb0",
			game_die: "\ud83c\udfb2",
			jigsaw: "\ud83e\udde9",
			teddy_bear: "\ud83e\uddf8",
			pinata: "\ud83e\ude85",
			nesting_dolls: "\ud83e\ude86",
			spades: "\u2660\ufe0f",
			hearts: "\u2665\ufe0f",
			diamonds: "\u2666\ufe0f",
			clubs: "\u2663\ufe0f",
			chess_pawn: "\u265f\ufe0f",
			black_joker: "\ud83c\udccf",
			mahjong: "\ud83c\udc04",
			flower_playing_cards: "\ud83c\udfb4",
			performing_arts: "\ud83c\udfad",
			framed_picture: "\ud83d\uddbc\ufe0f",
			art: "\ud83c\udfa8",
			thread: "\ud83e\uddf5",
			sewing_needle: "\ud83e\udea1",
			yarn: "\ud83e\uddf6",
			knot: "\ud83e\udea2",
			eyeglasses: "\ud83d\udc53",
			dark_sunglasses: "\ud83d\udd76\ufe0f",
			goggles: "\ud83e\udd7d",
			lab_coat: "\ud83e\udd7c",
			safety_vest: "\ud83e\uddba",
			necktie: "\ud83d\udc54",
			shirt: "\ud83d\udc55",
			tshirt: "\ud83d\udc55",
			jeans: "\ud83d\udc56",
			scarf: "\ud83e\udde3",
			gloves: "\ud83e\udde4",
			coat: "\ud83e\udde5",
			socks: "\ud83e\udde6",
			dress: "\ud83d\udc57",
			kimono: "\ud83d\udc58",
			sari: "\ud83e\udd7b",
			one_piece_swimsuit: "\ud83e\ude71",
			swim_brief: "\ud83e\ude72",
			shorts: "\ud83e\ude73",
			bikini: "\ud83d\udc59",
			womans_clothes: "\ud83d\udc5a",
			purse: "\ud83d\udc5b",
			handbag: "\ud83d\udc5c",
			pouch: "\ud83d\udc5d",
			shopping: "\ud83d\udecd\ufe0f",
			school_satchel: "\ud83c\udf92",
			thong_sandal: "\ud83e\ude74",
			mans_shoe: "\ud83d\udc5e",
			shoe: "\ud83d\udc5e",
			athletic_shoe: "\ud83d\udc5f",
			hiking_boot: "\ud83e\udd7e",
			flat_shoe: "\ud83e\udd7f",
			high_heel: "\ud83d\udc60",
			sandal: "\ud83d\udc61",
			ballet_shoes: "\ud83e\ude70",
			boot: "\ud83d\udc62",
			crown: "\ud83d\udc51",
			womans_hat: "\ud83d\udc52",
			tophat: "\ud83c\udfa9",
			mortar_board: "\ud83c\udf93",
			billed_cap: "\ud83e\udde2",
			military_helmet: "\ud83e\ude96",
			rescue_worker_helmet: "\u26d1\ufe0f",
			prayer_beads: "\ud83d\udcff",
			lipstick: "\ud83d\udc84",
			ring: "\ud83d\udc8d",
			gem: "\ud83d\udc8e",
			mute: "\ud83d\udd07",
			speaker: "\ud83d\udd08",
			sound: "\ud83d\udd09",
			loud_sound: "\ud83d\udd0a",
			loudspeaker: "\ud83d\udce2",
			mega: "\ud83d\udce3",
			postal_horn: "\ud83d\udcef",
			bell: "\ud83d\udd14",
			no_bell: "\ud83d\udd15",
			musical_score: "\ud83c\udfbc",
			musical_note: "\ud83c\udfb5",
			notes: "\ud83c\udfb6",
			studio_microphone: "\ud83c\udf99\ufe0f",
			level_slider: "\ud83c\udf9a\ufe0f",
			control_knobs: "\ud83c\udf9b\ufe0f",
			microphone: "\ud83c\udfa4",
			headphones: "\ud83c\udfa7",
			radio: "\ud83d\udcfb",
			saxophone: "\ud83c\udfb7",
			accordion: "\ud83e\ude97",
			guitar: "\ud83c\udfb8",
			musical_keyboard: "\ud83c\udfb9",
			trumpet: "\ud83c\udfba",
			violin: "\ud83c\udfbb",
			banjo: "\ud83e\ude95",
			drum: "\ud83e\udd41",
			long_drum: "\ud83e\ude98",
			iphone: "\ud83d\udcf1",
			calling: "\ud83d\udcf2",
			phone: "\u260e\ufe0f",
			telephone: "\u260e\ufe0f",
			telephone_receiver: "\ud83d\udcde",
			pager: "\ud83d\udcdf",
			fax: "\ud83d\udce0",
			battery: "\ud83d\udd0b",
			electric_plug: "\ud83d\udd0c",
			computer: "\ud83d\udcbb",
			desktop_computer: "\ud83d\udda5\ufe0f",
			printer: "\ud83d\udda8\ufe0f",
			keyboard: "\u2328\ufe0f",
			computer_mouse: "\ud83d\uddb1\ufe0f",
			trackball: "\ud83d\uddb2\ufe0f",
			minidisc: "\ud83d\udcbd",
			floppy_disk: "\ud83d\udcbe",
			cd: "\ud83d\udcbf",
			dvd: "\ud83d\udcc0",
			abacus: "\ud83e\uddee",
			movie_camera: "\ud83c\udfa5",
			film_strip: "\ud83c\udf9e\ufe0f",
			film_projector: "\ud83d\udcfd\ufe0f",
			clapper: "\ud83c\udfac",
			tv: "\ud83d\udcfa",
			camera: "\ud83d\udcf7",
			camera_flash: "\ud83d\udcf8",
			video_camera: "\ud83d\udcf9",
			vhs: "\ud83d\udcfc",
			mag: "\ud83d\udd0d",
			mag_right: "\ud83d\udd0e",
			candle: "\ud83d\udd6f\ufe0f",
			bulb: "\ud83d\udca1",
			flashlight: "\ud83d\udd26",
			izakaya_lantern: "\ud83c\udfee",
			lantern: "\ud83c\udfee",
			diya_lamp: "\ud83e\ude94",
			notebook_with_decorative_cover: "\ud83d\udcd4",
			closed_book: "\ud83d\udcd5",
			book: "\ud83d\udcd6",
			open_book: "\ud83d\udcd6",
			green_book: "\ud83d\udcd7",
			blue_book: "\ud83d\udcd8",
			orange_book: "\ud83d\udcd9",
			books: "\ud83d\udcda",
			notebook: "\ud83d\udcd3",
			ledger: "\ud83d\udcd2",
			page_with_curl: "\ud83d\udcc3",
			scroll: "\ud83d\udcdc",
			page_facing_up: "\ud83d\udcc4",
			newspaper: "\ud83d\udcf0",
			newspaper_roll: "\ud83d\uddde\ufe0f",
			bookmark_tabs: "\ud83d\udcd1",
			bookmark: "\ud83d\udd16",
			label: "\ud83c\udff7\ufe0f",
			moneybag: "\ud83d\udcb0",
			coin: "\ud83e\ude99",
			yen: "\ud83d\udcb4",
			dollar: "\ud83d\udcb5",
			euro: "\ud83d\udcb6",
			pound: "\ud83d\udcb7",
			money_with_wings: "\ud83d\udcb8",
			credit_card: "\ud83d\udcb3",
			receipt: "\ud83e\uddfe",
			chart: "\ud83d\udcb9",
			envelope: "\u2709\ufe0f",
			email: "\ud83d\udce7",
			"e-mail": "\ud83d\udce7",
			incoming_envelope: "\ud83d\udce8",
			envelope_with_arrow: "\ud83d\udce9",
			outbox_tray: "\ud83d\udce4",
			inbox_tray: "\ud83d\udce5",
			package: "\ud83d\udce6",
			mailbox: "\ud83d\udceb",
			mailbox_closed: "\ud83d\udcea",
			mailbox_with_mail: "\ud83d\udcec",
			mailbox_with_no_mail: "\ud83d\udced",
			postbox: "\ud83d\udcee",
			ballot_box: "\ud83d\uddf3\ufe0f",
			pencil2: "\u270f\ufe0f",
			black_nib: "\u2712\ufe0f",
			fountain_pen: "\ud83d\udd8b\ufe0f",
			pen: "\ud83d\udd8a\ufe0f",
			paintbrush: "\ud83d\udd8c\ufe0f",
			crayon: "\ud83d\udd8d\ufe0f",
			memo: "\ud83d\udcdd",
			pencil: "\ud83d\udcdd",
			briefcase: "\ud83d\udcbc",
			file_folder: "\ud83d\udcc1",
			open_file_folder: "\ud83d\udcc2",
			card_index_dividers: "\ud83d\uddc2\ufe0f",
			date: "\ud83d\udcc5",
			calendar: "\ud83d\udcc6",
			spiral_notepad: "\ud83d\uddd2\ufe0f",
			spiral_calendar: "\ud83d\uddd3\ufe0f",
			card_index: "\ud83d\udcc7",
			chart_with_upwards_trend: "\ud83d\udcc8",
			chart_with_downwards_trend: "\ud83d\udcc9",
			bar_chart: "\ud83d\udcca",
			clipboard: "\ud83d\udccb",
			pushpin: "\ud83d\udccc",
			round_pushpin: "\ud83d\udccd",
			paperclip: "\ud83d\udcce",
			paperclips: "\ud83d\udd87\ufe0f",
			straight_ruler: "\ud83d\udccf",
			triangular_ruler: "\ud83d\udcd0",
			scissors: "\u2702\ufe0f",
			card_file_box: "\ud83d\uddc3\ufe0f",
			file_cabinet: "\ud83d\uddc4\ufe0f",
			wastebasket: "\ud83d\uddd1\ufe0f",
			lock: "\ud83d\udd12",
			unlock: "\ud83d\udd13",
			lock_with_ink_pen: "\ud83d\udd0f",
			closed_lock_with_key: "\ud83d\udd10",
			key: "\ud83d\udd11",
			old_key: "\ud83d\udddd\ufe0f",
			hammer: "\ud83d\udd28",
			axe: "\ud83e\ude93",
			pick: "\u26cf\ufe0f",
			hammer_and_pick: "\u2692\ufe0f",
			hammer_and_wrench: "\ud83d\udee0\ufe0f",
			dagger: "\ud83d\udde1\ufe0f",
			crossed_swords: "\u2694\ufe0f",
			gun: "\ud83d\udd2b",
			boomerang: "\ud83e\ude83",
			bow_and_arrow: "\ud83c\udff9",
			shield: "\ud83d\udee1\ufe0f",
			carpentry_saw: "\ud83e\ude9a",
			wrench: "\ud83d\udd27",
			screwdriver: "\ud83e\ude9b",
			nut_and_bolt: "\ud83d\udd29",
			gear: "\u2699\ufe0f",
			clamp: "\ud83d\udddc\ufe0f",
			balance_scale: "\u2696\ufe0f",
			probing_cane: "\ud83e\uddaf",
			link: "\ud83d\udd17",
			chains: "\u26d3\ufe0f",
			hook: "\ud83e\ude9d",
			toolbox: "\ud83e\uddf0",
			magnet: "\ud83e\uddf2",
			ladder: "\ud83e\ude9c",
			alembic: "\u2697\ufe0f",
			test_tube: "\ud83e\uddea",
			petri_dish: "\ud83e\uddeb",
			dna: "\ud83e\uddec",
			microscope: "\ud83d\udd2c",
			telescope: "\ud83d\udd2d",
			satellite: "\ud83d\udce1",
			syringe: "\ud83d\udc89",
			drop_of_blood: "\ud83e\ude78",
			pill: "\ud83d\udc8a",
			adhesive_bandage: "\ud83e\ude79",
			stethoscope: "\ud83e\ude7a",
			door: "\ud83d\udeaa",
			elevator: "\ud83d\uded7",
			mirror: "\ud83e\ude9e",
			window: "\ud83e\ude9f",
			bed: "\ud83d\udecf\ufe0f",
			couch_and_lamp: "\ud83d\udecb\ufe0f",
			chair: "\ud83e\ude91",
			toilet: "\ud83d\udebd",
			plunger: "\ud83e\udea0",
			shower: "\ud83d\udebf",
			bathtub: "\ud83d\udec1",
			mouse_trap: "\ud83e\udea4",
			razor: "\ud83e\ude92",
			lotion_bottle: "\ud83e\uddf4",
			safety_pin: "\ud83e\uddf7",
			broom: "\ud83e\uddf9",
			basket: "\ud83e\uddfa",
			roll_of_paper: "\ud83e\uddfb",
			bucket: "\ud83e\udea3",
			soap: "\ud83e\uddfc",
			toothbrush: "\ud83e\udea5",
			sponge: "\ud83e\uddfd",
			fire_extinguisher: "\ud83e\uddef",
			shopping_cart: "\ud83d\uded2",
			smoking: "\ud83d\udeac",
			coffin: "\u26b0\ufe0f",
			headstone: "\ud83e\udea6",
			funeral_urn: "\u26b1\ufe0f",
			moyai: "\ud83d\uddff",
			placard: "\ud83e\udea7",
			atm: "\ud83c\udfe7",
			put_litter_in_its_place: "\ud83d\udeae",
			potable_water: "\ud83d\udeb0",
			wheelchair: "\u267f",
			mens: "\ud83d\udeb9",
			womens: "\ud83d\udeba",
			restroom: "\ud83d\udebb",
			baby_symbol: "\ud83d\udebc",
			wc: "\ud83d\udebe",
			passport_control: "\ud83d\udec2",
			customs: "\ud83d\udec3",
			baggage_claim: "\ud83d\udec4",
			left_luggage: "\ud83d\udec5",
			warning: "\u26a0\ufe0f",
			children_crossing: "\ud83d\udeb8",
			no_entry: "\u26d4",
			no_entry_sign: "\ud83d\udeab",
			no_bicycles: "\ud83d\udeb3",
			no_smoking: "\ud83d\udead",
			do_not_litter: "\ud83d\udeaf",
			"non-potable_water": "\ud83d\udeb1",
			no_pedestrians: "\ud83d\udeb7",
			no_mobile_phones: "\ud83d\udcf5",
			underage: "\ud83d\udd1e",
			radioactive: "\u2622\ufe0f",
			biohazard: "\u2623\ufe0f",
			arrow_up: "\u2b06\ufe0f",
			arrow_upper_right: "\u2197\ufe0f",
			arrow_right: "\u27a1\ufe0f",
			arrow_lower_right: "\u2198\ufe0f",
			arrow_down: "\u2b07\ufe0f",
			arrow_lower_left: "\u2199\ufe0f",
			arrow_left: "\u2b05\ufe0f",
			arrow_upper_left: "\u2196\ufe0f",
			arrow_up_down: "\u2195\ufe0f",
			left_right_arrow: "\u2194\ufe0f",
			leftwards_arrow_with_hook: "\u21a9\ufe0f",
			arrow_right_hook: "\u21aa\ufe0f",
			arrow_heading_up: "\u2934\ufe0f",
			arrow_heading_down: "\u2935\ufe0f",
			arrows_clockwise: "\ud83d\udd03",
			arrows_counterclockwise: "\ud83d\udd04",
			back: "\ud83d\udd19",
			end: "\ud83d\udd1a",
			on: "\ud83d\udd1b",
			soon: "\ud83d\udd1c",
			top: "\ud83d\udd1d",
			place_of_worship: "\ud83d\uded0",
			atom_symbol: "\u269b\ufe0f",
			om: "\ud83d\udd49\ufe0f",
			star_of_david: "\u2721\ufe0f",
			wheel_of_dharma: "\u2638\ufe0f",
			yin_yang: "\u262f\ufe0f",
			latin_cross: "\u271d\ufe0f",
			orthodox_cross: "\u2626\ufe0f",
			star_and_crescent: "\u262a\ufe0f",
			peace_symbol: "\u262e\ufe0f",
			menorah: "\ud83d\udd4e",
			six_pointed_star: "\ud83d\udd2f",
			aries: "\u2648",
			taurus: "\u2649",
			gemini: "\u264a",
			cancer: "\u264b",
			leo: "\u264c",
			virgo: "\u264d",
			libra: "\u264e",
			scorpius: "\u264f",
			sagittarius: "\u2650",
			capricorn: "\u2651",
			aquarius: "\u2652",
			pisces: "\u2653",
			ophiuchus: "\u26ce",
			twisted_rightwards_arrows: "\ud83d\udd00",
			repeat: "\ud83d\udd01",
			repeat_one: "\ud83d\udd02",
			arrow_forward: "\u25b6\ufe0f",
			fast_forward: "\u23e9",
			next_track_button: "\u23ed\ufe0f",
			play_or_pause_button: "\u23ef\ufe0f",
			arrow_backward: "\u25c0\ufe0f",
			rewind: "\u23ea",
			previous_track_button: "\u23ee\ufe0f",
			arrow_up_small: "\ud83d\udd3c",
			arrow_double_up: "\u23eb",
			arrow_down_small: "\ud83d\udd3d",
			arrow_double_down: "\u23ec",
			pause_button: "\u23f8\ufe0f",
			stop_button: "\u23f9\ufe0f",
			record_button: "\u23fa\ufe0f",
			eject_button: "\u23cf\ufe0f",
			cinema: "\ud83c\udfa6",
			low_brightness: "\ud83d\udd05",
			high_brightness: "\ud83d\udd06",
			signal_strength: "\ud83d\udcf6",
			vibration_mode: "\ud83d\udcf3",
			mobile_phone_off: "\ud83d\udcf4",
			female_sign: "\u2640\ufe0f",
			male_sign: "\u2642\ufe0f",
			transgender_symbol: "\u26a7\ufe0f",
			heavy_multiplication_x: "\u2716\ufe0f",
			heavy_plus_sign: "\u2795",
			heavy_minus_sign: "\u2796",
			heavy_division_sign: "\u2797",
			infinity: "\u267e\ufe0f",
			bangbang: "\u203c\ufe0f",
			interrobang: "\u2049\ufe0f",
			question: "\u2753",
			grey_question: "\u2754",
			grey_exclamation: "\u2755",
			exclamation: "\u2757",
			heavy_exclamation_mark: "\u2757",
			wavy_dash: "\u3030\ufe0f",
			currency_exchange: "\ud83d\udcb1",
			heavy_dollar_sign: "\ud83d\udcb2",
			medical_symbol: "\u2695\ufe0f",
			recycle: "\u267b\ufe0f",
			fleur_de_lis: "\u269c\ufe0f",
			trident: "\ud83d\udd31",
			name_badge: "\ud83d\udcdb",
			beginner: "\ud83d\udd30",
			o: "\u2b55",
			white_check_mark: "\u2705",
			ballot_box_with_check: "\u2611\ufe0f",
			heavy_check_mark: "\u2714\ufe0f",
			x: "\u274c",
			negative_squared_cross_mark: "\u274e",
			curly_loop: "\u27b0",
			loop: "\u27bf",
			part_alternation_mark: "\u303d\ufe0f",
			eight_spoked_asterisk: "\u2733\ufe0f",
			eight_pointed_black_star: "\u2734\ufe0f",
			sparkle: "\u2747\ufe0f",
			copyright: "\xa9\ufe0f",
			registered: "\xae\ufe0f",
			tm: "\u2122\ufe0f",
			hash: "#\ufe0f\u20e3",
			asterisk: "*\ufe0f\u20e3",
			zero: "0\ufe0f\u20e3",
			one: "1\ufe0f\u20e3",
			two: "2\ufe0f\u20e3",
			three: "3\ufe0f\u20e3",
			four: "4\ufe0f\u20e3",
			five: "5\ufe0f\u20e3",
			six: "6\ufe0f\u20e3",
			seven: "7\ufe0f\u20e3",
			eight: "8\ufe0f\u20e3",
			nine: "9\ufe0f\u20e3",
			keycap_ten: "\ud83d\udd1f",
			capital_abcd: "\ud83d\udd20",
			abcd: "\ud83d\udd21",
			symbols: "\ud83d\udd23",
			abc: "\ud83d\udd24",
			a: "\ud83c\udd70\ufe0f",
			ab: "\ud83c\udd8e",
			b: "\ud83c\udd71\ufe0f",
			cl: "\ud83c\udd91",
			cool: "\ud83c\udd92",
			free: "\ud83c\udd93",
			information_source: "\u2139\ufe0f",
			id: "\ud83c\udd94",
			m: "\u24c2\ufe0f",
			new: "\ud83c\udd95",
			ng: "\ud83c\udd96",
			o2: "\ud83c\udd7e\ufe0f",
			ok: "\ud83c\udd97",
			parking: "\ud83c\udd7f\ufe0f",
			sos: "\ud83c\udd98",
			up: "\ud83c\udd99",
			vs: "\ud83c\udd9a",
			koko: "\ud83c\ude01",
			sa: "\ud83c\ude02\ufe0f",
			ideograph_advantage: "\ud83c\ude50",
			accept: "\ud83c\ude51",
			congratulations: "\u3297\ufe0f",
			secret: "\u3299\ufe0f",
			u6e80: "\ud83c\ude35",
			red_circle: "\ud83d\udd34",
			orange_circle: "\ud83d\udfe0",
			yellow_circle: "\ud83d\udfe1",
			green_circle: "\ud83d\udfe2",
			large_blue_circle: "\ud83d\udd35",
			purple_circle: "\ud83d\udfe3",
			brown_circle: "\ud83d\udfe4",
			black_circle: "\u26ab",
			white_circle: "\u26aa",
			red_square: "\ud83d\udfe5",
			orange_square: "\ud83d\udfe7",
			yellow_square: "\ud83d\udfe8",
			green_square: "\ud83d\udfe9",
			blue_square: "\ud83d\udfe6",
			purple_square: "\ud83d\udfea",
			brown_square: "\ud83d\udfeb",
			black_large_square: "\u2b1b",
			white_large_square: "\u2b1c",
			black_medium_square: "\u25fc\ufe0f",
			white_medium_square: "\u25fb\ufe0f",
			black_medium_small_square: "\u25fe",
			white_medium_small_square: "\u25fd",
			black_small_square: "\u25aa\ufe0f",
			white_small_square: "\u25ab\ufe0f",
			large_orange_diamond: "\ud83d\udd36",
			large_blue_diamond: "\ud83d\udd37",
			small_orange_diamond: "\ud83d\udd38",
			small_blue_diamond: "\ud83d\udd39",
			small_red_triangle: "\ud83d\udd3a",
			small_red_triangle_down: "\ud83d\udd3b",
			diamond_shape_with_a_dot_inside: "\ud83d\udca0",
			radio_button: "\ud83d\udd18",
			white_square_button: "\ud83d\udd33",
			black_square_button: "\ud83d\udd32",
			checkered_flag: "\ud83c\udfc1",
			triangular_flag_on_post: "\ud83d\udea9",
			crossed_flags: "\ud83c\udf8c",
			black_flag: "\ud83c\udff4",
			white_flag: "\ud83c\udff3\ufe0f",
			rainbow_flag: "\ud83c\udff3\ufe0f\u200d\ud83c\udf08",
			transgender_flag: "\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f",
			pirate_flag: "\ud83c\udff4\u200d\u2620\ufe0f",
			ascension_island: "\ud83c\udde6\ud83c\udde8",
			andorra: "\ud83c\udde6\ud83c\udde9",
			united_arab_emirates: "\ud83c\udde6\ud83c\uddea",
			afghanistan: "\ud83c\udde6\ud83c\uddeb",
			antigua_barbuda: "\ud83c\udde6\ud83c\uddec",
			anguilla: "\ud83c\udde6\ud83c\uddee",
			albania: "\ud83c\udde6\ud83c\uddf1",
			armenia: "\ud83c\udde6\ud83c\uddf2",
			angola: "\ud83c\udde6\ud83c\uddf4",
			antarctica: "\ud83c\udde6\ud83c\uddf6",
			argentina: "\ud83c\udde6\ud83c\uddf7",
			american_samoa: "\ud83c\udde6\ud83c\uddf8",
			austria: "\ud83c\udde6\ud83c\uddf9",
			australia: "\ud83c\udde6\ud83c\uddfa",
			aruba: "\ud83c\udde6\ud83c\uddfc",
			aland_islands: "\ud83c\udde6\ud83c\uddfd",
			azerbaijan: "\ud83c\udde6\ud83c\uddff",
			bosnia_herzegovina: "\ud83c\udde7\ud83c\udde6",
			barbados: "\ud83c\udde7\ud83c\udde7",
			bangladesh: "\ud83c\udde7\ud83c\udde9",
			belgium: "\ud83c\udde7\ud83c\uddea",
			burkina_faso: "\ud83c\udde7\ud83c\uddeb",
			bulgaria: "\ud83c\udde7\ud83c\uddec",
			bahrain: "\ud83c\udde7\ud83c\udded",
			burundi: "\ud83c\udde7\ud83c\uddee",
			benin: "\ud83c\udde7\ud83c\uddef",
			st_barthelemy: "\ud83c\udde7\ud83c\uddf1",
			bermuda: "\ud83c\udde7\ud83c\uddf2",
			brunei: "\ud83c\udde7\ud83c\uddf3",
			bolivia: "\ud83c\udde7\ud83c\uddf4",
			caribbean_netherlands: "\ud83c\udde7\ud83c\uddf6",
			brazil: "\ud83c\udde7\ud83c\uddf7",
			bahamas: "\ud83c\udde7\ud83c\uddf8",
			bhutan: "\ud83c\udde7\ud83c\uddf9",
			bouvet_island: "\ud83c\udde7\ud83c\uddfb",
			botswana: "\ud83c\udde7\ud83c\uddfc",
			belarus: "\ud83c\udde7\ud83c\uddfe",
			belize: "\ud83c\udde7\ud83c\uddff",
			canada: "\ud83c\udde8\ud83c\udde6",
			cocos_islands: "\ud83c\udde8\ud83c\udde8",
			congo_kinshasa: "\ud83c\udde8\ud83c\udde9",
			central_african_republic: "\ud83c\udde8\ud83c\uddeb",
			congo_brazzaville: "\ud83c\udde8\ud83c\uddec",
			switzerland: "\ud83c\udde8\ud83c\udded",
			cote_divoire: "\ud83c\udde8\ud83c\uddee",
			cook_islands: "\ud83c\udde8\ud83c\uddf0",
			chile: "\ud83c\udde8\ud83c\uddf1",
			cameroon: "\ud83c\udde8\ud83c\uddf2",
			cn: "\ud83c\udde8\ud83c\uddf3",
			colombia: "\ud83c\udde8\ud83c\uddf4",
			clipperton_island: "\ud83c\udde8\ud83c\uddf5",
			costa_rica: "\ud83c\udde8\ud83c\uddf7",
			cuba: "\ud83c\udde8\ud83c\uddfa",
			cape_verde: "\ud83c\udde8\ud83c\uddfb",
			curacao: "\ud83c\udde8\ud83c\uddfc",
			christmas_island: "\ud83c\udde8\ud83c\uddfd",
			cyprus: "\ud83c\udde8\ud83c\uddfe",
			czech_republic: "\ud83c\udde8\ud83c\uddff",
			de: "\ud83c\udde9\ud83c\uddea",
			diego_garcia: "\ud83c\udde9\ud83c\uddec",
			djibouti: "\ud83c\udde9\ud83c\uddef",
			denmark: "\ud83c\udde9\ud83c\uddf0",
			dominica: "\ud83c\udde9\ud83c\uddf2",
			dominican_republic: "\ud83c\udde9\ud83c\uddf4",
			algeria: "\ud83c\udde9\ud83c\uddff",
			ceuta_melilla: "\ud83c\uddea\ud83c\udde6",
			ecuador: "\ud83c\uddea\ud83c\udde8",
			estonia: "\ud83c\uddea\ud83c\uddea",
			egypt: "\ud83c\uddea\ud83c\uddec",
			western_sahara: "\ud83c\uddea\ud83c\udded",
			eritrea: "\ud83c\uddea\ud83c\uddf7",
			es: "\ud83c\uddea\ud83c\uddf8",
			ethiopia: "\ud83c\uddea\ud83c\uddf9",
			eu: "\ud83c\uddea\ud83c\uddfa",
			european_union: "\ud83c\uddea\ud83c\uddfa",
			finland: "\ud83c\uddeb\ud83c\uddee",
			fiji: "\ud83c\uddeb\ud83c\uddef",
			falkland_islands: "\ud83c\uddeb\ud83c\uddf0",
			micronesia: "\ud83c\uddeb\ud83c\uddf2",
			faroe_islands: "\ud83c\uddeb\ud83c\uddf4",
			fr: "\ud83c\uddeb\ud83c\uddf7",
			gabon: "\ud83c\uddec\ud83c\udde6",
			gb: "\ud83c\uddec\ud83c\udde7",
			uk: "\ud83c\uddec\ud83c\udde7",
			grenada: "\ud83c\uddec\ud83c\udde9",
			georgia: "\ud83c\uddec\ud83c\uddea",
			french_guiana: "\ud83c\uddec\ud83c\uddeb",
			guernsey: "\ud83c\uddec\ud83c\uddec",
			ghana: "\ud83c\uddec\ud83c\udded",
			gibraltar: "\ud83c\uddec\ud83c\uddee",
			greenland: "\ud83c\uddec\ud83c\uddf1",
			gambia: "\ud83c\uddec\ud83c\uddf2",
			guinea: "\ud83c\uddec\ud83c\uddf3",
			guadeloupe: "\ud83c\uddec\ud83c\uddf5",
			equatorial_guinea: "\ud83c\uddec\ud83c\uddf6",
			greece: "\ud83c\uddec\ud83c\uddf7",
			south_georgia_south_sandwich_islands: "\ud83c\uddec\ud83c\uddf8",
			guatemala: "\ud83c\uddec\ud83c\uddf9",
			guam: "\ud83c\uddec\ud83c\uddfa",
			guinea_bissau: "\ud83c\uddec\ud83c\uddfc",
			guyana: "\ud83c\uddec\ud83c\uddfe",
			hong_kong: "\ud83c\udded\ud83c\uddf0",
			heard_mcdonald_islands: "\ud83c\udded\ud83c\uddf2",
			honduras: "\ud83c\udded\ud83c\uddf3",
			croatia: "\ud83c\udded\ud83c\uddf7",
			haiti: "\ud83c\udded\ud83c\uddf9",
			hungary: "\ud83c\udded\ud83c\uddfa",
			canary_islands: "\ud83c\uddee\ud83c\udde8",
			indonesia: "\ud83c\uddee\ud83c\udde9",
			ireland: "\ud83c\uddee\ud83c\uddea",
			israel: "\ud83c\uddee\ud83c\uddf1",
			isle_of_man: "\ud83c\uddee\ud83c\uddf2",
			india: "\ud83c\uddee\ud83c\uddf3",
			british_indian_ocean_territory: "\ud83c\uddee\ud83c\uddf4",
			iraq: "\ud83c\uddee\ud83c\uddf6",
			iran: "\ud83c\uddee\ud83c\uddf7",
			iceland: "\ud83c\uddee\ud83c\uddf8",
			it: "\ud83c\uddee\ud83c\uddf9",
			jersey: "\ud83c\uddef\ud83c\uddea",
			jamaica: "\ud83c\uddef\ud83c\uddf2",
			jordan: "\ud83c\uddef\ud83c\uddf4",
			jp: "\ud83c\uddef\ud83c\uddf5",
			kenya: "\ud83c\uddf0\ud83c\uddea",
			kyrgyzstan: "\ud83c\uddf0\ud83c\uddec",
			cambodia: "\ud83c\uddf0\ud83c\udded",
			kiribati: "\ud83c\uddf0\ud83c\uddee",
			comoros: "\ud83c\uddf0\ud83c\uddf2",
			st_kitts_nevis: "\ud83c\uddf0\ud83c\uddf3",
			north_korea: "\ud83c\uddf0\ud83c\uddf5",
			kr: "\ud83c\uddf0\ud83c\uddf7",
			kuwait: "\ud83c\uddf0\ud83c\uddfc",
			cayman_islands: "\ud83c\uddf0\ud83c\uddfe",
			kazakhstan: "\ud83c\uddf0\ud83c\uddff",
			laos: "\ud83c\uddf1\ud83c\udde6",
			lebanon: "\ud83c\uddf1\ud83c\udde7",
			st_lucia: "\ud83c\uddf1\ud83c\udde8",
			liechtenstein: "\ud83c\uddf1\ud83c\uddee",
			sri_lanka: "\ud83c\uddf1\ud83c\uddf0",
			liberia: "\ud83c\uddf1\ud83c\uddf7",
			lesotho: "\ud83c\uddf1\ud83c\uddf8",
			lithuania: "\ud83c\uddf1\ud83c\uddf9",
			luxembourg: "\ud83c\uddf1\ud83c\uddfa",
			latvia: "\ud83c\uddf1\ud83c\uddfb",
			libya: "\ud83c\uddf1\ud83c\uddfe",
			morocco: "\ud83c\uddf2\ud83c\udde6",
			monaco: "\ud83c\uddf2\ud83c\udde8",
			moldova: "\ud83c\uddf2\ud83c\udde9",
			montenegro: "\ud83c\uddf2\ud83c\uddea",
			st_martin: "\ud83c\uddf2\ud83c\uddeb",
			madagascar: "\ud83c\uddf2\ud83c\uddec",
			marshall_islands: "\ud83c\uddf2\ud83c\udded",
			macedonia: "\ud83c\uddf2\ud83c\uddf0",
			mali: "\ud83c\uddf2\ud83c\uddf1",
			myanmar: "\ud83c\uddf2\ud83c\uddf2",
			mongolia: "\ud83c\uddf2\ud83c\uddf3",
			macau: "\ud83c\uddf2\ud83c\uddf4",
			northern_mariana_islands: "\ud83c\uddf2\ud83c\uddf5",
			martinique: "\ud83c\uddf2\ud83c\uddf6",
			mauritania: "\ud83c\uddf2\ud83c\uddf7",
			montserrat: "\ud83c\uddf2\ud83c\uddf8",
			malta: "\ud83c\uddf2\ud83c\uddf9",
			mauritius: "\ud83c\uddf2\ud83c\uddfa",
			maldives: "\ud83c\uddf2\ud83c\uddfb",
			malawi: "\ud83c\uddf2\ud83c\uddfc",
			mexico: "\ud83c\uddf2\ud83c\uddfd",
			malaysia: "\ud83c\uddf2\ud83c\uddfe",
			mozambique: "\ud83c\uddf2\ud83c\uddff",
			namibia: "\ud83c\uddf3\ud83c\udde6",
			new_caledonia: "\ud83c\uddf3\ud83c\udde8",
			niger: "\ud83c\uddf3\ud83c\uddea",
			norfolk_island: "\ud83c\uddf3\ud83c\uddeb",
			nigeria: "\ud83c\uddf3\ud83c\uddec",
			nicaragua: "\ud83c\uddf3\ud83c\uddee",
			netherlands: "\ud83c\uddf3\ud83c\uddf1",
			norway: "\ud83c\uddf3\ud83c\uddf4",
			nepal: "\ud83c\uddf3\ud83c\uddf5",
			nauru: "\ud83c\uddf3\ud83c\uddf7",
			niue: "\ud83c\uddf3\ud83c\uddfa",
			new_zealand: "\ud83c\uddf3\ud83c\uddff",
			oman: "\ud83c\uddf4\ud83c\uddf2",
			panama: "\ud83c\uddf5\ud83c\udde6",
			peru: "\ud83c\uddf5\ud83c\uddea",
			french_polynesia: "\ud83c\uddf5\ud83c\uddeb",
			papua_new_guinea: "\ud83c\uddf5\ud83c\uddec",
			philippines: "\ud83c\uddf5\ud83c\udded",
			pakistan: "\ud83c\uddf5\ud83c\uddf0",
			poland: "\ud83c\uddf5\ud83c\uddf1",
			st_pierre_miquelon: "\ud83c\uddf5\ud83c\uddf2",
			pitcairn_islands: "\ud83c\uddf5\ud83c\uddf3",
			puerto_rico: "\ud83c\uddf5\ud83c\uddf7",
			palestinian_territories: "\ud83c\uddf5\ud83c\uddf8",
			portugal: "\ud83c\uddf5\ud83c\uddf9",
			palau: "\ud83c\uddf5\ud83c\uddfc",
			paraguay: "\ud83c\uddf5\ud83c\uddfe",
			qatar: "\ud83c\uddf6\ud83c\udde6",
			reunion: "\ud83c\uddf7\ud83c\uddea",
			romania: "\ud83c\uddf7\ud83c\uddf4",
			serbia: "\ud83c\uddf7\ud83c\uddf8",
			ru: "\ud83c\uddf7\ud83c\uddfa",
			rwanda: "\ud83c\uddf7\ud83c\uddfc",
			saudi_arabia: "\ud83c\uddf8\ud83c\udde6",
			solomon_islands: "\ud83c\uddf8\ud83c\udde7",
			seychelles: "\ud83c\uddf8\ud83c\udde8",
			sudan: "\ud83c\uddf8\ud83c\udde9",
			sweden: "\ud83c\uddf8\ud83c\uddea",
			singapore: "\ud83c\uddf8\ud83c\uddec",
			st_helena: "\ud83c\uddf8\ud83c\udded",
			slovenia: "\ud83c\uddf8\ud83c\uddee",
			svalbard_jan_mayen: "\ud83c\uddf8\ud83c\uddef",
			slovakia: "\ud83c\uddf8\ud83c\uddf0",
			sierra_leone: "\ud83c\uddf8\ud83c\uddf1",
			san_marino: "\ud83c\uddf8\ud83c\uddf2",
			senegal: "\ud83c\uddf8\ud83c\uddf3",
			somalia: "\ud83c\uddf8\ud83c\uddf4",
			suriname: "\ud83c\uddf8\ud83c\uddf7",
			south_sudan: "\ud83c\uddf8\ud83c\uddf8",
			sao_tome_principe: "\ud83c\uddf8\ud83c\uddf9",
			el_salvador: "\ud83c\uddf8\ud83c\uddfb",
			sint_maarten: "\ud83c\uddf8\ud83c\uddfd",
			syria: "\ud83c\uddf8\ud83c\uddfe",
			swaziland: "\ud83c\uddf8\ud83c\uddff",
			tristan_da_cunha: "\ud83c\uddf9\ud83c\udde6",
			turks_caicos_islands: "\ud83c\uddf9\ud83c\udde8",
			chad: "\ud83c\uddf9\ud83c\udde9",
			french_southern_territories: "\ud83c\uddf9\ud83c\uddeb",
			togo: "\ud83c\uddf9\ud83c\uddec",
			thailand: "\ud83c\uddf9\ud83c\udded",
			tajikistan: "\ud83c\uddf9\ud83c\uddef",
			tokelau: "\ud83c\uddf9\ud83c\uddf0",
			timor_leste: "\ud83c\uddf9\ud83c\uddf1",
			turkmenistan: "\ud83c\uddf9\ud83c\uddf2",
			tunisia: "\ud83c\uddf9\ud83c\uddf3",
			tonga: "\ud83c\uddf9\ud83c\uddf4",
			tr: "\ud83c\uddf9\ud83c\uddf7",
			trinidad_tobago: "\ud83c\uddf9\ud83c\uddf9",
			tuvalu: "\ud83c\uddf9\ud83c\uddfb",
			taiwan: "\ud83c\uddf9\ud83c\uddfc",
			tanzania: "\ud83c\uddf9\ud83c\uddff",
			ukraine: "\ud83c\uddfa\ud83c\udde6",
			uganda: "\ud83c\uddfa\ud83c\uddec",
			us_outlying_islands: "\ud83c\uddfa\ud83c\uddf2",
			united_nations: "\ud83c\uddfa\ud83c\uddf3",
			us: "\ud83c\uddfa\ud83c\uddf8",
			uruguay: "\ud83c\uddfa\ud83c\uddfe",
			uzbekistan: "\ud83c\uddfa\ud83c\uddff",
			vatican_city: "\ud83c\uddfb\ud83c\udde6",
			st_vincent_grenadines: "\ud83c\uddfb\ud83c\udde8",
			venezuela: "\ud83c\uddfb\ud83c\uddea",
			british_virgin_islands: "\ud83c\uddfb\ud83c\uddec",
			us_virgin_islands: "\ud83c\uddfb\ud83c\uddee",
			vietnam: "\ud83c\uddfb\ud83c\uddf3",
			vanuatu: "\ud83c\uddfb\ud83c\uddfa",
			wallis_futuna: "\ud83c\uddfc\ud83c\uddeb",
			samoa: "\ud83c\uddfc\ud83c\uddf8",
			kosovo: "\ud83c\uddfd\ud83c\uddf0",
			yemen: "\ud83c\uddfe\ud83c\uddea",
			mayotte: "\ud83c\uddfe\ud83c\uddf9",
			south_africa: "\ud83c\uddff\ud83c\udde6",
			zambia: "\ud83c\uddff\ud83c\uddf2",
			zimbabwe: "\ud83c\uddff\ud83c\uddfc",
			england:
				"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f",
			scotland:
				"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f",
			wales:
				"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f",
		},
		e = {
			angry: [">:(", ">:-("],
			blush: [':")', ':-")'],
			broken_heart: ["</3", "<\\3"],
			confused: [":/", ":-/"],
			cry: [":'(", ":'-(", ":,(", ":,-("],
			frowning: [":(", ":-("],
			heart: ["<3"],
			imp: ["]:(", "]:-("],
			innocent: ["o:)", "O:)", "o:-)", "O:-)", "0:)", "0:-)"],
			joy: [":')", ":'-)", ":,)", ":,-)", ":'D", ":'-D", ":,D", ":,-D"],
			kissing: [":*", ":-*"],
			laughing: ["x-)", "X-)"],
			neutral_face: [":|", ":-|"],
			open_mouth: [":o", ":-o", ":O", ":-O"],
			rage: [":@", ":-@"],
			smile: [":D", ":-D"],
			smiley: [":)", ":-)"],
			smiling_imp: ["]:)", "]:-)"],
			sob: [":,'(", ":,'-(", ";(", ";-("],
			stuck_out_tongue: [":P", ":-P"],
			sunglasses: ["8-)", "B-)"],
			sweat: [",:(", ",:-("],
			sweat_smile: [",:)", ",:-)"],
			unamused: [":s", ":-S", ":z", ":-Z", ":$", ":-$"],
			wink: [";)", ";-)"],
		},
		n = function (a, e) {
			return a[e].content;
		};
	var o = function (a, e) {
		var o = (function (a) {
			var e,
				n = a.defs;
			a.enabled.length &&
				(n = Object.keys(n).reduce(function (e, o) {
					return a.enabled.indexOf(o) >= 0 && (e[o] = n[o]), e;
				}, {})),
				(e = Object.keys(a.shortcuts).reduce(function (e, o) {
					return n[o]
						? Array.isArray(a.shortcuts[o])
							? (a.shortcuts[o].forEach(function (a) {
									e[a] = o;
								}),
								e)
							: ((e[a.shortcuts[o]] = o), e)
						: e;
				}, {}));
			var o,
				i = Object.keys(n);
			o =
				0 === i.length
					? "^$"
					: i
							.map(function (a) {
								return ":" + a + ":";
							})
							.concat(Object.keys(e))
							.sort()
							.reverse()
							.map(function (a) {
								return a.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
							})
							.join("|");
			var _ = RegExp(o),
				r = RegExp(o, "g");
			return { defs: n, shortcuts: e, scanRE: _, replaceRE: r };
		})(a.utils.assign({}, { defs: {}, shortcuts: {}, enabled: [] }, e || {}));
		(a.renderer.rules.emoji = n),
			a.core.ruler.after(
				"linkify",
				"emoji",
				(function (a, e, n, o, i) {
					var _ = a.utils.arrayReplaceAt,
						r = a.utils.lib.ucmicro,
						t = new RegExp([r.Z.source, r.P.source, r.Cc.source].join("|"));
					function s(a, o, _) {
						var r,
							s = 0,
							l = [];
						return (
							a.replace(i, function (o, i, c) {
								var m;
								if (n.hasOwnProperty(o)) {
									if (((m = n[o]), i > 0 && !t.test(c[i - 1]))) return;
									if (i + o.length < c.length && !t.test(c[i + o.length]))
										return;
								} else m = o.slice(1, -1);
								i > s &&
									(((r = new _("text", "", 0)).content = a.slice(s, i)),
									l.push(r)),
									((r = new _("emoji", "", 0)).markup = m),
									(r.content = e[m]),
									l.push(r),
									(s = i + o.length);
							}),
							s < a.length &&
								(((r = new _("text", "", 0)).content = a.slice(s)), l.push(r)),
							l
						);
					}
					return function (a) {
						var e,
							n,
							i,
							r,
							t,
							l = a.tokens,
							c = 0;
						for (n = 0, i = l.length; n < i; n++)
							if ("inline" === l[n].type)
								for (e = (r = l[n].children).length - 1; e >= 0; e--)
									("link_open" !== (t = r[e]).type &&
										"link_close" !== t.type) ||
										("auto" === t.info && (c -= t.nesting)),
										"text" === t.type &&
											0 === c &&
											o.test(t.content) &&
											(l[n].children = r =
												_(r, e, s(t.content, t.level, a.Token)));
					};
				})(a, o.defs, o.shortcuts, o.scanRE, o.replaceRE),
			);
	};
	return function (n, i) {
		var _ = { defs: a, shortcuts: e, enabled: [] },
			r = n.utils.assign({}, _, i || {});
		o(n, r);
	};
});

/*! markdown-it-mark 3.0.1 https://github.com/markdown-it/markdown-it-mark @license MIT */
!(function (e, n) {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = n())
		: "function" == typeof define && define.amd
			? define(n)
			: ((e =
					"undefined" != typeof globalThis
						? globalThis
						: e || self).markdownitMark = n());
})(this, function () {
	"use strict";
	return function (e) {
		function n(e, n) {
			var t,
				o,
				r,
				s,
				i,
				a = [],
				k = n.length;
			for (t = 0; t < k; t++)
				61 === (r = n[t]).marker &&
					-1 !== r.end &&
					((s = n[r.end]),
					((i = e.tokens[r.token]).type = "mark_open"),
					(i.tag = "mark"),
					(i.nesting = 1),
					(i.markup = "=="),
					(i.content = ""),
					((i = e.tokens[s.token]).type = "mark_close"),
					(i.tag = "mark"),
					(i.nesting = -1),
					(i.markup = "=="),
					(i.content = ""),
					"text" === e.tokens[s.token - 1].type &&
						"=" === e.tokens[s.token - 1].content &&
						a.push(s.token - 1));
			for (; a.length; ) {
				for (
					o = (t = a.pop()) + 1;
					o < e.tokens.length && "mark_close" === e.tokens[o].type;

				)
					o++;
				t !== --o &&
					((i = e.tokens[o]), (e.tokens[o] = e.tokens[t]), (e.tokens[t] = i));
			}
		}
		e.inline.ruler.before("emphasis", "mark", function (e, n) {
			var t,
				o,
				r,
				s,
				i = e.pos,
				a = e.src.charCodeAt(i);
			if (n) return !1;
			if (61 !== a) return !1;
			if (
				((r = (o = e.scanDelims(e.pos, !0)).length),
				(s = String.fromCharCode(a)),
				r < 2)
			)
				return !1;
			for (
				r % 2 && ((e.push("text", "", 0).content = s), r--), t = 0;
				t < r;
				t += 2
			)
				(e.push("text", "", 0).content = s + s),
					(o.can_open || o.can_close) &&
						e.delimiters.push({
							marker: a,
							length: 0,
							jump: t / 2,
							token: e.tokens.length - 1,
							end: -1,
							open: o.can_open,
							close: o.can_close,
						});
			return (e.pos += o.length), !0;
		}),
			e.inline.ruler2.before("emphasis", "mark", function (e) {
				var t,
					o = e.tokens_meta,
					r = (e.tokens_meta || []).length;
				for (n(e, e.delimiters), t = 0; t < r; t++)
					o[t] && o[t].delimiters && n(e, o[t].delimiters);
			});
	};
});

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

/* Fonction de conversion */

var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
function convert() {
	let e = document.getElementById("input").value,
		t = /^---\n([\s\S]*?)\n---\n/,
		o = e.match(t),
		n = o ? o[1] : null;
	var i = e.replace(t, "");
	i = i.replaceAll(":::", "!!!");
	let a;
	n && (a = jsyaml.load(n));
	let r = md.render(i);
	n &&
		void 0 !== a.maths &&
		!0 === a.maths &&
		(r = r
			.replace(/\$\$(.*?)\$\$/g, function (e, t) {
				return (
					"&#92;[" +
					(t = (t = t.replace(/\\?%/g, "\\%")).replace(/€/g, "\\textrm{€}")) +
					"&#92;]"
				);
			})
			.replace(/\$(.*?)\$/g, function (e, t) {
				return (
					"&#92;(" +
					(t = (t = t.replace(/\\?%/g, "\\%")).replace(/€/g, "\\textrm{€}")) +
					"&#92;)"
				);
			})),
		(r = r
			.replaceAll(" !", "&nbsp;!")
			.replaceAll(" ?", "&nbsp;?")
			.replaceAll(" ;", "&nbsp;;")
			.replaceAll(" :", "&nbsp;:")
			.replaceAll(" \xbb", "&nbsp;\xbb")
			.replaceAll("\xab ", "\xab&nbsp;"));
	let m = "";
	if (n && void 0 !== a.copies) for (let d = 0; d < a.copies; d++) m += r;
	let l = `<!DOCTYPE html>
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
		${n && void 0 !== a.mx ? "body{ margin-left:" + a.mx + "; margin-right:" + a.mx + ";}@media print{@page{margin-right:" + a.mx + "!important}}" : ""}
		${n && void 0 !== a.my ? "body{ margin-top:" + a.my + "; margin-bottom:" + a.my + ";}@media print{@page{margin-bottom:" + a.my + "}}" : ""}
		${n && void 0 !== a.columns ? "body{ columns:" + a.columns + "}" : ""}
		${n && void 0 !== a.colonnes ? "body{ columns:" + a.colonnes + "}" : ""}
		${n && void 0 !== a.espacementColonnes ? "body{ column-gap:" + a.espacementColonnes + "}" : ""}
		${n && void 0 !== a.columnGap ? "body{ column-gap:" + a.columnGap + "}" : ""}
		${(n && void 0 !== a.paysage && !0 === a.paysage) || (n && void 0 !== a.landscape && !0 === a.landscape) ? "body{ width:29.7cm!important}@media print{@page{size:A4 landscape!important;}}" : ""}
		</style>
		${n && void 0 !== a.maths && !0 === a.maths ? '<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js" type="text/javascript"></script>' : ""}
		<script>
		${n && void 0 !== a.pages ? "let nPages = " + a.pages + "; " : "let nPages=1; "}	
		let fontSize = 100;
		${(n && void 0 !== a.paysage && !0 === a.paysage) || (n && void 0 !== a.landscape && !0 === a.landscape) ? "let maxHeight = 774*nPages" : "let maxHeight = 1025*nPages; "}
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
		${(n && void 0 !== a.maths && !0 === a.maths) || isFirefox ? "" : "if (newFontSize > trackReduction) {"}
		document.body.style.fontSize = newFontSize + "px";
		${(n && void 0 !== a.maths && !0 === a.maths) || isFirefox ? "" : "}"}
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
	</script>
	</head>
	<body>
		${n && void 0 !== a.copies ? m : r}
	</body>
</html>`,
		s = window.open();
	s.document.write(l), s.document.close();
}

const convertButtonElement = document.querySelector("#convertButton");
convertButtonElement.addEventListener("click", function () {
	convert();
});
