(function(g) {
	g.registerToolkit("brush.arrow", function(f, d, a, e) {
		var g = d.toolkit,
			l = f.util;
		d = f.vector;
		var b = d.Shape,
			c = d.Point;
		this.prepare = g.prepareBrush;
		this.construct = function(a, b) {
			this.curved = !! a.curved;
			this.diameter = isFinite(a.diameter) ? a.diameter : 30;
			this.ghostDistance = isFinite(a.ghostDistance) ? a.ghostDistance : 10;
			this.mode = a.mode;
			this.pathSmoothing = this.pathSimplify = .5;
			!1 === this.curved && (this.lineRecordRotate = this.lineRecord = !0);
			b(this)
		};
		this.postprocess = function() {
			"up" !== this.state && this.state || l.Canvas.clear(this.active.canvas)
		};
		this.render = function() {
			var a = this.renderTo,
				d = this.path,
				e = d.length - 1,
				l = this.mode || 1,
				h = this.diameter,
				r = h / 2;
			a.save();
			a.beginPath();
			a.lineWidth = h / 4;
			this.isRecording && (a.globalAlpha = this.opacity / 100);
			if (this.curved) {
				a.lineCap = "round";
				a.lineJoin = "round";
				b.VOBPathOffset(a, d, 0, 0);
				l = g.getBBox(this);
				a.strokeStyle = f.style.getStyle("fill", a, l.x1, l.y1, l.x2, l.y2, this);
				a.stroke();
				var h = d[e],
					k = d[e];
				if (h && k) {
					for (; e--;) if (7 < c.distance(k, d[e])) {
						h = d[e];
						break
					}
					var e = 1,
						d = r / c.distance(h, k),
						v = c.atTimeToRadius(h, k, e - d, r),
						x = c.atTimeToRadius(h, k, 1 + d, 0),
						s = c.atTimeToRadius(h, k, e - d, -r);
					a.beginPath();
					p(a, v, x, s);
					a.fillStyle = a.strokeStyle;
					a.fill()
				}
				this.useCache && g.drawFromCache(this)
			} else if (a.lineCap = "miter", a.miterLimit = 20, h = d[0], k = d[e], h && k) {
				var e = 1,
					z = .5 * r,
					d = r / c.distance(h, k),
					y = Math.min(1.5, r / 4 * .25);
				if (1 === l) var v = c.atTimeToRadius(h, k, e, z),
					x = c.atTimeToRadius(h, k, e, -z),
					s = c.atTimeToRadius(h, k, -d, -y),
					B = c.atTimeToRadius(h, k, -d, y);
				else 2 === l ? (B = c.atTimeToRadius(h, k, 0, z), s = c.atTimeToRadius(h, k, 0, -z), x = c.atTimeToRadius(h, k, e + d, -y), v = c.atTimeToRadius(h, k, e + d, y)) : (v = c.atTimeToRadius(h, k, e, z), x = c.atTimeToRadius(h, k, e, -z), s = c.atTimeToRadius(h, k, 0, -z), B = c.atTimeToRadius(h, k, 0, z));
				a.moveTo(v.x, v.y);
				a.lineTo(x.x, x.y);
				a.lineTo(s.x, s.y);
				a.lineTo(B.x, B.y);
				a.closePath();
				if (1 === l || 3 === l) v = c.atTimeToRadius(h, k, e - d, r), B = c.atTimeToRadius(h, k, 1 + d, 0), e = c.atTimeToRadius(h, k, e - d, -r), p(a, v, B, e);
				if (2 === l || 3 === l) v = c.atTimeToRadius(h, k, d, r), B = c.atTimeToRadius(h, k, -d, 0), e = c.atTimeToRadius(h, k, d, -r), p(a, e, B, v);
				g.applyStyle(a, this);
				this.useCache && g.drawFromCache(this)
			}
			a.restore()
		};
		var p = function(a, b, d, e) {
				a.moveTo(b.x, b.y);
				a.lineTo(d.x, d.y);
				a.lineTo(e.x, e.y);
				d = c.distance(b, e);
				b = c.atTimeToRadius(b, e, .5, .25 * d);
				a.lineTo(b.x, b.y);
				a.closePath()
			};
		this.construct(a, e)
	})
})(sketch);