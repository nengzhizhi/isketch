(function(g) {
	g.module = g.module || {};
	g.module.Namespace = function(f) {
		var d = f.util;
		sk = f;
		f.__version = "3.7.3";
		"{{" === f.__version.substr(0, 2) && (f.__version = "3.7.0dev");
		f.doc = f.doc || {};
		f.doc.selection = f.doc.selection || {};
		f.docs = f.docs || {};
		f.api = f.api || {};
		f.dom = f.dom || {};
		f.module = f.module || {};
		f.events = f.events || {};
		f.fs = f.fs || {};
		f.gen = f.gen || {};
		f.io = f.io || {};
		f.lang = f.lang || {};
		f.lib = f.lib || {};
		f.loc = f.loc || {};
		f.net = f.net || {};
		f.sidebar = f.sidebar || {};
		f.server = f.server || {};
		f.setup = f.setup || {};
		f.client = f.client || {
			io: {}
		};
		f.ui = f.ui || {};
		f.ui.menu = f.ui.menu || {};
		f.ui.colorPicker = f.ui.colorPicker || {};
		f.ui.icons = f.ui.icons || {};
		f.ui.contextMenu = f.ui.contextMenu || {};
		f.client = f.client || {};
		f.vector = f.vector || {};
		f.windows = f.windows || {};
		(function() {
			var a = f.feature = {};
			a.debug = !1;
			a.debugCache = !1;
			a.debugRender = !1;
			a.kiosk = !1;
			a.defaultSketch = "new";
			a.lang = "auto";
			a.prefix = "sketch";
			a.theme = "light";
			a.cache257 = !1;
			a.cache2D = !0;
			a.cache2DPadding = 2;
			a.cacheSVG = !0;
			a.doc = {};
			a.doc.bounds = {};
			a.doc.centerOnLoad = !0;
			a.doc.centerOnResize = !0;
			a.doc.clip = {};
			a.doc.description = "made with https://sketch.io/";
			a.doc.format = "json";
			a.doc.title = "My Drawing";
			a.doc.units = "%";
			a.doc.width = 100;
			a.doc.height = 100;
			a.doc.x = 0;
			a.doc.y = 0;
			a.tools = {};
			a.tools.defaultTool = "pen";
			a.tools.defaults = {};
			a.tools.defaults.addByClick = !0;
			a.tools.defaults.addByDrag = !0;
			a.tools.defaults.constrainToCanvas = !1;
			a.tools.defaults.drawBBox = !0;
			a.tools.defaults.defaultHeight = 100;
			a.tools.defaults.defaultWidth = 100;
			a.tools.defaults.maxHeight = 16384;
			a.tools.defaults.maxWidth = 16384;
			a.tools.defaults.minHeight = 3;
			a.tools.defaults.minWidth = 3;
			a.tools.defaults.movable = !0;
			a.tools.defaults.units = "objectBoundingBox";
			a.tools.defaults.usePointInBBox = !0;
			a.tools.defaults.usePointInImageData = !1;
			a.tools.defaults.usePointInPath = !1;
			a.tools.defaults.usePointNearest = !0;
			a.tools.defaults.controls = {};
			a.tools.defaults.controls.anchor = void 0;
			a.tools.defaults.controls.spinner = void 0;
			a.tools.defaults.controls.n = void 0;
			a.tools.defaults.controls.s = void 0;
			a.tools.defaults.controls.e = void 0;
			a.tools.defaults.controls.w = void 0;
			a.tools.defaults.controls.ne = void 0;
			a.tools.defaults.controls.se = void 0;
			a.tools.defaults.controls.sw = void 0;
			a.tools.defaults.controls.nw = void 0;
			a.tools.defaults.controls.mouse = {};
			a.tools.defaults.controls.mouse.width = 14;
			a.tools.defaults.controls.mouse.height = 14;
			a.tools.defaults.controls.mouse.padding = 0;
			a.tools.defaults.controls.touch = {};
			a.tools.defaults.controls.touch.width = 24;
			a.tools.defaults.controls.touch.height = 24;
			a.tools.defaults.controls.touch.padding = 0;
			a.tools.defaults.controls.allowFlip = !0;
			a.tools.select = {};
			a.tools.select.useConfigure = !0;
			a.tools.select.clickToDeselect = !0;
			a.tools.text = {};
			a.tools.text.autoHeight = !0;
			a.tools.text.clip = !1;
			a.tools.text.defaultHeight = 100;
			a.tools.text.defaultWidth = 300;
			a.tools.text.minHeight = 15;
			a.tools.text.minWidth = 15;
			a.tools.text.useHTML = !1;
			a.tools.text.useCanvasRender = !1;
			a.tools.text.useSearch = "text";
			a.tools.media = {};
			a.tools.media.useSearch = "no";
			a.tools.shape = {};
			a.tools.brush = {};
			a.tools.vectorfill = {};
			a.tools.vectorfill.fillArea = "point";
			a.tools.vectorfill.fillMode = !1;
			a.canvas = {};
			a.canvas.clip = !0;
			a.canvas.containerScale = !1;
			a.canvas.drawCenterPoint = !0;
			a.canvas.glfx = !1;
			a.canvas.useBGRender = !1;
			a.canvas.useBGSave = !0;
			a.canvas.useGroupBBox = !1;
			a.canvas.usePixelRatio = !1;
			a.canvas.usePixelRatioDesktop = !1;
			a.zoom = {};
			a.zoom.defaultValue = 1;
			a.zoom.fromCenter = !0;
			a.zoom.increment = .1;
			a.zoom.max = 100;
			a.zoom.min = .25;
			a.zoom.value = 1;
			a.vector = {};
			a.vector.edit = !0;
			a.vector.record = !0;
			a.ui = {};
			a.ui.addToLibrary = !0;
			a.ui.bruteForce = !0;
			a.ui.cursors = !1;
			a.ui.scrollerAtopColor = "#fff";
			a.ui.scrollerCategories = !0;
			a.ui.scrollerShadow = !1;
			a.ui.dynamicCursor = !1;
			a.ui.customRangeBar = !1;
			a.ui.quickSelect = !1;
			a.ui.tooltips = !0;
			a.ui.subtool = "list";
			a.beforeUnloadPrompt = !1;
			a.preventScroll = !1;
			a.preventTouch = !1;
			a.requireAuth = !1;
			a.windows = !0;
			a.pane = {};
			a.pane.position = void 0;
			a.pane.header = !0;
			a.io = {};
			a.io.exportDrop = !1;
			a.io.filePickerIO = !1;
			a.io.defaultProject = !1;
			a.io.translateX = 0;
			a.io.translateY = 0;
			a.palette = {};
			a.palette.hexInput = !1;
			a.palette.closeButton = !1;
			a.palette.colorPicker = !1;
			a.palette.eyeDropper = !1;
			a.palette.grid = !1;
			a.palette.header = "";
			a.palette.version = 2;
			a.palette.buildInstant = !1;
			a.style = {};
			a.style.toGlobalOnSelect = !0;
			a.style.fromGlobalStyleOnSetTool = !1;
			a.style.fromGlobalBlendOnSetTool = !1;
			a.style.blend = !1;
			a.style.composite = !1;
			a.style.defaultFillType = "color";
			a.style.defaultStrokeType = "color";
			a.style.color = "#000";
			a.style.gradient = !1;
			a.style.pattern = !1;
			a.style.colorMode = !1;
			a.style.colorNoise = !1;
			a.style.lineJoin = !1;
			a.placement = {};
			a.placement.mediaClick = !1;
			a.placement.mediaDblClick = !1;
			a.placement.mediaDrag = !1;
			a.history = {};
			a.history.autoSelect = !1;
			a.history.bitmap = !1;
			a.history.limit = !1;
			a.history.vector = !1;
			a.sync = {};
			a.sync.image = !1;
			a.sync.json = !1;
			a.sync.svg = !1;
			a.sync.thumb = !1;
			a.sync.zip = !1;
			a.sync.localRefs = !0;
			a.sync.maxAssetSize = 0;
			a.sync.maxFileSize = 0;
			a.sync.useDefaultFormat = !1;
			a.sync.enabled = !1;
			a.sync.hashId = !1;
			a.sync.hashFlag = "sketch";
			a.stream = {};
			a.stream.api = "RTCDataChannel";
			a.stream.audio = !1;
			a.stream.maxFileSize = 0;
			a.stream.realtime = !1;
			a.stream.sketch = !1;
			a.stream.spectrumAnalysis = !1;
			a.stream.text = !1;
			a.stream.video = !1;
			a.stream.videoAtop = !1;
			a.session = {};
			a.session.path = "";
			a.session.sessionid = "";
			a.session.userid = "";
			a.session.username = "";
			a.social = {};
			a.social.autoLogout = !1;
			a.social.autoLogoutTimeout = !1;
			a.social.setCookie = !0
		})();
		(function() {
			var a = f.attrs = {},
				e = function(a) {
					for (var b = {}, c = 0, d; c < a.length; c++) if (d = a[c]) {
						var e = d[0].toLowerCase() + d.substr(1);
						b[e] = d
					}
					return b
				},
				q = function(a, b) {
					b = e(b);
					(f.attrs[a] = function(c) {
						var d = this;
						(this.setValue = function(c) {
							if ("undefined" !== typeof c) {
								if ("string" === typeof c) {
									var e = b,
										f = document.createElement("span").style;
									f[a] = c;
									for (var t in e) c = f[a + e[t]], "" !== c && "initial" !== c && (d[t] = c)
								} else for (e in b)"undefined" !== typeof c[e] && (d[e] = c[e]);
								return d
							}
						})(c)
					}).type = a
				};
			q("background", "Color Image Repeat Attachment Position Clip Origin Size".split(" "));
			q("border", "Width Style Color Radius ImageSource ImageSlice ImageWidth ImageOutset ImageRepeat".split(" "));
			q("padding", ["Top", "Left", "Bottom", "Right"]);
			q("margin", ["Top", "Left", "Bottom", "Right"]);
			a.create = function(d, b) {
				return a[d] ? new a[d](b) : b
			};
			a.update = function(d, b, c) {
				return c && c.setValue ? c.setValue(b) : a.create(d, b)
			};
			a.__basicObject = {
				meta: "string",
				bbox: "object",
				composite: "string",
				groupId: "string",
				opacity: "number",
				seed: "number",
				type: "string",
				visible: "boolean"
			};
			a.__styledObject = d.cloneInto(a.__basicObject, {
				filter: "filter",
				fill: "style",
				stroke: "style",
				border: "border",
				background: "background",
				margin: "margin",
				padding: "padding"
			});
			a.__rules = {
				exportable: "boolean",
				movable: "boolean",
				rotatable: "boolean",
				scalable: "boolean",
				selectable: "boolean",
				useAlignX: "string",
				useAlignY: "string",
				useBackgroundOverlay: "boolean",
				useConstrain: "boolean",
				useConstrainX: "boolean",
				useConstrainY: "boolean",
				useControlNE: "boolean",
				useControlNW: "boolean",
				useControlSE: "boolean",
				useControlSW: "boolean",
				useHighRes: "boolean",
				useMaxCopies: "number",
				useMaxHeight: "number",
				useMaxWidth: "number",
				useMinHeight: "number",
				useMinWidth: "number",
				usePixelData: "boolean",
				useStickToBack: "boolean",
				useStickToFront: "boolean",
				useStretchToEdge: "boolean",
				useStretchToFit: "boolean"
			}
		})()
	};
	"undefined" !== typeof module && module.exports && (module.exports = g.module.Namespace)
})(sketch);
"undefined" === typeof sketch && (sketch = {});