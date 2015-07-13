(function(g) {
	var f = g.vector || (g.vector = {}),
		d = f.BBox = function(a) {
			sketch = d.__self || sketch;
			return a ? (this.unset(), this.path(a)) : {}
		};
	d.toRect = function(a) {
		return [{
			x: a.x1,
			y: a.y1,
			cmd: "M"
		}, {
			x: a.x2,
			y: a.y1,
			cmd: "L"
		}, {
			x: a.x2,
			y: a.y2,
			cmd: "L"
		}, {
			x: a.x1,
			y: a.y2,
			cmd: "L"
		}]
	};
	g = d.prototype;
	g.path = function(a) {
		var e = a.asRect || !1,
			b = a.convexHull || !1,
			c = a.expand || 0,
			p = a.matrix || void 0;
		a = a.data || a;
		var w, m = !0;
		p && (w = new f.Transform(p), m = f.Transform.isIdentity(p));
		var g, p = this.x,
			t = this.y,
			h, r;
		if (m) for (var m = 0, k = a.length; m < k; m++) switch ((g = a[m]).cmd) {
		case "M":
			g.x < p.min && (p.min = g.x);
			g.x > p.max && (p.max = g.x);
			g.y < t.min && (t.min = g.y);
			g.y > t.max && (t.max = g.y);
			h = g.x;
			r = g.y;
			break;
		case "L":
			g.x < p.min && (p.min = g.x);
			g.x > p.max && (p.max = g.x);
			g.y < t.min && (t.min = g.y);
			g.y > t.max && (t.max = g.y);
			h = g.x;
			r = g.y;
			break;
		case "C":
			this.cubic(h, r, g.x1, g.y1, g.x2, g.y2, g.x, g.y, b);
			h = g.x;
			r = g.y;
			break;
		case "Q":
			var v = h + 2 / 3 * (g.x1 - h),
				x = r + 2 / 3 * (g.y1 - r),
				s = v + (g.x - h) / 3,
				z = x + (g.y - r) / 3;
			this.cubic(h, r, v, x, s, z, g.x, g.y, b);
			h = g.x;
			r = g.y
		} else for (m = 0, k = a.length; m < k; m++) switch ((g = a[m]).cmd) {
		case "M":
			var y = w.point2d(g.x, g.y);
			y.x < p.min && (p.min = y.x);
			y.x > p.max && (p.max = y.x);
			y.y < t.min && (t.min = y.y);
			y.y > t.max && (t.max = y.y);
			h = y.x;
			r = y.y;
			break;
		case "L":
			y = w.point2d(g.x, g.y);
			y.x < p.min && (p.min = y.x);
			y.x > p.max && (p.max = y.x);
			y.y < t.min && (t.min = y.y);
			y.y > t.max && (t.max = y.y);
			h = y.x;
			r = y.y;
			break;
		case "C":
			y = w.point2d(g.x, g.y);
			v = w.point2d(g.x1, g.y1);
			g = w.point2d(g.x2, g.y2);
			this.cubic(h, r, v.x, v.y, g.x, g.y, y.x, y.y, b);
			h = y.x;
			r = y.y;
			break;
		case "Q":
			y = w.point2d(g.x, g.y), w.point2d(g.x1, g.y1), v = h + 2 / 3 * (y.x1 - h), x = r + 2 / 3 * (y.y1 - r), s = v + (y.x - h) / 3, z = x + (y.y - r) / 3, this.cubic(h, r, v, x, s, z, y.x, y.y, b), h = y.x, r = y.y
		}
		c && (p.expand(c), t.expand(c));
		b = {
			x1: p.min,
			x2: p.max,
			y1: t.min,
			y2: t.max
		};
		return e ? d.toRect(b) : b
	};
	g.cubic = function(a, d, b, c, f, g, m, u, t) {
		var h = this.x,
			r = this.y;
		m < h.min && (h.min = m);
		m > h.max && (h.max = m);
		u < r.min && (r.min = u);
		u > r.max && (r.max = u);
		if (t) h.extendTo(b), h.extendTo(f), r.extendTo(c), r.extendTo(g);
		else {
			t = r.min <= c && c <= r.max && r.min <= g && g <= r.max;
			if (!(h.min <= b && b <= h.max && h.min <= f && f <= h.max)) {
				var k = 3 * a - 9 * b + 9 * f - 3 * m,
					v = 6 * b - 12 * f + 6 * m,
					x = 3 * f - 3 * m;
				if (Math.abs(k) <= e) Math.abs(v) >= e && (x = -x / v, x > e && 1 > x && h.extendToCubic(x, 1 - x, a, m, b, f));
				else if (x = v * v - 4 * k * x, x >= e) {
					var s = Math.sqrt(x),
						x = (-v + s) / (2 * k);
					x > e && 1 > x && h.extendToCubic(x, 1 - x, a, m, b, f);
					x = (-v - s) / (2 * k);
					x > e && 1 > x && h.extendToCubic(x, 1 - x, a, m, b, f)
				}
			}
			t || (k = 3 * d - 9 * c + 9 * g - 3 * u, v = 6 * c - 12 * g + 6 * u, x = 3 * g - 3 * u, Math.abs(k) <= e ? Math.abs(v) >= e && (x = -x / v, x > e && 1 > x && r.extendToCubic(x, 1 - x, d, u, c, g)) : (x = v * v - 4 * k * x, x >= e && (s = Math.sqrt(x), x = (-v + s) / (2 * k), x > e && 1 > x && r.extendToCubic(x, 1 - x, d, u, c, g), x = (-v - s) / (2 * k), x > e && 1 > x && r.extendToCubic(x, 1 - x, d, u, c, g))))
		}
	};
	g.unset = function() {
		this.x = new a({
			min: Infinity,
			max: -Infinity
		});
		this.y = new a({
			min: Infinity,
			max: -Infinity
		})
	};
	var a = function(a) {
			this.min = a.min;
			this.max = a.max
		};
	a.prototype = {
		extendToCubic: function(a, d, b, c, e, f) {
			a = a * a * a * b + 3 * a * a * d * e + 3 * a * d * d * f + d * d * d * c;
			a < this.min && (this.min = a);
			a > this.max && (this.max = a)
		},
		extendTo: function(a) {
			a < this.min && (this.min = a);
			a > this.max && (this.max = a)
		},
		contains: function(a) {
			return this.min <= a && a <= this.max
		},
		expand: function(a) {
			this.min -= a;
			this.max += a
		}
	};
	var e = 1E-10;
	"undefined" !== typeof module && module.exports && (module.exports = d)
})(sketch);
"undefined" === typeof sketch && (sketch = {});
(function(g) {
	var f = g.vector || (g.vector = {});
	f.catmullRomSplineUniform = function(d) {
		Array.isArray(d) && (d = {
			path: d,
			getResult: !0
		});
		var a = d.ctx || void 0,
			e = d.getResult || !a;
		d = d.path || [];
		var f = [];
		d[0] && (e && f.push({
			cmd: "M",
			x: d[0].x,
			y: d[0].y
		}), a && a.moveTo(d[0].x, d[0].y));
		var l = d.length;
		if (1 >= l) return f;
		for (var b = 0; b < l - 1; b++) {
			var c = 0 === b ? d[0] : d[b - 1],
				p = d[b],
				g = d[b + 1],
				m = b + 2 < l ? d[b + 2] : g,
				u = p.x + (1 * g.x - 1 * c.x) / 6,
				c = p.y + (1 * g.y - 1 * c.y) / 6,
				t = g.x + (1 * p.x - 1 * m.x) / 6,
				p = g.y + (1 * p.y - 1 * m.y) / 6,
				m = g.x,
				g = g.y;
			e && f.push({
				cmd: "C",
				x1: u,
				y1: c,
				x2: t,
				y2: p,
				x: m,
				y: g
			});
			a && a.bezierCurveTo(u, c, t, p, m, g)
		}
		return f
	};
	f.catmullRomSpline = function(d) {
		Array.isArray(d) && (d = {
			path: d,
			getResult: !0
		});
		if (0 === d.amount) return f.catmullRomSplineUniform(d);
		var a = d.amount || 1,
			e = d.ctx || void 0,
			q = d.getResult || !e;
		d = d.path || [];
		var l = [];
		d[0] && (q && l.push({
			cmd: "M",
			x: d[0].x,
			y: d[0].y
		}), e && e.moveTo(d[0].x, d[0].y));
		var b = d.length;
		if (1 >= b) return l;
		for (var c = 0; c < b - 1; c++) {
			var p = 0 === c ? d[0] : d[c - 1],
				g = d[c],
				m = d[c + 1],
				u = c + 2 < b ? d[c + 2] : m;
			if ("C" === g.cmd) var t = g.x1,
				p = g.y1,
				h = g.x2,
				u = g.y2,
				r = g.x,
				k = g.y;
			else {
				var h = Math.sqrt(Math.pow(p.x - g.x, 2) + Math.pow(p.y - g.y, 2)),
					r = Math.sqrt(Math.pow(g.x - m.x, 2) + Math.pow(g.y - m.y, 2)),
					k = Math.sqrt(Math.pow(m.x - u.x, 2) + Math.pow(m.y - u.y, 2)),
					t = Math.pow(h, a),
					h = Math.pow(h, 2 * a),
					v = Math.pow(r, a),
					r = Math.pow(r, 2 * a),
					x = Math.pow(k, a),
					k = Math.pow(k, 2 * a),
					s = 2 * h + 3 * t * v + r,
					z = 2 * k + 3 * x * v + r,
					y = 3 * t * (t + v);
				0 < y && (y = 1 / y);
				v = 3 * x * (x + v);
				0 < v && (v = 1 / v);
				t = (-r * p.x + s * g.x + h * m.x) * y;
				p = (-r * p.y + s * g.y + h * m.y) * y;
				h = (k * g.x + z * m.x - r * u.x) * v;
				u = (k * g.y + z * m.y - r * u.y) * v;
				r = m.x;
				k = m.y;
				0 === t && 0 === p && (t = g.x, p = g.y);
				0 === h && 0 === u && (h = m.x, u = m.y)
			}
			q && l.push({
				cmd: "C",
				x1: t,
				y1: p,
				x2: h,
				y2: u,
				x: r,
				y: k
			});
			e && e.bezierCurveTo(t, p, h, u, r, k)
		}
		return l
	}
})(sketch);
"undefined" === typeof sketch && (sketch = {});
(function(g) {
	var f = g.util;
	g = g.vector = g.vector || {};
	(g.Degree = function(a) {}).scale = function(a, c, d) {
		return 0 > c && 0 > d ? 180 + a : 0 > c ? 360 - a : 0 > d ? 540 - a : a
	};
	var d = g.Point = function(a, c) {
			return {
				x: a || 0,
				y: c || 0
			}
		};
	d.fromArray = function(a) {
		return d(a[0], a[1])
	};
	d.clone = function(a) {
		return d(a.x, a.y)
	};
	d.equals = function(a, c) {
		return a.x === c.x && a.y === c.y
	};
	d.exists = function(a) {
		return a && isFinite(a.x + a.y)
	};
	d.add = function(a, c) {
		a.x += c.x;
		a.y += c.y;
		return a
	};
	d.subtract = function(a, c) {
		a.x -= c.x;
		a.y -= c.y;
		return a
	};
	d.dot = function(a, c) {
		return a.x * c.x + a.y * c.y
	};
	d.distance = function(a, c) {
		var d = a.x - c.x,
			e = a.y - c.y;
		return Math.sqrt(d * d + e * e)
	};
	d.angle = function(a, c, d) {
		a = Math.atan2(c.y - a.y, c.x - a.x);
		return d ? a * f.RAD_DEG : a
	};
	d.rotateAt = function(a, c, d) {
		var e = a.x,
			f = a.y;
		a.x = c.x + Math.cos(d) * (e - c.x) - Math.sin(d) * (f - c.y);
		a.y = c.y + Math.sin(d) * (e - c.x) + Math.cos(d) * (f - c.y);
		return a
	};
	d.atRadianDistance = function(a, c, d) {
		return {
			x: Math.cos(c) * d + a.x,
			y: Math.sin(c) * d + a.y
		}
	};
	d.atRadianToTime = function(a, c, d, e, f, q) {
		var l = a - d,
			h = c - e;
		f *= Math.sqrt(l * l + h * h);
		a = Math.atan2(e - c, d - a);
		q && (a += q);
		return {
			x: Math.cos(a) * f,
			y: Math.sin(a) * f
		}
	};
	d.atTimeToRadius = function(a, c, d, e) {
		var f = c.x - a.x,
			q = c.y - a.y;
		c = a.x + f * d;
		a = a.y + q * d;
		f = Math.atan2(q, f) - 1.57079632;
		return {
			x: c + Math.cos(f) * e,
			y: a + Math.sin(f) * e
		}
	};
	d.atTimeOnLine = function(a, c, d) {
		return {
			x: a.x + (c.x - a.x) * d,
			y: a.y + (c.y - a.y) * d
		}
	};
	d.atTimeOnQuadratic = function(a, c, d, e) {
		var f = 1 - e,
			q = f * f,
			f = 2 * f * e;
		e *= e;
		return {
			x: q * a.x + f * c.x + e * d.x,
			y: q * a.y + f * c.y + e * d.y
		}
	};
	d.nearestOnLine = function(a, c, d, e) {
		var f = d.x - c.x;
		d = d.y - c.y;
		var q = f * f + d * d;
		a = (a.x - c.x) * f + (a.y - c.y) * d;
		var l = a / q;
		e && (l = Math.max(0, Math.min(1, a / q)));
		return {
			time: l,
			x: c.x + f * l,
			y: c.y + d * l
		}
	};
	d.toLineDistance = function(a, c, d) {
		var e = d.x - c.x,
			f = d.y - c.y,
			q = e * e + f * f;
		if (0 === q) var l = c.x,
			h = c.y;
		else l = (a.x - c.x) * e, h = (a.y - c.y) * f, q = (l + h) / q, 0 > q ? (l = c.x, h = c.y) : 1 < q ? (l = d.x, h = d.y) : (l = c.x + q * e, h = c.y + q * f);
		e = a.x - l;
		f = a.y - h;
		return Math.sqrt(e * e + f * f)
	};
	d.lineToLineIntersectionSweep = function(a, c, d, e) {
		return (e.y - a.y) * (d.x - a.x) > (d.y - a.y) * (e.x - a.x) !== (e.y - c.y) * (d.x - c.x) > (d.y - c.y) * (e.x - c.x) && (d.y - a.y) * (c.x - a.x) > (c.y - a.y) * (d.x - a.x) !== (e.y - a.y) * (c.x - a.x) > (c.y - a.y) * (e.x - a.x)
	};
	d.lineToLineIntersection = function(a, c, d, e) {
		var f = c.y - a.y;
		c = c.x - a.x;
		var q = e.x - d.x,
			l = e.y - d.y;
		e = c * l - f * q;
		if (!e) return !1;
		var h = a.x - d.x;
		d = a.y - d.y;
		q = (q * d - l * h) / e;
		if (0 > q || 1 < q) return !1;
		d = (c * d - f * h) / e;
		return 0 > d || 1 < d ? !1 : {
			x: a.x + q * c,
			y: a.y + q * f
		}
	};
	d.inBBox = function(a, c) {
		return a.x > c.x1 && a.y > c.y1 && a.x < c.x2 && a.y < c.y2
	};
	d.inRect = function(a, c, d, e) {
		var f = d.x - c.x,
			q = d.y - c.y,
			l = e.x - d.x;
		e = e.y - d.y;
		c = f * (a.x - c.x) + q * (a.y - c.y);
		a = l * (a.x - d.x) + e * (a.y - d.y);
		return 0 < c && c < f * f + q * q && 0 < a && a < l * l + e * e
	};
	d.inPolygon =

	(function(g) {
	var f = (g.vector = g.vector || {}).Point,
		d = g.vector.mcMasterSmooth = function(a, d) {
			d = d || 3;
			0 === d % 2 && d++;
			var f = d / 2 >> 0,
				b = a.length;
			if (b < d) return a;
			for (var c = 0, p = 0, g = 0; g < d; g++) c += a[g].x, p += a[g].y;
			for (var m = a.slice(0, f), g = f, u = b - f; g < u; g++) {
				var t = a[g];
				"C" === t.cmd ? m.push(t) : (g > f && (c -= a[g - f - 1].x, p -= a[g - f - 1].y, c += a[g + f].x, p += a[g + f].y), m.push({
					x: (t.x + c / d) / 2,
					y: (t.y + p / d) / 2
				}))
			}
			return m.concat(a.slice(u, b))
		},
		a = g.vector.langSimplify = function(a, d, l) {
			d = d || 4;
			l = l || 1;
			var b = a.length - 1;
			if (0 >= b) return a;
			var c = 0,
				p = 0,
				g = Math.min(d, b),
				p = p + g,
				b = b - g,
				m = [];
			for (m.push(a[c]); g;) {
				for (var u = a[c], t = a[p], h = 0, r = c + 1; r != p;) {
					var k = f.toLineDistance(a[r], u, t),
						h = Math.max(h, k);
					if (h > l) break;
					else r++
				}
				h < l ? (c = p, m.push(a[c]), g = Math.min(d, b), p += g, b -= g) : (p--, b++)
			}
			return m
		};
	g.vector.roundPath = function(a, d) {
		var f = Math.pow(10, d);
		a.forEach(function(a) {
			for (var c in a) {
				var d = a[c];
				isFinite(d) && (a[c] = Math.round(d * f) / f)
			}
		});
		return a
	};
	g.vector.simplify = function(e, f, l) {
		return a(d(e, 3), 6, 1)
	}
})(sketch);
"undefined" === typeof sketch && (sketch = {});
(function(g) {
	g = g.vector || {};
	var f = function() {
			return {
				a: 1,
				b: 0,
				x: 0,
				c: 0,
				d: 1,
				y: 0
			}
		},
		d = function(d) {
			return d.a === a.a && d.b === a.b && d.c === a.c && d.d === a.d && d.x === a.x && d.y === a.y
		},
		a = f(),
		e = g.Transform = function(a) {
			void 0 === a ? this.matrix = f() : isFinite(a.a + a.b + a.c + a.d + a.x + a.y) ? this.fromObject(a) : isFinite(a[0] + a[1] + a[2] + a[3] + a[4] + a[5]) ? this.fromArray(a) : this.matrix = f();
			return this
		};
	e.identity = a;
	e.isIdentity = d;
	e.getIdentity = f;
	e.prototype = {
		identity: a,
		isIdentity: d,
		getIdentity: f,
		matrices: [],
		save: function() {
			this.matrices.push(this.cloneMatrix(this.matrix))
		},
		restore: function() {
			this.matrix = this.matrices.pop() || f()
		},
		point2d: function(a, d) {
			var b = this.matrix;
			return {
				x: b.a * a + b.c * d + b.x,
				y: b.b * a + b.d * d + b.y
			}
		},
		point2dx: function(a, d, b) {
			var c = this.matrix,
				e = a[d],
				f = a[b];
			a[d] = c.a * e + c.c * f + c.x;
			a[b] = c.b * e + c.d * f + c.y;
			return a
		},
		flatten: function(a, e, b) {
			if (a) {
				e && (a = JSON.parse(JSON.stringify(a)));
				if (a.length) {
					if (!d(this.matrix)) {
						e = 0;
						for (var c = a.length, f; e < c; e++) if (f = a[e]) switch (f.cmd) {
						case "M":
							this.point2dx(f, "x", "y");
							break;
						case "L":
							this.point2dx(f, "x", "y");
							break;
						case "C":
							this.point2dx(f, "x", "y");
							this.point2dx(f, "x1", "y1");
							this.point2dx(f, "x2", "y2");
							break;
						case "Q":
							this.point2dx(f, "x", "y");
							this.point2dx(f, "x1", "y1");
							break;
						case "Z":
						case "z":
							isFinite(f.x + f.y) && this.point2dx(f, "x", "y")
						}
					}
					b && (this.matrix = this.getIdentity())
				} else this.point2dx(a, "x", "y");
				return a
			}
		},
		invert: function(a) {
			a = a || this.matrix;
			void 0 === a.a && (M = this.cloneMatrix(M));
			var d = a.a * a.d - a.b * a.c;
			delete this.matrix;
			this.combine({
				a: a.d / d,
				b: -a.b / d,
				x: (a.b * a.y - a.d * a.x) / d,
				c: -a.c / d,
				d: a.a / d,
				y: (a.c * a.x - a.a * a.y) / d
			});
			return this
		},
		transform: function(a, d, b, c, e, f) {
			var m = this.matrix;
			this.matrix = {
				a: m.a * a + m.c * d,
				b: m.b * a + m.d * d,
				c: m.a * b + m.c * c,
				d: m.b * b + m.d * c,
				x: m.a * e + m.c * f + m.x,
				y: m.b * e + m.d * f + m.y
			};
			return this
		},
		setTransform: function(a, d, b, c, e, f) {
			this.matrix = {
				a: a,
				b: d,
				c: b,
				d: c,
				x: e,
				y: f
			};
			return this
		},
		rotate: function(a) {
			var d = this.matrix,
				b = Math.cos(a);
			a = Math.sin(a);
			this.matrix = {
				a: d.a * b + d.b * -a,
				b: d.a * a + d.b * b,
				c: d.c * b + d.d * -a,
				d: d.c * a + d.d * b,
				x: d.x,
				y: d.y
			};
			return this
		},
		scale: function(a, d) {
			void 0 === d && (d = a);
			var b = this.matrix;
			this.matrix = {
				a: b.a * a,
				b: b.b * d,
				c: b.c * a,
				d: b.d * d,
				x: b.x,
				y: b.y
			};
			return this
		},
		skew: function(a, d) {
			var b = this.matrix,
				c = b.a,
				e = b.b,
				f = b.c,
				m = b.d,
				g = Math.tan(a),
				t = Math.tan(d);
			b.a = c + f * t;
			b.b = e + m * t;
			b.c = c * g + f;
			b.d = e * g + m;
			return this
		},
		translate: function(a, d) {
			void 0 === d && (d = 0);
			var b = this.matrix;
			b.x = b.a * a + b.c * d + b.x;
			b.y = b.b * a + b.d * d + b.y;
			return this
		},
		combine: function(a) {
			var d = [];
			if (void 0 !== a.matrix) for (var b = 0; b < arguments.length; b++) d[b] = arguments[b].matrix;
			else if ("number" === typeof a.a) for (b = 0; b < arguments.length; b++) d[b] = arguments[b];
			else d = a;
			for (var b = this.matrix, c = [], e = 0; e < d.length; e++) void 0 === b ? b = d[e] : (c = d[e], b = {
				a: b.a * c.a + b.b * c.c,
				b: b.a * c.b + b.b * c.d,
				c: b.c * c.a + b.d * c.c,
				d: b.c * c.b + b.d * c.d,
				x: b.a * c.x + b.c * c.y + b.x,
				y: b.b * c.x + b.d * c.y + b.y
			});
			this.matrix = b;
			return this
		},
		clone: function() {
			return new e(this.cloneMatrix())
		},
		cloneMatrix: function(a) {
			a = a || this.matrix;
			return {
				a: a.a,
				b: a.b,
				c: a.c,
				d: a.d,
				x: a.x,
				y: a.y
			}
		},
		reset: function() {
			this.matrix = f();
			return this
		},
		fromArray: function(a) {
			this.matrix = {
				a: a[0],
				b: a[1],
				c: a[2],
				d: a[3],
				x: a[4],
				y: a[5]
			};
			return this
		},
		fromObject: function(a) {
			this.matrix = this.cloneMatrix(a);
			return this
		},
		fromString: function(a) {
			this.matrix = a.split(",").map(function(a) {
				return parseFloat(a)
			});
			return this
		},
		toString: function(a) {
			a = a || this.matrix;
			return "" + a.a + "," + a.b + "," + a.c + "," + a.d + "," + a.x + "," + a.y
		},
		toArray: function(a) {
			a = a || this.matrix;
			return [a.a, a.b, a.c, a.d, a.x, a.y]
		},
		apply: function(a, d) {
			var b = this.matrix;
			d ? a.transform(b.a, b.b, b.c, b.d, b.x, b.y) : a.setTransform(b.a, b.b, b.c, b.d, b.x, b.y);
			return this
		}
	};
	e.__default = new e;
	e.cloneMatrix = function(a) {
		return {
			a: a.a,
			b: a.b,
			c: a.c,
			d: a.d,
			x: a.x,
			y: a.y
		}
	};
	"undefined" !== typeof module && module.exports && (module.exports = e)
})(sketch);
"undefined" === typeof sketch && (sketch = {});