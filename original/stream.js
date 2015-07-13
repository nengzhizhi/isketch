(function(g) {
	g.registerToolkit(["brush.streamer", "brush.pen"], function(f, d, a, e) {
		var g = d.render,
			l = d.toolkit,
			b = {},
			c = function(a, c, d, e, f) {
				if (c = b[c]) {
					f = 1 * c.thickness;
					var h = c.cos,
						l = c.sin,
						k = c.color;
					a.beginPath();
					a.fillStyle = k;
					a.strokeStyle = k;
					a.arc(d, e, f, 0, 2 * Math.PI, !0);
					a.moveTo(c.x + h, c.y + l);
					a.lineTo(d + 1 * h, e + 1 * l);
					a.lineTo(d - 1 * h, e - 1 * l);
					a.lineTo(c.x - h, c.y - l);
					a.lineTo(c.x + h, c.y + l);
					a.fill();
					a.stroke()
				}
			};
		this.construct = function(a, b) {
			this.spacing = a.spacing || [0, 0];
			this.diameter = a.diameter || 10;
			b(this)
		};
		this.prepare = function() {
			this.useTrackGradient = "color" !== this.fill.type;
			this.useBlendMode = !f.style.useSourceOver[this.composite];
			if (this.isRecording) {
				if (this.useBlendMode || 100 !== this.opacity) {
					var a = this.renderTo = this.active;
					"down" === this.state && this.useBlendMode && g.prepareGCO(this.composite, a.canvas);
					this.useCache = !0;
					a = this.cache
				} else this.useCache = !1, a = this.active;
				return this.renderTo = a
			}
			this.useCache = !1;
			return this.renderTo = this.ctx
		};
		this.drawStart = function() {
			var a = this.finger,
				c = this.renderTo;
			c.lineCap = "round";
			c.lineJoin = "round";
			this.fill.mode = "cycle";
			a = b[a] = {};
			a.x = this.x;
			a.y = this.y;
			a.px = this.x;
			a.py = this.y;
			a.vectorx = 0;
			a.vectory = 0;
			a.cos = 0;
			a.sin = 0;
			a.thickness = 0;
			a.rotation = Math.PI / 2;
			a.color = "#000"
		};
		this.draw = function() {
			var a = this.finger,
				d = this.fill.__colors || [],
				e = b[a];
			if (e && d) {
				var f = this.useCache,
					g = d.length,
					d = d[Math.abs((2 * this.interval + 1) % (2 * g) - g)],
					g = this.renderTo,
					h = this.x - e.px,
					r = this.y - e.py;
				if (5 < Math.abs(h) || 5 < Math.abs(r)) {
					e.color = d;
					0 > h * e.vectorx + r * e.vectory && (c(g, a, this.px, this.py, this), e.x = e.px = this.px, e.y = e.py = this.py, e.rotation += Math.PI, e.thickness *= 1);
					e.x += .5 * (this.x - e.x);
					e.y += .5 * (this.y - e.y);
					var a = e.x - e.px,
						k = e.y - e.py,
						q = Math.sqrt(a * a + k * k),
						x = this.diameter,
						s = Math.max(x.min, Math.min(x.max, q)),
						a = 0 !== q ? Math.PI / 2 + Math.atan2(k, a) : 0,
						x = "pen" === this.type ? (.001 + Math.max(0, x.max - s) + x.min) / 2 : (.001 + s) / 2,
						x = e.thickness + .42 * (x - e.thickness),
						z = Math.sin(e.rotation),
						y = Math.cos(e.rotation),
						B = Math.sin(a),
						A = Math.cos(a),
						s = e.thickness * z,
						k = e.thickness * y,
						B = x * B,
						A = x * A,
						z = .33 * q * z,
						C = -.33 * q * y,
						q = e.px + k + z,
						y = e.py + s + C,
						z = e.px - k + z,
						C = e.py - s + C;
					g.beginPath();
					g.fillStyle = d;
					g.strokeStyle = d;
					g.moveTo(e.px + k, e.py + s);
					g.quadraticCurveTo(q, y, e.x + A, e.y + B);
					g.lineTo(e.x - A, e.y - B);
					g.quadraticCurveTo(z, C, e.px - k, e.py - s);
					g.lineTo(e.px + k, e.py + s);
					g.fill();
					g.stroke();
					e.px = e.x;
					e.py = e.y;
					e.rotation = a;
					e.thickness = x;
					e.vectorx = h;
					e.vectory = r;
					e.cos = A;
					e.sin = B;
					f && l.drawFromCache(this)
				}
			}
		};
		this.drawEnd = function() {
			var a = this.finger;
			void 0 !== b[a] && (c(this.ctx, a, this.x, this.y, this), delete b[a])
		};
		this.construct(a, e)
	})
})(sketch);
(function(g) {
	var f = function(d) {
			return function(a, e, f, l) {
				var b = this,
					c = a.style,
					p = e.toolkit,
					g = a.util,
					m = a.vector,
					u = a.ui,
					t = m.Cubic,
					h = m.Point,
					r = m.Shape,
					k = !0,
					v = !1,
					x = {};
				b.prepare = p.prepareBrush;
				b.construct = function(a, c) {
					b.composite = a.composite || "source-over";
					b.diameter = a.diameter || 0;
					b.lineWidth = a.lineWidth || 1;
					b.opacity = a.opacity || 100;
					b.spacing = a.spacing || [0, 0];
					b.useGhost = !1;
					b.useMonitor = !0;
					b.useSnap = !1;
					v = "polygon" === d;
					k = "path" === d;
					c(b)
				};
				b.enable = function() {
					x = {}
				};
				b.disable = function() {
					b.savePath()
				};
				b.render = function(a) {
					var d = b.isRecording;
					a = d ? b.active : b.ctx;
					var e = b.stroke && b.stroke.lineWidth,
						f = G();
					a.beginPath();
					a.lineCap = "round";
					a.lineJoin = "round";
					if (d) a.globalAlpha = b.opacity / 100, a.globalCompositeOperation = c.getComposite(b.composite), a.lineWidth = e, b.isEditing ? m.VOBPath(a, f) : m.VOBPath(a, f.slice(0, -1));
					else {
						var l = b.bbox.scale,
							l = Math.max(Math.abs(l.x), Math.abs(l.y));
						a.globalAlpha = 1;
						a.lineWidth = e / l;
						m.VOBPath(a, f)
					}
					p.applyStyle(a, b);
					if (d) {
						a.globalAlpha = 1;
						a.globalCompositeOperation = "source-over";
						var g = f && f.length;
						if (g) {
							var s = b.closingPath,
								e = b.editingPath,
								q = b.bendingSegment,
								d = b.selected || {},
								l = d.idx;
							"cp1" === d.type && l--;
							for (var d = g - 1, t = (l || 0) + (s ? 0 : 1), v = 0; v < g; v++) if (l = f[v]) {
								var u = l.cmd;
								if ("C" === u && (v <= t && v >= t - (q ? 2 : 1) || s && 1 === v)) {
									var w = f[v - 1],
										u = h(l.x1, l.y1),
										z = h(l.x2, l.y2);
									h.equals(u, w) || (V(a, u, "#4f80ff", 3), T.L(a, u, w, "#4f80ff"));
									h.equals(z, l) || (V(a, z, "#4f80ff", 3), T.L(a, z, l, "#4f80ff"))
								}
							}
							l = x.pointAtop;
							v = x.pointAtopStart;
							g = x.pointOnPath;
							if (!(g || l && (!v || eventjs.metaKey || eventjs.altKey) || !1 !== e && !1 !== k) && (l = f[d], u = l.cmd, T[u])) if (w = f[d - 1], v) T[u](a, w, l, "#46f224");
							else T[u](a, w, l, "#4f80ff"), L(a, l, "#fff", 2.5);
							if (g) if (eventjs.metaKey) e = g.point, a.save(), a.beginPath(), r.exmark(a, e.x, e.y, 3), a.lineWidth = 2.5, a.strokeStyle = "#000", a.stroke(), a.lineWidth = 1.5, a.strokeStyle = "#46f224", a.stroke(), a.restore();
							else if (!1 === e && (u = g.cmd, T[u])) T[u](a, g.point0, g.point1, "#4f80ff");
							e = "Z" === f[d].cmd;
							for (v = 0; v < d; v++)!(l = f[v]) || e && v + 1 === d || (g = a, 0 !== v || e ? l.hovered ? eventjs.metaKey ? V(g, l, "#ff3535", 5) : eventjs.altKey ? V(g, l, "#bc19fc", 5) : V(g, l, "#4f80ff", 5) : V(g, l, "rgba(0,0,0,0.75)", 3) : l.hovered ? eventjs.metaKey ? L(g, l, "#ff3535", 4.5) : eventjs.altKey ? L(g, l, "#bc19fc", 4.5) : L(g, l, "#46f224", 4.5) : L(g, l, "#fff", 4.5))
						}
					}
				};
				b.calcBBox = function() {
					if (b.path) return new m.BBox(G())
				};
				b.onResize = function() {
					b.toolkit.dragging && J()
				};
				b.onDoubleTap = function(a, c) {
					b.savePath()
				};
				b.onPointerMove = function(a, c) {
					b.self = a;
					b.point = c;
					var d = b.editingPath;
					if (!d || b.adding || b.splittingSegment || b.deletingPoint) {
						for (var e = !1, f = !1, k, p = G(), l = p.length, g = 0; g < l; g++) {
							var r = p[g],
								s = r.cmd,
								q = g < l - 1,
								v = r.bbox;
							void 0 !== v || !q && !1 !== d || (v = r.bbox = new m.BBox({
								data: [k || r, r],
								expand: 7,
								convexHull: !0
							}));
							r.hovered = !1;
							v && (v.hovered = !1, h.inBBox(c, v) && (v.hovered = !0, !q || !1 !== e && "point" === e.type || (v = h.distance(r, c), 7 > v && (r.hovered = !0, e = h.clone(r), e.idx = g, e.type = "point", e.distance = v)), !1 === e && ("C" === s ? (s = h(r.x1, r.y1), v = h.distance(s, c), 7 > v && (e = s, e.idx = g, e.type = "cp1", e.distance = v), q && (q = h(r.x2, r.y2), v = h.distance(q, c), 7 > v && (e = q, e.idx = g, e.type = "cp2", e.distance = v), q = t.nearestPointOnCurve(c, [k, s, q, r]), 5 > q.distance && (!1 === f || q.distance < f.distance) && (f = {
								cmd: "C",
								idx: g,
								time: q.time,
								distance: q.distance,
								point: q.point,
								point0: k,
								point1: r
							}))) : "L" === s && q && (v = h.toLineDistance(c, k, r), 5 > v && (!1 === f || v < f.distance) && (q = h.nearestOnLine(c, k, r, !0), f = {
								cmd: "L",
								idx: g,
								time: q.time,
								distance: v,
								point: q,
								point0: k,
								point1: r
							})))));
							k = r
						}
						d ? O("") : e ? (f = !1, "point" === e.type ? eventjs.altKey ? O("Alter Tension") : eventjs.metaKey ? O("Remove Point") : eventjs.shiftKey ? O("Move Point w/o Handles") : 0 === e.idx ? O("Close Path") : O("Move Point") : eventjs.altKey ? O("Move Handle Mirrored") : eventjs.metaKey ? O("Remove Handle") : O("Move Handle")) : f ? eventjs.metaKey ? O("Add Point") : eventjs.altKey ? "C" === f.cmd ? O("Move Curve") : O("Move Line") : "C" === f.cmd ? O("Bend Curve") : O("Bend Line") : (r = p[l - 1], k = p[l - 2], r && k ? (v = h.distance(r, k), O("D: " + v.toFixed(2) + "px")) : O(""));
						x.pointAtop = e;
						x.pointAtopStart = e && 0 === e.idx;
						x.pointOnPath = f
					}
				};
				b.onPointer = function(a, c, d) {
					b.dirtyRender = !0;
					b.batch = c;
					var e = x.pointAtop,
						f = x.pointAtopStart,
						m = x.pointOnPath;
					c = c.path;
					var p = c.length;
					b.ghostPoint = void 0;
					if (a.pointerStart) if (O(""), b.selected = void 0, b.adding = !1, b.bendingSegment = !1, b.closingPath = !1, b.convertingPoint = !1, b.deletingPoint = !1, b.editingPath = !0, b.movingPoint = !1, b.movingPointLocked = !1, b.movingSegment = !1, b.splittingSegment = !1, 0 === p) A(d, "M"), A(d, "L"), b.adding = !0, b.selected = {
						idx: 0,
						type: "point"
					}, J();
					else if (e) {
						if (eventjs.metaKey) if (b.deletingPoint = !0, b.selected = e, d = e.idx, c = e.type, "point" === c) {
							m = G();
							c = m[d];
							if (m = m[d + 1])"M" === c.cmd ? F(m, "M") : "C" === m.cmd && (m.x1 = c.x1, m.y1 = c.y1), m.bbox = void 0;
							P(d, 1)
						} else a = G(), m = a[d - 1], e = a[d], d = a[d + 1], "cp1" === c ? (e.x1 = m.x, e.y1 = m.y, m.angleLock = e.x1 === m.x2 && e.y1 === m.y2) : (e.x2 = e.x, e.y2 = e.y, e.angleLock = e.x2 === d.x1 && e.y2 === d.y1), C(e, m), e.bbox = void 0;
						else eventjs.altKey ? (b.convertingPoint = !0, b.selected = e, s(c, e)) : eventjs.shiftKey ? (b.movingPoint = !0, b.selected = e) : f ? (A(e, "Z"), b.closingPath = !0, b.selected = {
							idx: p,
							type: "point"
						}) : (b.movingPointLocked = !0, b.selected = e);
						N()
					} else if (m) {
						b.selected = m;
						if (eventjs.metaKey) a: switch (b.splittingSegment = !0, d = m.idx, a = m.time, e = c[d - 1], c = c[d], m.cmd) {
						case "C":
							a = t.split(e.x, e.y, c.x1, c.y1, c.x2, c.y2, c.x, c.y, a);
							m = t.fromArray(a[0].slice(2));
							a = t.fromArray(a[1].slice(2));
							m.angleLock = e.angleLock;
							a.angleLock = c.angleLock;
							P(d, 1, m, a);
							break a;
						case "L":
							c.bbox = void 0, m = h.atTimeOnLine(e, c, a), m.cmd = "L", P(d, 0, m)
						} else eventjs.altKey ? b.movingSegment = m : b.bendingSegment = m;
						N()
					} else b.isEditing || (A(d, "L"), b.adding = !0, b.selected = {
						idx: p - 1,
						type: "point"
					});
					else if (a.pointerEnd) if (b.editingPath = !1, b.closingPath) b.savePath();
					else {
						if (c = c[p - 2]) c.bbox = void 0;
						E(d);
						N()
					} else if (a.pointerDrag) {
						if (!b.deletingPoint && !b.splittingSegment) if (b.movingPoint || b.movingPointLocked) m = b.selected, e = m.type, m = m.idx, a = c[m], f = c[m + 1], c = c[m - 1], "point" === e ? (c = a.x - d.x, d = a.y - d.y, b.movingPoint ? (m = G()[m], m.x -= c, m.y -= d, m.angleLock = !1, m.bbox = void 0) : y(m, c, d)) : "cp1" === e ? B(a, f, c, d, "x1", "y1") : "cp2" === e && B(a, f, c, d, "x2", "y2");
						else if (b.movingSegment) c = b.movingSegment, m = c.idx, a = c.point, e = a.x - d.x, a = a.y - d.y, y(m, e, a), y(m - 1, e, a), c.point = d;
						else if (b.bendingSegment) {
							var m = b.bendingSegment,
								e = m.point,
								l = e.x - d.x,
								g = e.y - d.y,
								f = Math.min(.98, Math.max(.02, m.time)),
								p = 1 - f,
								e = 3 * f * p * p,
								r = 3 * f * f * p,
								q = .5 >= f ? Math.pow(2 * f, 3) / 2 : 1 - Math.pow(2 * p, 3) / 2;
							a = (1 - q) / e;
							e = a * l;
							a *= g;
							r = q / r;
							l *= r;
							g *= r;
							f < 1 / 3 ? (l = e * f, g = a * f) : f > 2 / 3 && (e = l * p, a = g * p);
							r = b.selected.idx;
							f = c[r];
							p = c[r - 1];
							c = c[r + 1];
							"L" === f.cmd && (t.fromLineSegment(p, f, f), f.angleLock = !1);
							f.x1 -= e;
							f.y1 -= a;
							f.x2 -= l;
							f.y2 -= g;
							f.bbox = void 0;
							p && p.angleLock && isFinite(p.x2 + p.y2) && (e = z(h(f.x1, f.y1), p), p.x2 = e.x, p.y2 = e.y, p.bbox = void 0);
							c && f.angleLock && isFinite(c.x1 + c.y1) && (e = z(h(f.x2, f.y2), f), c.x1 = e.x, c.y1 = e.y, c.bbox = void 0);
							m.point = d
						} else b.convertingPoint || k ? s(c, d) : E(d)
					} else a.pointerMove && (E(d), J());
					return !0
				};
				var s = function(a, c) {
						var d = b.selected,
							e = d.idx,
							f = d.type;
						"cp1" === f && e--;
						var k = a[e],
							m = h.distance(k, c),
							p = m;
						"cp2" === f && (m = p = -m);
						if ("Z" === k.cmd) {
							var l = a.length,
								f = a[(l + e + 1) % l],
								l = a[(l + e + 2) % l],
								g = isFinite(l.x1 + l.y1) ? h(l.x1, l.y1) : k;
							void 0 === d.point && (l = h.angle(f, g), d.point = h.atRadianDistance(k, l, .001));
							5 >= p && (c = d.point);
							p = h.distance(f, g)
						}
						var l = h.angle(k, c),
							d = h.atRadianDistance(k, l, -m),
							k = h.atRadianDistance(k, l, +p),
							f = e,
							e = G(),
							l = e.length,
							g = f - 1,
							r = f,
							p = f + 1,
							m = e[f],
							m = m.cmd;
						"M" === m ? "Z" === e[l - 1].cmd && (f = l - 1, r = (l + f - 1) % l, g = (l + f - 2) % l, p = (l + f + 2) % l) : "Z" === m && (r = (l + f - 1) % l, g = (l + f - 2) % l, p = (l + f + 2) % l);
						m = e[r];
						f = e[g];
						e = e[p];
						m && ("M" === m.cmd ? b.adding && (e.x2 = d.x, e.y2 = d.y) : (m.cmd = "C", m.x2 = d.x, m.y2 = d.y, m.bbox = void 0, void 0 !== f.angleLock && b.adding || (f.angleLock = !0), isFinite(m.x1 + m.y1) || (m.x1 = f.x, m.y1 = f.y)));
						e && (e.cmd = "C", e.x1 = k.x, e.y1 = k.y, e.bbox = void 0, void 0 !== m.angleLock && b.adding || (m.angleLock = !0), isFinite(e.x2 + e.y2) || (e.x2 = e.x, e.y2 = e.y));
						f && (C(e, m), C(m, f))
					},
					z = function(a, b) {
						var c = h.distance(a, b),
							d = h.angle(a, b);
						return h.atRadianDistance(b, d, c)
					},
					y = function(a, b, c) {
						var d = G(),
							e = d[a];
						a = d[a + 1];
						e.x -= b;
						e.y -= c;
						e.bbox = void 0;
						a && isFinite(a.x1 + a.y1) && (a.x1 -= b, a.y1 -= c, a.bbox = void 0);
						isFinite(e.x2 + e.y2) && (e.x2 -= b, e.y2 -= c)
					},
					B = function(a, b, c, d, e, f) {
						b = h(a[e], a[f]);
						var k = b.y - d.y;
						a[e] -= b.x - d.x;
						a[f] -= k;
						a.bbox = void 0;
						"x1" === e ? c.angleLock = !1 : a.angleLock = !1
					},
					A = function(a, c) {
						a = h.clone(a);
						a.cmd = c;
						var d = b.batch;
						d.push(a);
						d.path.push(a);
						b.point = a
					},
					C = function(a, b) {
						a.x1 === b.x && a.y1 === b.y && a.x2 === a.x && a.y2 === a.y && F(a, "L")
					},
					F = function(a, b) {
						a.cmd = b;
						delete a.x1;
						delete a.y1;
						delete a.x2;
						delete a.y2
					},
					E = function(a) {
						if (!b.isEditing) {
							var c = x.pointAtopStart,
								d = G(),
								e = d.length - 1,
								f = d[e];
							f && (c && (c = d[0], a.x = c.x, a.y = c.y), f.x = a.x, f.y = a.y, "C" === f.cmd && (f.x2 = a.x, f.y2 = a.y), b.ghostPoint = e)
						}
					};
				b.closePath = function() {
					var a;
					a = G();
					a = (a = a[a.length - 1]) ? "Z" === a.cmd : void 0;
					if (!a) {
						a = G();
						var c = a[0];
						c && 2 < a.length && (E(c), A(c, "Z"), b.ghostPoint = void 0)
					}
				};
				b.savePath = function() {
					D();
					var a = G();
					if (1 < a.length) {
						v && b.closePath();
						var c = g.clone(a);
						P(-a.length);
						b.toolkit.createObject({
							device: b,
							layer: {
								path: c
							}
						}, function(a) {
							b.toolkit.addToHistory(a);
							b.toolkit.renderToScene(a);
							N()
						})
					} else K()
				};
				var D = function() {
						var a = b.ghostPoint;
						isFinite(a) && (P(a, 1), b.ghostPoint = void 0)
					},
					P = function(a, c) {
						var d = Array.prototype.slice.call(arguments),
							e = b.batch;
						Array.prototype.splice.apply(e, d);
						Array.prototype.splice.apply(e.path, d);
						x.pointAtop = void 0
					},
					G = function() {
						return b.path || []
					},
					J = function() {
						b.dirtyRender = !0;
						b.toolkit.dragging = !0;
						b.toolkit.animate()
					},
					N = function() {
						b.current = void 0;
						b.dirtyRender = !0;
						b.onPointerMove(b.self, b.point)
					},
					K = function() {
						x = {};
						b.dirtyRender = !0;
						b.toolkit.dragging = !1;
						b.toolkit.reset(b.finger);
						e.render()
					},
					O = function(a) {
						u.tooltip && u.tooltip.update(a)
					};
				b.onBackspaceKey = b.onDeleteKey = function(a) {
					if ("down" === a.state) if (2 < (b.path || []).length) P(-1, 1), E(b.point), N();
					else return K(), !0
				};
				b.onUndo = function(a) {
					if (2 < (b.path || []).length) P(-1, 1), E(b.point), N();
					else return K(), !0
				};
				b.onRedo = function(a) {
					console.log("redo");
					return !0
				};
				b.onAltKey = b.onMetaKey = b.onShiftKey = function(a) {
					N()
				};
				b.onEnterKey = b.onEscapeKey = function(a) {
					"down" === a.state && b.savePath()
				};
				var V = function(a, b, c, d) {
						a.beginPath();
						a.arc(b.x, b.y, d, 0, 2 * Math.PI);
						a.fillStyle = c;
						a.fill();
						a.lineWidth = .75;
						a.strokeStyle = "#fff";
						a.stroke()
					},
					L = function(a, b, c, d) {
						a.beginPath();
						a.rect(b.x - d, b.y - d, 2 * d, 2 * d);
						a.fillStyle = c;
						a.fill();
						a.lineWidth = 1;
						a.strokeStyle = "#000";
						a.stroke()
					},
					T = {
						L: function(a, b, c, d) {
							a.beginPath();
							a.moveTo(b.x, b.y);
							a.lineTo(c.x, c.y);
							a.lineWidth = 1;
							a.strokeStyle = d;
							a.stroke()
						},
						C: function(a, b, c, d) {
							a.beginPath();
							a.moveTo(b.x, b.y);
							a.bezierCurveTo(c.x1, c.y1, c.x2, c.y2, c.x, c.y);
							a.lineWidth = 1;
							a.strokeStyle = d;
							a.stroke()
						}
					};
				b.construct(f, l)
			}
		};
	g.registerToolkit("brush.path", f("path"));
	g.registerToolkit("brush.polygon", f("polygon"));
	g.registerToolkit("brush.polyline", f("polyline"))
})(sketch);