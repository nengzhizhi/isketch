(function(g) {
	var f = g.module,
		d = g.util;
	g.doc = void 0;
	g.docs = {};
	g.setDocument = function(a) {
		if (a = g.docs[a]) {
			a.focusEditable.focus();
			if (a.idx === g.doc.idx) return a;
			var b = a.scene.clipboard;
			b && b.loadCopies();
			return g.doc = a
		}
		return console.warn("document does not exist")
	};
	g.setFeature = function(a) {
		var b = g.feature;
		a && (d.cloneInto(a, b), a = b.tools.defaults, b.tools.select = d.cloneInto(b.tools.select, d.clone(a)), b.tools.text = d.cloneInto(b.tools.text, d.clone(a)), b.tools.media = d.cloneInto(b.tools.media, d.clone(a)), b.tools.shape = d.cloneInto(b.tools.shape, d.clone(a)), b.tools.brush = d.cloneInto(b.tools.brush, d.clone(a)));
		return b
	};
	g.construct = function(b) {
		if (!b) return console.warn("root.construct requires params");
		var p = b.onready || b.onReady,
			l = b.onsupport || b.onSupport;
		if (!g.__constructed && (g.__constructed = !0, f.Namespace(g), g.client = new f.Supports(g), window.glfx && glfx.loadFilters && !glfx.presets.length)) return glfx.loadFilters(function() {
			g.construct(b)
		});
		d.cloneInto(b.icons || {}, g.ui.icons);
		var m = g.setFeature(b.feature);
		g.loc.setHost(b.hosts);
		g.style = new f.Style(g);
		var u = new f.Document(g);
		u.setAttributes(b.feature.doc);
		u.toolkit = new f.Toolkit(g, u);
		u.render = new f.SceneRender(g, u);
		u.config = new f.Configure(g, u);
		g.loc.search.debug && (u.contexts.debug = "");
		new f.GenerateMedia(g, u);
		new f.Library(g, u);
		new f.UI(g, u);
		new f.UICursor(g, u);
		u.on.sketchReady = function(a) {
			"ready" !== a.__state && (a.__state = "ready", a.focus(), m.history.bitmap && a.history.storeBitmap(), p && setTimeout(function() {
				p(a);
				a.restoreSettings()
			}, 1))
		};
		d.each(["text", "clipart", "image", "template", "stamp"], g.lib.init);
		u.setContainer({
			container: b.container,
			focusElement: b.focusElement,
			scrollElement: b.scrollElement
		});
		!f.Convert || g.convert instanceof f.Convert || (g.convert = new f.Convert(g));
		f.Assets && (g.assets = new f.Assets(g, u));
		f.Scene && (u.scene = new f.Scene(g, u), u.hovered = u.scene.hovered, u.selection = u.scene.selection, f.AddMedia && new f.AddMedia(g, u), f.AddObject && (new f.AddObject(g, u), u.scene.add = u.addObject), f.SceneReplicate && (f.SceneReplicate(g, u), u.scene.clipboard.enable()), f.SceneOrganize && f.SceneOrganize(g, u), f.ScenePlacement && f.ScenePlacement(g, u), f.SceneFind && f.SceneFind(g, u));
		f.History && (u.history = new f.History(g, u));
		f.Controls && new f.Controls(g, u);
		if (f.Theme) {
			u.theme = new f.Theme(g, u);
			var t = m.tools,
				h = u.config,
				r = d.clone(t),
				k;
			for (k in h) d.exists("root.module.toolkit." + h[k].toolkit) && (m[k] = d.cloneInto(t[k] || m[k] || r, r))
		}
		a(m, u);
		g.lang.setLocale(m.lang || "auto", function() {
			g.client.fn.init(function() {
				g.loc.search.pixelRatio || (u.pixelRatio = g.client.pixelRatio);
				l && l(u);
				setTimeout(function() {
					u.setCanvasSize();
					window.EnableContextMenu && !g.ui.contextMenu.create && (g.ui.contextMenu.create = EnableContextMenu(document, window));
					e(g, u);
					g.setup.run(g, u);
					u.toolkit.setup();
					m.debug && (document.body.style.overflow = "auto");
					q(g, u);
					g.setupHistory.run(g, u);
					d.getItem("sync", function(a) {
						u.setBackground(m.doc.background || "none");
						u.render.start();
						m.session.path = a;
						u.on.sketchReady(u)
					})
				}, 0)
			})
		})
	};
	var a = function(a, b) {
			var d = g.loc.getSearch();
			d.zoom && (b.zoom = parseFloat(d.zoom), delete d.zoom);
			d.pixelRatio && (a.canvas.usePixelRatio = !1, a.canvas.usePixelRatioDesktop = !1, b.pixelRatio = parseFloat(d.pixelRatio), d.pixelRatio = parseFloat(d.pixelRatio));
			for (var e in d) {
				var f = d[e],
					l = typeof a[e];
				"undefined" !== l && ("string" === l ? a[e] = f : "boolean" === l ? a[e] = "true" === f || !0 === f : "number" === l && isFinite(f = parseFloat(f)) && (a[e] = f))
			}
		},
		e = function(a, b) {
			var e = a.feature,
				m = a.vector;
			f.ZIP && !a.io.zip && (a.io.zip = new f.ZIP(a));
			f.PDF && !a.io.pdf && (a.io.pdf = new f.PDF(a));
			f.SVG && !a.io.svg && (a.io.svg = new f.SVG(a));
			f.JSON && !a.io.json && (a.io.json = new f.JSON(a));
			f.GBR && !a.io.blobToGBR && new f.GBR(a);
			f.ABR && !a.io.blobToABR && new f.ABR(a);
			f.Server && (a.server = new f.Server(a, b));
			!f.FileSystem || a.fs instanceof f.FileSystem || (a.fs = new f.FileSystem(a));
			!f.Open || a.open instanceof f.Open || (a.open = new f.Open(a));
			!f.Save || a.save instanceof f.Save || (a.save = new f.Save(a));
			!f.Download || a.download instanceof f.Download || (a.download = new f.Download(a));
			f.Print && !a.print && (a.print = new f.Print(a));
			!f.UIPalette || a.palette instanceof f.UIPalette || (a.palette = new f.UIPalette(a, b));
			!f.UISidebar || a.sidebar instanceof f.UISidebar || (e.pane.position ? a.sidebar = new f.UISidebar(a, e.pane.position) : console.warn("sidebar position not set"));
			!f.UITooltip || a.ui.tooltip instanceof f.UITooltip || a.client.mobile || !e.ui.tooltips || (a.ui.tooltip = new f.UITooltip(a));
			!f.UIVortex || a.vortex instanceof f.UIVortex || (a.vortex = new f.UIVortex(document.body));
			f.UIStartWindow && new f.UIStartWindow(a, b);
			e.pane.position && a.ui.UISidebarTabs();
			f.Keyboard && !a.client.mobile && (b.keyboard = new f.Keyboard(a, b), b.keyboard.enable());
			f.ShareFest && new f.ShareFest(a, b);
			f.Peer && new f.Peer(a, b);
			a.net.Swarm && a.net.Users && (a.net.swarm = new a.net.Swarm, a.net.users = new a.net.Users);
			d.getScreenMetrics && !d.toMetrics && (d.toMetrics = d.getScreenMetrics());
			d.perf && (a.perf = d.perf, a.p = a.perf());
			m.Shape && (m.VOBPath = m.Shape.VOBPath);
			f.Document && (a.Document = f.Document);
			f.Exec && new f.Exec(a);
			f.GeneratePreview && new f.GeneratePreview(a);
			f.GenerateMedia && new f.GenerateMedia(a, b);
			f.PathFinder && new f.PathFinder(a, b);
			f.Camera && (d.camera = new f.Camera(a, b));
			f.Orientation && f.Orientation.createController(a, b);
			f.RTCManager && (a.rtc = new f.RTCManager(a, b));
			d.loadImage && a.loc.PROXY && (d.loadImage.proxyUrl = a.loc.PROXY);
			f.Thumbnailer && !d.thumbnailer && (d.thumbnailer = f.Thumbnailer);
			a.ui.Loader && !a.loader && (a.loader = new a.ui.Loader);
			e.kiosk && d.requestKioskMode()
		},
		q = function(a, e) {
			var f = a.feature,
				m = e.toolkit,
				q, t = e.container,
				h = e.contexts.active;
			a.events.onResize = eventjs.add(window, "resize", function(b) {
				clearTimeout(q);
				q = setTimeout(function() {
					a.emit("beforeresize");
					e.setCanvasSize();
					f.doc.centerOnResize && e.orient.reset(!0);
					e.render.dirtyControls = !0;
					e.render.sceneGCO("onResize");
					a.emit("resize", e.viewport);
					d.eventOverride("onResize", b) || "text" === e.tool.type && m.text.updateCSS()
				}, 100)
			});
			eventjs.add(t.parentNode, "scroll", function(a) {
				var b = e.container.parentNode,
					h = b.scrollTop,
					c = b.scrollLeft;
				e.scrollTop = h;
				e.scrollLeft = c;
				e.scrollElementCSS();
				e.render.clipped = !1;
				var s = e.contexts,
					f;
				for (f in s) b = s[f], b.style.left = c + "px", b.style.top = h + "px";
				if (e.scene) {
					h = e.scene.children;
					f = 0;
					for (c = h.length; f < c; f++) b = h[f], b.dirtyTransform = !0, b.inbounds = void 0;
					m.text && (b = e.selection.item) && "text" === b.type && m.text.updateCSSTransform();
					e.render.clean("container.onScroll");
					d.eventOverrideCall("onScroll", a)
				}
			});
			(function() {
				var b = function() {
						a.net.dataChannel ? (a.server.open(), a.net.dataChannel.send(["session.change", h])) : a.server.open()
					},
					h = a.loc.getFileID();
				a.events.hashchange = eventjs.add(window, "hashchange", function(d) {
					a.emit("hashchange", a.loc.getHash());
					d = a.loc.getFileID();
					if (h !== d) {
						var e = h;
						h = d;
						a.save.confirm({
							oncontinue: b,
							onrequestsave: function() {
								a.save.fromQuery()
							},
							oncancel: function() {
								a.loc.setHash("sketch", e)
							}
						})
					}
				})
			})();
			a.ui.TSEvents.add();
			a.ui.setupStartWindow && a.ui.setupStartWindow();
			a.windows.restore && (a.events.onScroll = eventjs.add(window, "scroll", a.windows.restore));
			f.preventScroll && !f.debugCache && eventjs.add(t, "wheel", eventjs.stop);
			!1 === a.client.chromeApp && (a.events.onBeforeUnload = eventjs.add(window, "beforeunload", b));
			f.preventTouch && a.client.mobile && (a.events.onTouch = eventjs.add(document, "touchstart", eventjs.prevent, {
				strict: !0
			}));
			eventjs.add(h, "contextmenu", eventjs.prevent);
			eventjs.add(h, "mouseup", function() {
				document.activeElement !== document.body && document.activeElement && document.activeElement.blur();
				a.windows.clearFocus && eventjs.add(h, "mouseup", a.windows.clearFocus)
			});
			a.events.onFocus = eventjs.add(window, "focus", l);
			a.events.onBlur = eventjs.add(window, "load,blur", eventjs.keyTrackerReset)
		},
		l = function(a) {
			eventjs.keyTrackerReset(a);
			(a = g.doc.clipboard) && a.loadCopies()
		},
		b = function(a) {
			var b = g.feature.beforeUnloadPrompt;
			"function" === typeof b && (b = b());
			if (b) return (a || window.event).returnValue = b
		};
	g.log = function(a) {
		if ("CANVAS" === a.nodeName) {
			var b = a.toDataURL(),
				d = a.width,
				e = a.height;
			console.log("%c+", "font-size: 1px; padding: " + Math.floor(e / 2) + "px " + Math.floor(d / 2) + "px; line-height: " + e + "px;background: url(" + b + "); background-size: " + d + "px " + e + "px; color: transparent;", arguments)
		} else console.log(a)
	};
	f.Listener = function(a) {
		var b = 0,
			d = {},
			e = function(a, h) {
				if (h) {
					var c = h.sketchId || (h.sketchId = b++);
					return a + "." + c
				}
				console.warn(a, "listener does not exist")
			},
			f = function(a) {
				return h[a] instanceof l ? h[a] : h[a] = new l(a)
			},
			l = function(b) {
				var h = d[b] || (d[b] = {}),
					v = function() {
						for (var b in h) h[b].apply(a, arguments)
					};
				v.add = function(a, c) {
					a = e(b, c);
					void 0 === h[a] && c && (h[a] = c)
				};
				v.remove = function(a) {
					a = e(b, fn);
					h[a] && fn && delete h[a]
				};
				return v
			},
			h = a.on = a.addListener = function(a, b) {
				f(a).add(a, b)
			};
		a.removeListener = function(a, b) {
			f(a).remove(a, b)
		};
		a.removeListeners = function(a) {
			delete d[a];
			delete h[a]
		};
		a.emit = function() {
			var b = Array.prototype.slice.call(arguments),
				h = b.shift();
			if (h = d[h]) for (var e in h) h[e].apply(a, b)
		}
	};
	f.Listener(g)
})(sketch);
"undefined" === typeof sketch && (sketch = {});