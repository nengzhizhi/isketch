(function(g) {
	var f = g.proxy || (g.proxy = {});
	f.pointerSetup = function(a) {
		a.target = a.target || window;
		a.doc = a.target.ownerDocument || a.target;
		a.minFingers = a.minFingers || a.fingers || 1;
		a.maxFingers = a.maxFingers || a.fingers || Infinity;
		a.position = a.position || "relative";
		a.listenerOnSetup = a.listener;
		a.pointers = {};
		a.fingers = 0;
		var d = {};
		d.gesture = a.gesture;
		d.target = a.target;
		d.env = a.env || {};
		g.modifyEventListener && a.fromOverwrite && (a.oldListener = a.listener, a.listener = g.createPointerEvent);
		a.oldListener && (d.oldListener = a.oldListener);
		d.listener = a.listener;
		d.proxy = function(b) {
			a.listener = b;
			b(a.event, d)
		};
		d.remove = function() {
			d.detatch();
			delete g.wrappers[a.uid]
		};
		d.attached = !0;
		d.attach = function() {
			!1 === d.attached && (d.attached = !0, a._pointerOver && a._pointerOver.add(), a._pointerOut && a._pointerOut.add(), a._pointerDown && a._pointerDown.add(), a._pointerMove && a._pointerMove.add(), a._pointerUp && a._pointerUp.add())
		};
		d.detatch = function() {
			!0 === d.attached && (d.attached = !1, d.resetPointers(), a._pointerOver && a._pointerOver.remove(), a._pointerOut && a._pointerOut.remove(), a._pointerDown && a._pointerDown.remove(), a._pointerMove && a._pointerMove.remove(), a._pointerUp && a._pointerUp.remove())
		};
		var l = 0;
		d.pause = function(b) {
			!a._pointerMove || b && !b.move || a._pointerMove.remove();
			!a._pointerUp || b && !b.up || a._pointerUp.remove();
			l = a.fingers;
			a.fingers = 0
		};
		d.resume = function(b) {
			!a._pointerMove || b && !b.move || a._pointerMove.add();
			!a._pointerUp || b && !b.up || a._pointerUp.add();
			a.fingers = l
		};
		d.cancel = function(a) {
			f.animation.stop();
			d.pause(a)
		};
		d.resetPointers = function(b) {
			if ("string" === typeof b) {
				var c = a.pointers || {};
				c[b] && (delete c[b], a.fingers--)
			} else a.pointers = {}, a.fingers = 0
		};
		d.resetBoundingBox = function() {
			d.bbox = a.bbox = g.getBBox(a.target);
			var b = a.pointers || {},
				c;
			for (c in b) b[c].dirty = !0
		};
		d.hasMoved = function() {
			return d.start.x !== d.x || d.start.y !== d.y
		};
		d.distanceMoved = function() {
			var a = d.start.x - d.x,
				c = d.start.y - d.y;
			return Math.sqrt(a * a + c * c)
		};
		return d
	};
	f.animation = new function() {
		var a = this,
			d = !1,
			l = null,
			b = function() {
				l();
				d && requestAnimationFrame(b)
			};
		this.stop = function() {
			d = !1
		};
		this.listener = function(c, p, f) {
			if ("down" === p.state) {
				var m = null,
					u = null;
				l = function() {
					if (m !== p.x || u !== p.y || "up" === p.state) f(c, p), m = p.x, u = p.y
				};
				!1 === d && (d = !0, b())
			} else "up" === p.state && a.stop()
		};
		return this
	};
	var d = g.supports;
	g.isMouse = !! d.mouse;
	g.isMSPointer = !! d.touch;
	g.isTouch = !! d.msPointer;
	f.defaultSID = 1;
	f.getPointerID = function(a) {
		return Object.keys(a).join(",")
	};
	f.setPointerStart = function(a, d, l) {
		var b = a.bbox;
		l = a.pointers[l] = {};
		switch (a.position) {
		case "absolute":
			l.offsetX = 0;
			l.offsetY = 0;
			break;
		case "differenceFromLast":
			l.offsetX = d.pageX;
			l.offsetY = d.pageY;
			break;
		case "difference":
			l.offsetX = d.pageX;
			l.offsetY = d.pageY;
			break;
		case "move":
			l.offsetX = d.pageX - b.x1;
			l.offsetY = d.pageY - b.y1;
			break;
		default:
			l.offsetX = b.x1 - b.scrollLeft, l.offsetY = b.y1 - b.scrollTop
		}
		a = d.pageX - l.offsetX;
		d = d.pageY - l.offsetY;
		l.rotation = 0;
		l.scale = 1;
		l.startTime = self.startTime;
		l.moveTime = self.startTime;
		l.move = {
			x: a,
			y: d
		};
		l.start = {
			x: a,
			y: d
		};
		return l
	};
	f.isPointerStart = function(a, d, l) {
		l.event = a;
		l.listener = l.listenerOnSetup;
		var b = (a.type || "mousedown").toLowerCase();
		0 === b.indexOf("mouse") ? (g.isMouse = !0, g.isTouch = !1, g.isMSPointer = !1) : 0 === b.indexOf("touch") ? (g.isMouse = !1, g.isTouch = !0, g.isMSPointer = !1) : 0 === b.indexOf("mspointer") && (g.isMouse = !1, g.isTouch = !1, g.isMSPointer = !0);
		d.startTime = g.getTime();
		var b = !l.fingers,
			c = l.pointers;
		a = a.changedTouches || g.getCoords(a);
		for (var p = a.length, w = 0; w < p; w++) {
			var m = a[w],
				u = void 0 === m.identifier ? f.defaultSID : m.identifier,
				t = c[u];
			if (l.fingers) {
				if (l.fingers >= l.maxFingers) return d.identifier = f.getPointerID(c), b;
				for (var h in c) if (c[h].up) {
					delete c[h];
					l.cancel = !0;
					l.fingers++;
					t = f.setPointerStart(l, m, u);
					break
				}
				void 0 === t && (l.fingers++, f.setPointerStart(l, m, u))
			} else d.resetBoundingBox(), l.cancel = !1, l.fingers = 1, l.pointers = {}, f.setPointerStart(l, m, u)
		}
		d.identifier = f.getPointerID(l.pointers);
		return b
	};
	f.isPointerEnd = function(a, d, l, b) {
		for (var c = l.pointers, p = a.touches || [], w = {}, m = 0, u = p.length; m < u; m++) {
			var t = p[m];
			w[void 0 === t.identifier ? f.defaultSID : t.identifier] = !0
		}
		for (var h in c) p = c[h], w[h] || p.up || (b && b(a, "up"), p.up = !0, l.fingers--);
		return 0 === u ? (a = Object.keys(c), l.fingers = 0, l.gestureFingers = a.length, d.identifier = a.join(","), !0) : !1
	};
	g.getCoords = function(a) {
		isFinite(a.pageX + a.pageY) ? g.getCoords = function(a) {
			return [{
				type: "mouse",
				x: a.pageX,
				y: a.pageY,
				pageX: a.pageX,
				pageY: a.pageY,
				identifier: void 0 === a.pointerId ? f.defaultSID : a.pointerId
			}]
		} : g.getCoords = function(a) {
			a = a || window.event;
			var e = document.documentElement;
			return [{
				type: "mouse",
				x: a.clientX + e.scrollLeft,
				y: a.clientY + e.scrollTop,
				pageX: a.clientX + e.scrollLeft,
				pageY: a.clientY + e.scrollTop,
				identifier: f.defaultSID
			}]
		};
		return g.getCoords(a)
	};
	(function() {
		var a = 0,
			d = 0;
		g.getCoord = function(l) {
			if (l.changedTouches) return (l = l.changedTouches) && l.length ? (l = l[0], {
				x: a = l.pageX,
				y: d = l.pageY
			}) : {
				x: a,
				y: d
			};
			if (isFinite(l.pageX + l.pageY)) return {
				x: l.pageX,
				y: l.pageY
			};
			var b = document.documentElement;
			l = l || window.event;
			return {
				x: l.clientX + b.scrollLeft,
				y: l.clientY + b.scrollTop
			}
		};
		g.getClientXY = function(l) {
			if (l.changedTouches) return (l = l.changedTouches) && l.length ? (l = l[0], {
				x: a = l.clientX,
				y: d = l.clientY
			}) : {
				x: a,
				y: d
			};
			l = l || window.event;
			return {
				x: l.clientX,
				y: l.clientY
			}
		}
	})();
	var a = function(a, d) {
			var l = parseFloat(a.getPropertyValue(d), 10);
			return isFinite(l) ? l : 0
		};
	g.getDocumentScroll = function(a) {
		a = a || {};
		void 0 !== window.pageXOffset ? (a.pageXOffset = window.pageXOffset, a.pageYOffset = window.pageYOffset) : "CSS1Compat" === document.compatMode ? (a.pageXOffset = document.documentElement.scrollLeft, a.pageYOffset = document.documentElement.scrollTop) : (a.pageXOffset = document.body.scrollLeft, a.pageYOffset = document.body.scrollTop);
		return a
	};
	g.getBBox = function(e) {
		if (e === window || e === document) e = document.body;
		var d = {},
			l = e.getBoundingClientRect();
		d.width = l.width;
		d.height = l.height;
		d.x1 = l.left;
		d.y1 = l.top;
		d.scaleX = l.width / e.offsetWidth || 1;
		d.scaleY = l.height / e.offsetHeight || 1;
		d.scrollLeft = 0;
		d.scrollTop = 0;
		l = window.getComputedStyle(e);
		if ("border-box" === l.getPropertyValue("box-sizing") === !1) {
			var b = a(l, "border-left-width"),
				c = a(l, "border-right-width"),
				p = a(l, "border-bottom-width"),
				f = a(l, "border-top-width");
			d.border = [b, c, f, p];
			d.x1 += b;
			d.y1 += f;
			d.width -= c + b;
			d.height -= p + f
		}
		d.x2 = d.x1 + d.width;
		d.y2 = d.y1 + d.height;
		l = l.getPropertyValue("position");
		for (e = "fixed" === l ? e : e.parentNode; null !== e && e !== document.body && void 0 !== e.scrollTop;) {
			l = window.getComputedStyle(e);
			l = l.getPropertyValue("position");
			if ("absolute" !== l) if ("fixed" === l) {
				d.scrollTop = e.scrollLeft;
				d.scrollLeft = e.scrollTop;
				break
			} else d.scrollLeft += e.scrollLeft, d.scrollTop += e.scrollTop;
			e = e.parentNode
		}
		g.getDocumentScroll(d);
		d.scrollLeft -= d.pageXOffset;
		d.scrollTop -= d.pageYOffset;
		return d
	};
	g.getTime = function() {
		var a = window.performance;
		return a && a.now ? a.now.bind(a) : Date.now
	}();
	g.gestureHandler = g.gestureHandler || {};
	g.register = function(a) {
		g.gestureHandler[a] = f[a]
	}
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});