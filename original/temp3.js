(function(g) {
	var f, d, a, e = g.dom,
		q = g.lang,
		l = g.util,
		b = g.vector,
		c = function() {
			var a, b, c, d = g.loc.getSearch(),
				f = e.$(".sk-canvas .sk-canvas-content");
			f.offsetWidth && f.offsetHeight ? (a = f.offsetWidth, b = f.offsetHeight, c = "px") : (b = a = 100, c = "%");
			g.construct({
				container: f,
				focusElement: document.body,
				onready: k,
				onsupport: r,
				icons: {
					brushes: {
						src: "icon-paintbrush",
						children: {
							pencil: "icon-pencil",
							pen: "icon-pen",
							calligraphy: "icon-calligraphy",
							crayon: "icon-crayon",
							streamer: "icon-streamer",
							paintbrush: "icon-paintbrush",
							arrow: "icon-arrow",
							polyline: "icon-polyline",
							path: "icon-path",
							spraypaint: "icon-spraypaint",
							stamp: "icon-stamp",
							chrome: "icon-chrome",
							fur: "icon-fur",
							sketchy: "icon-sketchy",
							web: "icon-web",
							spirograph: "icon-spirograph"
						}
					},
					shapes: {
						src: "icon-star",
						children: {
							square: "icon-square",
							rectangle: "icon-rectangle",
							regularPolygon: "icon-polygon",
							triangle: "icon-triangle",
							star: "icon-star",
							burst: "icon-burst",
							circle: "icon-circle",
							ellipse: "icon-ellipse",
							pie: "icon-pie",
							ring: "icon-ring",
							radialBurst: "icon-radial-burst",
							gear: "icon-gear",
							spiral: "icon-spiral"
						}
					},
					utilities: {
						src: "icon-select",
						children: {
							select: "icon-select",
							crop: "icon-crop",
							zoom: "icon-zoom",
							screenshot: "icon-marquee"
						}
					}
				},
				feature: {
					lang: "en",
					cache257: !0,
					beta: !! d.beta,
					debug: !! d.debug,
					debugCache: !! d.debug,
					preventScroll: !d.debug,
					preventTouch: !0,
					beforeUnloadPrompt: function() {
						if (!g.feature.debug && g.doc.needsSync()) return "You’re about to exit without saving, are you sure?"
					},
					kiosk: !1,
					defaultSketch: "sketch=new",
					prefix: "sketchpad",
					io: {
						pdf: !0,
						psd: !0,
						translateX: 10,
						translateY: 10,
						exportDrop: !0
					},
					doc: {
						title: "Drawing",
						description: "made with Sketchpad - https://sketch.io/sketchpad",
						format: "sketch",
						width: parseInt(d.width || a),
						height: parseInt(d.height || b),
						units: d.units || c,
						centerOnLoad: !0,
						centerOnResize: !0,
						background: d.background || "transparent"
					},
					canvas: {
						glfx: !0,
						drawCenterPoint: !0,
						useBGRender: !1,
						useBGSave: !0,
						usePixelRatioDesktop: !1,
						containerScale: !0
					},
					zoom: {
						fromCenter: !0,
						increment: .1,
						min: .25,
						max: 6,
						value: 1
					},
					ui: {
						subtool: "list",
						dynamicCursor: !0,
						tooltips: !0,
						quickSelect: !0,
						cursors: {
							crop: "crosshair",
							screenshot: "crosshair",
							floodfill: "crosshair",
							zoom: "move"
						}
					},
					pane: {
						position: "left",
						open: !0,
						save: !0,
						configure: !0,
						history: !0,
						layers: !0
					},
					hotkeys: "select text pen arrow path stamp star clipart floodfill".split(" "),
					vector: {
						record: !0,
						edit: !0
					},
					history: {
						vector: !0,
						limit: l.INFINITY,
						autoSelect: !0
					},
					tools: {
						defaults: {
							addByClick: !1,
							addByDrag: !0,
							drawBBox: !0,
							maxHeight: 8192,
							maxWidth: 8192,
							minHeight: 3,
							minWidth: 3,
							movable: !0,
							units: "userSpaceOnUse",
							usePointInBBox: !0,
							usePointInImageData: !0,
							usePointInPath: !1,
							usePointNearest: !0,
							controls: {
								touch: {
									width: 12,
									height: 12,
									padding: 16
								},
								mouse: {
									width: 12,
									height: 12,
									padding: 8
								},
								normal: {
									fillStyle: "#000"
								},
								hover: {
									fillStyle: "#0080C2"
								},
								focus: {
									fillStyle: "#dd167a"
								},
								anchor: {
									command: "move",
									title: "click-to-select",
									"title:selected": "drag-to-move",
									"title.text": "dbltap-to-edit",
									"title.text:selected": "click-to-edit",
									padding: 0
								},
								spinner: {
									title: "drag-to-rotate",
									command: "rotate",
									cursor: "n-rotate",
									shape: "circle"
								},
								n: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "n-resize"
								},
								s: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "s-resize"
								},
								e: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "e-resize"
								},
								w: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "w-resize"
								},
								nw: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "nw-resize",
									onmousedown: "scale"
								},
								ne: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "ne-resize",
									onmousedown: "scale"
								},
								se: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "se-resize",
									onmousedown: "scale"
								},
								sw: {
									title: "drag-to-resize",
									command: "scale",
									cursor: "sw-resize",
									onmousedown: "scale"
								}
							}
						},
						media: {
							addByClick: !0,
							useSearch: "no"
						},
						text: {
							addByClick: !0,
							defaultHeight: 100,
							defaultWidth: 300,
							minHeight: 15,
							minWidth: 15,
							useSearch: "text"
						}
					},
					placement: {
						mediaClick: !1,
						mediaDrag: !0
					},
					palette: {
						colorPicker: !0,
						drag: !0,
						eyeDropper: !0,
						grid: !0,
						header: "",
						hexInput: !0
					},
					style: {
						fromGlobalStyleOnSetTool: !0,
						fromGlobalBlendOnSetTool: !1,
						blend: !0,
						color: {
							fill: "#000",
							stroke: "#f00"
						},
						gradient: !0,
						pattern: !0,
						colorMode: !0,
						colorNoise: !0,
						lineJoin: !0
					},
					stream: {
						api: "WebSocket",
						maxFileSize: 0,
						audio: !1,
						video: !0,
						videoAtop: !0,
						text: !1
					},
					sync: {
						enabled: !0,
						onsave: function() {
							g.ui.log(q.translate("changes-saved"));
							g.loader.create("syncing", q.translate("syncing") + "...", 100)
						},
						onprogress: function(a) {
							g.loader.create("syncing", q.translate("syncing") + "...", a)
						},
						folder: !0,
						thumb: {
							format: "jpeg",
							toBlob: !0,
							suffix: "thumb",
							compress: .92,
							width: 480,
							height: 480,
							useBBox: !1,
							useVisibleRegion: !1,
							center: !0,
							crop: "edge"
						}
					}
				},
				hosts: {
					localhost: {
						HOST: "localhost/sketch.io/sketch-src/www",
						IO: "localhost:4000",
						RTC: "localhost:3001",
						GET: "localhost/sketch.io/sketch-src/www/filesystem.php?sketch=",
						POST: "localhost/sketch.io/sketch-src/www/filesystem.php",
						alias: ["192.168.0.133", "mudcube.local"]
					},
					"localhost:3001": {
						feature: {
							stream: {
								audio: !1,
								sketch: !0,
								realtime: !0,
								sketchRTC: !0,
								video: !0,
								videoAtop: !0
							}
						},
						HOST: "localhost:3001/",
						IO: "localhost:4000",
						RTC: "localhost:3001",
						GET: "localhost:4000/get/?file=",
						POST: "localhost:4000/save/",
						alias: ["192.168.0.133:3001", "mudcube.local:3001"]
					},
					"sketch.io": {
						HOST: "sketch.io/sketchpad/",
						GET: d.GET || "sketch.io/get/?file=",
						POST: d.POST || "sketch.io/save/",
						IO: "sketch.io:4000",
						RTC: "sketch.io"
					}
				}
			})
		},
		p = function() {
			var b = window.location.host,
				c = -1 !== b.indexOf("hangout"),
				b = -1 !== b.indexOf(":3001"),
				e = {
					menu: "",
					about: ""
				};
			c ? (f = e, d = {}, a = {
				select: "",
				text: "",
				pen: "",
				star: "",
				clipart: ""
			}) : b ? (f = e, d = {}, a = {
				select: "",
				text: "",
				pen: "",
				star: "",
				clipart: "",
				camera: ""
			}) : (f = e, a = {
				undo: ""
			}, d = {
				select: "",
				text: "",
				pen: "",
				star: "",
				clipart: "",
				floodfill: "",
				eraser: ""
			});
			g.feature.beta && (l.cloneInto({
				brushes: {
					children: {
						oil: "icon-oil",
						textbrush: "icon-text",
						shader: "icon-brush"
					}
				},
				shapes: {
					children: {
						supershape: "icon-infinity"
					}
				}
			}, g.ui.icons), d.floodfill = "", d.camera = "")
		},
		w = function(a, b) {
			var c = -1 !== window.location.host.indexOf("hangout"),
				d = function() {
					var a = function() {
							g.peer && g.net.socket && (g.peer.startFileServer(g.net.socket), g.peer.requestAssets());
							b && b()
						};
					if (c) {
						var d = g.server.getResource(); - 1 === d.indexOf("/") && (d = "room/" + d);
						g.net.SocketIO("room/hangout", a)
					} else g.open.fromQuery(window.location.search, a, a)
				};
			g.fs.init ? g.fs.init(function(a) {
				g.fs.updateProjects(!1, d)
			}, d) : d()
		};
	g.on("resize", function() {
		var b = window.innerWidth - 0 - 0;
		e.setCSS(".sk-toolset .sk-tool", "display", "");
		for (var c = "menu brush shape select clipart text".split(" "), d = 0; d < c.length; d++) {
			var g = c[d],
				h = a[g] || f[g];
			h && (b <= 40 * (d + 1) ? (h.display = !1, e.setCSS(".sk-toolset #tool-" + g, "display", "none")) : h.display = !0)
		}
		m()
	});
	var m = function() {
			var b = e.$(".sk-canvas .sk-canvas-content"),
				c = b.querySelector(".sk-toolset-stylesheet") || document.createElement("style"),
				g = l.count(a, "display", !0),
				h = l.count(f, "display", !0),
				k = l.count(d, "display", !0),
				m = h + g + k,
				p = g / m * 100,
				q = h / m * 100,
				m = k / m * 100,
				r = Math.min(45 * g, 700),
				s = Math.min(45 * h, 700),
				t = Math.min(100 * k, 700);
			c.className = "sk-toolset-stylesheet";
			c.type = "text/css";
			c.innerHTML = "\tdiv.sk-toolset div.left {\t\twidth: " + q + "%;\t\tmax-width: " + s + "px;\t}\tdiv.sk-toolset div.center {\t\twidth: " + m + "%;\t\tmax-width: " + t + "px;\t}\tdiv.sk-toolset div.right {\t\twidth: " + p + "%;\t\tmax-width: " + r + "px;\t}\tdiv.sk-toolset div.left .sk-tool {\t\twidth: " + 1 / h * 100 + "%;\t}\tdiv.sk-toolset div.center .sk-tool {\t\twidth: " + 1 / k * 100 + "%;\t}\tdiv.sk-toolset div.right .sk-tool {\t\twidth: " + 1 / g * 100 + "%;\t}";
			b.appendChild(c)
		},
		u = function() {
			var b = function(a, b) {
					for (var c in a) {
						var d = a[c],
							f = c.replace("menu-", ""),
							h = "";
						g.detect.utility[c] && (h = " utilities");
						g.detect.shape[c] && (h = " shapes");
						g.detect.brush[c] && "floodfill" !== c && "eraser" !== c && (h = " brushes");
						f = {
							id: "tool-" + c,
							title: f,
							className: "sk-tool" + h,
							parent: b
						};
						0 === d.indexOf(".") || 0 === d.indexOf("http") ? f.src = d : f.symbol = "icon-" + (d || c);
						f = new g.ui.Button(f);
						h && (h = e.create('<span class="sk-arrow"></span>'), f.appendChild(h));
						a[c] = {
							icon: d,
							display: !0
						}
					}
				};
			g.client.fn.getUserMedia() || delete a.camera;
			g.ui.tooltip && eventjs.add({
				target: e.$(".sk-toolset"),
				mouseover: function(a) {
					g.ui.tooltip.update("")
				}
			});
			b(f, e.$(".sk-toolset .left"));
			b(a, e.$(".sk-toolset .right"));
			b(d, e.$(".sk-toolset .center"));
			g.ui.TSEvents.add();
			g.on.resize();
			m();
			g.exec.register("about", function() {
				window.open("./guide/")
			});
			eventjs.add("#tool-undo", "click", function(a, b) {
				var c = b.target,
					d = c.parentNode,
					f = e.$("#tool-redo", d);
				f ? f.style.display = "" : (f = e.append(d, '<span class="sk-tool" id="tool-redo" data-title="redo"><span class="sk-tool-title">Redo</span><span class="sk-icon icon-redo"></span></span>'), g.ui.tooltip.add(f, "redo"), eventjs.add(c, "mousedown", eventjs.stop), eventjs.add(f, "mousedown", eventjs.stop), eventjs.add(f, "click", function() {
					g.exec("redo")
				}));
				var h = eventjs.add(document.body, "mousedown", function(a) {
					f.style.display = "none";
					h.remove()
				})
			})
		},
		t = function() {
			window.zip && (zip.workerScriptsPath = g.loc.HOST + "inc/Zip/");
			window.PDFJS && (PDFJS.workerSrc = g.loc.HOST + "inc/pdf/pdf.worker.min.js");
			p();
			!1 === g.client.fs && e.setCSS(".open-doc-start", "display", "none");
			if (g.client.nodewebkit) {
				var a = require("nw.gui"),
					b = a.Window.get(),
					c = new a.Menu({
						type: "menubar"
					});
				c.createMacBuiltin("Sketchpad", {
					hideEdit: !0
				});
				b.menu = c;
				c = new a.Menu;
				c.append(new a.MenuItem({
					label: "New...",
					click: function() {
						g.exec("new-confirm")
					}
				}));
				c.append(new a.MenuItem({
					type: "separator"
				}));
				c.append(new a.MenuItem({
					label: "Open...",
					click: function() {
						g.open.chooseEntry(function(a) {
							g.doc.addMedia({
								openAsNew: !0,
								blob: a
							})
						}, function() {})
					}
				}));
				c.append(new a.MenuItem({
					type: "separator"
				}));
				c.append(new a.MenuItem({
					label: "Save as...",
					click: function() {
						g.save.chooseEntry(g.save.blob(), function(a) {
							console.log(a)
						}, function() {})
					}
				}));
				c.append(new a.MenuItem({
					type: "separator"
				}));
				c.append(new a.MenuItem({
					label: "Print...",
					click: function() {
						g.exec("print")
					}
				}));
				var d = new a.Menu;
				d.append(new a.MenuItem({
					label: "Undo",
					key: "z",
					modifiers: "cmd",
					click: function() {
						g.exec("undo")
					}
				}));
				d.append(new a.MenuItem({
					label: "Redo",
					key: "Z",
					modifiers: "cmd",
					click: function() {
						g.exec("redo")
					}
				}));
				d.append(new a.MenuItem({
					type: "separator"
				}));
				d.append(new a.MenuItem({
					label: "Cut",
					key: "x",
					modifiers: "cmd",
					click: function() {
						g.exec("layer-cut")
					}
				}));
				d.append(new a.MenuItem({
					label: "Copy",
					key: "c",
					modifiers: "cmd",
					click: function() {
						g.exec("layer-copy")
					}
				}));
				d.append(new a.MenuItem({
					label: "Paste",
					key: "v",
					modifiers: "cmd",
					click: function() {
						g.exec("layer-paste")
					}
				}));
				d.append(new a.MenuItem({
					label: "Delete",
					click: function() {
						g.exec("layer-delete")
					}
				}));
				d.append(new a.MenuItem({
					type: "separator"
				}));
				d.append(new a.MenuItem({
					label: "Select All",
					key: "a",
					modifiers: "cmd",
					click: function() {
						g.exec("select-all")
					}
				}));
				var f = new a.Menu;
				f.append(new a.MenuItem({
					label: "Report an issue...",
					click: function() {}
				}));
				f.append(new a.MenuItem({
					label: "Sketchpad Help",
					click: function() {}
				}));
				b.menu.insert(new a.MenuItem({
					label: "File",
					submenu: c
				}), 1);
				b.menu.insert(new a.MenuItem({
					label: "Edit",
					submenu: d
				}), 2);
				b.menu.append(new a.MenuItem({
					label: "Help",
					submenu: f
				}))
			}
		},
		h = function(a) {
			var b = e.$(".sk-viewport");
			a = isFinite(a) ? a : g.sidebar.opened ? 220 : 0;
			b.style.paddingLeft = a + "px"
		},
		r = function(a) {
			l.getItem("browser-upgrade", function(a) {
				if (!a && (a = g.client.canvas, !g.client.fileReader || !a)) {
					var b = "Your browser is out of date =(<p>",
						b = a ? b + "Loading your own images will not work.<p>" : b + "Sketchpad will not work in this browser.<p>";
					g.client.safari && g.client.windows && (b += "Apple discontinued Safari support for Windows in 2012.<p>");
					g.ui.alert({
						callback: function() {
							l.setItem("browser-upgrade")
						},
						message: b + '<p><a href="http://browsehappy.com/">Upgrade your browser now!</a>',
						labels: {
							ok: "Not now"
						}
					})
				}
			});
			l.getItem("show-sidebar-left", function(a) {
				"false" === a && h(0)
			});
			t()
		},
		k = function(a) {
			console.log(v + q.translate("console-message"));
			g.doc = a;
			g.ui.log("Sketchpad v" + g.__version);
			a.config.stamp.src = "stamp/Butterflies/1-live.png";
			a.config.image.src = "clipart/animals/1216139760278927551lemmling_Cartoon_cow.svg";
			a.config.clipart.src = "clipart/animals/1216139760278927551lemmling_Cartoon_cow.svg";
			w(a, function() {
				g.feature.debug && g.debugTest(g, a)
			});
			u();
			e.$(".sk-canvas").style.display = "block";
			e.$("#filters").style.display = "none";
			g.ui.scrollable("#filters");
			g.rtc && (g.feature.stream.videoAtop ? (e.$("#videos").style.display = "block", g.rtc.arrange.fn("singleBottomRight")) : e.$("#videos").style.display = "none");
			var b = function() {
					setTimeout(function() {
						g.on.resize();
						g.on.beforeresize();
						a.setCanvasSize();
						a.orient.reset();
						a.render.dirtyControls = !0;
						a.render.sceneGCO()
					}, 350)
				};
			g.sidebar.on("open", b);
			g.sidebar.on("close", b);
			g.on("beforeresize", function() {
				h()
			});
			g.on("open", function() {
				g.ui.setPane(g.ui.fullpath, !0)
			});
			l.getItem("show-sidebar-left", function(a) {
				"false" !== a && g.sidebar.open()
			});
			setTimeout(function() {
				var a = e.$(".sk-instant");
				a && a.classList.remove("sk-instant")
			}, 250)
		},
		v = "\n  ___________           __         .__         .__        \n /   _____/  | __ _____/  |_  ____ |  |__      |__| ____  \n \\_____  \\|  |/ // __ \\   __\\/ ___\\|  |  \\     |  |/  _ \\ \n /        \\    <\\  ___/|  | \\  \\___|   Y  \\    |  (  <_> )\n/_______  /__|_ \\\\___  >__|  \\___  >___|  / /\\ |__|\\____/ \n\t\t\\/     \\/    \\/          \\/     \\/  \\/            \n\n",
		x = "body",
		s = "ready";
	"function" === typeof FlashCanvas && (x = window, s = "load");
	eventjs.add(x, s, function() {
		g.loader = g.loader || new g.ui.Loader;
		c();
		b.text.attach({
			name: "Capriola",
			filepath: "media/font/capriola/Capriola"
		})
	})
})(sketch);
"undefined" === typeof sketch && (sketch = {});