(function(g) {
	g.module = g.module || {};
	g.module.Style = function(f) {
		var d = this,
			a = f.color.space,
			e = f.feature,
			q = f.util;
		(d.Fill = function(a, b) {
			a = a || k.fill.value;
			l(a, this, "fill", b);
			return this
		}).type = "fill";
		(d.Stroke = function(a, b) {
			a = a || k.stroke.value;
			l(a, this, "stroke", b);
			return this
		}).type = "stroke";
		var l = function(a, h, c, e) {
				if ("string" === typeof a) {
					if (a = d.parseStyle(a)) {
						var r = a.type;
						e = a.dna
					} else e = e || {}, r = e.type || "color", e = e[e.type] || "#000000";
					a = {};
					a.type = r;
					a[r] = e
				}
				h.method = c;
				h.opacity = a.opacity || 1;
				h.type = a.type || "color";
				h.mode = a.mode || "linear";
				h.noise = a.noise || !1;
				h.angle = a.angle || 0;
				r = k[c];
				h.color = a.color || r.color;
				h.gradient = a.gradient || r.gradient;
				h.pattern = a.pattern || r.pattern;
				"stroke" === c ? (h.dashArray = Array.isArray(a.dashArray) ? a.dashArray : b.dashArray, h.dashOffset = isFinite(a.dashOffset) ? a.dashOffset : b.dashOffset, h.lineCap = a.lineCap || b.lineCap, h.lineJoin = a.lineJoin || b.lineJoin, h.lineWidth = isFinite(a.lineWidth) ? a.lineWidth : b.lineWidth, h.miterLimit = isFinite(a.miterLimit) ? a.miterLimit : b.miterLimit, h.enabled = isFinite(a.enabled) ? a.enabled : isFinite(a.lineWidth)) : h.enabled = isFinite(a.enabled) ? a.enabled : !0
			};
		d.create = function(a, b) {
			if ("stroke" === a) return new d.Stroke(b);
			if ("fill" === a) return new d.Fill(b)
		};
		d.clone = function(a, b) {
			return d.cloneInto(a, {}, b)
		};
		d.cloneInto = function(a, h, d, k, e) {
			e = e || {};
			if (h) {
				k = k || a.type;
				for (var r in a) if (!e[r]) {
					var f = p[r];
					if (f) {
						if (d) if ("method" === r) continue;
						else if (c[r] && r !== k) continue;
						else if (b[r] === a[r]) continue;
						h[r] = "array" === f ? a[r].slice() : a[r]
					}
				}
				return h
			}
		};
		d.equals = function(a, b) {
			for (var h in a) {
				var c = p[h];
				if (c) if ("array" === c) {
					if (String(a[h]) !== String(b[h])) return !1
				} else if (a[h] !== b[h]) return !1
			}
			return !0
		};
		var b = {
			dashArray: "none",
			dashOffset: 0,
			lineCap: "butt",
			lineJoin: "miter",
			lineWidth: 1,
			miterLimit: 4,
			angle: 0,
			mode: "linear",
			noise: !1,
			opacity: 1
		},
			c = {
				color: "string",
				gradient: "string",
				pattern: "string"
			},
			p = {
				color: "string",
				gradient: "string",
				pattern: "string",
				dashArray: "array",
				dashOffset: "float",
				lineCap: "string",
				lineJoin: "string",
				lineWidth: "float",
				miterLimit: "float",
				angle: "number",
				mode: "string",
				noise: "boolean",
				opacity: "float",
				type: "string",
				method: "string",
				enabled: "boolean"
			};
		d.cloneToObject = function(a) {
			d.cloneFillStroke(d, a, {
				enabled: !0
			})
		};
		d.cloneToGlobal = function(a) {
			d.cloneFillStroke(a, d);
			f.palette && (a = a[f.palette.paintMethod]) && (f.palette.setIndicator(), f.palette.update(a.type))
		};
		d.cloneFillStroke = function(a, b, h) {
			a.fill && b.fill && d.cloneInto(a.fill, b.fill, void 0, void 0, h);
			a.stroke && b.stroke && d.cloneInto(a.stroke, b.stroke, void 0, void 0, h);
			return b
		};
		d.setFont = function(a) {
			var b = f.doc;
			a = a || {};
			"string" === typeof a && (a = {
				fontFamily: a
			});
			if (a.fontFamily) {
				var h = a.onsuccess,
					c = b.selection.parse(a.selection || b.selection.items),
					d = b.toolkit,
					k = d.text;
				a = b.scene.copyProperties(k, a, {});
				k.loadFont(a.fontFamily, function() {
					d.setParam({
						filter: "text",
						params: a,
						selection: c
					});
					h && h()
				})
			}
		};
		d.setFill = function(a) {
			a = a || {};
			"string" === typeof a ? a = {
				fill: {
					dna: a
				}
			} : a.stroke || (a.fill = d.cloneInto(a, {}, !1, "fill"));
			a.useColorPicker = !1 !== a.useColorPicker;
			a.useRecord = a.useRecord || !0;
			a.useRender = !1 !== a.useRender;
			d.apply(a)
		};
		d.setStroke = function(a, b, h, c, k, e, r) {
			a = a || {};
			"string" === typeof a ? (a = {
				stroke: {
					dna: a
				}
			}, e && (a.stroke.dashArray = e), isFinite(r) && (a.stroke.dashOffset = r), h && (a.stroke.lineCap = h), c && (a.stroke.lineJoin = c), isFinite(b) && (a.stroke.lineWidth = b), isFinite(k) && (a.stroke.miterLimit = k)) : a.stroke || (a.stroke = d.cloneInto(a, {}, !1, "stroke"));
			a.useColorPicker = !1 !== a.useColorPicker;
			a.useRecord = a.useRecord || !0;
			a.useRender = !1 !== a.useRender;
			d.apply(a)
		};
		(function() {
			var a = function(a, b) {
					if (b) {
						"string" === typeof b && (b = {
							dna: b
						});
						var h = b.dna || b.color || b.gradient || b.pattern,
							c = b.paintType;
						if (!c && h) if (h = d.parseStyle(h)) c = h.type, h = h.dna;
						else return;
						c && (b.type = c, b[c] = h, delete b.dna, delete b.paintType);
						return b
					}
				},
				b = function(a, b, h) {
					if (a = a && a[h]) d.cloneInto(b, a), d.cloneInto(b, d[h])
				},
				c = function(a, b, c, e, s, r, f) {
					var p = a[c];
					if (void 0 === p) if ((p = k.config[a.type]) && p[c]) p = a[c] = d.create(c);
					else return;
					if (!1 !== p) if (d.equals(b, p.__cache || p)) a.dirtyControl = !0, s && delete p.__cache;
					else if ("clipart" === a.type) changeCount++;
					else {
						e && (p.__cache = d.clone(p));
						if (s) {
							k.scene.setDirtyPixelData(a);
							var v = a.id;
							e = r[v] || {
								id: v
							};
							e[c] = p.__cache;
							r[v] = e;
							delete p.__cache
						}
						d.cloneInto(b, p);
						s && (e = f[v] || {
							id: v
						}, e[c] = d.clone(p), f[v] = e);
						a.dirtyCache = !0;
						a.dirtyControl = !0;
						s = h(c, a);
						a.brush && (p = a.brush[c], d.cloneInto(b, p), p.__colors = s);
						return !0
					}
				},
				k;
			d.apply = function(r) {
				k = f.doc;
				var p = r.useColorPicker && f.ui.colorPicker.update || !1,
					m = e.stream.realtime && f.net.dataChannel,
					l = r.useRecord || !1,
					t = r.useRender || !1,
					w = !0 === l || "down" === l || "start" === l,
					u = !0 === l || "up" === l || "end" === l || "update" === l,
					g = r.configure || k.config[k.tool.type],
					G = k.selection.parse(r.selection || k.selection.items),
					J = k.scene.children,
					N = {},
					K = {},
					l = r.changeCount || 0,
					O = a("stroke", r.stroke);
				if (r = a("fill", r.fill)) {
					var V = r[r.type],
						L = "fill",
						T = r.type,
						Q = r;
					b(g, Q, L)
				}
				O && (V = O[O.type], L = "stroke", T = O.type, Q = O, b(g, Q, L));
				for (var U in G) if (g = J[U]) r && c(g, r, "fill", w, u, N, K) && l++, O && c(g, O, "stroke", w, u, N, K) && l++;
				u && (l && (w = q.diff(q.objectToArray(N), q.objectToArray(K), ["id"])) && (k.history && k.history.store({
					cmd: "update",
					icon: "palette",
					name: "update-style",
					data: {
						from: w.from,
						to: w.to
					}
				}), m && f.net.dataChannel.send(["scene.update", w.to])), k.saveSettings());
				k.toolkit.text && k.toolkit.text.updateCSSStyle();
				m = Q;
				if (Q = k.tool.device) Q.brush ? (w = Q.brush[L], d.cloneInto(m, w), h(L, Q.brush)) : Q[L] && (w = Q[L], d.cloneInto(m, w), h(L, Q));
				p && "none" !== V && "color" === T && f.ui.colorPicker.update(V);
				f.palette && f.palette.setIndicator();
				t && l && k.render.sceneGCO("style.apply")
			}
		})();
		d.renderSwatch = function(a, b, h, c, k) {
			var e = f.doc.pixelRatio || 1;
			c = (c || 24) * e;
			k = (k || 24) * e;
			a.width = c;
			a.height = k;
			if ("CANVAS" === a.nodeName) {
				var r = a.ctx || a.getContext("2d");
				switch (b) {
				case "color":
					r.fillStyle = h;
					r.fillRect(0, 0, c, k);
					break;
				case "gradient":
					a = d.getGradientStops({
						dna: h,
						asFlatArray: !0
					});
					r.fillStyle = d.createGradient(r, "linear", 0, 0, c, k, a);
					r.fillRect(0, 0, c, k);
					break;
				case "pattern":
					h instanceof CanvasPattern ? (r.fillStyle = h, r.fillRect(0, 0, c, k)) : d.loadPattern(h, function(a) {
						r.fillStyle = a;
						r.fillRect(0, 0, c, k)
					})
				}
			} else switch (b) {
			case "color":
				a.style.background = h;
				break;
			case "gradient":
				a.style.cssText = d.toCSSGradientBG({
					dna: h,
					type: "linear",
					angle: "135deg"
				})
			}
		};
		var w = d.CONTEXT = q.Canvas(1, 1).ctx;
		(function() {
			d.loadPattern = function(a, b, h) {
				a = a || d.fill.pattern;
				var c = d.patternCtx[a];
				if (c) b && b(c);
				else {
					var k = new Image;
					k.onerror = function() {
						h && h();
						e.debug && console.warn("missing pattern", a)
					};
					k.onload = function() {
						var h = w.createPattern(k, "repeat");
						h.width = k.width;
						h.height = k.height;
						d.patternCtx[a] = h;
						b && b(h)
					};
					k.src = f.loc.getMediaUrl(a)
				}
			}
		})();
		d.hexFromColor = function(b) {
			"string" === typeof b ? "hsla" === b.substr(0, 4) ? b = a(b, "W3>HSLA>RGBA>HEX24>W3") : "rgba" === b.substr(0, 4) ? b = a(b, "W3>RGBA>HEX24>W3") : "rgb" === b.substr(0, 3) ? b = a(b, "W3>RGB>HEX24>W3") : f.color.webcolors[b] && (b = f.color.webcolors[b]) : isFinite(b.R) ? b = a(b, "RGB>HEX24>W3") : isFinite(b.H) && (b = a(b, "HSLA>RGBA>HEX24>W3"));
			return b
		};
		var m = {
			color: function(a) {
				if (0 === a.indexOf("#") || 0 === a.indexOf("hsl") || 0 === a.indexOf("hsla") || 0 === a.indexOf("rgb") || 0 === a.indexOf("rgba") || f.color.webcolors[a]) return !0
			},
			pattern: function(a) {
				if (0 === a.indexOf("#asset") || 0 === a.indexOf("data:") || 0 === a.indexOf("blob:") || 0 === a.indexOf("./") || 0 === a.indexOf("http")) return !0
			},
			gradient: function(a) {
				if (-1 !== a.indexOf(",") && isFinite(parseInt(a[0])) || -1 !== a.indexOf("linear-gradient(") || -1 !== a.indexOf("radial-gradient(")) return !0
			}
		};
		d.validate = function(a, b) {
			if ("string" !== typeof a) return !1;
			var h = a.toLowerCase();
			return b ? m[b](h) || !1 : m.color(h) ? "color" : m.pattern(h) ? "pattern" : m.gradient(h) ? "gradient" : !1
		};
		d.parseStyle = function(a) {
			if ("none" === a) return {
				dna: "none",
				type: "gradient"
			};
			if (m.color(a)) return {
				dna: a,
				type: "color"
			};
			if (m.pattern(a)) return {
				dna: a,
				type: "pattern"
			};
			if (m.gradient(a)) if (-1 !== a.indexOf("linear-gradient")) {
				if (a = d.parseCSSGradient(a, !0)) return {
					dna: a,
					type: "gradient"
				}
			} else return {
				dna: a,
				type: "gradient"
			}
		};
		d.load = function(a, b) {
			var h = 0,
				c = function(a) {
					--h || b && b()
				};
			a.fill && h++;
			a.stroke && h++;
			h ? (a.fill && u(a, "fill", c), a.stroke && u(a, "stroke", c)) : c(h = 1)
		};
		var u = function(a, b, c) {
				var k = t(a, b);
				"pattern" === k.type && k.pattern ? d.loadPattern(k.pattern, function(d) {
					h(b, a);
					c()
				}, function() {
					c("404")
				}) : (h(b, a), c())
			},
			t = function(a, b) {
				var h = f.doc;
				if (a[b]) h = "string" === typeof a[b] ? a[b] = new d.create(b, a) : a[b];
				else {
					h = h.config[a.type];
					if (!h[b]) return "";
					h = h[b]
				}
				var c = h.type;
				"string" !== typeof h[c] && (h[c] = d[b][c]);
				return h
			},
			h = function(b, h) {
				var c = f.doc,
					k = t(h, b),
					e = k.noise,
					r = k.type,
					p = k[r];
				if (p) {
					if (h.useBackgroundOverlay) return "brush" === h.toolkitId ? k.__colors = [0, k.color || "#000"] : k.__colors = [0, c.backgroundRaw];
					if ("none" === p) return k.__colors = [0, "rgba(0,0,0,0)"];
					switch (r) {
					case "color":
						return k.__colors = [0, p];
					case "gradient":
						var m = d.getGradientStops({
							dna: p,
							asFlatArray: !0,
							asHex32: !0
						});
						if (0 === m.length) return k.__colors = [0, k.color || "#000"];
						break;
					case "pattern":
						return p ? (d.loadPattern(p), k.__colors = [0, d.patternCtx[p]]) : k.__colors = [0, k.color || "#000"]
					}
					if (!e && !f.detect.useColorCycle[h.type]) {
						k = k.__colors = [];
						for (e = 0; e < m.length; e += 2) k.push(m[e]), k.push(a(m[e + 1], "HEX32>RGBA>W3"));
						return k
					}
					c = d.hashDNA(p + e);
					if (d.gradientCtx[c]) return k.__colors = d.gradientCtx[c];
					k.__colors = f.style.getColorStopsHelper({
						stops: m,
						noise: e,
						seed: h.seed
					});
					return d.gradientCtx[c] = k.__colors
				}
			};
		d.getStyle = function(a, b, c, k, e, r, p) {
			var m = p[a];
			if (m && m.enabled) {
				var l = m.type,
					t = m.mode,
					q = m[l];
				if ("destination-out" === p.composite) return f.doc.backgroundRaw || "#000";
				if ("none" === q) return "stamp" === p.type ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)";
				if ("color" === l) return "cycle" === t ? (b = m.__colors, b[(2 * (p.time || 0) + 1) % b.length]) : q;
				if ("pattern" === l) return d.patternCtx[q] ? d.patternCtx[q] : "rgba(0,0,0,1)";
				if ("gradient" === l) return a = m.__colors || (m.__colors = h(a, p)), d.createGradient(b, t, c, k, e, r, a, m, p.bbox && p.bbox.scale)
			}
		};
		new f.module.StylePalette(f, d);
		new f.module.StyleGCO(f, d);
		new f.module.StyleGradient(f, d);
		d.loadDefault && d.loadDefault();
		var r = function(a) {
				var b = function(b, h) {
						var c = e.style[b];
						c[a] && (c = c[a]);
						return d.validate(c, b) ? c : h
					};
				return {
					color: b("color", "#000000"),
					gradient: b("gradient", "0.169429711,fff91d8a,0.583,ff7c0ebd,1,ff0000f0"),
					pattern: b("pattern", "data:image/gif;base64,R0lGODlhDgAOAID/ANDu/FOdvCwAAAAADgAOAAACHYwDh5fazqKcj05rar5q+w961diVi9g9jaaGkFEAADs=")
				}
			},
			k = {};
		k.fill = r("fill");
		k.fill.value = k.fill[e.style.defaultFillType];
		k.stroke = r("stroke");
		k.stroke.value = k.stroke[e.style.defaultStrokeType];
		d.composite = "normal";
		d.stroke = new d.Stroke;
		d.fill = new d.Fill;
		return d
	};
	"undefined" !== typeof module && module.exports && (module.exports = g.module.Style)
})(sketch);
"undefined" === typeof sketch && (sketch = {});