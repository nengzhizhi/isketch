(function(g) {
	g.module = g.module || {};
	g.module.AddObject = function(f, d) {
		d.addObject = function(e, q, l, b) {
			var c = f.detect,
				p = f.feature,
				w = d.scene,
				m = d.toolkit,
				u = f.util,
				t = f.vector;
			e = e || {};
			q = q || e.onload ||
			function() {};
			l = l || e.onerror ||
			function() {};
			b = b || {};
			var h = b.fromSelf || !1,
				r = b.fromCollection || !1,
				k = isFinite(b.useRecord) ? b.useRecord : !0,
				v = isFinite(b.useRender) ? b.useRender : !0;
			b = e.type;
			if (Array.isArray(e) || e.data && !b) {
				b = e.data || e;
				k = isFinite(e.useRender) ? e.useRecord : !0;
				v = isFinite(e.useRender) ? e.useRender : !0;
				if (isFinite(e.scale)) for (var x = e.scale, s = 0; s < b.length; s++) {
					var z = b[s];
					if (void 0 !== z && !z.useStretchToEdge && !z.useStretchToFit) {
						var y = z.bbox = z.bbox || {
							x: 0,
							y: 0
						};
						y.x *= x;
						y.y *= x;
						"text" === z.type ? z.fontSize *= x : (y.scale = y.scale || {
							x: 1,
							y: 1
						}, y.scale.x *= x, y.scale.y *= x)
					}
				}
				var B = [];
				new u.Queue({
					items: b,
					flatten: !0,
					oncomplete: function() {
						a(q, B, v)
					},
					next: function(a) {
						var b = this;
						d.addObject(a, function(a) {
							B.push(a);
							b.next()
						}, function(a) {
							b.next()
						}, {
							fromSelf: h,
							fromCollection: !0,
							useRecord: k,
							useRender: v
						})
					}
				})
			} else {
				if (!m.exists(b)) return b += " toolkit not found.", p.debug && console.warn(b), l({
					message: b
				});
				d.render.dirtyControls = !0;
				var A = d.config[b];
				if (!0 !== h) {
					if ("media" === A.toolkit && e.src) return f.assets.add({
						type: b,
						targetId: e.targetId,
						src: e.src,
						onload: function(a, b) {
							var h = m.media.style;
							h.bbox.viewBox = "clipart" === b.type ? b.viewBox : [0, 0, b.width, b.height];
							h.src = A.src = e.src;
							h.render = void 0;
							d.addObject(e, q, l, {
								fromSelf: !0,
								fromCollection: r,
								useRecord: k,
								useRender: v
							})
						}
					});
					if ("text" === A.toolkit && e.fontFamily && (!t.text.supports[A.fontFamily] || A.fontFamily !== e.fontFamily)) return m.text.loadFont({
						fontFamily: e.fontFamily,
						onerror: l,
						onsuccess: function() {
							A.fontFamily = e.fontFamily;
							d.addObject(e, q, l, {
								fromSelf: !0,
								fromCollection: r,
								useRecord: k,
								useRender: v
							})
						}
					})
				}
				w.decompress(e);
				var g = m.getFeature(b),
					y = e.bbox = e.bbox || {},
					F = function(a, b) {
						var h = typeof b;
						return typeof y[a] === h ? y[a] : typeof e[a] === h ? e[a] : b
					},
					s = function(a, b) {
						return y[a] = F(a, b)
					},
					z = e.width,
					E = e.height,
					x = F("scale", 1);
				isFinite(x) && (x = {
					x: x,
					y: x
				});
				s("units", g.units || "objectBoundingBox");
				s("padding", 0);
				s("rotate", 0);
				s("scale", x);
				isFinite(F("width", 0)) && (z = s("width", 0));
				isFinite(F("height", 0)) && (E = s("height", 0));
				var D = m.getToolkit(b);
				if (c.brush[b]) if (e.points || e.data) u = e.points || e.data, "string" === typeof u && (e.path = "M" === u[0] ? t.SVGPath.toVOBPath(u) : t.SVGPath.toVOBPolygon(u));
				else {
					console.warn(b + " requires a path!", e);
					onload && onload();
					return
				} else if (!z || !E) if (c.shape[b]) z || (y.width = z = E || D.defaultWidth), E || (y.height = E = z || D.defaultHeight);
				else if (c.media[b]) t = D.style.bbox.viewBox, z = t[2] - t[0], E = t[3] - t[1], t = g.maxWidth || u.INFINITY, x = g.maxHeight || u.INFINITY, y.width || y.height || (t = Math.min(t, y.width || z), x = Math.min(x, y.height || E)), u = u.fitSize(z, E, {
					width: y.width || "auto",
					height: y.height || "auto",
					maxWidth: t,
					maxHeight: x
				}), y.width = z = u.width, y.height = E = u.height;
				else if ("text" === b) if (z = w.clone(d.config.text, !0), u.cloneInto(e, z), e.content) u = m.text.measureText(e, z), z = t.text.getFontStyle(e), z = t.text.measureTextWidth("M", z), z = u.width + z, E = u.height, y.width = z = y.width || z, y.height = E = y.height || E;
				else {
					console.warn("Text requires content!", e);
					onload && onload();
					return
				} else if ("group" !== b) {
					console.warn("Object requires view-box!", e);
					onload && onload();
					return
				}
				u = w.getCenterPoint();
				s("x", u.x);
				s("y", u.y);
				if (e.centerOnPoint || "objectBoundingBox" === y.units) y.x -= z / 2 * y.scale.x, y.y -= E / 2 * y.scale.y;
				isFinite(y.x) && (y.x += d.x);
				isFinite(y.y) && (y.y += d.y);
				D.createObject && D.getDevice && (b = D.getDevice(b), w.copyProperties(D, e, b), D.deviceProxy.place = b);
				D.createObject({
					proxied: !0,
					device: D.deviceProxy.place,
					layer: e
				}, function(b) {
					delete D.deviceProxy.place;
					k && d.history && d.history.store({
						cmd: "add",
						icon: b.type,
						name: b.type,
						data: [b]
					});
					b && (w.updateConstrain(b), "text" === b.type && w.deselectAll());
					f.net.dataChannel && p.stream.sketch && b && "image" === b.type && f.net.dataChannel.send(["scene.update", [{
						id: b.id,
						bbox: b.bbox
					}]]);
					a(q, b, v && !r)
				})
			}
		};
		var a = function(a, f, l) {
				l ? d.render({
					from: "doc.addObject",
					onsuccess: function() {
						a && a(f)
					}
				}) : a && a(f)
			}
	};
	"undefined" !== typeof module && module.exports && (module.exports = g.module.AddObject)
})(sketch);
"undefined" === typeof sketch && (sketch = {});
(function(g) {
	g.module = g.module || {};
	g.module.Assets = function(f, d) {
		var a = this,
			e = f.client,
			q = f.convert,
			l = f.feature,
			b = f.gen,
			c = f.lib,
			p = f.loc,
			w = f.util.string,
			m = d.toolkit,
			u = f.util,
			t = f.vector;
		this.reset = function() {
			a.data = {};
			a.missing = {};
			a.URLtoID = {};
			a.IDtoURL = {};
			return a
		};
		this.remove = function(b) {
			delete a.data[b];
			delete a.missing[b];
			return a
		};
		this.isEqual = function(b, h) {
			if (b === h) return !0;
			var c = a.getItem(b);
			return c && c.src === h ? !0 : (c = a.getItem(h)) && c.src === b ? !0 : !1
		};
		this.getBlob = function(b, c, d, e) {
			var k = a.getById(b);
			k.blob ? c(k.blob, b) : k.srcXML ? (k.blob = new Blob([k.srcXML], {
				type: "image/svg+xml"
			}), k.blob.lastModified = k.lastModified, c(k.blob, b)) : h(k).toBlob(function(a) {
				k.blob = a;
				k.blob.lastModified = k.lastModified;
				c(a, b)
			}, d, e)
		};
		this.getBlobURL = function(b, h, c, d) {
			a.getBlob(b, function(a) {
				h(URL.createObjectURL(a))
			}, c, d)
		};
		this.getDataURL = function(b, c, d) {
			return h(a.getById(b)).toDataURL(c, d)
		};
		this.getURL = function(b) {
			return a.getById(b).src || b
		};
		this.getId = function(b) {
			return a.URLtoID[b] ? a.URLtoID[b] : a.data[b] ? b : ""
		};
		this.getById = function(b, h) {
			var c = a.data[b];
			return c ? c : a.createDefault(b, h)
		};
		this.getItem = function(b) {
			return a.data[a.getId(b)] || ""
		};
		this.getRaw = function(a) {
			return h(a)
		};
		var h = function(a) {
				return "IMG" === a.nodeName ? q.imageToCanvas(a) : a
			},
			r = u.arrayToObject(["[object Blob]", "[object File]"]),
			k = u.arrayToObject(["[object HTMLCanvasElement]", "[object HTMLImageElement]"]),
			v = u.arrayToObject(["[object File]"]);
		this.addList = function(b, h) {
			if (u.count(b)) {
				var c = 0,
					d = function() {
						--c || h()
					},
					e;
				for (e in b) {
					c++;
					var k = b[e];
					"string" === typeof k && (k = {
						src: k,
						targetId: e
					});
					a.add(k, d, d)
				}
			} else return h()
		};
		this.add = function(b, h, c, e) {
			"string" === typeof b ? b = {
				src: b
			} : r[String(b)] && (b = {
				blob: b
			});
			var p = b.src || b.blob || b.data || "",
				m;
			if (!(m = b.type)) a: {
				if ("string" === typeof p) switch (w.filename(p).toLowerCase().split(".").pop()) {
				case "jpeg":
				case "jpg":
				case "png":
				case "gif":
				case "webp":
					m = "image";
					break a;
				case "svg":
					m = "clipart";
					break a
				}
				m = void 0
			}
			var t = b.targetId || null,
				g = b.lastModified || Date.now();
			h = b.onload || h;
			c = b.onerror || c;
			e = b.onprogress || e;
			var E, D = String(p);
			if (!p) return console.warn("assets.js", b), c && c();
			if (k[D]) return a.createId(p, function(b) {
				a.createResource(b, "image", p);
				h && h.call(p, b, p)
			}, t);
			if (r[D]) {
				g = p.lastModified || g;
				if ("image/svg+xml" === p.type) return q.blobToText(p, function(d) {
					b.src = d;
					b.type = "clipart";
					b.lastModified = g;
					a.add(b, h, c, e)
				});
				v[D] || (E = p);
				p = URL.createObjectURL(p)
			}
			if (0 === p.indexOf("#asset-")) {
				var P = p,
					p = a.getById(p, b);
				if (void 0 === a.data[P]) {
					if (f.io.json.folder) return E = "clipart" === b.type ? ".svg" : ".png", b.src = f.io.json.folder + P.substr(1) + E, a.add(b, h, c, e);
					a.createDefault(P, b)
				}
				h && h.call(p, P, p)
			} else if (a.URLtoID[p]) P = a.URLtoID[p], E = a.getById(P, b), "clipart" === E.type && E.clone && !l.cacheSVG ? E.clone(function(b) {
				a.createId(b.toDataURL(), function(c) {
					a.createResource(c, "clipart", b);
					h && h.call(b, c, b)
				}, t || P)
			}, !0) : h && h.call(E, P, E);
			else {
				var G = {
					type: m,
					src: p,
					blob: E,
					lastModified: g,
					onload: h,
					onerror: c,
					onprogress: e,
					targetId: t
				};
				E = a.detectFormat(p);
				if ("clipart" === E) a.loadSVG(G);
				else if ("image" === E) a.loadImage(G);
				else if ("video" === E) {
					var J = document.createElement("video");
					J.src = p;
					J.play();
					eventjs.add(J, "playing", function() {
						var b = u.Canvas(J.videoWidth, J.videoHeight);
						b.ctx.drawImage(J, 0, 0);
						b.toBlobURL(function(b) {
							d.addObject({
								type: "image",
								src: b
							});
							G.src = b;
							a.loadImage(G)
						})
					})
				}
			}
		};
		this.addClipart = function(h, d, e, k, r) {
			a.add({
				type: "clipart",
				data: h,
				onload: function(a, h) {
					var e = c.clipart;
					if (!e || !e.tree) return d(a, h);
					var k = e.tree["Your Files"];
					if (k) if (k[a]) d && d(a, h);
					else if (k[a] = "loading", b.preview) b.preview({
						type: "clipart",
						resource: h,
						width: 52,
						height: 52,
						oncomplete: function(b) {
							e.paths.splice(0, 0, k[a] = {
								type: "clipart",
								filename: a,
								filepath: a,
								thumbnail: b.canvas.toDataURL(),
								category: "Your Files"
							});
							d && d(a, h)
						}
					});
					else return d(a, h);
					else return d && d(a, h)
				},
				onprogress: k,
				onerror: e,
				targetId: r
			})
		};
		this.addImage = function(b, h, d, e, k) {
			a.add({
				type: "image",
				data: b,
				onload: function(a, b) {
					var d = c.clipart;
					if (!d || !d.tree) return h(a, b);
					var e = d.tree["Your Files"];
					if (e) e[a] ? h && h(a, b) : (e[a] = "loading", u.thumbnailer({
						src: b,
						width: 52,
						height: 52,
						crop: "edge",
						onload: function(c) {
							d.paths.splice(0, 0, e[a] = {
								type: "image",
								filename: a,
								filepath: a,
								thumbnail: c.toDataURL(),
								category: "Your Files"
							});
							h && h(a, b)
						}
					}));
					else return h && h(a, b)
				},
				onprogress: e,
				onerror: d,
				targetId: k
			})
		};
		this.addFromActions = function(b) {
			for (var h = 0; h < b.length; h++) {
				var c = b[h],
					d = c.src;
				if (d && "#" === d[0]) switch (c.type) {
				case "clipart":
					a.addClipart(d);
					break;
				case "image":
					a.addImage(d);
					break;
				case "stamp":
					a.addStamp(d)
				}
			}
		};
		this.addCloneFromSelection = function() {
			f.save.toBlobURL({
				background: "none",
				useSelection: !0,
				callback: function(a) {
					d.scene.add({
						centerOnPoint: !0,
						type: "image",
						src: a
					})
				}
			})
		};
		this.addStampFromSelection = function() {
			f.save.canvas({
				background: "none",
				useSelection: !0,
				onsuccess: function(b) {
					d.scene.deselectAll();
					a.addStamp(b, function() {
						f.ui.refresh("stamp");
						m.setTool({
							type: "stamp",
							onload: function() {
								var a = d.tool.device.brush,
									b = a.fill;
								b[b.type] = "none";
								delete a.fill.__colors
							}
						})
					})
				}
			})
		};
		this.addStamp = function(b, h, e, k, r) {
			a.add({
				type: "image",
				data: b,
				onload: function(b, e) {
					u.removeColorFromCanvas && (e = a.getRaw(e), u.removeColorFromCanvas(e), a.data[b] = e);
					var k = c.stamp;
					if (k) {
						var r = k.tree["Your Files"];
						if (r) r[b] ? h && h() : (r[b] = "loading", u.thumbnailer({
							src: e,
							width: 52,
							height: 52,
							crop: "edge",
							onload: function(a) {
								d.config.stamp.src = b;
								k.paths.splice(0, 0, r[b] = {
									type: "stamp",
									filename: b,
									filepath: b,
									thumbnail: a.toDataURL(),
									category: "Your Files"
								});
								h && h(b, e)
							}
						}));
						else return h(b, e)
					} else return h(b, e)
				},
				onprogress: k,
				onerror: e,
				targetId: r
			})
		};
		this.addPattern = function(a, b) {};
		this.addFont = function(a, b) {};
		this.detectFormat = function(a) {
			var b = a.slice(-4).toLowerCase();
			return ".png" === b || ".jpeg" === b || ".jpg" === b || ".gif" === b ? "image" : ".mp4" === b ? "video" : ".svg" === b || t.SVG && t.SVG.detect(a) ? "clipart" : "image"
		};
		this.loadSVG = function(b) {
			var h = b.src,
				c = b.targetId,
				e = b.lastModified,
				k = b.onload,
				r = b.onerror,
				f = b.onprogress;
			h.startsWith("<svg") && (h = '<?xml version="1.0" encoding="UTF-8"?>' + h);
			h.startsWith("<?xml") && (h = "data:image/svg+xml;base64," + btoa(w.encode_utf8(h)));
			return h.startsWith("data:image/svg") ? a.createId(h, function(b) {
				var c = a.data[b];
				l.cacheSVG && c && "sk-default" !== c.className ? k && k.call(c, b, c) : new t.SVG({
					src: h,
					ctx: d.contexts.cache.ctx,
					useCache: l.cacheSVG,
					onprogress: f,
					onerror: function(a) {
						l.debug && console.log(a);
						r && r(a)
					},
					onload: function(h) {
						h.lastModified = e;
						a.createResource(b, "clipart", h);
						k && k.call(h, b, h)
					}
				})
			}, c) : u.request({
				url: p.getMediaUrl(h),
				onerror: r,
				onload: function(b) {
					a.add({
						targetId: c,
						data: b.target.responseText,
						onprogress: f,
						onerror: function(a) {
							l.debug && console.log(a);
							r && r(a)
						},
						onload: function(b, c) {
							a.URLtoID[h] = b;
							a.IDtoURL[b] = h;
							k && k.call(c, b, c)
						}
					})
				}
			})
		};
		this.loadImage = function(b) {
			var h = b.src,
				c = b.targetId,
				d = b.lastModified,
				k = b.onload,
				r = b.onerror,
				f = b.onprogress;
			u.loadImage({
				src: p.getMediaUrl(h),
				onprogress: f,
				onerror: r,
				onload: function() {
					var r = this;
					e.ios && u.exists("MegaPixImage") && (r = q.imageToCanvas(this));
					a.createId(r, function(c) {
						r.assetID = r.title = c;
						r.image = {
							src: h
						};
						r.lastModified = d;
						r.setAttribute("data-src", h);
						a.URLtoID[h] = c;
						a.IDtoURL[c] = h;
						a.createResource(c, "image", r);
						if (b.blob) r.blob = b.blob;
						else if (l.stream.maxFileSize) return that.getBlob(c, function(a) {
							k && k.call(r, c, r)
						});
						k && k.call(r, c, r)
					}, c)
				}
			})
		};
		this.createId = function(b, h, c) {
			if (c) return h(c);
			"string" === typeof b ? 25E4 < b.length ? h("#asset-" + u.MD5(b.substr(0, 25E4))) : h("#asset-" + u.MD5(b)) : b.assetID ? h(b.assetID) : h(a.createIdFromImage(b))
		};
		this.createIdFromImage = function(b) {
			var h = b.width,
				c = b.height;
			if (64 > h && 64 > c && b.toDataURL) b.assetID = "#asset-" + u.MD5(b.toDataURL());
			else {
				var d = a.thumbnail || u.Canvas();
				d.ctx = d.ctx || d.getContext("2d");
				var e = Math.min(h, 64),
					k = Math.min(c, 64);
				d.width = e;
				d.height = k;
				d.ctx.drawImage(b, 0, 0, h, c, 0, 0, e, k);
				a.thumbnail = d;
				b.assetID = "#asset-" + u.MD5(d.toDataURL())
			}
			return b.assetID
		};
		this.createDefault = function(b, h, c) {
			h = h || {};
			if (a.data[b]) {
				c = a.data[b];
				var d = c.width;
				h = c.height
			} else c = u.Canvas(), d = h && h.width || 1, h = h && h.height || 1;
			c.width = d;
			c.height = h;
			c.className = "sk-default";
			var e = c.getContext("2d");
			e.fillStyle = "rgba(127,127,127,0.5)";
			e.fillRect(0, 0, d, h);
			a.data[b] = c;
			a.missing[b] = !0;
			return c
		};
		this.createResource = function(b, h, c) {
			var e = a.data[b] || "",
				k = "sk-default" === e.className;
			a.data[b] = c;
			a.data[b].type = h;
			(!e || k) && (f.peerjs || f.peer && f.peer.sendFile) && a.getBlob(b, function(a) {
				f.peerjs ? f.peerjs.handle.file.send(a) : f.sfclient && !f.sfclient.files[b] && f.peer.sendFile(a, b)
			});
			if (a.missing[b] || k) delete a.missing[b], d.scene.traverse(function(a) {
				a.src === b && (a.dirtyCache = !0, m.media.loadResource({
					layer: a
				}))
			})
		};
		return this.reset()
	};
	"undefined" !== typeof module && module.exports && (module.exports = g.module.Assets)
})(sketch);
"undefined" === typeof sketch && (sketch = {});