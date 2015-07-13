(function(g) {
	var f = g.proxy || (g.proxy = {});
	f.wheelPreventElasticBounce = function(d) {
		d && ("string" === typeof d && (d = document.querySelector(d)), g.add(d, "wheel", function(a, e) {
			e.preventElasticBounce(a);
			g.stop(a)
		}))
	};
	f.wheel = function(d) {
		var a, e = d.timeout || 150,
			f = 0,
			l = {
				gesture: "wheel",
				state: "start",
				wheelDelta: 0,
				target: d.target,
				listener: d.listener,
				preventElasticBounce: function(a) {
					var b = this.target,
						c = b.scrollTop;
					c + b.offsetHeight === b.scrollHeight && 0 >= this.wheelDelta ? g.cancel(a) : 0 === c && 0 <= this.wheelDelta && g.cancel(a);
					g.stop(a)
				},
				add: function() {
					d.target[c](w, b, !1)
				},
				remove: function() {
					d.target[p](w, b, !1)
				}
			},
			b = function(b) {
				b = b || window.event;
				l.state = f++ ? "change" : "start";
				l.wheelDelta = b.detail ? -20 * b.detail : b.wheelDelta;
				d.listener(b, l);
				clearTimeout(a);
				a = setTimeout(function() {
					f = 0;
					l.state = "end";
					l.wheelDelta = 0;
					d.listener(b, l)
				}, e)
			},
			c = document.addEventListener ? "addEventListener" : "attachEvent",
			p = document.removeEventListener ? "removeEventListener" : "detachEvent",
			w = g.getEventSupport("mousewheel") ? "mousewheel" : "DOMMouseScroll";
		d.target[c](w, b, !1);
		return l
	};
	g.register("wheel")
})(eventjs);
(function(g) {
	g.elementsFromEvent = function(f, d) {
		var a = g.getClientXY(f);
		return g.elementsFromPoint(a.x, a.y, d)
	};
	g.elementsFromPoint = function(f, d, a) {
		var e = a ? a.ownerDocument : document;
		a = a || e.getElementsByTagName("html")[0];
		e = e.elementFromPoint(f, d);
		if (e === a || "HTML" === e.nodeName) return [e];
		var q = e.style.pointerEvents;
		e.style.pointerEvents = "none";
		f = [e].concat(g.elementsFromPoint(f, d, a));
		e.style.pointerEvents = q;
		return f
	}
})(eventjs);
(function(g) {
	var f = g.proxy;
	(g.keyTrackerReset = function() {
		g.fnKey = f.fnKey = !1;
		g.metaKey = f.metaKey = !1;
		g.escKey = f.escKey = !1;
		g.ctrlKey = f.ctrlKey = !1;
		g.shiftKey = f.shiftKey = !1;
		g.altKey = f.altKey = !1
	})();
	g.keyTracker = function(a) {
		var b = "keydown" === a.type;
		27 === a.keyCode && (g.escKey = f.escKey = b);
		q[a.keyCode] && (g.metaKey = f.metaKey = b);
		g.ctrlKey = f.ctrlKey = a.ctrlKey;
		g.shiftKey = f.shiftKey = a.shiftKey;
		g.altKey = f.altKey = a.altKey
	};
	g.getKeyID = function(a) {
		return d[a.keyCode] || ""
	};
	var d = g.fromKeyCode = {
		8: "Backspace",
		9: "Tab",
		13: "Enter",
		16: "Shift",
		17: "Ctrl",
		18: "Alt",
		19: "PauseBreak",
		20: "CapsLock",
		27: "Escape",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "Left",
		38: "Up",
		39: "Right",
		40: "Down",
		45: "Insert",
		46: "Delete",
		48: "0",
		49: "1",
		50: "2",
		51: "3",
		52: "4",
		53: "5",
		54: "6",
		55: "7",
		56: "8",
		57: "9",
		65: "A",
		66: "B",
		67: "C",
		68: "D",
		69: "E",
		70: "F",
		71: "G",
		72: "H",
		73: "I",
		74: "J",
		75: "K",
		76: "L",
		77: "M",
		78: "N",
		79: "O",
		80: "P",
		81: "Q",
		82: "R",
		83: "S",
		84: "T",
		85: "U",
		86: "V",
		87: "W",
		88: "X",
		89: "Y",
		90: "Z",
		91: "LeftWindow",
		92: "RightWindow",
		93: "Select",
		96: "Numpad0",
		97: "Numpad1",
		98: "Numpad2",
		99: "Numpad3",
		100: "Numpad4",
		101: "Numpad5",
		102: "Numpad6",
		103: "Numpad7",
		104: "Numpad8",
		105: "Numpad9",
		106: "Multiply",
		107: "Add",
		109: "Subtract",
		110: "DecimalPoint",
		111: "Divide",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'"
	},
		a = navigator.userAgent.toLowerCase(),
		e = -1 !== a.indexOf("macintosh"),
		q;
	(function() {
		e && -1 !== a.indexOf("khtml") ? q = {
			91: !0,
			93: !0
		} : e && -1 !== a.indexOf("firefox") ? (q = {
			224: !0
		}, d[173] = d[189], delete d[189], d[61] = d[187], delete d[187], d[59] = d[186], delete d[186]) : q = {
			17: !0
		};
		for (var l in q) d[l] = "Meta"
	})();
	(function() {
		g.toKeyCode = {};
		for (var a in d) g.toKeyCode[d[a]] = a
	})()
})(eventjs);
Array.isArray = Array.isArray ||
function(g) {
	return g && "[object Array]" === Object.prototype.toString.call(g)
};