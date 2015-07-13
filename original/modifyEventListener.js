(function(g) {
	g.modifyEventListener = !1;
	g.modifySelectors = !1;
	g.add = function(a, h, b, c) {
		return d(a, h, b, c, "add")
	};
	g.remove = function(a, h, b, c) {
		return d(a, h, b, c, "remove")
	};
	g.removeEvents = function(a) {
		for (var h in a) {
			var b = a[h];
			b && b.remove && b.remove()
		}
	};
	g.stop = function(a) {
		a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0, a.cancelBubbleCount = 0)
	};
	g.prevent = function(a) {
		a && (a.preventDefault ? a.preventDefault() : a.preventManipulation ? a.preventManipulation() : a.returnValue = !1)
	};
	g.cancel = function(a) {
		g.stop(a);
		g.prevent(a)
	};
	g.blur = function() {
		if (g.isEditingText()) {
			var a = document.activeElement;
			a.blur && a.blur()
		}
	};
	g.isEditingText = function() {
		var a = document.activeElement;
		if (a) {
			var h = a.nodeName;
			if ("INPUT" === h || "TEXTAREA" === h || "true" === a.contentEditable) return !0
		}
		return !1
	};
	g.getEventSupport = function(a, h) {
		"string" === typeof a && (h = a, a = window);
		h = "on" + h;
		if (h in a) return !0;
		a.setAttribute || (a = document.createElement("div"));
		if (a.setAttribute && a.removeAttribute) {
			a.setAttribute(h, "");
			var b = "function" === typeof a[h];
			"undefined" !== typeof a[h] && (a[h] = null);
			a.removeAttribute(h);
			return b
		}
	};
	var f = function(a) {
			if (!a || a.nodeName || "object" !== typeof a) return a;
			var h = new a.constructor,
				b;
			for (b in a) h[b] = !a[b] || a.nodeName || "object" !== typeof a[b] ? a[b] : f(a[b]);
			return h
		},
		d = function(c, v, p, s, z, y) {
			s = s || {};
			if ("[object Object]" === String(c)) return e(c, z);
			if (c && v && p) {
				if ("string" === typeof c && "ready" === v) if (window.eventjs_stallOnReady) v = "load", c = window;
				else {
					q(c, s, p);
					return
				}
				if ("string" === typeof c && (c = document.querySelectorAll(c), 0 === c.length)) {
					b("target does not exist", arguments);
					return
				}
				if (0 < c.length && c !== window) if (1 === c.length) c = c[0];
				else {
					for (var B = {}, A = 0, u = c.length; A < u; A++) {
						var F = d(c[A], v, p, f(s), z);
						F && (B[A] = F)
					}
					return l(B)
				}
				"string" === typeof v && (v = v.toLowerCase().split(/[, ]/), 1 === v.length && (v = v.shift()));
				if ("string" !== typeof v) return a(c, v, p, s, z);
				0 === v.indexOf("on") && (v = v.substr(2));
				if ("object" !== typeof c) return b("target must be an element", arguments);
				if ("function" !== typeof p) return b("listener must be a function", arguments);
				B = s.useCapture || !1;
				A = t(c) + "." + t(p) + "." + (B ? 1 : 0);
				if (g.gestureHandler[v]) if (A = v + A, "remove" === z) m[A] && (m[A].remove(), delete m[A]);
				else {
					if ("add" === z) {
						if (m[A]) return m[A].attach ? m[A].attach() : m[A].add(), m[A];
						if (s.useCall && !g.modifyEventListener) {
							var E = p;
							p = function(a, h) {
								for (var b in h) a[b] = h[b];
								return E.call(c, a)
							}
						}
						s.uid = A;
						s.gesture = v;
						s.target = c;
						s.listener = p;
						s.fromOverwrite = y;
						return m[A] = g.proxy[v](s)
					}
				} else {
					for (var D = w(v, s.strict), P = D.length, u = 0; u < P; u++) v = D[u], F = v + "." + A, "remove" === z ? m[F] && (c[r](v, p, B), delete m[F]) : "add" !== z || m[F] || (c[h](v, p, B), m[F] = {
						uid: F,
						type: v,
						target: c,
						listener: p,
						add: function() {
							for (var a = 0; a < P; a++) g.add(c, D[a], p, s)
						},
						remove: function() {
							for (var a = 0; a < P; a++) g.remove(c, D[a], p, s)
						}
					});
					return m[F]
				}
			} else b("target, type and listener are required", arguments)
		},
		a = function(a, h, b, c, e) {
			var r, p = {};
			if (isFinite(h.length)) for (var m = 0, q = h.length; m < q; m++) {
				var t = h[m];
				t && (r = d(a, t, b, f(c), e)) && (p[t] = r)
			} else for (m in h)(t = h[m]) && (r = t.listener ? d(a, m, t.listener, f(t), e) : d(a, m, t, f(c), e)) && (p[m] = r);
			return l(p)
		},
		e = function(a, h) {
			var b = a.target;
			if (a.type && a.listener) {
				var c = a.listener;
				return d(b, a.type, c, a, h)
			}
			var e = {},
				r;
			for (r in a) {
				var c = a[r],
					p = typeof c;
				if ("string" === p || "number" === p || "boolean" === p) e[r] = c
			}
			var p = {},
				m;
			for (m in a) {
				r = a[m];
				if ("function" === typeof r) var c = r,
					q = f(e);
				else if ("function" === typeof r.listener) {
					var c = r.listener,
						q = f(e),
						l;
					for (l in r) q[l] = r[l]
				} else continue;
				r = m.toLowerCase().split(/[, ]/);
				for (var t = 0; t < r.length; t++) p[m] = g.add(b, r[t], c, q, h)
			}
			return p
		},
		q = function(a, h, b) {
			var c = g.getTime(),
				e = h.timeout,
				r = setInterval(function() {
					g.getTime() - c > e && window.clearInterval(r);
					document.querySelector(a) && (window.clearInterval(r), setTimeout(b, 1))
				}, h.interval || 1E3 / 60)
		},
		l = function(a) {
			return {
				remove: function() {
					for (var h in a) a[h].remove()
				},
				add: function() {
					for (var h in a) a[h].add()
				}
			}
		},
		b = function(a, h) {
			"undefined" !== typeof console && "undefined" !== typeof console.error && console.error(a, h)
		},
		c = {
			msPointer: ["MSPointerDown", "MSPointerMove", "MSPointerUp"],
			touch: ["touchstart", "touchmove", "touchend"],
			mouse: ["mousedown", "mousemove", "mouseup"]
		},
		p = {
			MSPointerDown: 0,
			MSPointerMove: 1,
			MSPointerUp: 2,
			touchstart: 0,
			touchmove: 1,
			touchend: 2,
			mousedown: 0,
			mousemove: 1,
			mouseup: 2
		};
	g.supports = {};
	window.navigator.msPointerEnabled && (g.supports.msPointer = !0);
	g.getEventSupport("touchstart") && (g.supports.touch = !0);
	g.getEventSupport("mousedown") && (g.supports.mouse = !0);
	var w = function() {
			return function(a, h) {
				var b = document.addEventListener ? "" : "on",
					e = p[a];
				if (isFinite(e) && !h) {
					var r = [],
						d;
					for (d in g.supports) r.push(b + c[d][e]);
					return r
				}
				return [b + a]
			}
		}(),
		m = g.wrappers = {},
		u = 0,
		t = function(a) {
			return a === window ? "#window" : a === document ? "#document" : a.eventId ? a.eventId : a.eventId = "e" + u++
		},
		h = document.addEventListener ? "addEventListener" : "attachEvent",
		r = document.removeEventListener ? "removeEventListener" : "detachEvent";
	g.createPointerEvent = function(a, h, b) {
		var c = h.gesture,
			e = h.target,
			r = a.changedTouches || g.getCoords(a);
		if (r.length) {
			var p = r[0];
			h.pointers = b ? [] : r;
			h.pageX = p.pageX;
			h.pageY = p.pageY;
			h.x = h.pageX;
			h.y = h.pageY
		}
		b = document.createEvent("Event");
		b.initEvent(c, !0, !0);
		b.originalEvent = a;
		for (var d in h)"target" !== d && (b[d] = h[d]);
		g.gestureHandler[b.type] && h.oldListener.call(e, b, h, !1)
	};
	g.modifyEventListener && window.HTMLElement &&
	function() {
		var a = function(a) {
				var h = function(h) {
						var b = h + "EventListener",
							c = a[b];
						a[b] = function(a, b, e) {
							if (g.gestureHandler[a]) {
								var k = e;
								"object" === typeof e ? k.useCall = !0 : k = {
									useCall: !0,
									useCapture: e
								};
								d(this, a, b, k, h, !0)
							} else for (a = w(a), k = 0; k < a.length; k++) c.call(this, a[k], b, e)
						}
					};
				h("add");
				h("remove")
			};
		navigator.userAgent.match(/Firefox/) ? (a(HTMLDivElement.prototype), a(HTMLCanvasElement.prototype)) : a(HTMLElement.prototype);
		a(document);
		a(window)
	}();
	g.modifySelectors &&
	function() {
		var a = NodeList.prototype;
		a.removeEventListener = function(a, h, b) {
			for (var c = 0, e = this.length; c < e; c++) this[c].removeEventListener(a, h, b)
		};
		a.addEventListener = function(a, h, b) {
			for (var c = 0, e = this.length; c < e; c++) this[c].addEventListener(a, h, b)
		}
	}();
	return g
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});
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
(function(g) {
	var f = g.proxy || (g.proxy = {}),
		d = /iPhone|iPad|iPod/i.test(navigator.userAgent);
	f.click = function(a) {
		a.gesture = a.gesture || "click";
		a.maxFingers = a.maxFingers || a.fingers || 1;
		a.onPointerDown = function(d) {
			f.isPointerStart(d, e, a) && (a._pointerUp = g.add(a.doc, "mouseup", a.onPointerUp))
		};
		a.onPointerUp = function(q) {
			if ((!d || "mouseup" !== q.type) && f.isPointerEnd(q, e, a)) {
				a._pointerUp.remove();
				var l = (q.changedTouches || g.getCoords(q))[0],
					b = a.bbox,
					c = g.getBBox(a.target),
					p = l.pageY - c.pageYOffset,
					l = l.pageX - c.pageXOffset;
				if (l > b.x1 && p > b.y1 && l < b.x2 && p < b.y2 && b.scrollTop === c.scrollTop) {
					for (var w in a.pointers) if (b = a.pointers[w]) {
						e.x = b.start.x;
						e.y = b.start.y;
						break
					}
					e.state = "click";
					a.listener(q, e)
				}
			}
		};
		a._pointerDown = g.add(a.target, "mousedown", a.onPointerDown);
		var e = f.pointerSetup(a);
		return e
	};
	g.register("click")
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});
(function(g) {
	var f = g.proxy || (g.proxy = {});
	f.dbltap = f.dblclick = function(d) {
		d.gesture = d.gesture || "dbltap";
		d.maxFingers = d.maxFingers || d.fingers || 1;
		var a, e, q, l, b;
		d.onPointerDown = function(p) {
			var w = p.changedTouches || g.getCoords(p);
			a && !e ? (b = w[0], e = g.getTime() - a) : (l = w[0], a = g.getTime(), e = 0, clearTimeout(q), q = setTimeout(function() {
				a = 0
			}, 700));
			f.isPointerStart(p, c, d) && ((d._pointerMove = g.add(d.doc, "mousemove", d.onPointerMove)).listener(p), d._pointerUp = g.add(d.doc, "mouseup", d.onPointerUp))
		};
		d.onPointerMove = function(c) {
			if (a && !e) b = (c.changedTouches || g.getCoords(c))[0];
			else if (!b) return;
			c = d.bbox;
			var f = b.pageX - c.x1,
				m = b.pageY - c.y1;
			0 < f && f < c.width && 0 < m && m < c.height && 25 >= Math.abs(b.pageX - l.pageX) && 25 >= Math.abs(b.pageY - l.pageY) || (d._pointerMove.remove(), clearTimeout(q), a = e = 0)
		};
		d.onPointerUp = function(b) {
			f.isPointerEnd(b, c, d) && (d._pointerMove.remove(), d._pointerUp.remove());
			if (a && e) {
				if (700 >= e) {
					for (var l in d.pointers) {
						l = d.pointers[l];
						c.x = l.start.x;
						c.y = l.start.y;
						break
					}
					c.state = d.gesture;
					d.listener(b, c)
				}
				clearTimeout(q);
				a = e = 0
			}
		};
		d._pointerDown = g.add(d.target, "mousedown", d.onPointerDown);
		var c = f.pointerSetup(d);
		return c
	};
	g.register("dbltap");
	g.register("dblclick")
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});
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
(function(g) {
	var f = g.proxy || (g.proxy = {}),
		d = Math.PI / 180,
		a = function(a, d) {
			var l = 0,
				b = 0,
				c = 0,
				p;
			for (p in d) {
				var f = d[p];
				!0 !== f.up && (l += f.move.x, b += f.move.y, c++)
			}
			a.x = l / c;
			a.y = b / c;
			return a
		};
	f.gesture = function(e) {
		e.gesture = e.gesture || "gesture";
		e.minFingers = e.minFingers || e.fingers || 2;
		e.onPointerDown = function(d) {
			var b = e.fingers;
			f.isPointerStart(d, q, e) && (e._pointerMove = g.add(e.doc, "mousemove", e.onPointerMove), e._pointerUp = g.add(e.doc, "mouseup", e.onPointerUp));
			e.fingers === e.minFingers && b !== e.fingers && (b = e.pointers, q.fingers = e.minFingers, q.scale = 1, q.rotation = 0, q.state = "start", q.identifier = f.getPointerID(b), a(q, b), e.listener(d, q))
		};
		e.onPointerMove = function(l, b) {
			for (var c = e.bbox, p = e.pointers, w = l.changedTouches || g.getCoords(l), m = w.length, u = 0; u < m; u++) {
				var t = w[u],
					h = void 0 === t.identifier ? f.defaultSID : t.identifier,
					r = p[h];
				r && (r.move.x = t.pageX - c.x1, r.move.y = t.pageY - c.y1)
			}
			if (!(e.fingers < e.minFingers)) {
				w = [];
				m = c = 0;
				a(q, p);
				for (h in p) if (t = p[h], !0 !== t.up && (u = t.start, u.x !== q.x || u.y !== q.y)) {
					if (void 0 === u.distance) {
						var r = u.x - q.x,
							k = u.y - q.y;
						u.distance = Math.sqrt(r * r + k * k);
						u.angle = Math.atan2(r, k) / d
					}
					var r = t.move.x - q.x,
						k = t.move.y - q.y,
						v = Math.sqrt(r * r + k * k),
						c = c + v / u.distance,
						r = Math.atan2(r, k) / d,
						u = (u.angle - r + 360) % 360 - 180;
					t.DEG2 = t.DEG1;
					t.DEG1 = 0 < u ? u : -u;
					isFinite(t.DEG2) && (t.rotation = 0 < u ? t.rotation + (t.DEG1 - t.DEG2) : t.rotation - (t.DEG1 - t.DEG2), m += t.rotation);
					w.push(t.move)
				}
				q.touches = w;
				q.fingers = e.fingers;
				q.scale = c / e.fingers;
				q.rotation = m / e.fingers;
				q.state = "change";
				e.listener(l, q)
			}
		};
		e.onPointerUp = function(a) {
			var b = e.fingers;
			f.isPointerEnd(a, q, e) && (e._pointerMove.remove(), e._pointerUp.remove());
			b === e.minFingers && e.fingers < e.minFingers && (q.fingers = e.fingers, q.state = "end", e.listener(a, q))
		};
		e._pointerDown = g.add(e.target, "mousedown", e.onPointerDown);
		var q = f.pointerSetup(e);
		return q
	};
	g.register("gesture")
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});
(function(g) {
	var f = g.proxy || (g.proxy = {});
	f.longpress = function(d) {
		d.gesture = "longpress";
		return f.tap(d)
	};
	f.tap = function(d) {
		d.gesture = d.gesture || "tap";
		d.delay = d.delay || 500;
		d.driftDeviance = d.driftDeviance || 10;
		d.timeout = d.timeout || 250;
		var a, e;
		d.onPointerDown = function(l) {
			f.isPointerStart(l, q, d) && (a = g.getTime(), (d._pointerMove = g.add(d.doc, "mousemove", d.onPointerMove)).listener(l), d._pointerUp = g.add(d.doc, "mouseup", d.onPointerUp), "longpress" === d.gesture && (e = setTimeout(function() {
				if (!(l.cancelBubble && 1 < ++l.cancelBubbleCount)) {
					var a = 0,
						c;
					for (c in d.pointers) {
						var e = d.pointers[c];
						if (!0 === e.end || d.cancel) return;
						a++
					}
					d.minFingers <= a && d.maxFingers >= a && (q.state = "start", q.fingers = a, q.x = e.start.x, q.y = e.start.y, d.listener(l, q))
				}
			}, d.delay)))
		};
		d.onPointerMove = function(a) {
			var b = d.bbox;
			a = a.changedTouches || g.getCoords(a);
			for (var c = a.length, e = 0; e < c; e++) {
				var q = a[e],
					m = d.pointers[void 0 === q.identifier ? f.defaultSID : q.identifier];
				if (m) {
					var u = q.pageX - b.x1,
						q = q.pageY - b.y1,
						t = u - m.start.x,
						m = q - m.start.y,
						m = Math.sqrt(t * t + m * m);
					if (!(0 < u && u < b.width && 0 < q && q < b.height && m <= d.driftDeviance)) {
						d._pointerMove.remove();
						d.cancel = !0;
						break
					}
				}
			}
		};
		d.onPointerUp = function(l) {
			if (f.isPointerEnd(l, q, d) && (clearTimeout(e), d._pointerMove.remove(), d._pointerUp.remove(), !(l.cancelBubble && 1 < ++l.cancelBubbleCount))) if ("longpress" === d.gesture)"start" === q.state && (q.state = "end", d.listener(l, q));
			else if (!(d.cancel || g.getTime() - a > d.timeout)) {
				var b = d.gestureFingers;
				d.minFingers <= b && d.maxFingers >= b && (q.state = "tap", q.fingers = d.gestureFingers, d.listener(l, q))
			}
		};
		d._pointerDown = g.add(d.target, "mousedown", d.onPointerDown);
		var q = f.pointerSetup(d);
		return q
	};
	g.register("tap");
	g.register("longpress")
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});
(function(g) {
	var f = g.proxy || (g.proxy = {});
	f.hover = function(d) {
		d.gesture = d.gesture || "hover";
		d.maxFingers = d.maxFingers || d.fingers || 1;
		d.delay = d.delay || 150;
		d.interval = d.interval || 30;
		d.timeout = d.timeout || 1E4;
		var a, e, q = 0;
		d.onPointerOver = function(b) {
			f.isPointerStart(b, l, d) && (d._pointerOut = g.add(d.target, "mouseout", d.onPointerOut), clearTimeout(a), clearInterval(e), a = setTimeout(function() {
				e = setInterval(function() {
					var c = g.getTime() - l.startTime;
					c > d.timeout ? (clearTimeout(a), clearInterval(e)) : (l.state = "hover", l.iterate = q++, l.lapse = c, d.listener(b, l))
				}, d.interval)
			}, d.delay))
		};
		d.onPointerOut = function(b) {
			f.isPointerEnd(b, l, d) && (d._pointerOut.remove(), clearTimeout(a), clearInterval(e))
		};
		d._pointerOver = g.add(d.target, "mouseover", d.onPointerOver);
		var l = f.pointerSetup(d);
		return l
	};
	g.register("hover")
})(eventjs);
"undefined" === typeof eventjs && (eventjs = {});