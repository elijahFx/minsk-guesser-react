import {
    __toESM,
    require_react
  } from "./chunk-I4MZPW7S.js";
  
  // node_modules/@pbe/react-yandex-maps/dist/react-yandex-maps.esm.js
  var import_react = __toESM(require_react());
  function r() {
    return r = Object.assign ? Object.assign.bind() : function(t2) {
      for (var e2 = 1; e2 < arguments.length; e2++) {
        var n2 = arguments[e2];
        for (var o2 in n2) Object.prototype.hasOwnProperty.call(n2, o2) && (t2[o2] = n2[o2]);
      }
      return t2;
    }, r.apply(this, arguments);
  }
  var a = (t2, e2) => {
    const n2 = {};
    for (const o2 in t2) -1 === e2.indexOf(o2) && (n2[o2] = t2[o2]);
    return n2;
  };
  var i = import_react.default.createContext(null);
  var c = import_react.default.createContext(null);
  var l = (e2) => (n2) => import_react.default.createElement(c.Consumer, null, (o2) => import_react.default.createElement(e2, r({ parent: o2 }, n2)));
  var p = (t2 = []) => {
    const [r2, a2] = (0, import_react.useState)(false), c2 = (0, import_react.useRef)(t2), l2 = (() => {
      const t3 = (0, import_react.useContext)(i);
      if (null === t3) throw new Error("Couldn't find Yandex.Maps API in the context. Make sure that hook useYMaps is inside <YMaps /> provider");
      return t3;
    })(), p2 = l2.getApi();
    return (0, import_react.useEffect)(() => {
      l2.load().then(() => Promise.all(c2.current.map(l2.loadModule))).then(() => a2(true));
    }, []), r2 && p2 ? p2 : null;
  };
  var u = () => {
  };
  var m = ["onLoad", "onError", "modules", "apiLoader"];
  function d(e2, n2 = false, o2 = []) {
    return (i2) => {
      const { width: c2, height: l2, modules: d2 = [], onLoad: h2 = u } = i2, f2 = p(o2.concat(d2)), y2 = !n2 || !!f2, b2 = a(i2, m);
      return (0, import_react.useEffect)(() => f2 ? h2(f2) : void 0, [f2]), y2 ? import_react.default.createElement(e2, r({ ymaps: f2 }, b2)) : import_react.default.createElement("div", { style: { width: c2, height: l2 } });
    };
  }
  var h = "undefined" != typeof window;
  var f = { lang: "ru_RU", load: "", ns: "", mode: "release" };
  var y = (e2) => {
    const { version: n2 = "2.1", enterprise: r2 = false, query: a2 = { lang: "ru_RU", load: "", ns: "" }, preload: c2 = false, children: l2 } = e2, p2 = (0, import_react.useRef)(((t2) => {
      const { query: e3 = f } = t2, n3 = Date.now().toString(32), o2 = e3.ns || "", s2 = "__yandex-maps-api-onload__$$" + n3, r3 = "__yandex-maps-api-onerror__$$" + n3, a3 = h ? window : {}, i2 = {};
      let c3;
      const l3 = () => o2 ? a3[o2] : c3, p3 = () => {
        delete a3[s2], delete a3[r3];
      };
      return { load: () => {
        if (l3()) return Promise.resolve(c3);
        if (i2[o2]) return i2[o2];
        const n4 = { onload: s2, onerror: r3, ...f, ...e3 }, u2 = Object.keys(n4).map((t3) => `${t3}=${n4[t3]}`).join("&"), m2 = [`https://${t2.enterprise ? "enterprise." : ""}api-maps.yandex.ru`, t2.version, "?" + u2].join("/");
        return i2[o2] = new Promise((t3, e4) => {
          a3[s2] = (e5) => {
            p3(), e5.ready(() => {
              c3 = e5, t3(e5);
            });
          }, a3[r3] = (t4) => {
            p3(), e4(t4);
          }, ((t4) => new Promise((e5, n5) => {
            const o3 = document.createElement("script");
            o3.type = "text/javascript", o3.onload = e5, o3.onerror = n5, o3.src = t4, o3.async = true, document.head.appendChild(o3);
          }))(m2).catch(a3[r3]);
        }), i2[o2];
      }, getApi: l3, loadModule: (t3) => new Promise((e4, n4) => {
        c3.modules.require(t3).done((n5) => {
          n5.forEach((e5) => {
            ((t4, e6, n6, o3 = false) => {
              const s3 = "string" == typeof e6 ? e6.split(".") : e6.slice();
              let r4, a4 = t4;
              for (; s3.length > 1; ) r4 = s3.shift(), a4[r4] || (a4[r4] = {}), a4 = a4[r4];
              const i3 = s3[0];
              a4[i3] = true === o3 && a4[i3] || n6;
            })(c3, t3, e5, true);
          }), e4(c3);
        }, n4);
      }) };
    })({ version: n2, enterprise: r2, query: a2, preload: c2 }));
    return (0, import_react.useEffect)(() => {
      c2 && p2.current.load();
    }, [p2.current]), import_react.default.createElement(i.Provider, { value: p2.current }, l2);
  };
  var b = /^on(?=[A-Z])/;
  function v(t2) {
    return Object.keys(t2).reduce((e2, n2) => {
      if (b.test(n2)) {
        const o2 = n2.replace(b, "").toLowerCase();
        e2._events[o2] = t2[n2];
      } else e2[n2] = t2[n2];
      return e2;
    }, { _events: {} });
  }
  function j(t2, e2, n2) {
    "function" == typeof n2 && t2.events.add(e2, n2);
  }
  function O(t2, e2, n2) {
    "function" == typeof n2 && t2.events.remove(e2, n2);
  }
  function g(t2, e2, n2) {
    Object.keys(Object.assign({}, e2, n2)).forEach((o2) => {
      e2[o2] !== n2[o2] && (O(t2, o2, e2[o2]), j(t2, o2, n2[o2]));
    });
  }
  var E = (t2) => "default" + t2.charAt(0).toUpperCase() + t2.slice(1);
  function C(t2, e2) {
    return void 0 !== t2[e2] || void 0 === t2[E(e2)];
  }
  function _(t2, e2, n2) {
    return (C(t2, e2) ? t2[e2] : t2[E(e2)]) || n2;
  }
  function R(t2, e2, n2 = null) {
    if (t2 !== e2) {
      if (t2 && ("current" in t2 ? t2.current = null : "function" == typeof t2 && t2(null)), !e2) return;
      "current" in e2 ? e2.current = n2 : "function" == typeof e2 && e2(n2);
    }
  }
  function w(t2) {
    const { width: e2, height: n2, style: o2, className: s2 } = t2;
    return void 0 !== o2 || void 0 !== s2 ? Object.assign({}, o2 && { style: o2 }, s2 && { className: s2 }) : { style: { width: e2, height: n2 } };
  }
  var P = class extends import_react.default.Component {
    constructor(t2) {
      super(t2);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(t2, e2) {
      const { onError: n2 = () => {} } = this.props;
      
      // Log the error to the console
      console.error("Error caught in P component:", t2, e2);
      
      // Invoke the onError callback
      n2(t2);
      
      // Update state with the error details
      this.setState({ error: t2, errorInfo: e2 });
    }
    
    render() {
      return this.state.error ? null : this.props.children;
    }
  };
  
  function _handleError (error) {
    if (shouldIgnoreError(error)) {
      console.log("Ignoring error:", error);
      return; // Ignore this error
    }
    console.error("Handling error:", error);
    // Handle the error (e.g., show a notification)
  };
  
  const shouldIgnoreError = (error) => {
    // Implement your logic to determine if the error should be ignored
    return error.message.includes("specific error to ignore");
  };
  
  // Usage
  var x = (e2) => ({ onError: handleError, ...o2 }) => 
    import_react.default.createElement(P, { onError: handleError }, import_react.default.createElement(e2, o2));
  var M = class _M extends import_react.default.Component {
    constructor() {
      super(), this.instance = null, this.state = { instance: null }, this._parentElement = null, this._getRef = (t2) => {
        this._parentElement = t2;
      };
    }
    componentDidMount() {
      this.instance = _M.mountObject(this._parentElement, this.props.ymaps.Map, this.props), this.setState({ instance: this.instance });
      
      if (this.instance) {
        this._viewportTimer = setInterval(() => {
          if (this.instance && typeof this.instance.container.fitToViewport === 'function') {
            this.instance.container.fitToViewport();
          }
        }, 50); // Каждые 100 мс
      }
    
    }
    componentDidUpdate(t2) {
      null !== this.instance && _M.updateObject(this.instance, t2, this.props);
  
       
      if (this.instance) {
        this._viewportTimer = setInterval(() => {
          if (this.instance && typeof this.instance.container.fitToViewport === 'function') {
            this.instance.container.fitToViewport();
          }
        }, 50); // Каждые 100 мс
      }
    }
    componentWillUnmount() {
      _M.unmountObject(this.instance, this.props);
  
       
      if (this.instance) {
        this._viewportTimer = setInterval(() => {
          if (this.instance && typeof this.instance.container.fitToViewport === 'function') {
            this.instance.container.fitToViewport();
          }
        }, 50); // Каждые 50 мс
      }
  
    }
    render() {
      const e2 = w(this.props), n2 = v(this.props), o2 = a(n2, ["_events", "state", "defaultState", "options", "defaultOptions", "instanceRef", "ymaps", "children", "width", "height", "style", "className"]);
      return import_react.default.createElement(c.Provider, { value: this.state.instance }, import_react.default.createElement("div", r({ ref: this._getRef }, e2, o2), this.props.children));
    }
    static mountObject(t2, e2, n2) {
      const { instanceRef: o2, _events: s2 } = v(n2), r2 = new e2(t2, _(n2, "state"), _(n2, "options"));
      return Object.keys(s2).forEach((t3) => j(r2, t3, s2[t3])), R(null, o2, r2), r2;
    }
    static updateObject(t2, e2, n2) {
      const { _events: o2, instanceRef: s2 } = v(n2), { _events: r2, instanceRef: a2 } = v(e2);
      if (C(n2, "state")) {
        const o3 = _(e2, "state", {}), s3 = _(n2, "state", {});
        o3.type !== s3.type && t2.setType(s3.type), o3.behaviors !== s3.behaviors && (o3.behaviors && t2.behaviors.disable(o3.behaviors), s3.behaviors && t2.behaviors.enable(s3.behaviors)), s3.zoom && o3.zoom !== s3.zoom && t2.setZoom(s3.zoom), s3.center && o3.center !== s3.center && t2.setCenter(s3.center), s3.bounds && o3.bounds !== s3.bounds && t2.setBounds(s3.bounds);
      }
      if (C(n2, "options")) {
        const o3 = _(e2, "options"), s3 = _(n2, "options", {});
        o3 !== s3 && t2.options.set(s3);
      }
      _(e2, "width") === _(n2, "width") && _(e2, "height") === _(n2, "height") || t2.container.fitToViewport(), g(t2, r2, o2), R(a2, s2, t2);
    }
    static unmountObject(t2, e2) {
      const { instanceRef: n2, _events: o2 } = v(e2);
      null !== t2 && (Object.keys(o2).forEach((e3) => O(t2, e3, o2[e3])), t2.destroy(), R(n2));
    }
  };
  var k = x(d(M, true, ["Map"]));
  k.defaultProps = { width: 320, height: 240 };
  var S = class _S extends import_react.default.Component {
    constructor() {
      super(), this.state = { instance: null }, this._parentElement = null, this._getRef = (t2) => {
        this._parentElement = t2;
      };
    }
    componentDidMount() {
      this._mounted = true, this.props.ymaps.panorama.isSupported() && _S.mountObject(this._parentElement, this.props.ymaps.panorama, this.props).then((t2) => this._mounted && this.setState({ instance: t2 }));
    }
    componentDidUpdate(t2) {
      null !== this.state.instance && _S.updateObject(this.state.instance, t2, this.props);
    }
    componentWillUnmount() {
      this._mounted = false, _S.unmountObject(this.state.instance, this.props);
    }
    render() {
      const e2 = w(this.props);
      return import_react.default.createElement("div", r({ ref: this._getRef }, e2));
    }
    static mountObject(t2, e2, n2) {
      const { instanceRef: o2, _events: s2 } = v(n2), r2 = _(n2, "point"), a2 = _(n2, "locateOptions"), i2 = _(n2, "options");
      return new Promise((n3, c2) => {
        e2.locate(r2, a2).done((r3) => {
          if (r3.length > 0) {
            const a3 = new e2.Player(t2, r3[0], i2);
            R(null, o2, a3), Object.keys(s2).forEach((t3) => j(a3, t3, s2[t3])), n3(a3);
          }
        }, c2);
      });
    }
    static updateObject(t2, e2, n2) {
      const { _events: o2, instanceRef: s2 } = v(n2), { _events: r2, instanceRef: a2 } = v(e2);
      if (C(n2, "options")) {
        const o3 = _(e2, "options"), s3 = _(n2, "options");
        o3 !== s3 && t2.options.set(s3);
      }
      if (C(n2, "point")) {
        const o3 = _(n2, "point"), s3 = _(e2, "point"), r3 = _(n2, "locateOptions");
        o3 !== s3 && t2.moveTo(o3, r3);
      }
      g(t2, r2, o2), R(a2, s2, t2);
    }
    static unmountObject(t2, e2) {
      const { instanceRef: n2, _events: o2 } = v(e2);
      null !== t2 && (Object.keys(o2).forEach((e3) => O(t2, e3, o2[e3])), R(n2));
    }
  };
  var T = x(d(S, true, ["panorama.isSupported", "panorama.locate", "panorama.createPlayer", "panorama.Player"]));
  T.defaultProps = { width: 320, height: 240 };
  var U = class _U extends import_react.default.Component {
    constructor() {
      super(), this.state = { instance: null }, this.instance = null;
    }
    componentDidMount() {
      const t2 = _U.mountControl(this.props.ymaps.control[this.props.name], this.props);
      this.instance = t2, this.setState({ instance: t2 });
    }
    componentDidUpdate(t2) {
      null !== this.instance && _U.updateControl(this.instance, t2, this.props);
    }
    componentWillUnmount() {
      _U.unmountControl(this.instance, this.props);
    }
    render() {
      return import_react.default.createElement(c.Provider, { value: this.state.instance }, this.props.children);
    }
    static mountControl(t2, e2) {
      const { instanceRef: n2, parent: o2, lazy: s2, _events: r2 } = v(e2), a2 = new t2({ data: _(e2, "data"), options: _(e2, "options"), state: _(e2, "state"), mapTypes: _(e2, "mapTypes"), lazy: s2 });
      if (Object.keys(r2).forEach((t3) => j(a2, t3, r2[t3])), o2 && o2.controls && "function" == typeof o2.controls.add) o2.controls.add(a2);
      else {
        if (!o2 || !o2.add || "function" != typeof o2.add) throw new Error(`No parent found to mount ${e2.name}`);
        o2.add(a2);
      }
      return R(null, n2, a2), a2;
    }
    static updateControl(t2, e2, n2) {
      const { _events: o2, instanceRef: s2 } = v(n2), { _events: r2, instanceRef: a2 } = v(e2);
      if (C(n2, "options")) {
        const o3 = _(e2, "options"), s3 = _(n2, "options");
        o3 !== s3 && t2.options.set(s3);
      }
      if (C(n2, "data")) {
        const o3 = _(e2, "data"), s3 = _(n2, "data");
        o3 !== s3 && t2.data.set(s3);
      }
      if (C(n2, "state")) {
        const o3 = _(e2, "state"), s3 = _(n2, "state");
        o3 !== s3 && t2.state.set(s3);
      }
      if (C(n2, "mapTypes")) {
        const o3 = _(e2, "mapTypes"), s3 = _(n2, "mapTypes");
        o3 !== s3 && (t2.removeAllMapTypes(), s3.forEach((e3) => t2.addMapType(e3)));
      }
      g(t2, r2, o2), R(a2, s2, t2);
    }
    static unmountControl(t2, e2) {
      const { instanceRef: n2, parent: o2, _events: s2 } = v(e2);
      null !== t2 && (Object.keys(s2).forEach((e3) => O(t2, e3, s2[e3])), o2.controls && "function" == typeof o2.controls.remove ? o2.controls.remove(t2) : o2.remove && "function" == typeof o2.remove && o2.remove(t2), R(n2));
    }
  };
  var D = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "Button" })), true, ["control.Button"])));
  var B = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "FullscreenControl" })), true, ["control.FullscreenControl"])));
  var A = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "GeolocationControl" })), true, ["control.GeolocationControl"])));
  var L = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "ListBox" })), true, ["control.ListBox"])));
  var $ = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "ListBoxItem" })), true, ["control.ListBoxItem"])));
  var N = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "RouteButton" })), true, ["control.RouteButton"])));
  var Z = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "RouteEditor" })), true, ["control.RouteEditor"])));
  var z = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "RoutePanel" })), true, ["control.RoutePanel"])));
  var G = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "RulerControl" })), true, ["control.RulerControl"])));
  var I = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "SearchControl" })), true, ["control.SearchControl"])));
  var W = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "TrafficControl" })), true, ["control.TrafficControl"])));
  var F = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "TypeSelector" })), true, ["control.TypeSelector"])));
  var q = x(l(d((e2) => import_react.default.createElement(U, r({}, e2, { name: "ZoomControl" })), true, ["control.ZoomControl"])));
  var Y = class _Y extends import_react.default.Component {
    constructor() {
      super(), this.state = { instance: null }, this.instance = null;
    }
    componentDidMount() {
      const t2 = _Y.mountObject(this.props.ymaps.Clusterer, this.props);
      this.instance = t2, this.setState({ instance: t2 });
    }
    componentDidUpdate(t2) {
      null !== this.state.instance && _Y.updateObject(this.instance, t2, this.props);
    }
    componentWillUnmount() {
      _Y.unmountObject(this.instance, this.props);
    }
    render() {
      return import_react.default.createElement(c.Provider, { value: this.state.instance }, this.props.children);
    }
    static mountObject(t2, e2) {
      const { instanceRef: n2, parent: o2, _events: s2 } = v(e2), r2 = new t2(_(e2, "options"));
      if (Object.keys(s2).forEach((t3) => j(r2, t3, s2[t3])), o2.geoObjects && "function" == typeof o2.geoObjects.add) o2.geoObjects.add(r2);
      else {
        if (!o2.add || "function" != typeof o2.add) throw new Error("No parent found to mount Clusterer");
        o2.add(r2);
      }
      return R(null, n2, r2), r2;
    }
    static updateObject(t2, e2, n2) {
      const { _events: o2, instanceRef: s2 } = v(n2), { _events: r2, instanceRef: a2 } = v(e2);
      if (C(n2, "options")) {
        const o3 = _(e2, "options"), s3 = _(n2, "options");
        o3 !== s3 && t2.options.set(s3);
      }
      g(t2, r2, o2), R(a2, s2, t2);
    }
    static unmountObject(t2, e2) {
      const { instanceRef: n2, parent: o2, _events: s2 } = v(e2);
      null !== t2 && (Object.keys(s2).forEach((e3) => O(t2, e3, s2[e3])), o2.geoObjects && "function" == typeof o2.geoObjects.remove ? o2.geoObjects.remove(t2) : o2.remove && "function" == typeof o2.remove && o2.remove(t2), R(n2));
    }
  };
  var V = x(l(d(Y, true, ["Clusterer"])));
  var H = class _H extends import_react.default.Component {
    constructor() {
      super(), this.state = { instance: null };
    }
    componentDidMount() {
      const t2 = _H.mountObject(this.props.ymaps.ObjectManager, this.props);
      this.instance = t2, this.setState({ instance: t2 });
    }
    componentDidUpdate(t2) {
      null !== this.instance && _H.updateObject(this.instance, t2, this.props);
    }
    componentWillUnmount() {
      _H.unmountObject(this.instance, this.props);
    }
    render() {
      return null;
    }
    static mountObject(t2, e2) {
      const { instanceRef: n2, parent: o2, _events: s2 } = v(e2), r2 = _(e2, "options", {}), a2 = _(e2, "features", {}), i2 = _(e2, "filter", null), c2 = _(e2, "objects", {}), l2 = _(e2, "clusters", {}), p2 = new t2(r2);
      if (p2.add(a2 || []), p2.setFilter(i2), p2.objects.options.set(c2), p2.clusters.options.set(l2), Object.keys(s2).forEach((t3) => j(p2, t3, s2[t3])), o2.geoObjects && "function" == typeof o2.geoObjects.add) o2.geoObjects.add(p2);
      else {
        if (!o2.add || "function" != typeof o2.add) throw new Error("No parent found to mount ObjectManager");
        o2.add(p2);
      }
      return R(null, n2, p2), p2;
    }
    static updateObject(t2, e2, n2) {
      const { _events: o2, instanceRef: s2 } = v(n2), { _events: r2, instanceRef: a2 } = v(e2);
      if (C(n2, "options")) {
        const o3 = _(e2, "options"), s3 = _(n2, "options");
        o3 !== s3 && t2.options.set(s3);
      }
      if (C(n2, "objects")) {
        const o3 = _(e2, "objects"), s3 = _(n2, "objects");
        o3 !== s3 && t2.objects.options.set(s3);
      }
      if (C(n2, "clusters")) {
        const o3 = _(e2, "clusters"), s3 = _(n2, "clusters");
        o3 !== s3 && t2.clusters.options.set(s3);
      }
      if (C(n2, "filter")) {
        const o3 = _(e2, "filter"), s3 = _(n2, "filter");
        o3 !== s3 && t2.setFilter(s3);
      }
      if (C(n2, "features")) {
        const o3 = _(e2, "features"), s3 = _(n2, "features");
        o3 !== s3 && (t2.remove(o3), t2.add(s3));
      }
      g(t2, r2, o2), R(a2, s2, t2);
    }
    static unmountObject(t2, e2) {
      const { instanceRef: n2, parent: o2, _events: s2 } = v(e2);
      null !== t2 && (Object.keys(s2).forEach((e3) => O(t2, e3, s2[e3])), o2.geoObjects && "function" == typeof o2.geoObjects.remove ? o2.geoObjects.remove(t2) : o2.remove && "function" == typeof o2.remove && o2.remove(t2), R(n2));
    }
  };
  var J = x(l(d(H, true, ["ObjectManager"])));
  var K = class _K extends import_react.default.Component {
    constructor() {
      super(), this.state = { instance: null }, this.instance = null;
    }
    componentDidMount() {
      const { name: t2, ymaps: e2, dangerZone: n2 } = this.props, o2 = _K.mountObject(n2 && "function" == typeof n2.modifyConstructor ? n2.modifyConstructor(e2[t2]) : e2[t2], this.props);
      this.instance = o2, this.setState({ instance: o2 });
    }
    componentDidUpdate(t2) {
      null !== this.instance && _K.updateObject(this.instance, t2, this.props);
    }
    componentWillUnmount() {
      _K.unmountObject(this.instance, this.props);
    }
    render() {
      return null;
    }
    static mountObject(t2, e2) {
      const { instanceRef: n2, parent: o2, _events: s2 } = v(e2), r2 = new t2(_(e2, "geometry"), _(e2, "properties"), _(e2, "options"));
      if (Object.keys(s2).forEach((t3) => j(r2, t3, s2[t3])), o2 && o2.geoObjects && "function" == typeof o2.geoObjects.add) o2.geoObjects.add(r2);
      else {
        if (!o2 || !o2.add || "function" != typeof o2.add) throw new Error(`No parent found to mount ${e2.name}`);
        o2.add(r2);
      }
      return R(null, n2, r2), r2;
    }
    static updateObject(t2, e2, n2) {
      const { _events: o2, instanceRef: s2 } = v(n2), { _events: r2, instanceRef: a2 } = v(e2);
      if (C(n2, "geometry")) {
        const o3 = _(e2, "geometry", {}), s3 = _(n2, "geometry", {});
        Array.isArray(s3) && s3 !== o3 ? Array.isArray(s3[0]) && "number" == typeof s3[1] ? (t2.geometry.setCoordinates(s3[0]), t2.geometry.setRadius(s3[1])) : t2.geometry.setCoordinates(s3) : "object" == typeof s3 && (s3.coordinates !== o3.coordinates && t2.geometry.setCoordinates(s3.coordinates), s3.radius !== o3.radius && t2.geometry.setRadius(s3.radius));
      }
      if (C(n2, "properties")) {
        const o3 = _(e2, "properties"), s3 = _(n2, "properties");
        o3 !== s3 && t2.properties.set(s3);
      }
      if (C(n2, "options")) {
        const o3 = _(e2, "options"), s3 = _(n2, "options");
        o3 !== s3 && t2.options.set(s3);
      }
      g(t2, r2, o2), R(a2, s2, t2);
    }
    static unmountObject(t2, e2) {
      const { instanceRef: n2, parent: o2, _events: s2 } = v(e2);
      null !== t2 && (Object.keys(s2).forEach((e3) => O(t2, e3, s2[e3])), o2.geoObjects && "function" == typeof o2.geoObjects.remove ? o2.geoObjects.remove(t2) : o2.remove && "function" == typeof o2.remove && o2.remove(t2), R(n2));
    }
  };
  var Q = { modifyConstructor(t2) {
    function e2(e3, n2, o2) {
      t2.call(this, { geometry: e3, properties: n2 }, o2);
    }
    return e2.prototype = t2.prototype, e2;
  } };
  var X = x(l(d((e2) => import_react.default.createElement(K, r({}, e2, { name: "GeoObject", dangerZone: Q })), true, ["GeoObject"])));
  var tt = x(l(d((e2) => import_react.default.createElement(K, r({}, e2, { name: "Circle" })), true, ["Circle"])));
  var et = x(l(d((e2) => import_react.default.createElement(K, r({}, e2, { name: "Placemark" })), true, ["Placemark"])));
  var nt = x(l(d((e2) => import_react.default.createElement(K, r({}, e2, { name: "Polygon" })), true, ["Polygon"])));
  var ot = x(l(d((e2) => import_react.default.createElement(K, r({}, e2, { name: "Polyline" })), true, ["Polyline"])));
  var st = x(l(d((e2) => import_react.default.createElement(K, r({}, e2, { name: "Rectangle" })), true, ["Rectangle"])));
  export {
    D as Button,
    tt as Circle,
    V as Clusterer,
    B as FullscreenControl,
    X as GeoObject,
    A as GeolocationControl,
    L as ListBox,
    $ as ListBoxItem,
    k as Map,
    J as ObjectManager,
    T as Panorama,
    et as Placemark,
    nt as Polygon,
    ot as Polyline,
    st as Rectangle,
    N as RouteButton,
    Z as RouteEditor,
    z as RoutePanel,
    G as RulerControl,
    I as SearchControl,
    W as TrafficControl,
    F as TypeSelector,
    y as YMaps,
    q as ZoomControl,
    p as useYMaps,
    d as withYMaps
  };
  //# sourceMappingURL=@pbe_react-yandex-maps.js.map
  