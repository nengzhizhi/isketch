(function(g) {
	var f = g.proxy || (g.proxy = {});
	f.dragElement = function(d, a) {
		f.drag({
			event: a,
			target: d,
			position: "move",
			listener: function(a, f) {
				d.style.left = f.x + "px";
				d.style.top = f.y + "px";
				g.prevent(a)
			}
		})
	};
	f.drag = function(d) {
		d.gesture = "drag";
		var a = d.event,
			e = d.monitor,
			q = d.animationFrame,
			l = "differenceFromLast" === d.position,
			b = function(a, b) {
				h.fingers = d.fingers;
				h.state = b;
				for (var c = a.changedTouches || g.getCoords(a), e = c.length, p = 0; p < e; p++) {
					var m = c[p],
						t = void 0 === m.identifier ? f.defaultSID : m.identifier,
						w = d.pointers[t];
					if (w) {
						w.dirty && (w = f.setPointerStart(d, m, t));
						var A = w.pageX = m.pageX,
							m = w.pageY = m.pageY,
							u = A - w.offsetX,
							F = m - w.offsetY;
						l && (w.offsetX = A, w.offsetY = m);
						h.identifier = t;
						h.start = w.start;
						h.x = u;
						h.y = F;
						q ? f.animation.listener(a, h, d.listener) : d.listener(a, h)
					}
				}
			},
			c = function(a) {
				h.pointerDown = !1;
				h.pointerMove = !1;
				h.pointerUp = !0;
				h.pointerStart = !1;
				h.pointerDrag = !1;
				h.pointerEnd = !0;
				b(a, "up")
			},
			p = function(a) {
				f.isPointerStart(a, h, d) && (e && d._pointerMove.remove(), d._pointerMove = g.add(d.doc, "mousemove", u), d._pointerUp = g.add(d.doc, "mouseup", t))
			},
			w = function() {
				d._pointerMove = g.add(d.target, "mousemove", u)
			},
			m = d.onPointerDown = function(a) {
				h.pointerDown = !0;
				h.pointerMove = !1;
				h.pointerUp = !1;
				h.pointerStart = !0;
				h.pointerDrag = !1;
				h.pointerEnd = !1;
				e && h.resetBoundingBox();
				p(a);
				b(a, "down")
			},
			u = d.onPointerMove = function(a) {
				h.pointerMove = !0;
				h.pointerStart = !1;
				h.pointerDrag = h.pointerDown;
				h.pointerEnd = !1;
				d.fingers || p(a);
				b(a, "move")
			},
			t = d.onPointerUp = function(a) {
				f.isPointerEnd(a, h, d, c) && (d._pointerMove.remove(), d._pointerUp.remove(), e && h.attached && w())
			},
			h = f.pointerSetup(d);
		h.pointerDown = !1;
		h.pointerMove = !1;
		h.pointerUp = !0;
		h.pointerStart = !1;
		h.pointerDrag = !1;
		h.pointerEnd = !1;
		e && w();
		a ? m(a) : d._pointerDown = g.add(d.target, "mousedown", m);
		return h
	};
	g.register("drag")
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});